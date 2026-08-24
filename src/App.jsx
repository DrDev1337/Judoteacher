import { useCallback, useEffect, useState } from 'react';
import { TECHNIQUES } from './data/techniques.js';
import { loadState, saveState } from './storage.js';
import { C, R } from './theme.js';
import StudyMode from './components/StudyMode.jsx';
import TechniqueList from './components/TechniqueList.jsx';
import Flashcards from './components/Flashcards.jsx';
import Quiz from './components/Quiz.jsx';
import Glossary from './components/Glossary.jsx';

const TABS = [
  { key: 'studera', label: 'Studera' },
  { key: 'tekniker', label: 'Tekniker' },
  { key: 'flashcards', label: 'Flashcards' },
  { key: 'quiz', label: 'Quiz' },
  { key: 'ordlista', label: 'Ordlista' },
];

export default function App() {
  const [tab, setTab] = useState('studera');
  const [state, setState] = useState(loadState);

  // Skriv igenom till localStorage vid varje ändring.
  useEffect(() => {
    saveState(state);
  }, [state]);

  const toggleMastered = useCallback((id) => {
    setState((s) => ({
      ...s,
      mastered: s.mastered.includes(id)
        ? s.mastered.filter((x) => x !== id)
        : [...s.mastered, id],
    }));
  }, []);

  const setStudy = useCallback((study) => {
    setState((s) => ({ ...s, study }));
  }, []);

  const setBest = useCallback((best) => {
    setState((s) => ({ ...s, best }));
  }, []);

  const doneCount = state.mastered.filter((id) =>
    TECHNIQUES.some((t) => t.id === id)
  ).length;
  const pct = Math.round((doneCount / TECHNIQUES.length) * 100);

  return (
    <div
      style={{
        maxWidth: 560,
        margin: '0 auto',
        padding: '0 16px calc(28px + env(safe-area-inset-bottom))',
        minHeight: '100vh',
      }}
    >
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: C.bg,
          paddingTop: 'calc(18px + env(safe-area-inset-top))',
          paddingBottom: 10,
          margin: '0 -16px',
          paddingLeft: 16,
          paddingRight: 16,
          borderBottom: `1px solid ${C.lineSoft}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            aria-hidden="true"
            style={{
              width: 10,
              height: 26,
              borderRadius: 3,
              background: C.yellow,
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ margin: 0, fontSize: 19, fontWeight: 800, letterSpacing: '-0.01em' }}>
              JudoStudy
            </h1>
            <div style={{ fontSize: 12, color: C.faint, marginTop: 1 }}>
              Gul-vitt och gult bälte, 6 och 5 kyu
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.yellow }}>
              {doneCount}/{TECHNIQUES.length}
            </div>
            <div style={{ fontSize: 11, color: C.faint }}>klara</div>
          </div>
        </div>

        <div
          style={{
            height: 4,
            borderRadius: R.pill,
            background: C.line,
            overflow: 'hidden',
            margin: '12px 0 12px',
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: '100%',
              background: C.yellow,
              transition: 'width 0.3s',
            }}
          />
        </div>

        <nav
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${TABS.length}, 1fr)`,
            gap: 4,
          }}
        >
          {TABS.map((t) => {
            const active = t.key === tab;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                aria-current={active ? 'page' : undefined}
                style={{
                  fontFamily: 'inherit',
                  fontSize: 12.5,
                  fontWeight: 700,
                  padding: '9px 4px',
                  borderRadius: R.pill,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  border: `1px solid ${active ? C.yellow : 'transparent'}`,
                  background: active ? C.yellow : 'transparent',
                  color: active ? '#1a1400' : C.dim,
                }}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main style={{ paddingTop: 16 }}>
        {tab === 'studera' && (
          <StudyMode
            study={state.study}
            setStudy={setStudy}
            mastered={state.mastered}
            toggleMastered={toggleMastered}
          />
        )}
        {tab === 'tekniker' && (
          <TechniqueList mastered={state.mastered} toggleMastered={toggleMastered} />
        )}
        {tab === 'flashcards' && (
          <Flashcards mastered={state.mastered} toggleMastered={toggleMastered} />
        )}
        {tab === 'quiz' && <Quiz best={state.best} setBest={setBest} />}
        {tab === 'ordlista' && <Glossary />}
      </main>

      <footer
        style={{
          marginTop: 28,
          paddingTop: 16,
          borderTop: `1px solid ${C.lineSoft}`,
          fontSize: 12,
          color: C.faint,
          lineHeight: 1.7,
        }}
      >
        Innehållet följer Svenska Judoförbundets graderingsfordringar för 6 kyu och
        5 kyu. Illustrationer och officiella steg finns hos{' '}
        <a
          href="https://www.judoguide.se/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: C.dim }}
        >
          judoguide.se
        </a>
        . Dina framsteg sparas bara i den här webbläsaren.
      </footer>
    </div>
  );
}
