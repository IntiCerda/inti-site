// LinkedIn post cards, 1200x1200. Wraps a product screenshot in the same
// ink-on-black grammar as the og card and the profile banner so a multi-image
// post reads as one set.
//
// Crops are chosen deliberately. Both product landings still advertise "160+
// fuentes" while the running system reports 133, so every crop here stays off
// the stat bars until that copy is reconciled.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const shot = (name) => join(root, "src", "assets", "screens", name);
const out = (name) => join("C:\\Users\\PC\\Downloads", name);

const W = 1200;
const INSET_X = 64;
const INSET_W = W - INSET_X * 2; // 1072
// The plate occupies a fixed band; each card's height comes from its own crop
// aspect so nothing is ever stretched, and short plates centre in the band.
const BAND_Y = 300;
const BAND_H = 603;

// Screenshots are 2880x1800; crops are in that space.
const cards = [
  {
    file: "media-landing.png",
    // The feed shown is the landing's demo array, not live data — the caption
    // describes the mechanism, it never claims these rows are production.
    crop: { left: 760, top: 950, width: 1360, height: 765 },
    eyebrow: "MEDIA INTELLIGENCE · PRODUCTO PROPIO",
    title: ["Toda la prensa nacional,", "clasificada en segundos."],
    caption: [
      "Cada titular entra clasificado por categoría y con score",
      "de relevancia. La clasificación corre en modelos locales,",
      "sobre hardware propio, sin enviar nada a una API externa.",
    ],
    meta: "16 SERVICIOS · REDIS STREAMS · FASTAPI · NEXT.JS 15",
    name: "post-01-media-intelligence.png",
  },
  {
    file: "compliance-monitor.png",
    // Stops at y=827: the hero subtitle below it still reads "160+ medios".
    crop: { left: 730, top: 300, width: 1412, height: 527 },
    eyebrow: "COMPLIANCE MONITOR · PRODUCTO COMERCIAL",
    title: ["Monitoreo regulatorio", "para industrias reguladas."],
    caption: [
      "Alerta a una empresa apenas ella, su sector o sus organismos",
      "reguladores aparecen en una investigación, sanción o cambio",
      "normativo. Mismo motor de ingesta, frontera de auth propia.",
    ],
    meta: "OLLAMA · QWEN3:8B · EMBEDDINGS · POSTGRES + PGVECTOR",
    name: "post-02-compliance-monitor.png",
  },
  {
    file: "javiera-abogada.png",
    crop: { left: 360, top: 430, width: 2160, height: 1215 },
    eyebrow: "JAVIERA BRANDT · CLIENTE",
    title: ["Sitio para un estudio", "jurídico de familia."],
    caption: [
      "Diseño y desarrollo completos, definidos con la clienta:",
      "identidad, guía legal, captación por WhatsApp y una",
      "estructura pensada para quien llega en un mal momento.",
    ],
    meta: "PUBLICADO CON SU AUTORIZACIÓN · OVALLE, CHILE",
    name: "post-03-javiera-brandt.png",
  },
];

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function background({ eyebrow, title, caption, meta }) {
  const titleLines = title
    .map((t, i) => `<text x="64" y="${196 + i * 52}" font-family="Georgia, serif" font-weight="bold" font-size="44" fill="#ededea">${esc(t)}</text>`)
    .join("");
  const captionLines = caption
    .map((t, i) => `<text x="64" y="${960 + i * 34}" font-family="Consolas, monospace" font-size="22" fill="#8e8e88">${esc(t)}</text>`)
    .join("");

  return Buffer.from(`
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
  <text x="96" y="110" font-family="Consolas, monospace" font-size="19" letter-spacing="3" fill="#8e8e88">${esc(eyebrow)}</text>
  ${titleLines}

  <line x1="64" y1="900" x2="${W - 64}" y2="900" stroke="#3a3a3c" stroke-width="2"/>
  ${captionLines}

  <line x1="64" y1="1090" x2="${W - 64}" y2="1090" stroke="#3a3a3c" stroke-width="2"/>
  <text x="64" y="1128" font-family="Consolas, monospace" font-size="18" letter-spacing="2" fill="#8e8e88">${esc(meta)}</text>
  <text x="${W - 64}" y="1128" text-anchor="end" font-family="Consolas, monospace" font-size="18" letter-spacing="2" fill="#8e8e88">INTI CERDA</text>
</svg>`);
}

for (const card of cards) {
  const insetH = Math.round((INSET_W * card.crop.height) / card.crop.width);
  const insetY = BAND_Y + Math.round((BAND_H - insetH) / 2);

  const inner = await sharp(shot(card.file))
    .extract(card.crop)
    .resize(INSET_W, insetH)
    .toBuffer();

  await sharp(background(card))
    .composite([
      { input: inner, top: insetY, left: INSET_X },
      // Keyline so the screenshot reads as a plate, not a bleed.
      {
        input: Buffer.from(
          `<svg width="${INSET_W}" height="${insetH}"><rect x="1" y="1" width="${INSET_W - 2}" height="${insetH - 2}" fill="none" stroke="#ededea" stroke-width="2"/></svg>`
        ),
        top: insetY,
        left: INSET_X,
      },
    ])
    .png()
    .toFile(out(card.name));

  console.log("wrote", card.name);
}
