import type { Plugin } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import Anthropic from '@anthropic-ai/sdk';

const BRAND_DIR = 'brand';
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const DEFAULT_MODEL = 'claude-sonnet-4-6';

interface BrandApiOptions {
  apiKey?: string;
  model?: string;
}

export interface ThemeProposal {
  description: string;
  palette: {
    primary: string;
    primary_light: string;
    dark: string;
    dark_surface: string;
    light_bg: string;
    text: string;
    text_muted: string;
    border: string;
    accents: string[];
  };
  typography: {
    heading_font: string;
    body_font: string;
    feature_settings?: string;
  };
  radii: { sm: number; md: number; lg: number };
  shadows: { resting: string; elevated: string };
}

const TOOL_SCHEMA = {
  name: 'propose_brand_theme',
  description:
    'Propose a complete brand theme based on an uploaded logo and optional brand context. The theme will be used to style A4 documents and 16:9 slide decks for this tenant.',
  input_schema: {
    type: 'object',
    required: ['description', 'palette', 'typography', 'radii', 'shadows'],
    properties: {
      description: {
        type: 'string',
        description: 'One short paragraph (3-4 sentences) explaining the rationale: what the palette evokes, which colors came from the logo, and how the typography/radii reinforce the brand.',
      },
      palette: {
        type: 'object',
        required: ['primary', 'primary_light', 'dark', 'dark_surface', 'light_bg', 'text', 'text_muted', 'border', 'accents'],
        properties: {
          primary: { type: 'string', description: 'Primary brand color — hex like #1976D2. Should be the most prominent logo color.' },
          primary_light: { type: 'string', description: 'Lighter tint of primary — hex.' },
          dark: { type: 'string', description: 'Deep brand neutral for chrome — hex.' },
          dark_surface: { type: 'string', description: 'Mid-dark surface tone — hex.' },
          light_bg: { type: 'string', description: 'Page canvas / light background — hex.' },
          text: { type: 'string', description: 'Primary body text color — hex.' },
          text_muted: { type: 'string', description: 'Muted text as rgba() string — e.g. rgba(27,35,50,0.65)' },
          border: { type: 'string', description: 'Subtle border color as rgba() string.' },
          accents: {
            type: 'array',
            description: 'Exactly 4 accent hex colors taken from the logo, ordered warmest→coolest, for multi-color accent stripes and highlights.',
            minItems: 4,
            maxItems: 4,
            items: { type: 'string' },
          },
        },
      },
      typography: {
        type: 'object',
        required: ['heading_font', 'body_font'],
        properties: {
          heading_font: { type: 'string', description: 'CSS font-family value for headings. Use: Inter, system-ui, Helvetica, Georgia, "Playfair Display", or "IBM Plex Sans".' },
          body_font: { type: 'string', description: 'CSS font-family value for body text.' },
          feature_settings: { type: 'string', description: 'Optional CSS font-feature-settings string.' },
        },
      },
      radii: {
        type: 'object',
        required: ['sm', 'md', 'lg'],
        properties: {
          sm: { type: 'number', description: 'Small radius in px (2-8).' },
          md: { type: 'number', description: 'Medium radius in px (6-14).' },
          lg: { type: 'number', description: 'Large radius in px (10-20).' },
        },
      },
      shadows: {
        type: 'object',
        required: ['resting', 'elevated'],
        properties: {
          resting: { type: 'string', description: 'CSS box-shadow value for cards at rest.' },
          elevated: { type: 'string', description: 'CSS box-shadow value for hovered/elevated surfaces.' },
        },
      },
    },
  },
} as const;

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

async function readJsonBody<T>(req: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as T;
}

async function readBinaryBody(req: IncomingMessage, limit: number): Promise<Buffer> {
  const chunks: Buffer[] = [];
  let total = 0;
  for await (const chunk of req) {
    const buf = chunk as Buffer;
    total += buf.length;
    if (total > limit) throw new Error(`Upload exceeds ${limit} bytes`);
    chunks.push(buf);
  }
  return Buffer.concat(chunks);
}

async function exists(p: string): Promise<boolean> {
  try { await fs.access(p); return true; } catch { return false; }
}

