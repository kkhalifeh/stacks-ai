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

export interface ThemeMeta {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export interface TenantBrand {
  name: string;
  subtitle: string;
  logo: string | null;
  activeThemeId: string | null;
  themes: ThemeMeta[];
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Server returned ${res.status}`);
  }
  return res.json();
}

export async function getTenant(): Promise<TenantBrand> {
  const res = await fetch('/__api/brand');
  return handle(res);
}

export async function updateTenant(patch: { name?: string; subtitle?: string }): Promise<TenantBrand> {
  const res = await fetch('/__api/brand', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  return handle(res);
}

export async function uploadTenantLogo(file: File): Promise<{ name: string; size: number }> {
  const res = await fetch('/__api/brand/logo', {
    method: 'POST',
    headers: { 'Content-Type': file.type || 'image/png' },
    body: file,
  });
  return handle(res);
}

export async function generateTenantTheme(input: {
  name: string;
  keywords?: string;
  feedback?: string;
}): Promise<{ proposal: ThemeProposal; model: string }> {
  const res = await fetch('/__api/brand/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return handle(res);
}

export async function saveTheme(input: {
  name: string;
  proposal: ThemeProposal;
  setDefault?: boolean;
}): Promise<{ id: string; name: string }> {
  const res = await fetch('/__api/brand/themes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return handle(res);
}

export async function setDefaultTheme(id: string): Promise<{ activeThemeId: string }> {
  const res = await fetch(`/__api/brand/themes/${encodeURIComponent(id)}/default`, {
    method: 'POST',
  });
  return handle(res);
}

export async function deleteTheme(id: string): Promise<{ deleted: string }> {
  const res = await fetch(`/__api/brand/themes/${encodeURIComponent(id)}`, { method: 'DELETE' });
  return handle(res);
}

export function tenantLogoUrl(cacheBust?: number): string {
  const q = cacheBust ? `?t=${cacheBust}` : '';
  return `/__api/brand/logo${q}`;
}

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
  `.trim();
}

/** Extract the :root CSS variables from a theme file (string) so we can scope them for preview. */
export function extractRootVars(css: string): string {
  const match = css.match(/:root\s*\{([\s\S]*?)\}/);
  return match ? match[1].trim() : '';
}
