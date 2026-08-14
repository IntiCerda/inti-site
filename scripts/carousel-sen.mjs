// LinkedIn carousel for the SEN Dashboard — 7 pages, paper theme.
//
// Deliberately not the dark card system used by the other decks: this is a
// public-sector delivery, and a run of identical-looking decks stops being read.
//
// Claims verified in the repo before writing: the 36h dedup TTL and the service
// table are in README.md, the production model qwen2.5:7b is in
// Manual_de_Sistema-FiscaliaRegional.md, and the three LLM stages are the
// clasificador / enriquecedor / consolidador agents in python_scripts/agents.
import {
  paperFrame, headline, sans, flow, render, PAPER, SANS, SERIF, MONO, W,
} from "./carousel-kit.mjs";

const OUT = "C:\\Users\\PC\\Downloads";
const TOTAL = 7;
const FOOT = "SEN DASHBOARD · FISCALÍA REGIONAL DE COQUIMBO";

const page = (eyebrow, n, body) =>
  paperFrame({ eyebrow, n, total: TOTAL, footer: FOOT, body });

const rule = (y, x1 = 64, x2 = W - 64) =>
  `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${PAPER.rule}" stroke-width="2"/>`;

const pages = [
  page(
    "PROYECTO DE TÍTULO · PRÁCTICA PROFESIONAL",
    1,
    `
  ${headline(["SEN", "Dashboard"], 380, 96, PAPER.ink)}
  <rect x="64" y="560" width="120" height="8" fill="${PAPER.accent}"/>
  ${sans("Análisis de noticias policiales para la Fiscalía Regional de Coquimbo.", 64, 660, 32, PAPER.ink, 1000)}
  ${sans("Entregado y en uso por la Unidad de Análisis.", 64, 780, 24, PAPER.muted, 1000)}
  `
  ),

  page(
    "EL ENCARGO",
    2,
    `
  ${headline(["Saber qué se publica", "sobre delitos en la región."], 280, 52, PAPER.ink)}
  ${sans("La Unidad de Análisis necesitaba seguir lo que la prensa publicaba sobre hechos delictuales en su jurisdicción. Hacerlo a mano significa leer decenas de medios todos los días y transcribir a planilla.", 64, 460, 27, PAPER.ink, W - 200)}
  ${rule(640)}
  ${sans("La misma nota aparece replicada en muchos portales. Contarla varias veces distorsiona cualquier lectura de tendencia.", 64, 700, 27, PAPER.muted, W - 200)}
  `
  ),

  page(
    "EL PIPELINE",
    3,
    `
  ${headline(["De la nota publicada", "al hecho estructurado."], 230, 46, PAPER.ink)}
  ${flow(
    [
      ["Scraping", "portales de prensa regional y nacional"],
      ["Dedup", "ventana de 36 horas en Redis"],
      ["Clasificación", "qwen2.5:7b local vía Ollama"],
      ["Enriquecimiento", "extrae entidades del texto"],
      ["Consolidación", "agrupa lo que es un mismo hecho"],
      ["Dashboard", "Next.js 15 sobre PostgreSQL"],
    ],
    { y: 400, pitch: 106, highlight: 2 }
  )}
  `
  ),

  page(
    "LA DECISIÓN",
    4,
    `
  ${headline(["El modelo corre adentro."], 280, 52, PAPER.ink)}
  ${sans("La clasificación la hace un modelo local servido por Ollama, en el mismo Docker que el resto del sistema. No hay llamadas a una API externa.", 64, 400, 28, PAPER.ink, W - 200)}
  ${rule(560)}
  ${sans("No es preferencia técnica: es material de una fiscalía. Mandar el texto a un proveedor externo convierte una decisión de arquitectura en una de confidencialidad, y esa no me correspondía tomarla.", 64, 620, 27, PAPER.muted, W - 200)}
  <text x="64" y="880" font-family="${MONO}" font-size="24" fill="${PAPER.accent}">qwen2.5:7b · Ollama · sin salida a internet</text>
  `
  ),

  page(
    "EL DETALLE",
    5,
    `
  ${headline(["Una noticia replicada", "sigue siendo una noticia."], 250, 50, PAPER.ink)}
  ${sans("Un mismo hecho se publica en muchos portales con títulos distintos. Sin control, el sistema lo cuenta una vez por medio.", 64, 430, 27, PAPER.ink, W - 200)}

  <rect x="64" y="560" width="${W - 128}" height="180" fill="none" stroke="${PAPER.rule}" stroke-width="2"/>
  <text x="110" y="640" font-family="${SERIF}" font-weight="bold" font-size="72" fill="${PAPER.accent}">36 h</text>
  <text x="330" y="622" font-family="${SANS}" font-size="25" fill="${PAPER.ink}">ventana de deduplicación en Redis,</text>
  <text x="330" y="662" font-family="${SANS}" font-size="25" fill="${PAPER.ink}">por URL y por similitud de texto</text>

  ${sans("Sirve para que un conteo de hechos signifique algo. Es la diferencia entre medir la realidad y medir la cobertura.", 64, 830, 27, PAPER.muted, W - 200)}
  `
  ),

  page(
    "LA ENTREGA",
    6,
    `
  ${headline(["Cinco servicios,", "un solo comando."], 260, 52, PAPER.ink)}
  ${[
    ["postgres", "PostgreSQL 16"],
    ["nextjs", "API REST y frontend"],
    ["redis", "caché y dedup"],
    ["ollama", "modelo local"],
    ["python-api", "scraping y clasificación"],
  ]
    .map(
      ([svc, desc], i) => `
  <text x="64" y="${450 + i * 62}" font-family="${MONO}" font-size="26" fill="${PAPER.ink}">${svc}</text>
  <text x="360" y="${450 + i * 62}" font-family="${SANS}" font-size="24" fill="${PAPER.muted}">${desc}</text>`
    )
    .join("")}
  ${rule(800)}
  ${sans("Todo en Docker: en la máquina de la fiscalía no hace falta instalar nada más. Se entregó con manual de sistema y manual de usuario.", 64, 860, 26, PAPER.ink, W - 200)}
  `
  ),

  page(
    "CIERRE",
    7,
    `
  ${headline(["Entregado a un", "cliente de gobierno."], 340, 54, PAPER.ink)}
  <rect x="64" y="530" width="120" height="8" fill="${PAPER.accent}"/>
  ${sans("Docker · Next.js 15 · Python · PostgreSQL · Redis · Ollama · Prisma", 64, 620, 25, PAPER.muted, 1060)}
  ${sans("Inti Cerda — Backend Engineer", 64, 740, 30, PAPER.ink, 1000)}
  ${sans("Coquimbo, Chile · remoto, UTC−4", 64, 786, 24, PAPER.muted, 1000)}
  ${sans("linkedin.com/in/inti-cerda", 64, 850, 24, PAPER.muted, 1000)}
  `
  ),
];

await render(pages, {
  prefix: `${OUT}\\sen-p`,
  pdf: `${OUT}\\carousel-sen-dashboard.pdf`,
});
