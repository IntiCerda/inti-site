// 1200x630 thumbnail for the VitrinaApp entry in the LinkedIn Featured
// section. vitrina-app.com serves no og:image, so LinkedIn renders a broken
// placeholder; this replaces it by hand.
//
// Same frame as the VitrinaApp carousel so the two read as one set.
import sharp from "sharp";

const W = 1200;
const H = 630;
const OUT = "C:\\Users\\PC\\Downloads\\Yo\\linkedin\\link-card-vitrina.png";

const FG = "#ededea";
const MUTED = "#8e8e88";
const MONO = "Consolas, monospace";
const SERIF = "Georgia, serif";

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="tone" width="12" height="12" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="#2c2c2e"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="toneMask"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
  </defs>

  <rect width="${W}" height="${H}" fill="#0b0b0c"/>
  <rect width="${W}" height="${H}" fill="url(#tone)" mask="url(#toneMask)"/>
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="${FG}" stroke-width="4"/>

  <rect x="88" y="106" width="18" height="18" fill="${FG}"/>
  <text x="126" y="122" font-family="${MONO}" font-size="24" letter-spacing="5" fill="${MUTED}">PRODUCTO EN PRODUCCIÓN · CHILE</text>

  <text x="84" y="268" font-family="${SERIF}" font-weight="bold" font-size="112" letter-spacing="-2" fill="${FG}">VitrinaApp</text>

  <text x="88" y="348" font-family="${MONO}" font-size="31" fill="${FG}">Caja, inventario y fiado para almacenes.</text>

  <line x1="88" y1="430" x2="${W - 88}" y2="430" stroke="#2c2c2e" stroke-width="4"/>

  <text x="88" y="492" font-family="${MONO}" font-size="25" fill="${MUTED}">En la nube y en el local, sin internet</text>
  <text x="${W - 88}" y="492" text-anchor="end" font-family="${MONO}" font-size="25" fill="${MUTED}">vitrina-app.com</text>
  <text x="88" y="540" font-family="${MONO}" font-size="25" fill="${MUTED}">SvelteKit · PGlite · Electron</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log("wrote", OUT);