function proposalToCss(proposal: ThemeProposal): string {
  const p = proposal.palette;
  const t = proposal.typography;
  const r = proposal.radii;
  const s = proposal.shadows;
  const a = p.accents;
  return `/*
  Brand theme generated by Brand Studio.
  ${proposal.description.replace(/\*\//g, '* /')}
*/

:root {
  --color-primary: ${p.primary};
  --color-primary-light: ${p.primary_light};
  --color-dark: ${p.dark};
  --color-dark-surface: ${p.dark_surface};
  --color-light-bg: ${p.light_bg};
  --color-text: ${p.text};
  --color-text-muted: ${p.text_muted};
  --color-border: ${p.border};

  --color-accent-1: ${a[0]};
  --color-accent-2: ${a[1]};
  --color-accent-3: ${a[2]};
  --color-accent-4: ${a[3]};

  /* Legacy compatibility: the Kinz tender pages reference these names directly. */
  --color-kinz-red: ${a[0]};
  --color-kinz-orange: ${a[1]};
  --color-kinz-yellow: ${a[2]};
  --color-kinz-green: ${a[3]};
  --color-kinz-blue: ${p.primary};
  --color-kinz-navy: ${p.dark};

  --font-heading: ${t.heading_font};
  --font-body: ${t.body_font};
  ${t.feature_settings ? `--font-feature-settings: ${t.feature_settings};` : ''}

  --radius-sm: ${r.sm}px;
  --radius-md: ${r.md}px;
  --radius-lg: ${r.lg}px;

  --shadow-resting: ${s.resting};
  --shadow-elevated: ${s.elevated};
}
`;
}

async function findLogoFile(brandDir: string): Promise<{ abs: string; name: string } | null> {
  if (!(await exists(brandDir))) return null;
  const files = await fs.readdir(brandDir);
  const logos = files.filter(f => /^logo\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f));
  if (!logos.length) return null;
  return { abs: path.join(brandDir, logos[0]), name: logos[0] };
}

function mediaTypeForExt(name: string): 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp' {
  const ext = path.extname(name).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.webp') return 'image/webp';
  return 'image/png';
}

