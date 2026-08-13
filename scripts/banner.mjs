// LinkedIn profile banner, 1584x396. Same visual grammar as the site and the
// og card: ink-on-black, screentone, hard rules, the event bus as the visual.
//
// Dead zone: the profile photo overlaps the banner's lower left. Measured
// against the rendered profile it covers roughly x < 490, y > 180, and its
// white ring starts higher than the circle suggests. Nothing legible goes
// there — the tagline sits above y=170, the bus and its label start past
// x=545.
import sharp from "sharp";

const svg = `
<svg width="1584" height="396" viewBox="0 0 1584 396" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="tone" width="12" height="12" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.3" fill="#2c2c2e"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="toneMask">
      <rect width="1584" height="396" fill="url(#fade)"/>
    </mask>
  </defs>

  <rect width="1584" height="396" fill="#0b0b0c"/>
  <rect width="1584" height="396" fill="url(#tone)" mask="url(#toneMask)"/>
  <rect x="16" y="16" width="1552" height="364" fill="none" stroke="#ededea" stroke-width="3"/>

  <!-- Producers -->
  <g stroke="#8e8e88" stroke-width="2" fill="none">
    <rect x="560" y="60" width="200" height="52"/>
    <rect x="800" y="60" width="180" height="52"/>
    <rect x="1020" y="60" width="180" height="52"/>
  </g>
  <g font-family="Consolas, monospace" font-size="19" fill="#ededea">
    <text x="576" y="92">web-scraper-core</text>
    <text x="816" y="92">media-billing</text>
    <text x="1036" y="92">media-alerts</text>
  </g>

  <!-- Drops to the bus -->
  <g stroke="#8e8e88" stroke-width="2">
    <line x1="660" y1="112" x2="660" y2="198"/>
    <line x1="890" y1="112" x2="890" y2="198"/>
    <line x1="1110" y1="112" x2="1110" y2="198"/>
  </g>

  <!-- The bus. Starts at 545 so neither the line nor its label runs under
       the profile photo. -->
  <line x1="545" y1="198" x2="1530" y2="198" stroke="#ededea" stroke-width="5"/>
  <text x="545" y="184" font-family="Consolas, monospace" font-size="17" letter-spacing="4" fill="#8e8e88">REDIS STREAMS</text>
  <text x="920" y="190" font-family="Consolas, monospace" font-size="15" fill="#8e8e88">article.classified</text>
  <text x="1170" y="190" font-family="Consolas, monospace" font-size="15" fill="#8e8e88">alert.triggered</text>

  <!-- Packets on the wire -->
  <rect x="840" y="192" width="12" height="12" fill="#ededea"/>
  <rect x="1060" y="192" width="12" height="12" fill="#ededea"/>
  <rect x="1330" y="192" width="12" height="12" fill="#ededea"/>

  <!-- Risers to consumers -->
  <g stroke="#8e8e88" stroke-width="2">
    <line x1="620" y1="198" x2="620" y2="284"/>
    <line x1="860" y1="198" x2="860" y2="284"/>
    <line x1="1100" y1="198" x2="1100" y2="284"/>
    <line x1="1330" y1="198" x2="1330" y2="284"/>
  </g>

  <!-- Consumers -->
  <g stroke="#8e8e88" stroke-width="2" fill="none">
    <rect x="520" y="284" width="200" height="52"/>
    <rect x="760" y="284" width="200" height="52"/>
    <rect x="1000" y="284" width="200" height="52"/>
    <rect x="1240" y="284" width="190" height="52"/>
  </g>
  <g font-family="Consolas, monospace" font-size="19" fill="#ededea">
    <text x="536" y="316">media-compliance</text>
    <text x="776" y="316">media-auth</text>
    <text x="1016" y="316">media-intel</text>
    <text x="1256" y="316">notifications</text>
  </g>

  <!-- Label block, top-left. Raised so the second line clears the profile
       photo's ring: last baseline at 154 leaves ~30px of margin above it. -->
  <rect x="64" y="36" width="18" height="18" fill="#ededea"/>
  <text x="100" y="52" font-family="Consolas, monospace" font-size="22" letter-spacing="6" fill="#8e8e88">EVENT-DRIVEN · LOCAL LLMS</text>
  <text x="64" y="104" font-family="Georgia, serif" font-weight="bold" font-size="44" fill="#ededea">The pipeline &amp;</text>
  <text x="64" y="154" font-family="Georgia, serif" font-weight="bold" font-size="44" fill="#ededea">the screen it feeds.</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("C:\\Users\\PC\\Downloads\\linkedin-banner.png");
console.log("banner written");
