import type { FC } from 'react';

export type StackFormat = 'a4' | 'slide-16x9';

export interface DocumentDef {
  id: string;
  label: string;
  maxPages?: number;
  components: string[];
}

export interface AttachmentDef {
  label: string;
  url: string;
}

export interface BinderDef {
  id: string;
  label: string;
  subtitle?: string;
  color?: string;
  passwordProtected?: boolean;
  documents: DocumentDef[];
  attachments?: AttachmentDef[];
}

export interface StackManifest {
  id: string;
  name: string;
  subtitle?: string;
  format: StackFormat;
  theme?: string;
  logo?: string;
  binders: BinderDef[];
}

export interface LoadedDocument extends DocumentDef {
  pages: FC[];
  binderId: string;
}

export interface LoadedBinder extends BinderDef {
  documents: LoadedDocument[];
}

export interface LoadedStack {
  id: string;
  name: string;
  subtitle?: string;
  format: StackFormat;
  logoUrl?: string;
  themeCss?: string;
  binders: LoadedBinder[];
  componentRegistry: Record<string, FC>;
  dir: string;
}

// Raw manifests may still use legacy `groups`/`sections` keys. Accept either.
interface RawManifest {
  id: string;
  name: string;
  subtitle?: string;
  format: StackFormat;
  theme?: string;
  logo?: string;
  binders?: Array<RawBinder>;
  groups?: Array<RawBinder>;
}
interface RawBinder {
  id: string;
  label: string;
  subtitle?: string;
  color?: string;
  passwordProtected?: boolean;
  documents?: DocumentDef[];
  sections?: DocumentDef[];
  attachments?: AttachmentDef[];
}

const manifests = import.meta.glob<RawManifest>('/stacks/*/stack.json', { eager: true, import: 'default' });
const pageModules = import.meta.glob<Record<string, FC>>('/stacks/*/pages/**/*.tsx', { eager: true });
const themeCssFiles = import.meta.glob<string>('/stacks/*/theme/*.css', { eager: true, query: '?raw', import: 'default' });
const assetUrls = import.meta.glob<string>('/stacks/*/assets/**/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' });

// ─── TENANT BRAND ──────────────────────────────────────────────
// Tenant-level brand is loaded from /brand/. It serves as the default
// theme + logo for any stack that doesn't override them in its stack.json.

interface TenantManifest {
  name: string;
  subtitle?: string;
  logo?: string;
  theme?: string;
}

const tenantManifestRaw = import.meta.glob<TenantManifest>('/brand/tenant.json', { eager: true, import: 'default' });
const tenantThemeCss = import.meta.glob<string>('/brand/*.css', { eager: true, query: '?raw', import: 'default' });
const tenantAssets = import.meta.glob<string>('/brand/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' });

export interface LoadedTenant {
  name: string;
  subtitle?: string;
  logoUrl?: string;
  themeCss?: string;
  themePath?: string; // e.g. "theme.css" — relative to /brand/
  logoPath?: string;  // e.g. "logo.png"
}

function loadTenant(): LoadedTenant | undefined {
  const raw = tenantManifestRaw['/brand/tenant.json'];
  if (!raw) return undefined;
  const themePath = raw.theme ?? 'theme.css';
  const logoPath = raw.logo;
  return {
    name: raw.name,
    subtitle: raw.subtitle,
    themePath,
    logoPath,
    themeCss: tenantThemeCss[`/brand/${themePath}`],
    logoUrl: logoPath ? tenantAssets[`/brand/${logoPath}`] : undefined,
  };
}

export const tenant: LoadedTenant | undefined = loadTenant();

