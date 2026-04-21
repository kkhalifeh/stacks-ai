/**
 * Curated Google Font catalog for the Brand Studio font overrides.
 * Each entry is a Google Font family (auto-imported on save) unless marked system.
 * Ordered by role, not alphabetically — browse-friendly.
 */

export interface FontOption {
  family: string;
  label: string;
  category: 'Sans' | 'Serif' | 'Display' | 'Mono' | 'System';
  /** When true, don't attempt to load from Google Fonts (it's a system stack). */
  system?: boolean;
}

export const FONT_CATALOG: FontOption[] = [
  // System
  { family: 'Inter', label: 'Inter', category: 'Sans', system: true },
  { family: 'system-ui', label: 'System default', category: 'System', system: true },

  // Humanist / geometric sans
  { family: 'DM Sans', label: 'DM Sans', category: 'Sans' },
  { family: 'Manrope', label: 'Manrope', category: 'Sans' },
  { family: 'Figtree', label: 'Figtree', category: 'Sans' },
  { family: 'Nunito Sans', label: 'Nunito Sans', category: 'Sans' },
  { family: 'Work Sans', label: 'Work Sans', category: 'Sans' },
  { family: 'Space Grotesk', label: 'Space Grotesk', category: 'Sans' },
  { family: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans', category: 'Sans' },

  // Serif
  { family: 'Fraunces', label: 'Fraunces', category: 'Serif' },
  { family: 'Playfair Display', label: 'Playfair Display', category: 'Serif' },
  { family: 'Instrument Serif', label: 'Instrument Serif', category: 'Serif' },
  { family: 'DM Serif Display', label: 'DM Serif Display', category: 'Serif' },
  { family: 'Lora', label: 'Lora', category: 'Serif' },
  { family: 'Cormorant Garamond', label: 'Cormorant Garamond', category: 'Serif' },
  { family: 'Libre Baskerville', label: 'Libre Baskerville', category: 'Serif' },

  // Display / statement
  { family: 'Bricolage Grotesque', label: 'Bricolage Grotesque', category: 'Display' },
  { family: 'Archivo Black', label: 'Archivo Black', category: 'Display' },
  { family: 'Anton', label: 'Anton', category: 'Display' },
  { family: 'Big Shoulders Display', label: 'Big Shoulders Display', category: 'Display' },

  // Mono
  { family: 'JetBrains Mono', label: 'JetBrains Mono', category: 'Mono' },
  { family: 'IBM Plex Mono', label: 'IBM Plex Mono', category: 'Mono' },
];

export function findFontOption(family: string | undefined): FontOption | undefined {
  if (!family) return undefined;
  const bare = family.split(',')[0].trim().replace(/^["']|["']$/g, '');
  return FONT_CATALOG.find(f => f.family.toLowerCase() === bare.toLowerCase());
}
