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

export interface ThemeMeta {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export interface BrandSummary {
  id: string;
  name: string;
  subtitle?: string;
  logo: string | null;
  activeThemeId: string | null;
  themeCount: number;
}

export interface TenantBrand {
  name: string;
  subtitle: string;
  logo: string | null;
  activeThemeId: string | null;
  themes: ThemeMeta[];
}

export interface BrandReference {
  name: string;
  size: number;
  kind: 'image' | 'document';
  mediaType: string;
}

export interface ThemeVariant {
  direction: string;
  proposal: ThemeProposal;
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Server returned ${res.status}`);
  }
  return res.json();
}

// ─── Collection-level (brands) ──────────────────────────────────

export async function listBrands(): Promise<{ brands: BrandSummary[] }> {
  const res = await fetch('/__api/brands');
  return handle(res);
}

export async function createBrand(input: { id: string; name: string }): Promise<{ id: string; name: string }> {
  const res = await fetch('/__api/brands', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return handle(res);
}

export async function deleteBrand(id: string): Promise<{ id: string; deleted: true }> {
  const res = await fetch(`/__api/brands/${encodeURIComponent(id)}`, { method: 'DELETE' });
  return handle(res);
}

// ─── Per-brand: metadata ────────────────────────────────────────

export async function getBrand(id: string): Promise<TenantBrand> {
  const res = await fetch(`/__api/brands/${encodeURIComponent(id)}`);
  return handle(res);
}

export async function updateBrand(id: string, patch: { name?: string; subtitle?: string }): Promise<TenantBrand> {
  const res = await fetch(`/__api/brands/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  return handle(res);
}

export async function uploadBrandLogo(id: string, file: File): Promise<{ name: string; size: number }> {
  const res = await fetch(`/__api/brands/${encodeURIComponent(id)}/logo`, {
    method: 'POST',
    headers: { 'Content-Type': file.type || 'image/png' },
    body: file,
  });
  return handle(res);
}

export function brandLogoUrl(id: string, cacheBust?: number): string {
  const q = cacheBust ? `?t=${cacheBust}` : '';
  return `/__api/brands/${encodeURIComponent(id)}/logo${q}`;
}

// ─── Per-brand: generation + themes ─────────────────────────────

export async function generateBrandTheme(
  brandId: string,
  input: { name: string; keywords?: string; feedback?: string; count?: number },
): Promise<{ variants: ThemeVariant[]; proposal: ThemeProposal; model: string; referencesUsed?: string[] }> {
  const res = await fetch(`/__api/brands/${encodeURIComponent(brandId)}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count: 3, ...input }),
  });
  return handle(res);
}

export async function saveBrandTheme(
  brandId: string,
  input: { name: string; proposal: ThemeProposal; setDefault?: boolean },
): Promise<{ id: string; name: string }> {
  const res = await fetch(`/__api/brands/${encodeURIComponent(brandId)}/themes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return handle(res);
}

export async function setDefaultBrandTheme(brandId: string, themeId: string): Promise<{ activeThemeId: string }> {
  const res = await fetch(`/__api/brands/${encodeURIComponent(brandId)}/themes/${encodeURIComponent(themeId)}/default`, {
    method: 'POST',
  });
  return handle(res);
}

export async function deleteBrandTheme(brandId: string, themeId: string): Promise<{ deleted: string }> {
  const res = await fetch(`/__api/brands/${encodeURIComponent(brandId)}/themes/${encodeURIComponent(themeId)}`, {
    method: 'DELETE',
  });
  return handle(res);
}

export async function updateBrandThemeFonts(
  brandId: string,
  themeId: string,
  fonts: { heading_font?: string; body_font?: string },
): Promise<{ id: string; heading_font: string; body_font: string }> {
  const res = await fetch(`/__api/brands/${encodeURIComponent(brandId)}/themes/${encodeURIComponent(themeId)}/fonts`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fonts),
  });
  return handle(res);
}

// ─── Per-brand: references ──────────────────────────────────────

export async function listBrandReferences(brandId: string): Promise<{ references: BrandReference[] }> {
  const res = await fetch(`/__api/brands/${encodeURIComponent(brandId)}/references`);
  return handle(res);
}

export async function uploadBrandReference(brandId: string, file: File): Promise<{ name: string; size: number }> {
  const contentType = file.type || guessContentType(file.name);
  const res = await fetch(`/__api/brands/${encodeURIComponent(brandId)}/references/${encodeURIComponent(file.name)}`, {
    method: 'POST',
    headers: { 'Content-Type': contentType },
    body: file,
  });
  return handle(res);
}

export async function deleteBrandReference(brandId: string, name: string): Promise<{ deleted: string }> {
  const res = await fetch(`/__api/brands/${encodeURIComponent(brandId)}/references/${encodeURIComponent(name)}`, { method: 'DELETE' });
  return handle(res);
}

function guessContentType(name: string): string {
  const ext = name.toLowerCase().split('.').pop();
  if (ext === 'png') return 'image/png';
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'gif') return 'image/gif';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'pdf') return 'application/pdf';
  return 'application/octet-stream';
}

// ─── CSS helpers ────────────────────────────────────────────────

