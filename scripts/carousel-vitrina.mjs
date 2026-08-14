// LinkedIn document carousel for VitrinaApp — 7 square pages, emitted as PNGs
// and assembled into a single PDF. LinkedIn renders a multi-page PDF as a
// swipeable carousel, which is the only native way to show a project as a
// sequence rather than one flat image.
//
// Visual language is the same as the post cards in this folder, so the carousel
// and the posts read as one set. Every claim on these pages comes from the
// running product or from source that was read before writing it.
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import fs from "node:fs/promises";

const W = 1200;
const OUT_DIR = "C:\\Users\\PC\\Downloads";
const PDF = `${OUT_DIR}\\carousel-vitrinaapp.pdf`;

const FG = "#ededea";
const MUTED = "#8e8e88";
const RULE = "#3a3a3c";
const MONO = "Consolas, monospace";
const SERIF = "Georgia, serif";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// SVG has no text wrapping, so lines are measured with a per-font width factor
// and broken by hand. The factors are eyeballed against rendered output.
const wrap = (text, size, maxW, factor = 0.55) => {
  const perChar = size * factor;
  const max = Math.floor(maxW / perChar);
  const out = [];
  let line = "";
  for (const word of text.split(" ")) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > max && line) {
      out.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) out.push(line);
  return out;
};

const para = (text, x, y, size, color = FG, maxW = W - 128, lh = size * 1.5) =>
  wrap(text, size, maxW)
    .map(
      (l, i) =>
        `<text x="${x}" y="${y + i * lh}" font-family="${MONO}" font-size="${size}" fill="${color}">${esc(l)}</text>`
    )
    .join("");

const paraHeight = (text, size, maxW = W - 128, lh = size * 1.5) =>
  wrap(text, size, maxW).length * lh;

const headline = (lines, y) =>
  lines
    .map(
      (l, i) =>
        `<text x="64" y="${y + i * 62}" font-family="${SERIF}" font-weight="bold" font-size="54" fill="${FG}">${esc(l)}</text>`
    )
    .join("");

const frame = (eyebrow, n, body) => `
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
  <rect x="16" y="16" width="${W - 32}" height="${W - 32}" fill="none" stroke="${FG}" stroke-width="3"/>

  <rect x="64" y="96" width="16" height="16" fill="${FG}"/>
  <text x="96" y="110" font-family="${MONO}" font-size="19" letter-spacing="3" fill="${MUTED}">${esc(eyebrow)}</text>

  ${body}

  <line x1="64" y1="1080" x2="${W - 64}" y2="1080" stroke="${RULE}" stroke-width="2"/>
  <text x="64" y="1118" font-family="${MONO}" font-size="18" letter-spacing="2" fill="${MUTED}">VITRINA-APP.COM</text>
  <text x="${W - 64}" y="1118" text-anchor="end" font-family="${MONO}" font-size="18" letter-spacing="2" fill="${MUTED}">${n} / 7</text>
</svg>`;

// Bulleted item with a small filled square, matching the card marker.
const item = (text, x, y, size = 28) => `
  <rect x="${x}" y="${y - 14}" width="10" height="10" fill="${MUTED}"/>
  <text x="${x + 26}" y="${y}" font-family="${MONO}" font-size="${size}" fill="${FG}">${esc(text)}</text>`;

const pages = [];

// 1 — cover
pages.push(
  frame(
    "PRODUCTO EN PRODUCCIÓN · CHILE",
    1,
    `
  <text x="64" y="470" font-family="${SERIF}" font-weight="bold" font-size="104" fill="${FG}">VitrinaApp</text>
  <line x1="64" y1="520" x2="560" y2="520" stroke="${FG}" stroke-width="3"/>
  ${para("Caja, inventario y fiado para almacenes de Chile.", 64, 588, 34, FG, 900)}
  ${para("Producto en conjunto, dos desarrolladores.", 64, 700, 24, MUTED, 900)}
  `
  )
);

// 2 — the problem
pages.push(
  frame(
    "EL PROBLEMA",
    2,
    `
  ${headline(["Un almacén lleva el fiado", "en un cuaderno."], 240)}
  ${para("Y el stock en la cabeza. Nadie tiene tiempo de cuadrar un inventario a mano al cierre.", 64, 420, 28, FG, W - 160)}
  ${para("El software que existe asume dos cosas que en un minimarket no se cumplen: internet estable y un computador dedicado a la caja.", 64, 580, 28, MUTED, W - 160)}
  `
  )
);

// 3 — what it does
pages.push(
  frame(
    "QUÉ HACE",
    3,
    `
  ${headline(["Seis módulos, un solo", "lugar."], 240)}
  ${item("Caja con lector de código de barras", 64, 430)}
  ${item("Inventario con alertas de vencimiento", 64, 490)}
  ${item("Fiado por cliente", 64, 550)}
  ${item("Promociones y precios de mercado", 64, 610)}
  ${item("Vitrina con pedidos por QR", 64, 670)}
  ${item("Reportes e IVA del período", 64, 730)}
  `
  )
);