function stackIdFromPath(path: string): string {
  const match = path.match(/^\/stacks\/([^/]+)\//);
  if (!match) throw new Error(`Unexpected path: ${path}`);
  return match[1];
}

function buildRegistry(stackId: string): Record<string, FC> {
  const registry: Record<string, FC> = {};
  for (const [path, mod] of Object.entries(pageModules)) {
    if (stackIdFromPath(path) !== stackId) continue;
    for (const [name, component] of Object.entries(mod)) {
      if (typeof component === 'function') {
        registry[name] = component;
      }
    }
  }
  return registry;
}

function themeForStack(stackId: string, themeRel?: string): string | undefined {
  if (!themeRel) return undefined;
  const full = `/stacks/${stackId}/${themeRel}`;
  return themeCssFiles[full];
}

function logoUrlForStack(stackId: string, logoRel?: string): string | undefined {
  if (!logoRel) return undefined;
  const full = `/stacks/${stackId}/${logoRel}`;
  return assetUrls[full];
}

function normalize(raw: RawManifest): StackManifest {
  const rawBinders = raw.binders ?? raw.groups ?? [];
  return {
    id: raw.id,
    name: raw.name,
    subtitle: raw.subtitle,
    format: raw.format,
    theme: raw.theme,
    logo: raw.logo,
    binders: rawBinders.map(b => ({
      id: b.id,
      label: b.label,
      subtitle: b.subtitle,
      color: b.color,
      passwordProtected: b.passwordProtected,
      attachments: b.attachments,
      documents: b.documents ?? b.sections ?? [],
    })),
  };
}

function loadOne(raw: RawManifest): LoadedStack {
  const manifest = normalize(raw);
  const registry = buildRegistry(manifest.id);
  const missing: string[] = [];

  const binders: LoadedBinder[] = manifest.binders.map(b => ({
    ...b,
    documents: b.documents.map(d => {
      const pages = d.components.map(name => {
        const c = registry[name];
        if (!c) missing.push(`${manifest.id}:${d.id} → ${name}`);
        return c;
      }).filter(Boolean) as FC[];
      return { ...d, pages, binderId: b.id };
    }),
  }));

  if (missing.length) {
    console.warn(`[stacks] Missing component exports:\n  ${missing.join('\n  ')}`);
  }

  // Resolve effective theme + logo: stack-level overrides win, tenant is the fallback.
  const stackTheme = themeForStack(manifest.id, manifest.theme);
  const stackLogo = logoUrlForStack(manifest.id, manifest.logo);

  return {
    id: manifest.id,
    name: manifest.name,
    subtitle: manifest.subtitle,
    format: manifest.format,
    logoUrl: stackLogo ?? tenant?.logoUrl,
    themeCss: stackTheme ?? tenant?.themeCss,
    binders,
    componentRegistry: registry,
    dir: `/stacks/${manifest.id}`,
  };
}

export const stacks: LoadedStack[] = Object.entries(manifests)
  .map(([, m]) => loadOne(m))
  .sort((a, b) => a.name.localeCompare(b.name));

export function getStack(id: string): LoadedStack | undefined {
  return stacks.find(s => s.id === id);
}

export function findDocument(stack: LoadedStack, docId: string): { binder: LoadedBinder; document: LoadedDocument } | undefined {
  for (const binder of stack.binders) {
    const document = binder.documents.find(d => d.id === docId);
    if (document) return { binder, document };
  }
  return undefined;
}

export function canvasSize(format: StackFormat): { w: number; h: number } {
  return format === 'slide-16x9' ? { w: 1280, h: 720 } : { w: 794, h: 1123 };
}

let activeThemeEl: HTMLStyleElement | null = null;

export function applyStackTheme(stack: LoadedStack | undefined): void {
  if (typeof document === 'undefined') return;
  if (!activeThemeEl) {
    activeThemeEl = document.createElement('style');
    activeThemeEl.setAttribute('data-stack-theme', '');
    document.head.appendChild(activeThemeEl);
  }
  activeThemeEl.textContent = stack?.themeCss ?? '';
}

let activePrintPageSizeEl: HTMLStyleElement | null = null;

export function applyPrintPageSize(format: StackFormat | undefined): void {
  if (typeof document === 'undefined') return;
  if (!activePrintPageSizeEl) {
    activePrintPageSizeEl = document.createElement('style');
    activePrintPageSizeEl.setAttribute('data-print-page-size', '');
    document.head.appendChild(activePrintPageSizeEl);
  }
  if (!format) {
    activePrintPageSizeEl.textContent = '';
    return;
  }
  const rule = format === 'slide-16x9'
    ? '@page { size: 1280px 720px landscape; margin: 0; }'
    : '@page { size: A4 portrait; margin: 0; }';
  activePrintPageSizeEl.textContent = rule;
}
