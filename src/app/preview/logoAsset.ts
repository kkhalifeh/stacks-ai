import type { LogoTreatment } from '../brand-api';

export interface LogoSet {
  primary?: string;
  light?: string;
  mono?: string;
}

export interface ResolvedLogo {
  src?: string;
  filter?: string;
}

/**
 * Pick the logo asset and CSS filter that realize a given treatment on the
 * available set of uploaded variants. When a semantic variant (light, mono) is
 * uploaded we prefer it; otherwise we fall back to a filter that mimics the
 * effect on the primary asset.
 *
 *   brightness(0) invert(1) → force white regardless of source colors
 *   brightness(0)           → force black regardless of source colors
 */
export function resolveLogo(treatment: LogoTreatment, logos: LogoSet): ResolvedLogo {
  const { primary, light, mono } = logos;
  switch (treatment) {
    case 'primary':
      return { src: primary };
    case 'light':
      if (light) return { src: light };
      if (mono) return { src: mono, filter: 'brightness(0) invert(1)' };
      return { src: primary, filter: primary ? 'brightness(0) invert(1)' : undefined };
    case 'mono-light':
      if (mono) return { src: mono, filter: 'brightness(0) invert(1)' };
      if (light) return { src: light, filter: 'brightness(0) invert(1)' };
      return { src: primary, filter: primary ? 'brightness(0) invert(1)' : undefined };
    case 'mono-dark':
      if (mono) return { src: mono, filter: 'brightness(0)' };
      return { src: primary, filter: primary ? 'brightness(0)' : undefined };
    case 'auto-invert':
      return { src: primary, filter: primary ? 'brightness(0) invert(1)' : undefined };
  }
}
