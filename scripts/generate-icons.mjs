// Renderar appikonerna från assets/icon.svg med en lokal Chrome eller Chromium.
// De färdiga PNG-filerna ligger redan i public/icons, så det här skriptet
// behövs bara om du ändrar motivet.
//
// Kör: npm run icons
// Ange en egen webbläsare med CHROME_PATH=/sökväg/till/chrome npm run icons
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'icons');
const BG = '#0d111e';

const CANDIDATES = [
  process.env.CHROME_PATH,
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

const chrome = CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error(
    'Hittade ingen Chrome eller Chromium. Sätt CHROME_PATH och kör igen.\n' +
      'De färdiga ikonerna i public/icons är redan incheckade, så du behöver' +
      ' bara det här skriptet om du ändrat assets/icon.svg.'
  );
  process.exit(1);
}

const svg = readFileSync(join(ROOT, 'assets', 'icon.svg'), 'utf8');
mkdirSync(OUT, { recursive: true });

// scale < 1 krymper motivet, används för maskable-ikonen vars innehåll
// måste hålla sig innanför den säkra zonen.
const JOBS = [
  ['icon-192.png', 192, 0.94],
  ['icon-512.png', 512, 0.94],
  ['icon-maskable-512.png', 512, 0.66],
  ['apple-touch-icon.png', 180, 0.9],
];

for (const [name, size, scale] of JOBS) {
  const html = join(tmpdir(), `judo-icon-${size}-${scale}.html`);
  writeFileSync(
    html,
    `<!doctype html><meta charset="utf-8"><style>
html,body{margin:0;padding:0;width:${size}px;height:${size}px;background:${BG};overflow:hidden}
svg{position:absolute;left:50%;top:50%;width:${size}px;height:${size}px;transform:translate(-50%,-50%) scale(${scale})}
</style>${svg}`
  );
  execFileSync(
    chrome,
    [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${size},${size}`,
      '--default-background-color=0d111eff',
      `--screenshot=${join(OUT, name)}`,
      `file://${html}`,
    ],
    { stdio: 'ignore' }
  );
  rmSync(html, { force: true });
  console.log('skrev', name, `${size}x${size}`);
}

writeFileSync(
  join(OUT, 'favicon.svg'),
  svg.replace('>\n  <g', '>\n  <rect width="100" height="100" rx="18" fill="#0d111e"/>\n  <g')
);
console.log('skrev favicon.svg');