export function proposalToCssVars(p: ThemeProposal): string {
  const a = p.palette.accents;
  return `
    --color-primary: ${p.palette.primary};
    --color-primary-light: ${p.palette.primary_light};
    --color-dark: ${p.palette.dark};
    --color-dark-surface: ${p.palette.dark_surface};
    --color-light-bg: ${p.palette.light_bg};
    --color-text: ${p.palette.text};
    --color-text-muted: ${p.palette.text_muted};
    --color-border: ${p.palette.border};
    --color-accent-1: ${a[0]};
    --color-accent-2: ${a[1]};
    --color-accent-3: ${a[2]};
    --color-accent-4: ${a[3]};
    --color-kinz-red: ${a[0]};
    --color-kinz-orange: ${a[1]};
    --color-kinz-yellow: ${a[2]};
    --color-kinz-green: ${a[3]};
    --color-kinz-blue: ${p.palette.primary};
    --color-kinz-navy: ${p.palette.dark};
    --font-heading: ${p.typography.heading_font};
    --font-body: ${p.typography.body_font};
    --radius-sm: ${p.radii.sm}px;
    --radius-md: ${p.radii.md}px;
    --radius-lg: ${p.radii.lg}px;
    --shadow-resting: ${p.shadows.resting};
    --shadow-elevated: ${p.shadows.elevated};
    --cover-style: ${p.structural?.cover_style ?? 'solid-dark'};
    --accent-stripe: ${p.structural?.accent_stripe ?? 'rainbow-6'};
    --shape-language: ${p.structural?.shape_language ?? 'rounded'};
    --content-grid: ${p.structural?.content_grid ?? 'three-column-cards'};
    --title-emphasis: ${p.structural?.title_emphasis ?? 'large-heading'};
  `.trim();
}

export function extractRootVars(css: string): string {
  const match = css.match(/:root\s*\{([\s\S]*?)\}/);
  return match ? match[1].trim() : '';
}

export function extractThemeFonts(css: string | undefined): { heading?: string; body?: string } {
  if (!css) return {};
  const h = css.match(/--font-heading:\s*([^;]+);/);
  const b = css.match(/--font-body:\s*([^;]+);/);
  return { heading: h?.[1]?.trim(), body: b?.[1]?.trim() };
}

const SYSTEM_FONT_TOKENS = new Set([
  'inter', 'system-ui', '-apple-system', 'blinkmacsystemfont', 'segoe ui',
  'roboto', 'helvetica', 'helvetica neue', 'arial', 'sans-serif', 'serif',
  'monospace', 'ui-sans-serif', 'ui-serif', 'ui-monospace', 'georgia',
  'times new roman', 'courier new',
]);

function primaryFamily(value: string): string {
  const first = value.split(',')[0].trim();
  return first.replace(/^["']|["']$/g, '');
}

export function googleFontsForProposal(p: ThemeProposal): string[] {
  const out: string[] = [];
  for (const value of [p.typography.heading_font, p.typography.body_font]) {
    if (!value) continue;
    const name = primaryFamily(value);
    if (!name || SYSTEM_FONT_TOKENS.has(name.toLowerCase())) continue;
    out.push(name);
  }
  return Array.from(new Set(out));
}

export function ensureGoogleFonts(families: string[]): void {
  if (typeof document === 'undefined' || families.length === 0) return;
  const params = families
    .map(f => `family=${encodeURIComponent(f).replace(/%20/g, '+')}:wght@400;500;600;700`)
    .join('&');
  const href = `https://fonts.googleapis.com/css2?${params}&display=swap`;
  const key = 'data-brand-font-key';
  const existing = document.querySelector<HTMLLinkElement>(`link[${key}="${href}"]`);
  if (existing) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.setAttribute(key, href);
  document.head.appendChild(link);
}

// ─── Legacy aliases (for code still in flight) ───────────────────
// These retain the old function names used by BrandStudio today. They
// default to the first brand. Will be removed once BrandStudio is brand-aware.
const LEGACY_BRAND_ID = 'kinz';

export const getTenant = (id?: string) => getBrand(id ?? LEGACY_BRAND_ID);
export const updateTenant = (patch: { name?: string; subtitle?: string }) => updateBrand(LEGACY_BRAND_ID, patch);
export const uploadTenantLogo = (file: File) => uploadBrandLogo(LEGACY_BRAND_ID, file);
export const generateTenantTheme = (input: Parameters<typeof generateBrandTheme>[1]) => generateBrandTheme(LEGACY_BRAND_ID, input);
export const saveTheme = (input: Parameters<typeof saveBrandTheme>[1]) => saveBrandTheme(LEGACY_BRAND_ID, input);
export const setDefaultTheme = (id: string) => setDefaultBrandTheme(LEGACY_BRAND_ID, id);
export const deleteTheme = (id: string) => deleteBrandTheme(LEGACY_BRAND_ID, id);
export const updateThemeFonts = (id: string, fonts: Parameters<typeof updateBrandThemeFonts>[2]) => updateBrandThemeFonts(LEGACY_BRAND_ID, id, fonts);
export const tenantLogoUrl = (cb?: number) => brandLogoUrl(LEGACY_BRAND_ID, cb);
export const listReferences = () => listBrandReferences(LEGACY_BRAND_ID);
export const uploadReference = (file: File) => uploadBrandReference(LEGACY_BRAND_ID, file);
export const deleteReference = (name: string) => deleteBrandReference(LEGACY_BRAND_ID, name);
