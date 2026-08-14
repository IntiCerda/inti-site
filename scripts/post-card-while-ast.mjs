// Card for the "while that never loops" post, 1200x1200. Fourth in the series.
//
// The evidence is the post, so the card is the receipt: what the source asks
// for on the left, what the binary actually prints on the right. Both panels
// are copied from prueba.ps and from a real run inside the build container —
// nothing here is illustrative.
import sharp from "sharp";

const W = 1200;
const OUT = "C:\\Users\\PC\\Downloads\\post-06-while-ast.png";

const PANEL_Y = 310;
const PANEL_H = 460;
const PANEL_W = 522;
const LEFT = 64;
const RIGHT = 614;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const panel = (x, title, lines, footRule, foot) => `
  <rect x="${x}" y="${PANEL_Y}" width="${PANEL_W}" height="${PANEL_H}" fill="none" stroke="#8e8e88" stroke-width="2"/>
  <text x="${x + 28}" y="${PANEL_Y + 42}" font-family="Consolas, monospace" font-size="18" letter-spacing="3" fill="#ededea">${title}</text>
  <line x1="${x + 28}" y1="${PANEL_Y + 62}" x2="${x + PANEL_W - 28}" y2="${PANEL_Y + 62}" stroke="#3a3a3c" stroke-width="2"/>
  ${lines
    .map(
      (l, i) =>
        `<text x="${x + 28}" y="${PANEL_Y + 108 + i * 34}" font-family="Consolas, monospace" font-size="20" fill="#ededea" xml:space="preserve">${esc(l)}</text>`
    )
    .join("")}
  ${
    foot
      ? `<line x1="${x + 28}" y1="${footRule}" x2="${x + PANEL_W - 28}" y2="${footRule}" stroke="#3a3a3c" stroke-width="2"/>
  <text x="${x + 28}" y="${footRule + 36}" font-family="Consolas, monospace" font-size="18" letter-spacing="1" fill="#8e8e88">${esc(foot)}</text>`
      : ""
  }`;

const svg = `
<svg width="${W}" height="${W}" viewBox="0 0 ${W} ${W}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="tone" width="12" height="12" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.3" fill="#2c2c2e"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="toneMask"><rect width="${W}" height="${W}" fill="url(#fade)"/></mask>
  </defs>

  <rect width="${W}" height="${W}" fill="#0b0b0c"/>
  <rect width="${W}" height="${W}" fill="url(#tone)" mask="url(#toneMask)"/>
  <rect x="16" y="16" width="${W - 32}" height="${W - 32}" fill="none" stroke="#ededea" stroke-width="3"/>

  <rect x="64" y="96" width="16" height="16" fill="#ededea"/>
  <text x="96" y="110" font-family="Consolas, monospace" font-size="19" letter-spacing="3" fill="#8e8e88">TALLERCOMPILADOR · PARSEO Y EJECUCIÓN</text>
  <text x="64" y="196" font-family="Georgia, serif" font-weight="bold" font-size="44" fill="#ededea">Un while</text>
  <text x="64" y="248" font-family="Georgia, serif" font-weight="bold" font-size="44" fill="#ededea">que no repite nada.</text>

  ${panel(
    LEFT,
    "LO QUE PIDE EL CÓDIGO",
    // El terminador del lenguaje es ":🔥". Se muestra tal cual porque librsvg
    // lo dibuja como glifo monocromo, sin caja de reemplazo.
    ["i = 0:🔥", "while (i < 3) {", '    aer("vuelta"):🔥', "    i = i + 1:🔥", "}", "aer(i):🔥"],
    PANEL_Y + 330,
    "TRES VUELTAS, i = 3"
  )}
  ${panel(
    RIGHT,
    "LO QUE IMPRIME",
    ["vuelta", "1"],
    PANEL_Y + 330,
    "UNA VUELTA, i = 1"
  )}

  <line x1="64" y1="820" x2="${W - 64}" y2="820" stroke="#3a3a3c" stroke-width="2"/>
  <text x="64" y="864" font-family="Consolas, monospace" font-size="22" fill="#8e8e88">Las acciones corren mientras bison reduce las reglas,</text>
  <text x="64" y="898" font-family="Consolas, monospace" font-size="22" fill="#8e8e88">o sea durante el parseo — y la entrada se recorre una</text>
  <text x="64" y="932" font-family="Consolas, monospace" font-size="22" fill="#8e8e88">sola vez. Repetir exige un árbol que se pueda recorrer</text>
  <text x="64" y="966" font-family="Consolas, monospace" font-size="22" fill="#8e8e88">de nuevo. Eso es el AST.</text>

  <line x1="64" y1="1080" x2="${W - 64}" y2="1080" stroke="#3a3a3c" stroke-width="2"/>
  <text x="64" y="1118" font-family="Consolas, monospace" font-size="18" letter-spacing="2" fill="#8e8e88">FLEX · BISON · C</text>
  <text x="${W - 64}" y="1118" text-anchor="end" font-family="Consolas, monospace" font-size="18" letter-spacing="2" fill="#8e8e88">INTI CERDA</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log("wrote", OUT);
