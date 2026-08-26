import { useState } from 'react';
import { TECHNIQUES } from '../data/techniques.js';
import { C, R, card } from '../theme.js';
import { Chip, Pill, Label, Bullets, Steps, LinkRow } from './ui.jsx';
import VideoEmbed from './VideoEmbed.jsx';
import Illustration from './Illustration.jsx';

const FILTERS = [
  { key: 'alla', label: 'Alla', test: () => true },
  { key: '6', label: 'Gul-vitt, 6 kyu', test: (t) => t.grade === '6' },
  { key: '5', label: 'Gult, 5 kyu', test: (t) => t.grade === '5' },
  { key: 'nage', label: 'Kast', test: (t) => t.family === 'nage' },
  { key: 'ne', label: 'Mark', test: (t) => t.family === 'ne' },
];

export default function TechniqueList({ mastered, toggleMastered }) {
  const [filter, setFilter] = useState('alla');
  const [open, setOpen] = useState(null);

  const active = FILTERS.find((f) => f.key === filter) || FILTERS[0];
  const list = TECHNIQUES.filter(active.test);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div className="jf-scroll-x" style={{ display: 'flex', gap: 8, paddingBottom: 2 }}>
        {FILTERS.map((f) => (
          <Chip key={f.key} active={f.key === filter} onClick={() => setFilter(f.key)}>
            {f.label}
          </Chip>
        ))}
      </div>

      {list.map((t) => {
        const isOpen = open === t.id;
        const isMastered = mastered.includes(t.id);
        return (
          <div key={t.id} style={{ ...card, padding: 0, overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : t.id)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 16,
                background: 'transparent',
                border: 'none',
                color: C.text,
                textAlign: 'left',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(t.id);
                }}
                role="checkbox"
                aria-checked={isMastered}
                aria-label={`Markera ${t.jp} som klar`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleMastered(t.id);
                  }
                }}
                style={{
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  borderRadius: R.pill,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 13,
                  fontWeight: 800,
                  border: `1px solid ${isMastered ? 'rgba(74,222,128,0.45)' : C.line}`,
                  background: isMastered ? C.greenSoft : 'transparent',
                  color: isMastered ? C.green : 'transparent',
                }}
              >
                ✓
              </span>

              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 16, fontWeight: 700 }}>{t.jp}</span>
                <span style={{ display: 'block', fontSize: 13, color: C.dim, marginTop: 2 }}>
                  {t.sv}
                </span>
              </span>

              <Pill tone={t.grade === '6' ? 'neutral' : 'yellow'}>
                {t.grade === '6' ? '6 kyu' : '5 kyu'}
              </Pill>

              <span
                aria-hidden="true"
                style={{
                  color: C.faint,
                  fontSize: 12,
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                }}
              >
                ▼
              </span>
            </button>

            {isOpen && (
              <div
                style={{
                  padding: 16,
                  paddingTop: 4,
                  display: 'grid',
                  gap: 14,
                  borderTop: `1px solid ${C.lineSoft}`,
                  marginTop: 0,
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 12 }}>
                  <Pill>{t.group}</Pill>
                  <Pill>{t.familyLabel}</Pill>
                  <Pill>{t.kanji}</Pill>
                </div>

                <VideoEmbed technique={t} compact />
                <Illustration technique={t} />
                <LinkRow technique={t} />

                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65 }}>{t.how}</p>

                <div>
                  <Label style={{ marginBottom: 9 }}>Utförande</Label>
                  <Steps items={t.steps} />
                </div>

                <div>
                  <Label style={{ marginBottom: 9 }}>Detaljer</Label>
                  <Bullets items={t.tips} marker="→" color={C.yellow} />
                </div>

                <div>
                  <Label style={{ marginBottom: 9 }}>Vanliga misstag</Label>
                  <Bullets items={t.mistakes} marker="✕" color={C.red} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
