// Shared frame and helpers for the LinkedIn document carousels.
//
// LinkedIn renders a multi-page PDF as a swipeable carousel, so each deck is a
// set of square pages assembled into one PDF. Every carousel uses the same
// frame as the post cards in this folder so the whole set reads as one voice.
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import fs from "node:fs/promises";
import * as simpleIcons from "simple-icons";

export const W = 1200;
export const FG = "#ededea";
export const MUTED = "#8e8e88";
export const RULE = "#3a3a3c";
export const MONO = "Consolas, monospace";
export const SERIF = "Georgia, serif";

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// SVG does not wrap text, so lines are measured against a per-font width factor
// and broken by hand. The factor is eyeballed against rendered output.
export const wrap = (text, size, maxW, factor = 0.55) => {
  const max = Math.floor(maxW / (size * factor));
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

export const para = (text, x, y, size, color = FG, maxW = W - 128, lh = size * 1.5) =>
  wrap(text, size, maxW)
    .map(
      (l, i) =>
        `<text x="${x}" y="${y + i * lh}" font-family="${MONO}" font-size="${size}" fill="${color}">${esc(l)}</text>`
    )
    .join("");

export const headline = (lines, y, size = 54, color = FG, x = 64) =>
  lines
    .map(
      (l, i) =>
        `<text x="${x}" y="${y + i * (size * 1.15)}" font-family="${SERIF}" font-weight="bold" font-size="${size}" fill="${color}">${esc(l)}</text>`
    )
    .join("");

export const item = (text, x, y, size = 28, color = FG) => `
  <rect x="${x}" y="${y - 14}" width="10" height="10" fill="${MUTED}"/>
  <text x="${x + 26}" y="${y}" font-family="${MONO}" font-size="${size}" fill="${color}">${esc(text)}</text>`;

// Monospace code block on a hairline panel, for showing real source.
export const codePanel = (lines, x, y, w, size = 22) => {
  const h = lines.length * (size * 1.6) + 56;
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${RULE}" stroke-width="2"/>
  ${lines
    .map(
      (l, i) =>
        `<text x="${x + 28}" y="${y + 44 + i * (size * 1.6)}" font-family="${MONO}" font-size="${size}" fill="${FG}" xml:space="preserve">${esc(l)}</text>`
    )
    .join("")}`;
};

const relLuminance = (hex) => {
  const [r, g, b] = [0, 2, 4]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// A brand mark when simple-icons has one, otherwise a monogram in a box so the
// grid keeps its rhythm. Brand colours that vanish against the near-black
// background (GitHub, OpenJDK) fall back to the foreground instead.
export const brandMark = (label, slug, x, y, box = 84) => {
  const key = slug
    ? `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`
    : undefined;
  const icon = key ? simpleIcons[key] : undefined;
  const caption = `<text x="${x + box / 2}" y="${y + box + 34}" text-anchor="middle" font-family="${MONO}" font-size="19" fill="${MUTED}">${esc(label)}</text>`;

  if (!icon) {
    const monogram = label.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
    return `
  <rect x="${x}" y="${y}" width="${box}" height="${box}" fill="none" stroke="${MUTED}" stroke-width="2"/>
  <text x="${x + box / 2}" y="${y + box / 2 + 12}" text-anchor="middle" font-family="${MONO}" font-size="30" fill="${FG}">${monogram}</text>
  ${caption}`;
  }

  const colour = relLuminance(icon.hex) < 0.06 ? FG.slice(1) : icon.hex;
  const scale = box / 24;
  return `
  <g transform="translate(${x}, ${y}) scale(${scale})">
    <path d="${icon.path}" fill="#${colour}"/>
  </g>
  ${caption}`;
};

// The dark frame takes an optional palette so a deck can wear the colours of
// the product it is about instead of a third invented scheme.
export const NAVY = {
  bg: "#131f36",
  ink: "#f2ede1",
  muted: "#8f9bb3",
  rule: "#2b3b5c",
  accent: "#c9a227",
  dot: "#1c2c4a",
};

export const frame = ({ eyebrow, n, total, footer, body, theme }) => {
  const bg = theme?.bg ?? "#0b0b0c";
  const ink = theme?.ink ?? FG;
  const muted = theme?.muted ?? MUTED;
  const rule = theme?.rule ?? RULE;
  const dot = theme?.dot ?? "#2c2c2e";
  return `
<svg width="${W}" height="${W}" viewBox="0 0 ${W} ${W}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="tone" width="12" height="12" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.3" fill="${dot}"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="toneMask"><rect width="${W}" height="${W}" fill="url(#fade)"/></mask>
  </defs>

  <rect width="${W}" height="${W}" fill="${bg}"/>
  <rect width="${W}" height="${W}" fill="url(#tone)" mask="url(#toneMask)"/>
  <rect x="16" y="16" width="${W - 32}" height="${W - 32}" fill="none" stroke="${ink}" stroke-width="3"/>

  <rect x="64" y="96" width="16" height="16" fill="${theme?.accent ?? ink}"/>
  <text x="96" y="110" font-family="${MONO}" font-size="19" letter-spacing="3" fill="${muted}">${esc(eyebrow)}</text>

  ${body}

  <line x1="64" y1="1080" x2="${W - 64}" y2="1080" stroke="${rule}" stroke-width="2"/>
  <text x="64" y="1118" font-family="${MONO}" font-size="18" letter-spacing="2" fill="${muted}">${esc(footer)}</text>
  <text x="${W - 64}" y="1118" text-anchor="end" font-family="${MONO}" font-size="18" letter-spacing="2" fill="${muted}">${n} / ${total}</text>
</svg>`;
};

// ---------------------------------------------------------------------------
// Paper theme. A second visual system, not a recolour of the first: no dot
// texture, no boxed border, sans body copy, and an accent that carries the one
// thing each page is about. Decks alternate between the two so a reader who
// follows the profile is not looking at the same page seven more times.
// ---------------------------------------------------------------------------
export const PAPER = {
  bg: "#f2efe9",
  ink: "#16150f",
  muted: "#6f6b5e",
  rule: "#cfc9bc",
  accent: "#b8412b",
};
export const SANS = "Segoe UI, Helvetica, Arial, sans-serif";

export const sans = (text, x, y, size, color, maxW = W - 128, lh = size * 1.5) =>
  wrap(text, size, maxW, 0.5)
    .map(
      (l, i) =>
        `<text x="${x}" y="${y + i * lh}" font-family="${SANS}" font-size="${size}" fill="${color}">${esc(l)}</text>`
    )
    .join("");

// A vertical spine with numbered stops. Reads top-to-bottom, which is the
// direction a phone scrolls — boxes and arrows do not survive the thumbnail.
export const flow = (stops, { x = 190, y = 300, pitch = 108, highlight = -1 } = {}) => {
  const lastY = y + (stops.length - 1) * pitch;
  return `
  <line x1="${x}" y1="${y}" x2="${x}" y2="${lastY}" stroke="${PAPER.rule}" stroke-width="2"/>
  ${stops
    .map(([name, detail], i) => {
      const cy = y + i * pitch;
      const on = i === highlight;
      const colour = on ? PAPER.accent : PAPER.ink;
      return `
  <circle cx="${x}" cy="${cy}" r="${on ? 11 : 7}" fill="${on ? PAPER.accent : PAPER.ink}"/>
  <text x="${x - 40}" y="${cy + 8}" text-anchor="end" font-family="${MONO}" font-size="21" fill="${PAPER.muted}">${String(i + 1).padStart(2, "0")}</text>
  <text x="${x + 40}" y="${cy - 2}" font-family="${SERIF}" font-weight="bold" font-size="31" fill="${colour}">${esc(name)}</text>
  <text x="${x + 40}" y="${cy + 28}" font-family="${SANS}" font-size="21" fill="${PAPER.muted}">${esc(detail)}</text>`;
    })
    .join("")}`;
};

export const paperFrame = ({ eyebrow, n, total, footer, body }) => `
<svg width="${W}" height="${W}" viewBox="0 0 ${W} ${W}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${W}" fill="${PAPER.bg}"/>

  <text x="64" y="112" font-family="${SANS}" font-size="20" letter-spacing="4" fill="${PAPER.muted}">${esc(eyebrow)}</text>
  <line x1="64" y1="140" x2="${W - 64}" y2="140" stroke="${PAPER.rule}" stroke-width="2"/>

  ${body}

  <text x="64" y="1130" font-family="${SANS}" font-size="19" letter-spacing="2" fill="${PAPER.muted}">${esc(footer)}</text>
  <text x="${W - 64}" y="1136" text-anchor="end" font-family="${SERIF}" font-size="40" fill="${PAPER.rule}">${n}<tspan font-size="20" fill="${PAPER.rule}">/${total}</tspan></text>
</svg>`;

// Emits one PNG per page (useful on their own) and assembles the carousel PDF.
export const render = async (pages, { prefix, pdf: pdfPath }) => {
  const doc = await PDFDocument.create();
  for (const [i, svg] of pages.entries()) {
    const file = `${prefix}${i + 1}.png`;
    await sharp(Buffer.from(svg)).png().toFile(file);
    const png = await doc.embedPng(await fs.readFile(file));
    const page = doc.addPage([W, W]);
    page.drawImage(png, { x: 0, y: 0, width: W, height: W });
  }
  await fs.writeFile(pdfPath, await doc.save());
  console.log("wrote", pdfPath, `(${pages.length} pages)`);
};
