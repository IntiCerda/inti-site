// Diagram card for the "dual deploy" post, 1200x1200. Same ink-on-black
// grammar as post-cards.mjs, but the subject is the architecture rather than a
// screenshot, so the plate is a drawing instead of an inset image.
//
// The whole argument of the post is the asymmetry between the two columns:
// 0 substituted modules on one side, 3 on the other, from one source tree.
import sharp from "sharp";

const W = 1200;
const OUT = "C:\\Users\\PC\\Downloads\\post-04-deploy-dual.png";

// Column geometry. Centres at 340 and 860 line up with the split rule above.
const L = { x: 120, cx: 340 };
const R = { x: 640, cx: 860 };
const BOX_W = 440;
const BOX_Y = 470;
const BOX_H = 380;

const col = (c, title, rows, count, subs) => `
  <rect x="${c.x}" y="${BOX_Y}" width="${BOX_W}" height="${BOX_H}" fill="none" stroke="#8e8e88" stroke-width="2"/>
  <text x="${c.cx}" y="${BOX_Y + 42}" text-anchor="middle" font-family="Consolas, monospace" font-size="22" letter-spacing="5" fill="#ededea">${title}</text>
  <line x1="${c.x + 30}" y1="${BOX_Y + 62}" x2="${c.x + BOX_W - 30}" y2="${BOX_Y + 62}" stroke="#3a3a3c" stroke-width="2"/>
  ${rows
    .map(
      (r, i) =>
        `<text x="${c.x + 30}" y="${BOX_Y + 100 + i * 34}" font-family="Consolas, monospace" font-size="19" fill="#8e8e88">${r}</text>`
    )
    .join("")}
  <line x1="${c.x + 30}" y1="${BOX_Y + 200}" x2="${c.x + BOX_W - 30}" y2="${BOX_Y + 200}" stroke="#3a3a3c" stroke-width="2"/>
  <text x="${c.x + 30}" y="${BOX_Y + 236}" font-family="Consolas, monospace" font-size="20" letter-spacing="1" fill="#ededea">${count}</text>
  ${subs
    .map(
      (s, i) =>
        `<text x="${c.x + 30}" y="${BOX_Y + 272 + i * 30}" font-family="Consolas, monospace" font-size="17" fill="#8e8e88">${s}</text>`
    )
    .join("")}`;

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
  <text x="96" y="110" font-family="Consolas, monospace" font-size="19" letter-spacing="3" fill="#8e8e88">VITRINAAPP · DEPLOY DUAL</text>
  <text x="64" y="196" font-family="Georgia, serif" font-weight="bold" font-size="44" fill="#ededea">Un código.</text>
  <text x="64" y="248" font-family="Georgia, serif" font-weight="bold" font-size="44" fill="#ededea">Dos formas de correr.</text>

  <!-- Shared source, then the split -->
  <rect x="340" y="330" width="520" height="64" fill="none" stroke="#ededea" stroke-width="3"/>
  <text x="600" y="370" text-anchor="middle" font-family="Consolas, monospace" font-size="21" fill="#ededea">src/ — servicios · rutas · UI</text>
  <g stroke="#8e8e88" stroke-width="2">
    <line x1="600" y1="394" x2="600" y2="425"/>
    <line x1="340" y1="425" x2="860" y2="425"/>
    <line x1="340" y1="425" x2="340" y2="470"/>
    <line x1="860" y1="425" x2="860" y2="470"/>
  </g>

  ${col(L, "NUBE", ["adapter-vercel", "Postgres + Supabase", "Vercel Cron"], "0 MÓDULOS SUSTITUIDOS", [
    "el código va tal cual",
  ])}
  ${col(R, "LOCAL", ["adapter-node", "PGlite embebido", "Electron"], "3 MÓDULOS SUSTITUIDOS", [
    "$lib/server/db",
    "$lib/server/supabase-admin",
    "$lib/instalacion",
  ])}

  <line x1="64" y1="900" x2="${W - 64}" y2="900" stroke="#3a3a3c" stroke-width="2"/>
  <text x="64" y="944" font-family="Consolas, monospace" font-size="22" fill="#8e8e88">Los servicios no saben cuál de los dos builds</text>
  <text x="64" y="978" font-family="Consolas, monospace" font-size="22" fill="#8e8e88">los está empaquetando. Ni un if de entorno</text>
  <text x="64" y="1012" font-family="Consolas, monospace" font-size="22" fill="#8e8e88">adentro de un servicio.</text>

  <line x1="64" y1="1080" x2="${W - 64}" y2="1080" stroke="#3a3a3c" stroke-width="2"/>
  <text x="64" y="1118" font-family="Consolas, monospace" font-size="18" letter-spacing="2" fill="#8e8e88">SVELTEKIT · VITE · DRIZZLE · PGLITE · ELECTRON</text>
  <text x="${W - 64}" y="1118" text-anchor="end" font-family="Consolas, monospace" font-size="18" letter-spacing="2" fill="#8e8e88">INTI CERDA</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log("wrote", OUT);
