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
  brandId: string;
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
  brandId?: string;
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

// ─── BRANDS ──────────────────────────────────────────────
// Multi-brand tenancy. Each brand is a self-contained folder under `/brands/<id>/`
// with its own logo, themes, templates, references. One "tenant" = the app
// deployment; can hold multiple brands. Stacks reference a brand by id.

interface BrandManifest {
  id?: string;
  name: string;
  subtitle?: string;
  logo?: string;
  activeThemeId?: string;
}

interface ThemeMetaRaw {
  id?: string;
  name?: string;
  description?: string;
  createdAt?: string;
}

const brandManifests = import.meta.glob<BrandManifest>('/brands/*/brand.json', { eager: true, import: 'default' });
const brandAssets = import.meta.glob<string>('/brands/*/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' });
const brandThemeCssFiles = import.meta.glob<string>('/brands/*/themes/*/theme.css', { eager: true, query: '?raw', import: 'default' });
const brandThemeMetas = import.meta.glob<ThemeMetaRaw>('/brands/*/themes/*/meta.json', { eager: true, import: 'default' });
const brandTemplateModules = import.meta.glob<Record<string, FC>>('/brands/*/templates/*/pages/**/*.tsx', { eager: true });

export interface BrandThemeInfo {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  themeCss: string;
}

export interface BrandTemplateBundle {
  format: StackFormat;
  components: Record<string, FC>;
}

export interface LoadedBrand {
  id: string;
  name: string;
  subtitle?: string;
  logoUrl?: string;
  activeThemeId?: string;
  themes: BrandThemeInfo[];
  /** Effective CSS for the active theme of this brand. */
  themeCss?: string;
  /** Brand-specific tenant templates keyed by format. */
  templates: Partial<Record<StackFormat, BrandTemplateBundle>>;
}

function brandIdFromPath(p: string, kind: 'manifest' | 'asset' | 'theme' | 'template'): string | undefined {
  const m = p.match(/^\/brands\/([^/]+)\//);
  return m?.[1];
}

function themeIdFromPath(p: string): { brandId: string; themeId: string } | undefined {
  const m = p.match(/^\/brands\/([^/]+)\/themes\/([^/]+)\//);
  if (!m) return undefined;
  return { brandId: m[1], themeId: m[2] };
}

function templateFormatFromPath(p: string): { brandId: string; format: StackFormat } | undefined {
  const m = p.match(/^\/brands\/([^/]+)\/templates\/([^/]+)\//);
  if (!m) return undefined;
  const f = m[2];
  if (f === 'a4' || f === 'slide-16x9') return { brandId: m[1], format: f };
  return undefined;
}

function loadBrands(): LoadedBrand[] {
  const out: LoadedBrand[] = [];
  for (const [p, raw] of Object.entries(brandManifests)) {
    const id = brandIdFromPath(p, 'manifest');
    if (!id) continue;

    const themes: BrandThemeInfo[] = [];
    for (const [tp, css] of Object.entries(brandThemeCssFiles)) {
      const match = themeIdFromPath(tp);
      if (!match || match.brandId !== id) continue;
      themes.push({ id: match.themeId, name: match.themeId, themeCss: css });
    }
    for (const [tp, meta] of Object.entries(brandThemeMetas)) {
      const match = themeIdFromPath(tp);
      if (!match || match.brandId !== id) continue;
      const existing = themes.find(t => t.id === match.themeId);
      if (!existing) continue;
      if (meta.name) existing.name = meta.name;
      if (meta.description) existing.description = meta.description;
      if (meta.createdAt) existing.createdAt = meta.createdAt;
    }
    themes.sort((a, b) => a.name.localeCompare(b.name));

    const activeId = raw.activeThemeId ?? themes[0]?.id;
    const active = themes.find(t => t.id === activeId);

    const templates: Partial<Record<StackFormat, BrandTemplateBundle>> = {};
    for (const [tp, mod] of Object.entries(brandTemplateModules)) {
      const match = templateFormatFromPath(tp);
      if (!match || match.brandId !== id) continue;
      const entry = templates[match.format] ?? { format: match.format, components: {} };
      for (const [name, comp] of Object.entries(mod)) {
        if (typeof comp === 'function') entry.components[name] = comp;
      }
      templates[match.format] = entry;
    }

    out.push({
      id,
      name: raw.name,
      subtitle: raw.subtitle,
      logoUrl: raw.logo ? brandAssets[`/brands/${id}/${raw.logo}`] : undefined,
      activeThemeId: active?.id,
      themes,
      themeCss: active?.themeCss,
      templates,
    });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

export const brands: LoadedBrand[] = loadBrands();

export function getBrand(id: string | undefined): LoadedBrand | undefined {
  if (!id) return undefined;
  return brands.find(b => b.id === id);
}

// Legacy aliases — kept so existing components keep working while we migrate.
export const tenant: LoadedBrand | undefined = brands[0];
export type TenantThemeInfo = BrandThemeInfo;
export type TenantTemplateBundle = BrandTemplateBundle;
export const tenantTemplates: Partial<Record<StackFormat, BrandTemplateBundle>> = brands[0]?.templates ?? {};

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

function brandIdForStack(raw: RawManifest): string {
  // Explicit brandId wins. Otherwise, fall back to the first brand (typical in single-brand deployments).
  return raw.brandId ?? brands[0]?.id ?? 'default';
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

  // Resolve effective theme + logo: stack-level overrides win, brand is the fallback.
  const brandId = brandIdForStack(raw);
  const brand = getBrand(brandId);
  const stackTheme = themeForStack(manifest.id, manifest.theme);
  const stackLogo = logoUrlForStack(manifest.id, manifest.logo);

  return {
    id: manifest.id,
    name: manifest.name,
    subtitle: manifest.subtitle,
    format: manifest.format,
    brandId,
    logoUrl: stackLogo ?? brand?.logoUrl,
    themeCss: stackTheme ?? brand?.themeCss,
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
