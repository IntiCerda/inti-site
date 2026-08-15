// Generates public/og.png (1200x630) — the card shown when the site is
// shared on LinkedIn, WhatsApp or X. Run once after changing it:
//   node scripts/og.mjs
// Fonts: Georgia and Consolas are the site's own fallback stacks and are
// present on the machines this runs on; the SVG never depends on webfonts.
import sharp from "sharp";

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="tone" width="12" height="12" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="#2c2c2e"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="toneMask">
      <rect width="1200" height="630" fill="url(#fade)"/>
    </mask>
  </defs>

  <rect width="1200" height="630" fill="#0b0b0c"/>
  <rect width="1200" height="630" fill="url(#tone)" mask="url(#toneMask)"/>

  <!-- Frame: the site's hard 2px rule, doubled for the card scale. -->
  <rect x="28" y="28" width="1144" height="574" fill="none" stroke="#ededea" stroke-width="4"/>

  <!-- Section marker square + rule, straight from the site's label grammar. -->
  <rect x="88" y="118" width="18" height="18" fill="#ededea"/>
  <text x="126" y="134" font-family="Consolas, monospace" font-size="26" letter-spacing="6" fill="#8e8e88">BACKEND ENGINEER · DISTRIBUTED SYSTEMS</text>

  <text x="84" y="292" font-family="Georgia, serif" font-weight="bold" font-size="132" letter-spacing="-3" fill="#ededea">Inti Cerda</text>

  <text x="88" y="384" font-family="Consolas, monospace" font-size="34" fill="#ededea">I build the pipeline &amp; the screen it feeds.</text>

  <line x1="88" y1="472" x2="1112" y2="472" stroke="#2c2c2e" stroke-width="4"/>

  <text x="88" y="536" font-family="Consolas, monospace" font-size="26" fill="#8e8e88">Event-driven · Local LLMs · Full-stack</text>
  <text x="1112" y="536" text-anchor="end" font-family="Consolas, monospace" font-size="26" fill="#8e8e88">Coquimbo, CL · UTC−4</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og.png");
console.log("public/og.png written");
