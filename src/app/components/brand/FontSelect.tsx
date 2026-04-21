import { useMemo } from 'react';
import { FONT_CATALOG, findFontOption, type FontOption } from '../../fontCatalog';

interface FontSelectProps {
  label: string;
  value: string;
  onChange: (family: string) => void;
  disabled?: boolean;
}

export function FontSelect({ label, value, onChange, disabled }: FontSelectProps) {
  const current = findFontOption(value);
  const grouped = useMemo(() => {
    const map = new Map<FontOption['category'], FontOption[]>();
    for (const f of FONT_CATALOG) {
      const arr = map.get(f.category) ?? [];
      arr.push(f);
      map.set(f.category, arr);
    }
    return Array.from(map.entries());
  }, []);

  // If the current value isn't in the catalog, show it as a custom option so we don't lose it.
  const customValue = !current && value ? value : undefined;

  return (
    <label className="block">
      <span className="block text-[11px] font-medium mb-1.5" style={{ color: 'var(--lx-text-muted)' }}>
        {label}
      </span>
      <select
        value={current?.family ?? customValue ?? ''}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
        className="lx-focus w-full text-[13px] px-3 py-2 transition-colors"
        style={{
          background: 'var(--lx-surface)',
          border: '1px solid var(--lx-border)',
          borderRadius: 'var(--lx-radius-md)',
          color: 'var(--lx-text)',
          outline: 'none',
          opacity: disabled ? 0.55 : 1,
        }}
      >
        {customValue && (
          <option value={customValue}>{customValue} (custom)</option>
        )}
        {grouped.map(([category, fonts]) => (
          <optgroup key={category} label={category}>
            {fonts.map(f => (
              <option key={f.family} value={f.family}>
                {f.label}
                {f.system ? ' — system' : ''}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
}
