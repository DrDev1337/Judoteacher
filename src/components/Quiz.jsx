import { useMemo, useState } from 'react';
import { TECHNIQUES } from '../data/techniques.js';
import { C, R, btn, btnPrimary, card } from '../theme.js';
import { Label, Pill } from './ui.jsx';

const QUESTION_COUNT = 10;

function rng(seed) {
  let s = seed || 1;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

function pickWrong(rand, pool, correct, n) {
  const others = pool.filter((t) => t.id !== correct.id);
  const out = [];
  while (out.length < n && others.length) {
    const idx = Math.floor(rand() * others.length);
    out.push(others.splice(idx, 1)[0]);
  }
  return out;
}

// Tre frågetyper: namn till svenska, svenska till namn, och beskrivning till namn.
function buildQuiz(seed) {
  const rand = rng(seed);
  const order = TECHNIQUES.slice();
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  return order.slice(0, QUESTION_COUNT).map((t, n) => {
    const kind = n % 3;
    const wrong = pickWrong(rand, TECHNIQUES, t, 3);
    let prompt;
    let answer;
    let options;

    if (kind === 0) {
      prompt = `Vad betyder ${t.jp}?`;
      answer = t.sv;
      options = [t.sv, ...wrong.map((w) => w.sv)];
    } else if (kind === 1) {
      prompt = `Vilken teknik heter "${t.sv}"?`;
      answer = t.jp;
      options = [t.jp, ...wrong.map((w) => w.jp)];
    } else {
      prompt = t.how;
      answer = t.jp;
      options = [t.jp, ...wrong.map((w) => w.jp)];
    }

    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return {
      id: t.id,
      label: kind === 2 ? 'Vilken teknik beskrivs?' : 'Fråga',
      prompt,
      answer,
      options,
    };
  });
}

export default function Quiz({ best, setBest }) {
  const [seed, setSeed] = useState(1);
  const [n, setN] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const questions = useMemo(() => buildQuiz(seed), [seed]);
  const q = questions[n];

  const answer = (opt) => {
    if (chosen !== null) return;
    setChosen(opt);
    if (opt === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    const finalScore = score;
    if (n + 1 >= questions.length) {
      setDone(true);
      if (finalScore > best) setBest(finalScore);
    } else {
      setN(n + 1);
      setChosen(null);
    }
  };

  const restart = () => {
    setSeed((s) => s + 1);
    setN(0);
    setChosen(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div style={{ display: 'grid', gap: 14 }}>
        <div style={{ ...card, textAlign: 'center', padding: 28 }}>
          <Label>Resultat</Label>
          <div style={{ fontSize: 46, fontWeight: 800, color: C.yellow, margin: '10px 0 2px' }}>
            {score} / {questions.length}
          </div>
          <div style={{ fontSize: 15, color: C.dim }}>{pct} procent rätt</div>
          <div style={{ marginTop: 16 }}>
            <Pill tone="yellow">Bästa resultat: {Math.max(best, score)}</Pill>
          </div>
          <div style={{ marginTop: 16, fontSize: 14, color: C.dim, lineHeight: 1.6 }}>
            {pct === 100
              ? 'Allt rätt. Du kan namnen.'
              : pct >= 70
                ? 'Bra jobbat. Repetera de tekniker du missade i Studera.'
                : 'Gå igenom Studera en gång till och kör sedan om quizet.'}
          </div>
        </div>
        <button type="button" onClick={restart} style={btnPrimary}>
          Kör igen
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Label>
          Fråga {n + 1} av {questions.length}
        </Label>
        <div style={{ display: 'flex', gap: 6 }}>
          <Pill tone="green">Rätt: {score}</Pill>
          <Pill tone="yellow">Bäst: {best}</Pill>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 4 }}>
        {questions.map((_, k) => (
          <div
            key={k}
            style={{
              flex: 1,
              height: 4,
              borderRadius: R.pill,
              background: k < n ? C.yellowLine : k === n ? C.yellow : C.line,
            }}
          />
        ))}
      </div>

      <div style={card}>
        <Label style={{ marginBottom: 8 }}>{q.label}</Label>
        <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.5 }}>{q.prompt}</div>
      </div>

      <div style={{ display: 'grid', gap: 9 }}>
        {q.options.map((opt) => {
          const isAnswer = opt === q.answer;
          const isChosen = opt === chosen;
          let bg = C.panel;
          let bd = C.line;
          let fg = C.text;
          if (chosen !== null && isAnswer) {
            bg = C.greenSoft;
            bd = 'rgba(74,222,128,0.45)';
            fg = C.green;
          } else if (isChosen && !isAnswer) {
            bg = C.redSoft;
            bd = 'rgba(248,113,113,0.45)';
            fg = C.red;
          }
          return (
            <button
              key={opt}
              type="button"
              onClick={() => answer(opt)}
              disabled={chosen !== null}
              style={{
                ...btn,
                textAlign: 'left',
                fontWeight: 600,
                background: bg,
                borderColor: bd,
                color: fg,
                cursor: chosen !== null ? 'default' : 'pointer',
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {chosen !== null && (
        <button type="button" onClick={next} style={btnPrimary}>
          {n + 1 >= questions.length ? 'Visa resultat' : 'Nästa fråga'}
        </button>
      )}
    </div>
  );
}