// 4 — architecture decision, with the two-target diagram
pages.push(
  frame(
    "DECISIÓN DE ARQUITECTURA",
    4,
    `
  ${headline(["El mismo código, en la nube", "y sin internet."], 220)}
  ${para("No hay ningún if preguntando dónde está corriendo. El build local sustituye tres módulos, y nada más.", 64, 400, 26, MUTED, W - 160)}

  <rect x="64" y="500" width="480" height="300" fill="none" stroke="${MUTED}" stroke-width="2"/>
  <text x="92" y="548" font-family="${MONO}" font-size="20" letter-spacing="3" fill="${FG}">NUBE</text>
  <line x1="92" y1="568" x2="516" y2="568" stroke="${RULE}" stroke-width="2"/>
  <text x="92" y="612" font-family="${MONO}" font-size="22" fill="${MUTED}">Postgres remoto</text>
  <text x="92" y="652" font-family="${MONO}" font-size="22" fill="${MUTED}">Supabase auth</text>
  <text x="92" y="692" font-family="${MONO}" font-size="22" fill="${MUTED}">UI completa</text>
  <text x="92" y="762" font-family="${MONO}" font-size="20" fill="${MUTED}">0 SUSTITUCIONES</text>

  <rect x="656" y="500" width="480" height="300" fill="none" stroke="${FG}" stroke-width="2"/>
  <text x="684" y="548" font-family="${MONO}" font-size="20" letter-spacing="3" fill="${FG}">LOCAL</text>
  <line x1="684" y1="568" x2="1108" y2="568" stroke="${RULE}" stroke-width="2"/>
  <text x="684" y="612" font-family="${MONO}" font-size="22" fill="${FG}">PGlite embebido</text>
  <text x="684" y="652" font-family="${MONO}" font-size="22" fill="${FG}">usuarios locales</text>
  <text x="684" y="692" font-family="${MONO}" font-size="22" fill="${FG}">UI sin mapa ni QR</text>
  <text x="684" y="762" font-family="${MONO}" font-size="20" fill="${FG}">3 SUSTITUCIONES</text>

  ${para("Los servicios reciben el mismo import de siempre.", 64, 880, 26, FG, W - 160)}
  `
  )
);

// 5 — domain decision, with the two figures
pages.push(
  frame(
    "DECISIÓN DE DOMINIO",
    5,
    `
  ${headline(["El margen se calcula", "neto contra neto."], 220)}
  ${para("El precio de venta se exhibe con IVA incluido y el costo del proveedor viene neto. Compararlos directo infla el margen exactamente en el impuesto que el comercio le debe al fisco.", 64, 400, 26, MUTED, W - 160)}

  <text x="64" y="700" font-family="${MONO}" font-size="20" letter-spacing="3" fill="${MUTED}">MOSTRABA</text>
  <text x="64" y="800" font-family="${SERIF}" font-weight="bold" font-size="92" fill="${MUTED}">41,2%</text>

  <text x="640" y="700" font-family="${MONO}" font-size="20" letter-spacing="3" fill="${FG}">ERA</text>
  <text x="640" y="800" font-family="${SERIF}" font-weight="bold" font-size="92" fill="${FG}">30,0%</text>

  ${para("Esa plata está en la caja del almacén, pero no es suya.", 64, 900, 26, FG, W - 160)}
  `
  )
);

// 6 — stack
pages.push(
  frame(
    "STACK",
    6,
    `
  ${headline(["Lo que hay debajo."], 240)}
  ${item("SvelteKit · TypeScript · Drizzle", 64, 420, 30)}
  ${item("PostgreSQL con row-level security por comercio", 64, 490, 30)}
  ${item("PGlite + Electron para el modo local", 64, 560, 30)}
  ${item("Supabase para auth y almacenamiento", 64, 630, 30)}
  ${para("Un comercio nunca puede leer la fila de otro: el aislamiento lo impone la base de datos, no el código de la aplicación.", 64, 750, 26, MUTED, W - 160)}
  `
  )
);

// 7 — close
pages.push(
  frame(
    "CIERRE",
    7,
    `
  ${headline(["En producción,", "con tres planes de pago."], 300)}
  <line x1="64" y1="500" x2="560" y2="500" stroke="${FG}" stroke-width="3"/>
  ${para("vitrina-app.com", 64, 570, 38, FG, 900)}
  ${para("Inti Cerda — Backend Engineer", 64, 700, 30, FG, 900)}
  ${para("Coquimbo, Chile · remoto, UTC−4", 64, 748, 26, MUTED, 900)}
  ${para("linkedin.com/in/inti-cerda", 64, 820, 26, MUTED, 900)}
  `
  )
);

const pdf = await PDFDocument.create();

for (const [i, svg] of pages.entries()) {
  const file = `${OUT_DIR}\\vitrina-p${i + 1}.png`;
  await sharp(Buffer.from(svg)).png().toFile(file);
  const png = await pdf.embedPng(await fs.readFile(file));
  const page = pdf.addPage([W, W]);
  page.drawImage(png, { x: 0, y: 0, width: W, height: W });
}

await fs.writeFile(PDF, await pdf.save());
console.log("wrote", PDF, `(${pages.length} pages)`);
