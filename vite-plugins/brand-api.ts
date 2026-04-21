import type { Plugin } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import Anthropic from '@anthropic-ai/sdk';

const BRAND_DIR = 'brand';
const THEMES_SUBDIR = 'themes';
const REFERENCES_SUBDIR = 'references';
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const DEFAULT_MODEL = 'claude-sonnet-4-6';
const THEME_ID_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;
const REFERENCE_FILENAME_RE = /^[A-Za-z0-9][A-Za-z0-9._ \-()]{0,200}$/;

interface BrandApiOptions {
  apiKey?: string;
  model?: string;
}

export type CoverStyle = 'solid-dark' | 'solid-light' | 'gradient-radial' | 'gradient-linear' | 'split' | 'image-led';
export type AccentStripe = 'rainbow-6' | 'triplet' | 'single-bar' | 'corner-mark' | 'none';
export type ShapeLanguage = 'sharp' | 'rounded' | 'soft-organic';
export type ContentGrid = 'single-column' | 'two-column' | 'three-column-cards';
export type TitleEmphasis = 'large-heading' | 'display-eyebrow' | 'stacked-labels';

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
  structural?: {
    cover_style: CoverStyle;
    accent_stripe: AccentStripe;
    shape_language: ShapeLanguage;
    content_grid: ContentGrid;
    title_emphasis: TitleEmphasis;
  };
}

