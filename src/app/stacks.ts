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
// Tenant-level brand lives at /brand/. Multiple themes coexist under
// /brand/themes/<id>/. The tenant.json's activeThemeId points at the default.

interface TenantManifest {
  name: string;
  subtitle?: string;
  logo?: string;
  activeThemeId?: string;
  theme?: string; // legacy: pre-multi-theme single pointer
}

interface ThemeMetaRaw {
  id?: string;
  name?: string;
  description?: string;
  createdAt?: string;
}

const tenantManifestRaw = import.meta.glob<TenantManifest>('/brand/tenant.json', { eager: true, import: 'default' });
const tenantAssets = import.meta.glob<string>('/brand/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' });
const tenantThemeCssFiles = import.meta.glob<string>('/brand/themes/*/theme.css', { eager: true, query: '?raw', import: 'default' });
const tenantThemeMetas = import.meta.glob<ThemeMetaRaw>('/brand/themes/*/meta.json', { eager: true, import: 'default' });
const legacyTenantTheme = import.meta.glob<string>('/brand/theme.css', { eager: true, query: '?raw', import: 'default' });

export interface TenantThemeInfo {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  themeCss: string;
}

export interface LoadedTenant {
  name: string;
  subtitle?: string;
  logoUrl?: string;
  activeThemeId?: string;
  themes: TenantThemeInfo[];
  /** Effective CSS for the active theme (or legacy theme.css as a fallback). */
  themeCss?: string;
}

function themeIdFromPath(p: string): string | undefined {
  const m = p.match(/^\/brand\/themes\/([^/]+)\//);
  return m?.[1];
}

function loadTenantThemes(): TenantThemeInfo[] {
  const byId = new Map<string, TenantThemeInfo>();
  for (const [p, css] of Object.entries(tenantThemeCssFiles)) {
    const id = themeIdFromPath(p);
    if (!id) continue;
    byId.set(id, { id, name: id, themeCss: css });
  }
  for (const [p, meta] of Object.entries(tenantThemeMetas)) {
    const id = themeIdFromPath(p);
    if (!id) continue;
    const existing = byId.get(id);
    if (!existing) continue;
    if (meta.name) existing.name = meta.name;
    if (meta.description) existing.description = meta.description;
    if (meta.createdAt) existing.createdAt = meta.createdAt;
  }
  return Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function loadTenant(): LoadedTenant | undefined {
  const raw = tenantManifestRaw['/brand/tenant.json'];
  if (!raw) return undefined;
  const themes = loadTenantThemes();
  const active = raw.activeThemeId
    ? themes.find(t => t.id === raw.activeThemeId)
    : themes[0];
  const legacyCss = legacyTenantTheme['/brand/theme.css'];
  return {
    name: raw.name,
    subtitle: raw.subtitle,
    logoUrl: raw.logo ? tenantAssets[`/brand/${raw.logo}`] : undefined,
    activeThemeId: active?.id,
    themes,
    themeCss: active?.themeCss ?? legacyCss,
  };
}

export const tenant: LoadedTenant | undefined = loadTenant();

// ─── TENANT TEMPLATES ──────────────────────────────────────────
// Branded starter templates at /brand/templates/<format>/pages/**/*.tsx.
// Used both as the default starter when creating a new stack AND as the
// live preview in Brand Studio.

const tenantTemplateModules = import.meta.glob<Record<string, FC>>(
  '/brand/templates/*/pages/**/*.tsx',
  { eager: true },
);

export interface TenantTemplateBundle {
  format: StackFormat;
  components: Record<string, FC>;
}

function tenantFormatFromPath(p: string): StackFormat | undefined {
  const m = p.match(/^\/brand\/templates\/([^/]+)\//);
  if (!m) return undefined;
  const f = m[1];
  if (f === 'a4' || f === 'slide-16x9') return f;
  return undefined;
}

function loadTenantTemplates(): Partial<Record<StackFormat, TenantTemplateBundle>> {
  const bundles: Partial<Record<StackFormat, TenantTemplateBundle>> = {};
  for (const [modPath, mod] of Object.entries(tenantTemplateModules)) {
    const format = tenantFormatFromPath(modPath);
    if (!format) continue;
    const entry = bundles[format] ?? { format, components: {} };
    for (const [name, comp] of Object.entries(mod)) {
      if (typeof comp === 'function') entry.components[name] = comp;
    }
    bundles[format] = entry;
  }
  return bundles;
}

export const tenantTemplates: Partial<Record<StackFormat, TenantTemplateBundle>> = loadTenantTemplates();

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

export function applyRawTheme(css: string | undefined): void {
  if (typeof document === 'undefined') return;
  if (!activeThemeEl) {
    activeThemeEl = document.createElement('style');
    activeThemeEl.setAttribute('data-stack-theme', '');
    document.head.appendChild(activeThemeEl);
  }
  activeThemeEl.textContent = css ?? '';
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
