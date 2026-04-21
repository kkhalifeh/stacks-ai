import type { Plugin } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import type { IncomingMessage, ServerResponse } from 'node:http';

interface CreateStackBody {
  id: string;
  name: string;
  template: 'a4' | 'slide-16x9';
  themeId?: string;
  brandId?: string;
}

interface UpdateStackBody {
  name?: string;
  subtitle?: string;
}

interface TerminalBody {
  id: string;
}

const STACKS_DIR = 'stacks';
const TEMPLATES_DIR = 'stack-templates';
const BRANDS_DIR = 'brands';
const ID_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;
const FILENAME_RE = /^[A-Za-z0-9][A-Za-z0-9._ \-()]{0,200}$/;
const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

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

function safeFilename(name: string): string | null {
  const base = path.basename(name);
  if (!FILENAME_RE.test(base)) return null;
  return base;
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks).toString('utf8');
}

async function exists(p: string): Promise<boolean> {
  try { await fs.access(p); return true; } catch { return false; }
}

async function copyTemplate(templateDir: string, targetDir: string, vars: Record<string, string>) {
  await fs.mkdir(targetDir, { recursive: true });
  const entries = await fs.readdir(templateDir, { withFileTypes: true });
  for (const entry of entries) {
    const src = path.join(templateDir, entry.name);
    const dst = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      await copyTemplate(src, dst, vars);
    } else {
      const isText = /\.(json|md|tsx?|css|html|txt)$/i.test(entry.name);
      if (isText) {
        let contents = await fs.readFile(src, 'utf8');
        for (const [k, v] of Object.entries(vars)) {
          contents = contents.replaceAll(`__${k}__`, v);
        }
        await fs.writeFile(dst, contents, 'utf8');
      } else {
        await fs.copyFile(src, dst);
      }
    }
  }
}

