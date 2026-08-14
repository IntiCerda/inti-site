// LinkedIn carousel for Script-Dev-W10-W11 — 7 pages.
//
// Every claim here was read out of the scripts, not out of the README: the
// idempotence guard is the `winget list --id` check in setup-dev.ps1, and the
// scheduled task that survives the reboot is in setup-docker-wsl.ps1.
import {
  frame, headline, para, item, codePanel, brandMark, render,
  W, FG, MUTED, RULE, MONO, SERIF,
} from "./carousel-kit.mjs";

const OUT = "C:\\Users\\PC\\Downloads";
const TOTAL = 7;
const FOOT = "GITHUB.COM/INTICERDA/SCRIPT-DEV-W10-W11";

const page = (eyebrow, n, body) =>
  frame({ eyebrow, n, total: TOTAL, footer: FOOT, body });

// Slugs that simple-icons does not carry (VS Code, Windows Terminal, jq were
// removed over trademark policy) fall back to a monogram inside brandMark.
const TOOLS = [
  ["Git", "git"],
  ["VS Code", null],
  ["Terminal", null],
  ["GitHub CLI", "github"],
  ["Go", "go"],
  ["Node · fnm", "nodedotjs"],
  ["Python 3.12", "python"],
  ["Java 21", "openjdk"],
  ["Docker", "docker"],
  ["Ubuntu WSL2", "ubuntu"],
  ["MongoDB", "mongodb"],
  ["Bruno", "bruno"],
  // simple-icons' `make` is Make.com, the automation SaaS — not GNU Make, which
  // is what GnuWin32.Make installs. A monogram is honest; the wrong logo is not.
  ["make", null],
  ["jq", null],
];

// 4 columns x 4 rows. The pitch keeps the last row's caption clear of the rule.
const grid = TOOLS.map((t, i) => {
  const col = i % 4;
  const row = Math.floor(i / 4);
  return brandMark(t[0], t[1], 150 + col * 240, 350 + row * 176);
}).join("");

const pages = [
  page(
    "OPEN SOURCE · POWERSHELL",
    1,
    `
  <text x="64" y="430" font-family="${SERIF}" font-weight="bold" font-size="76" fill="${FG}">Script-Dev</text>
  <text x="64" y="512" font-family="${SERIF}" font-weight="bold" font-size="76" fill="${FG}">W10 · W11</text>
  <line x1="64" y1="566" x2="620" y2="566" stroke="${FG}" stroke-width="3"/>
  ${para("De un Windows recién instalado a un entorno de desarrollo completo, en una corrida.", 64, 634, 32, FG, 1000)}
  ${para("Un comando, con PowerShell como administrador.", 64, 748, 24, MUTED, 1000)}
  `
  ),

  page(
    "EL PROBLEMA",
    2,
    `
  ${headline(["Armar una máquina nueva", "toma un día entero."], 240)}
  ${para("Y al terminar nadie sabe qué quedó instalado ni en qué versión. La próxima vez se hace otra vez, distinto.", 64, 420, 28, FG, W - 160)}
  ${para("Un equipo donde cada máquina se armó a mano es un equipo donde «en la mía funciona» es una respuesta válida.", 64, 580, 28, MUTED, W - 160)}
  `
  ),

  page(
    "QUÉ INTEGRA",
    3,
    `
  ${headline(["Catorce herramientas,", "una sola corrida."], 210)}
  ${grid}
  `
  ),

  page(
    "IDEMPOTENCIA",
    4,
    `
  ${headline(["Correrlo dos veces", "no rompe nada."], 220)}
  ${para("Cada paquete se consulta antes de instalarse. Si ya está, se salta.", 64, 400, 26, MUTED, W - 160)}
  ${codePanel(
    [
      "$check = winget list --id $Id --exact |",
      "         Select-String ([regex]::Escape($Id))",
      "",
      "if ($check) { Write-Host \"  ya instalado\" }",
      "else        { winget install --id $Id -e --silent }",
    ],
    64,
    470,
    W - 128,
    22
  )}
  ${para("Eso vuelve al script seguro de re-ejecutar: sirve para montar una máquina nueva y también para completar una a medias.", 64, 800, 26, FG, W - 160)}
  `
  ),

  page(
    "EL DETALLE DIFÍCIL",
    5,
    `
  ${headline(["WSL2 necesita reiniciar.", "El script sigue después."], 220)}
  ${para("Habilitar WSL2 y Virtual Machine Platform requiere un reinicio, y hasta que ocurre el kernel no está activo. Instalar Ubuntu antes de eso falla.", 64, 400, 26, MUTED, W - 160)}

  <rect x="64" y="560" width="${W - 128}" height="230" fill="none" stroke="${RULE}" stroke-width="2"/>
  <text x="92" y="612" font-family="${MONO}" font-size="22" fill="${MUTED}">1 · detecta que hay un reinicio pendiente</text>
  <text x="92" y="662" font-family="${MONO}" font-size="22" fill="${MUTED}">2 · registra una tarea programada al inicio de sesión</text>
  <text x="92" y="712" font-family="${MONO}" font-size="22" fill="${FG}">3 · tras el reinicio instala Ubuntu</text>
  <text x="92" y="762" font-family="${MONO}" font-size="22" fill="${FG}">4 · la tarea se da de baja a sí misma</text>

  ${para("Sin eso, el usuario tendría que acordarse de volver a correr algo. Con eso, termina solo.", 64, 860, 26, FG, W - 160)}
  `
  ),

  page(
    "TRES SCRIPTS",
    6,
    `
  ${headline(["Modular, no monolítico."], 240)}
  ${item("Basic — lenguajes, editor, CLI y extensiones de VS Code", 64, 420, 27)}
  ${item("Docker and WSL — WSL2, Ubuntu y Docker Desktop", 64, 490, 27)}
  ${item("Complete — orquesta los dos anteriores de punta a punta", 64, 560, 27)}
  ${para("Quien solo quiere el entorno base no se lleva Docker puesto. Quien ya tiene Docker no lo reinstala.", 64, 680, 26, MUTED, W - 160)}
  ${para("263 líneas de PowerShell en total.", 64, 800, 26, FG, W - 160)}
  `
  ),

  page(
    "CIERRE",
    7,
    `
  ${headline(["Código abierto,", "listo para clonar."], 300)}
  <line x1="64" y1="500" x2="620" y2="500" stroke="${FG}" stroke-width="3"/>
  ${para("github.com/IntiCerda/Script-Dev-W10-W11", 64, 570, 30, FG, 1050)}
  ${para("Inti Cerda — Backend Engineer", 64, 700, 30, FG, 1000)}
  ${para("Coquimbo, Chile · remoto, UTC−4", 64, 748, 26, MUTED, 1000)}
  ${para("linkedin.com/in/inti-cerda", 64, 820, 26, MUTED, 1000)}
  `
  ),
];

await render(pages, {
  prefix: `${OUT}\\scriptdev-p`,
  pdf: `${OUT}\\carousel-script-dev.pdf`,
});
