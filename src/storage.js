// Persistens i localStorage. Samma nyckel och samma JSON-form som
// artefaktversionen använde via window.storage:
//   { mastered: string[], best: number, study: { i: number, step: number } }
//
// Allt är synkront och inslaget i try/catch, Safari i privat läge kastar
// när man skriver till localStorage.

const KEY = 'judo-gult-v1';

export const DEFAULT_STATE = {
  mastered: [],
  best: 0,
  study: { i: 0, step: 0 },
};

export function loadState() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATE, study: { ...DEFAULT_STATE.study } };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') throw new Error('bad shape');
    return {
      mastered: Array.isArray(parsed.mastered) ? parsed.mastered.filter((x) => typeof x === 'string') : [],
      best: Number.isFinite(parsed.best) ? parsed.best : 0,
      study: {
        i: Number.isFinite(parsed.study?.i) ? parsed.study.i : 0,
        step: Number.isFinite(parsed.study?.step) ? parsed.study.step : 0,
      },
    };
  } catch {
    return { ...DEFAULT_STATE, study: { ...DEFAULT_STATE.study } };
  }
}

export function saveState(state) {
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({
        mastered: state.mastered,
        best: state.best,
        study: state.study,
      })
    );
    return true;
  } catch {
    return false;
  }
}

export function clearState() {
  try {
    window.localStorage.removeItem(KEY);
    return true;
  } catch {
    return false;
  }
}