export function brandApi(opts: BrandApiOptions = {}): Plugin {
  const apiKey = opts.apiKey ?? process.env.ANTHROPIC_API_KEY;
  const model = opts.model ?? process.env.ANTHROPIC_BRAND_MODEL ?? DEFAULT_MODEL;

  return {
    name: 'brand-api',
    configureServer(server) {
      const root = server.config.root;
      const brandDir = path.join(root, BRAND_DIR);
      const manifestPath = path.join(brandDir, 'tenant.json');
      const themePath = path.join(brandDir, 'theme.css');

      const readManifest = async () => {
        if (!(await exists(manifestPath))) return { name: 'My Brand', logo: 'logo.png', theme: 'theme.css' };
        return JSON.parse(await fs.readFile(manifestPath, 'utf8'));
      };
      const writeManifest = async (m: unknown) =>
        fs.writeFile(manifestPath, JSON.stringify(m, null, 2) + '\n', 'utf8');

      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? '';
        if (!url.startsWith('/__api/brand')) return next();

        try {
          const [pathOnly] = url.split('?');
          const method = req.method ?? 'GET';
          const rest = pathOnly.replace(/^\/__api\/brand\/?/, '').replace(/^\/+/, '');

          // GET /__api/brand — tenant metadata
          if (!rest && method === 'GET') {
            await fs.mkdir(brandDir, { recursive: true });
            const manifest = await readManifest();
            const logo = await findLogoFile(brandDir);
            return sendJson(res, 200, {
              name: manifest.name ?? 'My Brand',
              subtitle: manifest.subtitle ?? '',
              logo: logo?.name ?? null,
              hasTheme: await exists(themePath),
            });
          }

          // PATCH /__api/brand — update tenant metadata (name/subtitle)
          if (!rest && method === 'PATCH') {
            let body: { name?: string; subtitle?: string };
            try { body = await readJsonBody(req); }
            catch { return sendJson(res, 400, { error: 'Invalid JSON' }); }
            await fs.mkdir(brandDir, { recursive: true });
            const manifest = await readManifest();
            if (typeof body.name === 'string' && body.name.trim().length > 0) manifest.name = body.name.trim();
            if (typeof body.subtitle === 'string') manifest.subtitle = body.subtitle;
            await writeManifest(manifest);
            return sendJson(res, 200, { name: manifest.name, subtitle: manifest.subtitle });
          }

          // GET /__api/brand/logo — serve the tenant logo
          if (rest === 'logo' && method === 'GET') {
            const logo = await findLogoFile(brandDir);
            if (!logo) return sendJson(res, 404, { error: 'No logo uploaded' });
            const data = await fs.readFile(logo.abs);
            res.statusCode = 200;
            res.setHeader('Content-Type', mediaTypeForExt(logo.name));
            res.end(data);
            return;
          }

          // POST /__api/brand/logo — upload tenant logo
          if (rest === 'logo' && method === 'POST') {
            await fs.mkdir(brandDir, { recursive: true });
            // Remove any existing logo
            const existing = await findLogoFile(brandDir);
            if (existing) await fs.rm(existing.abs, { force: true });

            const contentType = (req.headers['content-type'] ?? 'image/png').toLowerCase();
            let ext = '.png';
            if (contentType.includes('jpeg') || contentType.includes('jpg')) ext = '.jpg';
            else if (contentType.includes('gif')) ext = '.gif';
            else if (contentType.includes('webp')) ext = '.webp';
            else if (contentType.includes('svg')) ext = '.svg';

            const body = await readBinaryBody(req, MAX_UPLOAD_BYTES);
            const target = path.join(brandDir, `logo${ext}`);
            await fs.writeFile(target, body);

            const manifest = await readManifest();
            manifest.logo = `logo${ext}`;
            await writeManifest(manifest);

            return sendJson(res, 201, { name: `logo${ext}`, size: body.length });
          }

          // POST /__api/brand/generate — Claude call
          if (rest === 'generate' && method === 'POST') {
            if (!apiKey) {
              return sendJson(res, 500, {
                error: 'ANTHROPIC_API_KEY is not set. Create .env.local with ANTHROPIC_API_KEY=... and restart the dev server.',
              });
            }

            const logo = await findLogoFile(brandDir);
            if (!logo) {
              return sendJson(res, 400, { error: 'Upload a logo first.' });
            }

            let body: { name?: string; keywords?: string; feedback?: string };
            try { body = await readJsonBody(req); }
            catch { return sendJson(res, 400, { error: 'Invalid JSON' }); }

            const imageBase64 = (await fs.readFile(logo.abs)).toString('base64');
            const mediaType = mediaTypeForExt(logo.name);

            const client = new Anthropic({ apiKey });
            const userText = [
              `Brand name: ${body.name ?? 'Unnamed'}`,
              body.keywords ? `Keywords / tone: ${body.keywords}` : '',
              body.feedback ? `User feedback on previous proposal (act on this): ${body.feedback}` : '',
              '',
              'Analyze the uploaded logo. Extract the dominant palette (for `primary` and `accents`, pull colors directly from the logo). Propose a complete brand theme usable for both A4 print documents and 16:9 slide decks. Be precise with hex values — do not invent colors that are not in the logo for `primary`/`accents`. For neutrals (text, light_bg, dark, border) choose tones that pair well with the logo, not the logo colors themselves.',
            ].filter(Boolean).join('\n');

            try {
              const response = await client.messages.create({
                model,
                max_tokens: 2000,
                tools: [TOOL_SCHEMA as unknown as Anthropic.Tool],
                tool_choice: { type: 'tool', name: 'propose_brand_theme' },
                messages: [
                  {
                    role: 'user',
                    content: [
                      { type: 'image', source: { type: 'base64', media_type: mediaType, data: imageBase64 } },
                      { type: 'text', text: userText },
                    ],
                  },
                ],
              });

              const toolBlock = response.content.find(b => b.type === 'tool_use');
              if (!toolBlock || toolBlock.type !== 'tool_use') {
                return sendJson(res, 502, { error: 'Claude did not return a structured proposal.' });
              }
              return sendJson(res, 200, {
                proposal: toolBlock.input as ThemeProposal,
                model,
                usage: response.usage,
              });
            } catch (err) {
              const msg = err instanceof Error ? err.message : String(err);
              return sendJson(res, 502, { error: `Claude API error: ${msg}` });
            }
          }

          // POST /__api/brand/apply — write brand/theme.css
          if (rest === 'apply' && method === 'POST') {
            let body: { proposal: ThemeProposal };
            try { body = await readJsonBody(req); }
            catch { return sendJson(res, 400, { error: 'Invalid JSON' }); }
            if (!body.proposal || !body.proposal.palette) {
              return sendJson(res, 400, { error: 'proposal is required' });
            }

            await fs.mkdir(brandDir, { recursive: true });
            await fs.writeFile(themePath, proposalToCss(body.proposal), 'utf8');

            const manifest = await readManifest();
            manifest.theme = 'theme.css';
            await writeManifest(manifest);

            return sendJson(res, 200, { applied: true });
          }

          return next();
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          return sendJson(res, 500, { error: msg });
        }
      });
    },
  };
}
