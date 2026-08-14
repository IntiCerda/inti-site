// Diagram card for the "IVA and margin" post, 1200x1200. Third in the series,
// same grammar as post-cards.mjs and post-card-deploy-dual.mjs.
//
// The subject is one arithmetic mistake, so the card runs the same sale through
// both calculations side by side. The wrong column is drawn muted and the right
// one bright: the hierarchy carries the verdict without a label saying "wrong".
//
// Figures check out against src/lib/utils/impuestos.ts of VitrinaApp:
//   desglosarTotal(1190) -> { neto: 1000, iva: 190 }
//   margen(1000, 700)    -> { monto: 300, porcentaje: 30 }
// The naive comparison is 1190 - 700 = 490, i.e. 41.2% of 1190. The gap between
// the two margins is 190, exactly the VAT.
import sharp from "sharp";

const W = 1200;
const OUT = "C:\\Users\\PC\\Downloads\\post-05-margen-iva.png";

const BOX_Y = 460;
const BOX_H = 380;
const BOX_W = 440;
const L = { x: 120, cx: 340 };
const R = { x: 640, cx: 860 };

// ink: the column that is correct. muted: the one that is not.
const column = (c, { title, rows, total, pct, foot, ink }) => {
  const fg = ink ? "#ededea" : "#8e8e88";
  const line = ink ? "#8e8e88" : "#3a3a3c";
  return `
  <rect x="${c.x}" y="${BOX_Y}" width="${BOX_W}" height="${BOX_H}" fill="none" stroke="${line}" stroke-width="${ink ? 3 : 2}"/>
  <text x="${c.cx}" y="${BOX_Y + 42}" text-anchor="middle" font-family="Consolas, monospace" font-size="19" letter-spacing="3" fill="${fg}">${title}</text>
  <line x1="${c.x + 30}" y1="${BOX_Y + 62}" x2="${c.x + BOX_W - 30}" y2="${BOX_Y + 62}" stroke="${line}" stroke-width="2"/>
  ${rows
    .map(
      ([label, value], i) => `
  <text x="${c.x + 30}" y="${BOX_Y + 108 + i * 34}" font-family="Consolas, monospace" font-size="19" fill="#8e8e88">${label}</text>
  <text x="${c.x + BOX_W - 30}" y="${BOX_Y + 108 + i * 34}" text-anchor="end" font-family="Consolas, monospace" font-size="19" fill="#8e8e88">${value}</text>`
    )
    .join("")}
  <line x1="${c.x + 30}" y1="${BOX_Y + 166}" x2="${c.x + BOX_W - 30}" y2="${BOX_Y + 166}" stroke="${line}" stroke-width="2"/>
  <text x="${c.x + 30}" y="${BOX_Y + 208}" font-family="Consolas, monospace" font-size="19" fill="${fg}">margen</text>
  <text x="${c.x + BOX_W - 30}" y="${BOX_Y + 208}" text-anchor="end" font-family="Consolas, monospace" font-size="19" fill="${fg}">${total}</text>
  <text x="${c.cx}" y="${BOX_Y + 292}" text-anchor="middle" font-family="Georgia, serif" font-weight="bold" font-size="52" fill="${fg}">${pct}</text>
  <text x="${c.cx}" y="${BOX_Y + 330}" text-anchor="middle" font-family="Consolas, monospace" font-size="17" letter-spacing="2" fill="#8e8e88">${foot}</text>`;
};

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
  <text x="96" y="110" font-family="Consolas, monospace" font-size="19" letter-spacing="3" fill="#8e8e88">VITRINAAPP · MARGEN E IVA</text>
  <text x="64" y="196" font-family="Georgia, serif" font-weight="bold" font-size="44" fill="#ededea">La misma venta.</text>
  <text x="64" y="248" font-family="Georgia, serif" font-weight="bold" font-size="44" fill="#ededea">Dos márgenes distintos.</text>

  <text x="64" y="330" font-family="Consolas, monospace" font-size="20" fill="#8e8e88">Un producto que se vende a $1.190 y costó $700 neto en la factura.</text>
  <text x="64" y="362" font-family="Consolas, monospace" font-size="20" fill="#8e8e88">El precio de venta se exhibe con IVA adentro. El costo, no.</text>

  ${column(L, {
    title: "VENTA CONTRA COSTO",
    rows: [
      ["venta (con IVA)", "1.190"],
      ["costo neto", "− 700"],
    ],
    total: "490",
    pct: "41,2%",
    foot: "SOBRE LA VENTA",
    ink: false,
  })}
  ${column(R, {
    title: "NETO CONTRA NETO",
    rows: [
      ["venta neta", "1.000"],
      ["costo neto", "− 700"],
    ],
    total: "300",
    pct: "30,0%",
    foot: "SOBRE LA VENTA",
    ink: true,
  })}

  <line x1="64" y1="890" x2="${W - 64}" y2="890" stroke="#3a3a3c" stroke-width="2"/>
  <text x="64" y="934" font-family="Consolas, monospace" font-size="22" fill="#8e8e88">Los $190 de diferencia no son ganancia. Son el IVA</text>
  <text x="64" y="968" font-family="Consolas, monospace" font-size="22" fill="#8e8e88">que el comercio le entrega al fisco: está en su caja,</text>
  <text x="64" y="1002" font-family="Consolas, monospace" font-size="22" fill="#8e8e88">pero nunca fue suyo.</text>

  <line x1="64" y1="1080" x2="${W - 64}" y2="1080" stroke="#3a3a3c" stroke-width="2"/>
  <text x="64" y="1118" font-family="Consolas, monospace" font-size="18" letter-spacing="2" fill="#8e8e88">CLP ENTERO · IVA 19% · SIN CENTAVOS</text>
  <text x="${W - 64}" y="1118" text-anchor="end" font-family="Consolas, monospace" font-size="18" letter-spacing="2" fill="#8e8e88">INTI CERDA</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log("wrote", OUT);