async function listKbFiles(stackDir: string): Promise<Array<{ name: string; size: number; modified: number; isDir: boolean }>> {
  const kbDir = path.join(stackDir, 'kb');
  if (!(await exists(kbDir))) return [];
  const entries = await fs.readdir(kbDir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(kbDir, entry.name);
    const stat = await fs.stat(full);
    out.push({
      name: entry.name,
      size: stat.size,
      modified: stat.mtimeMs,
      isDir: entry.isDirectory(),
    });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

function validStackId(id: string | undefined): id is string {
  return typeof id === 'string' && ID_RE.test(id);
}

export function stacksApi(): Plugin {
  return {
    name: 'stacks-api',
    configureServer(server) {
      const root = server.config.root;
      const stacksRoot = () => path.join(root, STACKS_DIR);
      const stackDir = (id: string) => path.join(stacksRoot(), id);

      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? '';
        if (!url.startsWith('/__api/')) return next();

        try {
          const [pathOnly] = url.split('?');
          const method = req.method ?? 'GET';

          // GET /__api/stacks — list stack folder names
          if (pathOnly === '/__api/stacks' && method === 'GET') {
            if (!(await exists(stacksRoot()))) return sendJson(res, 200, { stacks: [] });
            const names = (await fs.readdir(stacksRoot(), { withFileTypes: true }))
              .filter(e => e.isDirectory())
              .map(e => e.name);
            return sendJson(res, 200, { stacks: names });
          }

          // POST /__api/stacks — create a new stack from a template
          if (pathOnly === '/__api/stacks' && method === 'POST') {
            const raw = await readBody(req);
            let body: CreateStackBody;
            try { body = JSON.parse(raw); }
            catch { return sendJson(res, 400, { error: 'Invalid JSON' }); }

            if (!validStackId(body.id)) {
              return sendJson(res, 400, { error: 'id must match ^[a-z0-9][a-z0-9-]{0,63}$' });
            }
            if (!body.name || body.name.trim().length === 0) {
              return sendJson(res, 400, { error: 'name is required' });
            }
            if (body.template !== 'a4' && body.template !== 'slide-16x9') {
              return sendJson(res, 400, { error: 'template must be "a4" or "slide-16x9"' });
            }

            // Prefer the brand-specific template if it exists, else fall back to the generic starter.
            const brandId = body.brandId;
            const brandTemplate = brandId
              ? path.join(root, BRANDS_DIR, brandId, 'templates', body.template)
              : null;
            const genericTemplate = path.join(root, TEMPLATES_DIR, body.template);
            const templateDir = brandTemplate && (await exists(brandTemplate))
              ? brandTemplate
              : genericTemplate;
            const targetDir = stackDir(body.id);

            if (!(await exists(templateDir))) {
              return sendJson(res, 500, { error: `Template not found: ${body.template}` });
            }
            if (await exists(targetDir)) {
              return sendJson(res, 409, { error: `Stack '${body.id}' already exists` });
            }

            await copyTemplate(templateDir, targetDir, {
              STACK_ID: body.id,
              STACK_NAME: body.name.replace(/"/g, '\\"'),
            });

            // Stamp brandId into the new stack.json.
            const manifestPath = path.join(targetDir, 'stack.json');
            if (await exists(manifestPath) && brandId) {
              const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
              manifest.brandId = brandId;
              await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
            }

            // If the template didn't bring its own assets/logo, seed from the brand so
            // relative logo imports in the template resolve out of the box.
            const targetAssetsDir = path.join(targetDir, 'assets');
            await fs.mkdir(targetAssetsDir, { recursive: true });
            const targetAssetFiles = await fs.readdir(targetAssetsDir);
            if (targetAssetFiles.length === 0 && brandId) {
              const brandDir = path.join(root, BRANDS_DIR, brandId);
              if (await exists(brandDir)) {
                const brandFiles = await fs.readdir(brandDir, { withFileTypes: true });
                for (const entry of brandFiles) {
                  if (!entry.isFile()) continue;
                  if (/^logo(-white)?\.(png|jpg|jpeg|webp|svg|gif)$/i.test(entry.name)) {
                    await fs.copyFile(
                      path.join(brandDir, entry.name),
                      path.join(targetAssetsDir, entry.name),
                    );
                  }
                }
              }
            }

            // If a specific brand theme was requested, snapshot it into the stack.
            if (body.themeId && brandId) {
              const themeSrc = path.join(root, BRANDS_DIR, brandId, 'themes', body.themeId, 'theme.css');
              if (await exists(themeSrc)) {
                const targetThemeDir = path.join(targetDir, 'theme');
                await fs.mkdir(targetThemeDir, { recursive: true });
                await fs.copyFile(themeSrc, path.join(targetThemeDir, 'theme.css'));
                if (await exists(manifestPath)) {
                  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
                  manifest.theme = 'theme/theme.css';
                  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
                }
              }
            }

            return sendJson(res, 201, { id: body.id });
          }

          // POST /__api/terminal — open macOS Terminal into a stack and run claude
          if (pathOnly === '/__api/terminal' && method === 'POST') {
            const raw = await readBody(req);
            let body: TerminalBody;
            try { body = JSON.parse(raw); }
            catch { return sendJson(res, 400, { error: 'Invalid JSON' }); }

            if (!validStackId(body.id)) return sendJson(res, 400, { error: 'Invalid stack id' });
            const dir = stackDir(body.id);
            if (!(await exists(dir))) return sendJson(res, 404, { error: 'Stack not found' });

            if (process.platform !== 'darwin') {
              return sendJson(res, 501, { error: 'Terminal launch is macOS-only (for now)' });
            }

            const script = `tell application "Terminal"
  activate
  do script "cd ${dir.replace(/"/g, '\\"')} && clear && claude"
end tell`;
            await new Promise<void>((resolve, reject) => {
              const proc = spawn('osascript', ['-e', script], { stdio: 'ignore' });
              proc.on('exit', code => code === 0 ? resolve() : reject(new Error(`osascript exit ${code}`)));
              proc.on('error', reject);
            });
            return sendJson(res, 200, { ok: true });
          }

          // Routes under /__api/stacks/:id/...
          const stackPrefix = pathOnly.match(/^\/__api\/stacks\/([^/]+)(?:\/(.*))?$/);
          if (stackPrefix) {
            const id = decodeURIComponent(stackPrefix[1]);
            const rest = stackPrefix[2] ?? '';
            if (!validStackId(id)) return sendJson(res, 400, { error: 'Invalid stack id' });
            const dir = stackDir(id);
            if (!(await exists(dir))) return sendJson(res, 404, { error: 'Stack not found' });

            const manifestPath = path.join(dir, 'stack.json');
            const readManifest = async () => JSON.parse(await fs.readFile(manifestPath, 'utf8'));
            const writeManifest = async (m: unknown) =>
              fs.writeFile(manifestPath, JSON.stringify(m, null, 2) + '\n', 'utf8');

            // GET /__api/stacks/:id/kb — list KB entries
            if (rest === 'kb' && method === 'GET') {
              const files = await listKbFiles(dir);
              return sendJson(res, 200, { files });
            }

            // POST /__api/stacks/:id/kb/:filename — upload a file
            const kbFile = rest.match(/^kb\/(.+)$/);
            if (kbFile && method === 'POST') {
              const name = safeFilename(decodeURIComponent(kbFile[1]));
              if (!name) return sendJson(res, 400, { error: 'Invalid filename' });
              const target = path.join(dir, 'kb', name);
              await fs.mkdir(path.join(dir, 'kb'), { recursive: true });
              try {
                const body = await readBinaryBody(req, MAX_UPLOAD_BYTES);
                await fs.writeFile(target, body);
                return sendJson(res, 201, { name, size: body.length });
              } catch (err) {
                const msg = err instanceof Error ? err.message : String(err);
                return sendJson(res, 413, { error: msg });
              }
            }

            // DELETE /__api/stacks/:id/kb/:filename — remove a KB file
            if (kbFile && method === 'DELETE') {
              const name = safeFilename(decodeURIComponent(kbFile[1]));
              if (!name) return sendJson(res, 400, { error: 'Invalid filename' });
              const target = path.join(dir, 'kb', name);
              if (!(await exists(target))) return sendJson(res, 404, { error: 'File not found' });
              await fs.rm(target, { recursive: true, force: true });
              return sendJson(res, 200, { deleted: name });
            }

            // PATCH /__api/stacks/:id/binders/:binderId/documents/:docId — rename document label
            const docMatch = rest.match(/^binders\/([^/]+)\/documents\/([^/]+)$/);
            if (docMatch && method === 'PATCH') {
              const binderId = decodeURIComponent(docMatch[1]);
              const docId = decodeURIComponent(docMatch[2]);
              const raw = await readBody(req);
              let body: { label?: string };
              try { body = JSON.parse(raw); } catch { return sendJson(res, 400, { error: 'Invalid JSON' }); }
              if (typeof body.label !== 'string' || body.label.trim().length === 0) {
                return sendJson(res, 400, { error: 'label is required' });
              }
              const manifest = await readManifest();
              const binders = manifest.binders ?? manifest.groups;
              const binder = Array.isArray(binders) ? binders.find((b: { id: string }) => b.id === binderId) : undefined;
              if (!binder) return sendJson(res, 404, { error: `Binder '${binderId}' not found` });
              const docs = binder.documents ?? binder.sections;
              const doc = Array.isArray(docs) ? docs.find((d: { id: string }) => d.id === docId) : undefined;
              if (!doc) return sendJson(res, 404, { error: `Document '${docId}' not found` });
              doc.label = body.label.trim();
              await writeManifest(manifest);
              return sendJson(res, 200, { id, binderId, docId, label: doc.label });
            }

            // PATCH /__api/stacks/:id/binders/:binderId — rename binder label
            const binderMatch = rest.match(/^binders\/([^/]+)$/);
            if (binderMatch && method === 'PATCH') {
              const binderId = decodeURIComponent(binderMatch[1]);
              const raw = await readBody(req);
              let body: { label?: string; subtitle?: string };
              try { body = JSON.parse(raw); } catch { return sendJson(res, 400, { error: 'Invalid JSON' }); }
              const manifest = await readManifest();
              const binders = manifest.binders ?? manifest.groups;
              const binder = Array.isArray(binders) ? binders.find((b: { id: string }) => b.id === binderId) : undefined;
              if (!binder) return sendJson(res, 404, { error: `Binder '${binderId}' not found` });
              if (typeof body.label === 'string' && body.label.trim().length > 0) {
                binder.label = body.label.trim();
              }
              if (typeof body.subtitle === 'string') {
                binder.subtitle = body.subtitle;
              }
              await writeManifest(manifest);
              return sendJson(res, 200, { id, binderId, label: binder.label, subtitle: binder.subtitle });
            }

            // PATCH /__api/stacks/:id — update stack-level display fields
            if (!rest && method === 'PATCH') {
              const raw = await readBody(req);
              let body: UpdateStackBody;
              try { body = JSON.parse(raw); } catch { return sendJson(res, 400, { error: 'Invalid JSON' }); }
              const manifest = await readManifest();
              if (typeof body.name === 'string' && body.name.trim().length > 0) {
                manifest.name = body.name.trim();
              }
              if (typeof body.subtitle === 'string') {
                manifest.subtitle = body.subtitle;
              }
              await writeManifest(manifest);
              return sendJson(res, 200, { id, name: manifest.name, subtitle: manifest.subtitle });
            }

            // DELETE /__api/stacks/:id — remove stack directory
            if (!rest && method === 'DELETE') {
              await fs.rm(dir, { recursive: true, force: true });
              return sendJson(res, 200, { id, deleted: true });
            }
          }

          return next();
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          return sendJson(res, 500, { error: message });
        }
      });
    },
  };
}
