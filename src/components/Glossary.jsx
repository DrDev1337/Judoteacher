import { useMemo, useState } from 'react';
import { GLOSSARY } from '../data/glossary.js';
import { C, R, card } from '../theme.js';
import { Label } from './ui.jsx';

export default function Glossary() {
  const [q, setQ] = useState('');

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return GLOSSARY;
    return GLOSSARY.map((g) => ({
      ...g,
      terms: g.terms.filter(
        ([term, def]) =>
          term.toLowerCase().includes(needle) || def.toLowerCase().includes(needle)
      ),
    })).filter((g) => g.terms.length > 0);
  }, [q]);

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Sök term eller betydelse"
        aria-label="Sök i ordlistan"
        style={{
          fontFamily: 'inherit',
          fontSize: 16,
          padding: '13px 14px',
          borderRadius: R.md,
          border: `1px solid ${C.line}`,
          background: C.panel,
          color: C.text,
          outline: 'none',
          width: '100%',
        }}
      />

      {groups.length === 0 && (
        <div style={{ ...card, textAlign: 'center', color: C.dim, fontSize: 15 }}>
          Inga träffar på "{q}".
        </div>
      )}

      {groups.map((g) => (
        <div key={g.group} style={card}>
          <Label style={{ marginBottom: 12 }}>{g.group}</Label>
          <div style={{ display: 'grid', gap: 11 }}>
            {g.terms.map(([term, def]) => (
              <div key={term} style={{ display: 'grid', gap: 2 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.yellow }}>{term}</div>
                <div style={{ fontSize: 14, color: C.dim, lineHeight: 1.55 }}>{def}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
