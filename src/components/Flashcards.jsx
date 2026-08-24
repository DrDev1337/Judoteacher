import { useEffect, useMemo, useState } from 'react';
import { TECHNIQUES } from '../data/techniques.js';
import { C, R, btn, btnPrimary } from '../theme.js';
import { Label, Pill } from './ui.jsx';

// Respekterar prefers-reduced-motion: i stället för att rotera kortet i 3D
// byts sidan direkt utan animation.
function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function shuffle(arr, seed) {
  const a = arr.slice();
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) % 2147483648;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const faceBase = {
  position: 'absolute',
  inset: 0,
  borderRadius: R.md,
  border: `1px solid ${C.line}`,
  background: C.panel,
  padding: 22,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  gap: 10,
  overflow: 'hidden',
};

export default function Flashcards({ mastered, toggleMastered }) {
  const reduced = useReducedMotion();
  const [seed, setSeed] = useState(0);
  const [n, setN] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const deck = useMemo(
    () => (seed === 0 ? TECHNIQUES : shuffle(TECHNIQUES, seed)),
    [seed]
  );

  const i = Math.min(n, deck.length - 1);
  const t = deck[i];
  const isMastered = mastered.includes(t.id);

  const step = (d) => {
    setFlipped(false);
    setN((v) => (v + d + deck.length) % deck.length);
  };

  const front = (
    <>
      <Label>Vad betyder namnet?</Label>
      <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
        {t.jp}
      </div>
      <div style={{ fontSize: 22, color: C.faint }}>{t.kanji}</div>
      <div style={{ fontSize: 13, color: C.faint, marginTop: 6 }}>Tryck för att vända</div>
    </>
  );

  const back = (
    <>
      <Label>Svar</Label>
      <div style={{ fontSize: 24, fontWeight: 800, color: C.yellow, lineHeight: 1.25 }}>{t.sv}</div>
      <Pill>{t.group}</Pill>
      <div style={{ fontSize: 14, color: C.dim, lineHeight: 1.55, marginTop: 4 }}>{t.how}</div>
    </>
  );

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Label>
          Kort {i + 1} av {deck.length}
        </Label>
        <Pill tone={t.grade === '6' ? 'neutral' : 'yellow'}>{t.gradeLabel}</Pill>
      </div>

      <div
        className={reduced ? undefined : 'jf-scene'}
        style={{ position: 'relative', minHeight: 300 }}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label={flipped ? 'Visa framsidan' : 'Visa svaret'}
          onClick={() => setFlipped((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setFlipped((v) => !v);
            }
          }}
          className={reduced ? undefined : `jf-card${flipped ? ' jf-flipped' : ''}`}
          style={{
            position: 'absolute',
            inset: 0,
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {reduced ? (
            <div style={faceBase}>{flipped ? back : front}</div>
          ) : (
            <>
              <div className="jf-face" style={faceBase}>
                {front}
              </div>
              <div className="jf-face jf-back" style={{ ...faceBase, background: C.panelAlt }}>
                {back}
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button type="button" onClick={() => step(-1)} style={{ ...btn, flex: 1 }}>
          Förra
        </button>
        <button type="button" onClick={() => setFlipped((v) => !v)} style={{ ...btnPrimary, flex: 1 }}>
          Vänd
        </button>
        <button type="button" onClick={() => step(1)} style={{ ...btn, flex: 1 }}>
          Nästa
        </button>
      </div>

      <button
        type="button"
        onClick={() => toggleMastered(t.id)}
        style={{
          ...btn,
          background: isMastered ? C.greenSoft : C.panelAlt,
          borderColor: isMastered ? 'rgba(74,222,128,0.35)' : C.line,
          color: isMastered ? C.green : C.text,
        }}
      >
        {isMastered ? '✓ Markerad som klar' : 'Markera som klar'}
      </button>

      <button
        type="button"
        onClick={() => {
          setSeed((s) => (s === 0 ? 1 : s + 1));
          setN(0);
          setFlipped(false);
        }}
        style={{
          background: 'none',
          border: 'none',
          color: C.faint,
          fontSize: 13,
          padding: 6,
          cursor: 'pointer',
        }}
      >
        Blanda korten
      </button>
    </div>
  );
}