const TOOL_SCHEMA = {
  name: 'propose_brand_theme',
  description: 'Propose a complete brand theme based on an uploaded logo and optional brand context.',
  input_schema: {
    type: 'object',
    required: ['description', 'palette', 'typography', 'radii', 'shadows', 'structural'],
    properties: {
      description: { type: 'string', description: '3-4 sentence rationale.' },
      palette: {
        type: 'object',
        required: ['primary', 'primary_light', 'dark', 'dark_surface', 'light_bg', 'text', 'text_muted', 'border', 'accents'],
        properties: {
          primary: { type: 'string' }, primary_light: { type: 'string' },
          dark: { type: 'string' }, dark_surface: { type: 'string' },
          light_bg: { type: 'string' }, text: { type: 'string' },
          text_muted: { type: 'string' }, border: { type: 'string' },
          accents: { type: 'array', minItems: 4, maxItems: 4, items: { type: 'string' } },
        },
      },
      typography: {
        type: 'object',
        required: ['heading_font', 'body_font'],
        properties: {
          heading_font: { type: 'string', description: 'CSS font-family for headings. May be ANY Google Font family (e.g., "Fraunces", "Space Grotesk", "Bricolage Grotesque", "Instrument Serif", "DM Sans", "Manrope", "Playfair Display") or a system font. The Google Font will be auto-imported at apply time. Pick personality to match keywords: display for "fun"/"editorial", geometric sans for "technical", humanist serif for "classical", etc.' },
          body_font: { type: 'string', description: 'CSS font-family for body text. May be any Google Font or system font. Often paired contrastingly with heading_font (e.g., serif heading + sans body).' },
          feature_settings: { type: 'string', description: 'Optional CSS font-feature-settings string, e.g. \'"cv11", "ss01"\'.' },
        },
      },
      radii: {
        type: 'object', required: ['sm', 'md', 'lg'],
        properties: { sm: { type: 'number' }, md: { type: 'number' }, lg: { type: 'number' } },
      },
      shadows: {
        type: 'object', required: ['resting', 'elevated'],
        properties: { resting: { type: 'string' }, elevated: { type: 'string' } },
      },
      structural: {
        type: 'object',
        description: 'Structural design choices that drive HOW the canvases are laid out. Use this to express layout decisions from the keywords (e.g., "multi gradient" → cover_style gradient-radial or gradient-linear; "minimal" → accent_stripe none or corner-mark). Pick deliberately — do not default everything.',
        required: ['cover_style', 'accent_stripe', 'shape_language', 'content_grid', 'title_emphasis'],
        properties: {
          cover_style: {
            type: 'string',
            enum: ['solid-dark', 'solid-light', 'gradient-radial', 'gradient-linear', 'split', 'image-led'],
            description: 'Treatment for title pages/slides. solid-dark = dark wall (current Kinz default). solid-light = light/cream wall. gradient-radial = soft radial wash in brand colors. gradient-linear = two-tone angled gradient. split = two colored halves. image-led = large focal imagery area.',
          },
          accent_stripe: {
            type: 'string',
            enum: ['rainbow-6', 'triplet', 'single-bar', 'corner-mark', 'none'],
            description: 'Top accent treatment. rainbow-6 = the current 6-color stripe. triplet = three weighted bars. single-bar = one primary-colored bar. corner-mark = small corner block. none = no stripe (minimal).',
          },
          shape_language: {
            type: 'string',
            enum: ['sharp', 'rounded', 'soft-organic'],
            description: 'Overall shape feel. sharp = minimal radii, crisp edges. rounded = comfortable 8-14px radii. soft-organic = larger radii, asymmetric blobs.',
          },
          content_grid: {
            type: 'string',
            enum: ['single-column', 'two-column', 'three-column-cards'],
            description: 'Default content layout inside pages/slides.',
          },
          title_emphasis: {
            type: 'string',
            enum: ['large-heading', 'display-eyebrow', 'stacked-labels'],
            description: 'How the title page reads. large-heading = big title dominates. display-eyebrow = small eyebrow label + big statement. stacked-labels = multiple small labels stacked.',
          },
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

function slugify(s: string): string {
  return s
    .toLowerCase().trim()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
}

// System/generic font keywords that should NOT be fetched from Google Fonts.
const SYSTEM_FONT_TOKENS = new Set([
  'inter', 'system-ui', '-apple-system', 'blinkmacsystemfont', 'segoe ui',
  'roboto', 'helvetica', 'helvetica neue', 'arial', 'sans-serif', 'serif',
  'monospace', 'ui-sans-serif', 'ui-serif', 'ui-monospace', 'georgia',
  'times new roman', 'courier new',
]);

/** Extract a single family name from a CSS font-family value like `"Fraunces", serif`. */
function primaryFamily(value: string): string {
  const first = value.split(',')[0].trim();
  return first.replace(/^["']|["']$/g, '');
}

function isGoogleFontCandidate(value: string): string | null {
  const name = primaryFamily(value);
  if (!name) return null;
  if (SYSTEM_FONT_TOKENS.has(name.toLowerCase())) return null;
  return name;
}

function googleFontImportUrl(families: string[]): string | null {
  const unique = Array.from(new Set(families.filter(Boolean)));
  if (!unique.length) return null;
  const params = unique
    .map(f => `family=${encodeURIComponent(f).replace(/%20/g, '+')}:wght@400;500;600;700`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

function proposalToCss(proposal: ThemeProposal, themeName: string): string {
  const p = proposal.palette;
  const t = proposal.typography;
  const r = proposal.radii;
  const s = proposal.shadows;
  const a = p.accents;

  const headingGoogle = isGoogleFontCandidate(t.heading_font);
  const bodyGoogle = isGoogleFontCandidate(t.body_font);
  const importFamilies = [headingGoogle, bodyGoogle].filter((x): x is string => Boolean(x));
  const importUrl = googleFontImportUrl(importFamilies);
  const importLine = importUrl ? `@import url('${importUrl}');\n\n` : '';
  return `${importLine}/*
  ${themeName} — generated by Brand Studio.
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

  /* Structural design decisions. Templates branch on these. */
  --cover-style: ${proposal.structural?.cover_style ?? 'solid-dark'};
  --accent-stripe: ${proposal.structural?.accent_stripe ?? 'rainbow-6'};
  --shape-language: ${proposal.structural?.shape_language ?? 'rounded'};
  --content-grid: ${proposal.structural?.content_grid ?? 'three-column-cards'};
  --title-emphasis: ${proposal.structural?.title_emphasis ?? 'large-heading'};
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

/** Classify a reference file by extension for Claude's vision/document API. */
function classifyReference(name: string): { kind: 'image' | 'document'; mediaType: string } | null {
  const ext = path.extname(name).toLowerCase();
  if (ext === '.png') return { kind: 'image', mediaType: 'image/png' };
  if (ext === '.jpg' || ext === '.jpeg') return { kind: 'image', mediaType: 'image/jpeg' };
  if (ext === '.gif') return { kind: 'image', mediaType: 'image/gif' };
  if (ext === '.webp') return { kind: 'image', mediaType: 'image/webp' };
  if (ext === '.pdf') return { kind: 'document', mediaType: 'application/pdf' };
  return null;
}

function safeReferenceName(name: string): string | null {
  const base = path.basename(name);
  if (!REFERENCE_FILENAME_RE.test(base)) return null;
  if (!classifyReference(base)) return null;
  return base;
}

interface ReferenceFile {
  name: string;
  size: number;
  kind: 'image' | 'document';
  mediaType: string;
}

async function listReferences(brandDir: string): Promise<ReferenceFile[]> {
  const dir = path.join(brandDir, REFERENCES_SUBDIR);
  if (!(await exists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out: ReferenceFile[] = [];
  for (const entry of entries) {
    if (!entry.isFile() || entry.name.startsWith('.')) continue;
    const cls = classifyReference(entry.name);
    if (!cls) continue;
    const stat = await fs.stat(path.join(dir, entry.name));
    out.push({ name: entry.name, size: stat.size, kind: cls.kind, mediaType: cls.mediaType });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

interface ThemeMeta {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

async function readThemesDir(brandDir: string): Promise<ThemeMeta[]> {
  const dir = path.join(brandDir, THEMES_SUBDIR);
  if (!(await exists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out: ThemeMeta[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const metaPath = path.join(dir, entry.name, 'meta.json');
    const cssPath = path.join(dir, entry.name, 'theme.css');
    if (!(await exists(cssPath))) continue;
    let meta: ThemeMeta;
    if (await exists(metaPath)) {
      try { meta = JSON.parse(await fs.readFile(metaPath, 'utf8')); }
      catch { meta = { id: entry.name, name: entry.name, createdAt: '' }; }
    } else {
      meta = { id: entry.name, name: entry.name, createdAt: '' };
    }
    meta.id = entry.name;
    out.push(meta);
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
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
      const themesDir = path.join(brandDir, THEMES_SUBDIR);

      const readManifest = async () => {
        if (!(await exists(manifestPath))) {
          return { name: 'My Brand', logo: 'logo.png' } as Record<string, unknown>;
        }
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

          // GET /__api/brand — tenant metadata + themes list
          if (!rest && method === 'GET') {
            await fs.mkdir(brandDir, { recursive: true });
            const manifest = await readManifest();
            const logo = await findLogoFile(brandDir);
            const themes = await readThemesDir(brandDir);
            return sendJson(res, 200, {
              name: manifest.name ?? 'My Brand',
              subtitle: manifest.subtitle ?? '',
              logo: logo?.name ?? null,
              activeThemeId: manifest.activeThemeId ?? null,
              themes,
            });
          }

          // PATCH /__api/brand — update tenant name/subtitle
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

          // GET /__api/brand/logo
          if (rest === 'logo' && method === 'GET') {
            const logo = await findLogoFile(brandDir);
            if (!logo) return sendJson(res, 404, { error: 'No logo uploaded' });
            const data = await fs.readFile(logo.abs);
            res.statusCode = 200;
            res.setHeader('Content-Type', mediaTypeForExt(logo.name));
            res.end(data);
            return;
          }

          // POST /__api/brand/logo
          if (rest === 'logo' && method === 'POST') {
            await fs.mkdir(brandDir, { recursive: true });
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

          // POST /__api/brand/generate — Claude call, returns proposal (not saved)
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

            let body: { name?: string; keywords?: string; feedback?: string; count?: number };
            try { body = await readJsonBody(req); }
            catch { return sendJson(res, 400, { error: 'Invalid JSON' }); }

            const count = Math.max(1, Math.min(4, body.count ?? 3));
            const BIASES: Array<{ label: string; nudge: string }> = [
              {
                label: 'Balanced',
                nudge: 'Balanced direction: honor keywords directly. Pick the most natural interpretation.',
              },
              {
                label: 'Editorial',
                nudge: 'Editorial direction: pull toward a restrained, more serious treatment. Serif or refined sans typography. Muted palette with strong contrast. cover_style biased toward solid-light or solid-dark. accent_stripe biased toward single-bar or corner-mark. Minimal decoration.',
              },
              {
                label: 'Expressive',
                nudge: 'Expressive direction: push bolder and more experimental. Saturated primary, unusual neutral temperature (warm cream, deep plum, etc.). Display typography (Bricolage Grotesque, Fraunces, Space Grotesk). cover_style biased toward gradient-radial, gradient-linear, or split. accent_stripe biased toward rainbow-6 or triplet.',
              },
              {
                label: 'Minimal',
                nudge: 'Minimal direction: strip to essentials. Near-monochrome palette using one logo hue. Geometric sans (Inter/Manrope) at tight weights. cover_style solid-light or solid-dark. accent_stripe none or corner-mark. Sharp shape_language.',
              },
            ];

            const imageBase64 = (await fs.readFile(logo.abs)).toString('base64');
            const mediaType = mediaTypeForExt(logo.name);

            // Attach any reference files the user dropped in (images + PDFs) as additional context.
            const refs = await listReferences(brandDir);
            const refBlocks: Array<Anthropic.ImageBlockParam | Anthropic.DocumentBlockParam> = [];
            for (const ref of refs) {
              const data = (await fs.readFile(path.join(brandDir, REFERENCES_SUBDIR, ref.name))).toString('base64');
              if (ref.kind === 'image') {
                refBlocks.push({
                  type: 'image',
                  source: { type: 'base64', media_type: ref.mediaType as 'image/png', data },
                });
              } else {
                refBlocks.push({
                  type: 'document',
                  source: { type: 'base64', media_type: 'application/pdf', data },
                });
              }
            }

            const client = new Anthropic({ apiKey });
            const userText = [
              `# Your job`,
              `Propose a brand theme that will style four specific canvases: A4 Title (portrait cover), A4 Content (portrait document page with body copy and callouts), Slide Title (16:9 landscape cover), Slide Content (16:9 landscape with a 3-card grid). The tokens you return — palette, typography, radii, shadows — drive ALL four layouts. A strong proposal looks deliberately considered across all of them, not just a recolored logo.`,
              ``,
              `# Inputs you have`,
              `1. Logo (the first image attached). Source of accent colors; may inform the primary.`,
              body.name ? `2. Brand name: "${body.name}".` : '',
              body.keywords ? `3. Keywords / tone (BINDING stylistic direction — honor this strongly): "${body.keywords}".` : '',
              refs.length
                ? `4. ${refs.length} style reference file(s) attached after the logo (${refs.map(r => r.name).join(', ')}). Read them as mood, typographic feel, color temperature, layout density, and overall tone. Let them shape neutrals, radii, shadows, typography pairing, and palette energy.`
                : '',
              body.feedback ? `5. Feedback on the previous proposal (HIGHEST priority — you MUST move noticeably from the previous output, not return a near-duplicate): "${body.feedback}".` : '',
              ``,
              `# How to build the palette`,
              `- **Accents** (array of 4): derive from logo colors. If the logo has 4+ hues, pick four distinct ones. If fewer, create harmonic variants.`,
              `- **Primary**: may match the logo's dominant hue OR shift to a complementary/analogous tone that reinforces the keywords. It doesn't have to equal \`accents[0]\`. For "bold"/"fun"/"energetic" keywords, consider a saturated primary. For "editorial"/"serious"/"minimal", consider a darker or more restrained primary.`,
              `- **Neutrals** (text, light_bg, dark, dark_surface, border, text_muted): free to shape based on references + keywords. Don't default to the same navy+off-white every time. "Warm" keywords → warm neutrals (creams, taupes). "Cold/technical" → cool grays. "Dark"/"cinematic" → deep charcoal / near-black.`,
              ``,
              `# How to choose typography`,
              `- Pick fonts that EXPRESS the keywords. You may name ANY Google Font family (it will be auto-imported on apply).`,
              `  - "fun"/"playful" → display fonts: Bricolage Grotesque, Fraunces (variable), Space Grotesk, DM Serif Display`,
              `  - "editorial" → serif heading + sans body: Fraunces / Instrument Serif / Playfair Display paired with Inter or DM Sans`,
              `  - "technical"/"precise" → geometric sans: Inter, Manrope, DM Sans, JetBrains Mono`,
              `  - "warm/human" → humanist sans: Figtree, Work Sans, Nunito Sans`,
              `  - "bold/statement" → heavy display: Anton, Archivo Black, Bricolage Grotesque Bold`,
              `- heading_font and body_font may be the same OR different (often more impactful when different).`,
              ``,
              `# Differentiation mandate`,
              `If feedback is present, your proposal MUST visibly differ from the previous proposal — shift the primary hue meaningfully, try a different typographic personality, or re-tune neutrals. Do not return near-identical palettes across successive generations.`,
            ].filter(Boolean).join('\n');

            try {
              const biasesToUse = BIASES.slice(0, count);
              const calls = biasesToUse.map(async bias => {
                const biasedText = `${userText}\n\n# Variant direction\n${bias.nudge}`;
                const response = await client.messages.create({
                  model,
                  max_tokens: 2000,
                  tools: [TOOL_SCHEMA as unknown as Anthropic.Tool],
                  tool_choice: { type: 'tool', name: 'propose_brand_theme' },
                  messages: [{
                    role: 'user',
                    content: [
                      { type: 'image', source: { type: 'base64', media_type: mediaType, data: imageBase64 } },
                      ...refBlocks,
                      { type: 'text', text: biasedText },
                    ],
                  }],
                });
                const toolBlock = response.content.find(b => b.type === 'tool_use');
                if (!toolBlock || toolBlock.type !== 'tool_use') {
                  throw new Error('Claude did not return a structured proposal.');
                }
                return {
                  direction: bias.label,
                  proposal: toolBlock.input as ThemeProposal,
                  usage: response.usage,
                };
              });
              const settled = await Promise.allSettled(calls);
              const variants = settled
                .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof calls[number]>>> => r.status === 'fulfilled')
                .map(r => r.value);
              if (variants.length === 0) {
                const firstError = settled.find(r => r.status === 'rejected') as PromiseRejectedResult | undefined;
                return sendJson(res, 502, {
                  error: `Claude API error: ${firstError?.reason?.message ?? 'all variants failed'}`,
                });
              }
              return sendJson(res, 200, {
                variants,
                // backward-compat for older clients that expected a single `proposal`
                proposal: variants[0].proposal,
                model,
                referencesUsed: refs.map(r => r.name),
              });
            } catch (err) {
              const msg = err instanceof Error ? err.message : String(err);
              return sendJson(res, 502, { error: `Claude API error: ${msg}` });
            }
          }

          // GET /__api/brand/references — list uploaded reference files
          if (rest === 'references' && method === 'GET') {
            const refs = await listReferences(brandDir);
            return sendJson(res, 200, { references: refs });
          }

          // Per-reference: POST /__api/brand/references/:filename, DELETE /__api/brand/references/:filename
          const refRoute = rest.match(/^references\/(.+)$/);
          if (refRoute) {
            const raw = decodeURIComponent(refRoute[1]);
            const name = safeReferenceName(raw);
            if (!name) {
              return sendJson(res, 400, { error: 'Invalid reference filename (allowed: letters/digits/dashes/dots/underscores/spaces, ext .png/.jpg/.jpeg/.gif/.webp/.pdf).' });
            }
            const refsDir = path.join(brandDir, REFERENCES_SUBDIR);
            const target = path.join(refsDir, name);

            if (method === 'POST') {
              await fs.mkdir(refsDir, { recursive: true });
              try {
                const body = await readBinaryBody(req, MAX_UPLOAD_BYTES);
                await fs.writeFile(target, body);
                return sendJson(res, 201, { name, size: body.length });
              } catch (err) {
                const msg = err instanceof Error ? err.message : String(err);
                return sendJson(res, 413, { error: msg });
              }
            }

            if (method === 'DELETE') {
              if (!(await exists(target))) return sendJson(res, 404, { error: 'Reference not found' });
              await fs.rm(target, { force: true });
              return sendJson(res, 200, { deleted: name });
            }
          }

          // GET /__api/brand/themes — list saved themes
          if (rest === 'themes' && method === 'GET') {
            await fs.mkdir(brandDir, { recursive: true });
            const themes = await readThemesDir(brandDir);
            return sendJson(res, 200, { themes });
          }

          // POST /__api/brand/themes — save a new theme from a proposal
          if (rest === 'themes' && method === 'POST') {
            let body: { name: string; proposal: ThemeProposal; setDefault?: boolean };
            try { body = await readJsonBody(req); }
            catch { return sendJson(res, 400, { error: 'Invalid JSON' }); }

            if (!body.name || body.name.trim().length === 0) {
              return sendJson(res, 400, { error: 'name is required' });
            }
            if (!body.proposal || !body.proposal.palette) {
              return sendJson(res, 400, { error: 'proposal is required' });
            }

            let id = slugify(body.name);
            if (!THEME_ID_RE.test(id)) return sendJson(res, 400, { error: 'Invalid theme name (cannot produce a slug).' });

            const baseId = id;
            let suffix = 2;
            while (await exists(path.join(themesDir, id))) {
              id = `${baseId}-${suffix++}`;
            }

            const themeDir = path.join(themesDir, id);
            await fs.mkdir(themeDir, { recursive: true });
            await fs.writeFile(
              path.join(themeDir, 'theme.css'),
              proposalToCss(body.proposal, body.name.trim()),
              'utf8',
            );
            const meta: ThemeMeta = {
              id,
              name: body.name.trim(),
              description: body.proposal.description,
              createdAt: new Date().toISOString(),
            };
            await fs.writeFile(
              path.join(themeDir, 'meta.json'),
              JSON.stringify(meta, null, 2) + '\n',
              'utf8',
            );

            if (body.setDefault) {
              const manifest = await readManifest();
              manifest.activeThemeId = id;
              await writeManifest(manifest);
            }

            return sendJson(res, 201, { id, name: meta.name });
          }

          // Per-theme routes: /__api/brand/themes/:id[/default]
          const themeRoute = rest.match(/^themes\/([^/]+)(?:\/(default))?$/);
          if (themeRoute) {
            const id = decodeURIComponent(themeRoute[1]);
            const sub = themeRoute[2];
            if (!THEME_ID_RE.test(id)) return sendJson(res, 400, { error: 'Invalid theme id' });
            const themeDir = path.join(themesDir, id);
            if (!(await exists(themeDir))) return sendJson(res, 404, { error: 'Theme not found' });

            // POST /themes/:id/default — set as active
            if (sub === 'default' && method === 'POST') {
              const manifest = await readManifest();
              manifest.activeThemeId = id;
              await writeManifest(manifest);
              return sendJson(res, 200, { activeThemeId: id });
            }

            // DELETE /themes/:id
            if (!sub && method === 'DELETE') {
              const manifest = await readManifest();
              if (manifest.activeThemeId === id) {
                return sendJson(res, 409, { error: 'Cannot delete the active theme. Set a different theme as default first.' });
              }
              await fs.rm(themeDir, { recursive: true, force: true });
              return sendJson(res, 200, { deleted: id });
            }
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
