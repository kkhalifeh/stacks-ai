import { useLayoutEffect, useState, type RefObject } from 'react';
import type {
  AccentStripe,
  ContentGrid,
  CoverStyle,
  LogoTreatment,
  ShapeLanguage,
  TitleEmphasis,
} from './brand-api';

export interface StructuralTokens {
  coverStyle: CoverStyle;
  accentStripe: AccentStripe;
  shapeLanguage: ShapeLanguage;
  contentGrid: ContentGrid;
  titleEmphasis: TitleEmphasis;
  logoCoverTreatment: LogoTreatment;
  logoContentTreatment: LogoTreatment;
}

const DEFAULTS: StructuralTokens = {
  coverStyle: 'solid-dark',
  accentStripe: 'rainbow-6',
  shapeLanguage: 'rounded',
  contentGrid: 'three-column-cards',
  titleEmphasis: 'large-heading',
  logoCoverTreatment: 'primary',
  logoContentTreatment: 'primary',
};

function readVar(cs: CSSStyleDeclaration, name: string, fallback: string): string {
  const raw = cs.getPropertyValue(name).trim().replace(/^["']|["']$/g, '');
  return raw || fallback;
}

/**
 * Read structural design tokens from the nearest scope that has them set.
 * Reads from the passed element (so scoped previews via .brand-preview-tenant work).
 * Returns defaults until after first layout effect (avoids flash).
 */
export function useStructural(ref: RefObject<HTMLElement | null>): StructuralTokens {
  const [tokens, setTokens] = useState<StructuralTokens>(DEFAULTS);
  // Empty deps — read once after mount. To re-read when the surrounding theme
  // changes (e.g. switching variants in Brand Studio), the parent should remount
  // the template via a `key` prop, which fires this effect again on the new instance.
  useLayoutEffect(() => {
    if (!ref.current) return;
    const cs = getComputedStyle(ref.current);
    const next: StructuralTokens = {
      coverStyle: readVar(cs, '--cover-style', DEFAULTS.coverStyle) as CoverStyle,
      accentStripe: readVar(cs, '--accent-stripe', DEFAULTS.accentStripe) as AccentStripe,
      shapeLanguage: readVar(cs, '--shape-language', DEFAULTS.shapeLanguage) as ShapeLanguage,
      contentGrid: readVar(cs, '--content-grid', DEFAULTS.contentGrid) as ContentGrid,
      titleEmphasis: readVar(cs, '--title-emphasis', DEFAULTS.titleEmphasis) as TitleEmphasis,
      logoCoverTreatment: readVar(cs, '--logo-cover-treatment', DEFAULTS.logoCoverTreatment) as LogoTreatment,
      logoContentTreatment: readVar(cs, '--logo-content-treatment', DEFAULTS.logoContentTreatment) as LogoTreatment,
    };
    setTokens(prev =>
      prev.coverStyle === next.coverStyle &&
      prev.accentStripe === next.accentStripe &&
      prev.shapeLanguage === next.shapeLanguage &&
      prev.contentGrid === next.contentGrid &&
      prev.titleEmphasis === next.titleEmphasis &&
      prev.logoCoverTreatment === next.logoCoverTreatment &&
      prev.logoContentTreatment === next.logoContentTreatment
        ? prev
        : next,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return tokens;
}
