// LinkedIn carousel for Compliance Monitor — 7 pages, navy and gold.
//
// The palette is the product's own rather than a third invented scheme, so the
// deck reads as the thing it describes.
//
// Verified in source before writing, not taken from marketing copy:
//   133 medios / 76 organismos ....... live compliancemonitor.cl after redeploy
//   Redis Streams consumer groups .... media-compliance-intel/src/consumer/
//                                      article_classified.py (xreadgroup + xack)
//   JWT RS256 + public JWKS .......... media-auth/README.md and src/keys.ts
//   VRAM-gated batch ................. media-compliance-intel/src/batch/
//                                      vram_guard.py; the orchestrator names the
//                                      actual card, an RTX 2070 Super 8GB
import {
  frame, headline, para, item, render, NAVY, MONO, SERIF, W,
} from "./carousel-kit.mjs";

const OUT = "C:\\Users\\PC\\Downloads";
const TOTAL = 7;
const FOOT = "COMPLIANCEMONITOR.CL";
const T = NAVY;

const page = (eyebrow, n, body) =>
  frame({ eyebrow, n, total: TOTAL, footer: FOOT, body, theme: T });

// Accent bar under a headline block. Placing it by hand put it through the
// middle of the last word twice, so it is derived: last baseline + descender
// of the face at this size, plus breathing room.
const rule2 = (y, size, lines) =>
  Math.round(y + (lines - 1) * size * 1.15 + size * 0.26 + 28);

const stat = (value, label, x, y) => `
  <text x="${x}" y="${y}" font-family="${SERIF}" font-weight="bold" font-size="76" fill="${T.accent}">${value}</text>
  <text x="${x}" y="${y + 44}" font-family="${MONO}" font-size="21" fill="${T.muted}">${label}</text>`;

const pages = [
  page(
    "MONITOR REGULATORIO EN MEDIOS · CHILE",
    1,
    `
  ${headline(["Compliance", "Monitor"], 370, 88, T.ink)}
  <rect x="64" y="${rule2(370, 88, 2)}" width="140" height="8" fill="${T.accent}"/>
  ${para("Avisa a una empresa cuando aparece en una investigación, una sanción o un cambio normativo.", 64, 630, 30, T.ink, 1010)}
  ${stat("133", "medios indexados", 64, 830)}
  ${stat("76", "organismos cubiertos", 500, 830)}
  `
  ),

  page(
    "EL PROBLEMA",
    2,
    `
  ${headline(["Enterarse por la prensa", "del lunes."], 250, 52)}
  ${para("Una empresa de industria regulada necesita saber cuándo su sector, sus organismos fiscalizadores o ella misma aparecen en la prensa. Hacerlo a mano significa que alguien busque todos los días, en decenas de portales.", 64, 430, 27, T.ink, W - 180)}
  ${para("Y lo que importa no es la mención. Es el tiempo entre que se publica y alguien dentro se entera.", 64, 640, 27, T.muted, W - 180)}
  `
  ),

  page(
    "TOPOLOGÍA",
    3,
    `
  ${headline(["Ningún servicio llama", "a otro."], 230, 50)}
  ${para("Los productores publican en Redis Streams. Cada consumidor lee con su propio grupo, a su ritmo, y confirma explícitamente lo que procesó.", 64, 390, 26, T.muted, W - 180)}

  <line x1="64" y1="600" x2="${W - 64}" y2="600" stroke="${T.accent}" stroke-width="4"/>
  <text x="64" y="580" font-family="${MONO}" font-size="20" letter-spacing="3" fill="${T.accent}">REDIS STREAMS</text>

  <text x="120" y="540" font-family="${MONO}" font-size="21" fill="${T.ink}">scraper</text>
  <text x="470" y="540" font-family="${MONO}" font-size="21" fill="${T.ink}">billing</text>
  <text x="820" y="540" font-family="${MONO}" font-size="21" fill="${T.ink}">alerts</text>

  <text x="120" y="660" font-family="${MONO}" font-size="21" fill="${T.muted}">compliance-intel</text>
  <text x="520" y="660" font-family="${MONO}" font-size="21" fill="${T.muted}">auth</text>
  <text x="820" y="660" font-family="${MONO}" font-size="21" fill="${T.muted}">notifications</text>

  ${para("Agregar un consumidor es suscribirse a un stream, no editar el servicio de aguas arriba. Y ninguno toca la base de datos de otro.", 64, 800, 26, T.ink, W - 180)}
  `
  ),

  page(
    "LA RESTRICCIÓN",
    4,
    `
  ${headline(["Una sola GPU", "de 8 GB."], 250, 52)}
  ${para("El enriquecimiento con modelos de lenguaje corre en hardware propio, no en una API. La tarjeta es una RTX 2070 Super, y varios servicios comparten esa memoria.", 64, 430, 27, T.ink, W - 180)}
  ${para("Por eso el batch está gateado por VRAM: antes de tomar el siguiente lote consulta si hay memoria libre y espera si no la hay. Sin esa guarda, dos servicios se pisan y el modelo muere a mitad de un artículo.", 64, 610, 27, T.muted, W - 180)}
  <text x="64" y="900" font-family="${MONO}" font-size="23" fill="${T.accent}">vram_guard.esta_vram_disponible()</text>
  `
  ),

  page(
    "AUTH",
    5,
    `
  ${headline(["El plan viaja", "en el token."], 250, 52)}
  ${para("La autenticación es compartida entre los productos del ecosistema. Emite JWT firmados en RS256 y publica un JWKS público.", 64, 430, 27, T.ink, W - 180)}
  ${para("Cada servicio valida la firma contra esa clave, sin llamar al servicio de auth en cada request. Los claims llevan el plan y los límites, así que saber qué puede hacer quien llama no cuesta una consulta.", 64, 610, 27, T.muted, W - 180)}
  <text x="64" y="900" font-family="${MONO}" font-size="23" fill="${T.accent}">JWT RS256 · JWKS público · Hono</text>
  `
  ),

  page(
    "STACK",
    6,
    `
  ${headline(["Lo que hay debajo."], 250, 52)}
  ${item("FastAPI y Hono para los servicios", 64, 420, 27, T.ink)}
  ${item("PostgreSQL con pgvector para búsqueda semántica", 64, 486, 27, T.ink)}
  ${item("Redis Streams como bus de eventos", 64, 552, 27, T.ink)}
  ${item("Next.js 15 para el dashboard", 64, 618, 27, T.ink)}
  ${item("Traefik, Prometheus y Grafana en la infraestructura", 64, 684, 27, T.ink)}
  ${item("Flow.cl para los cobros recurrentes", 64, 750, 27, T.ink)}
  ${para("Todo contenedorizado, levantado con un compose.", 64, 870, 26, T.muted, W - 180)}
  `
  ),

  page(
    "CIERRE",
    7,
    `
  ${headline(["Producto propio,", "casi en producción."], 320, 52)}
  <rect x="64" y="${rule2(320, 52, 2)}" width="140" height="8" fill="${T.accent}"/>
  ${para("compliancemonitor.cl", 64, 580, 32, T.ink, 1010)}
  ${para("Inti Cerda — Backend Engineer", 64, 720, 30, T.ink, 1010)}
  ${para("Coquimbo, Chile · remoto, UTC−4", 64, 768, 25, T.muted, 1010)}
  ${para("linkedin.com/in/inti-cerda", 64, 836, 25, T.muted, 1010)}
  `
  ),
];

await render(pages, {
  prefix: `${OUT}\\compliance-p`,
  pdf: `${OUT}\\carousel-compliance-monitor.pdf`,
});
