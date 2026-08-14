export type Lang = "en" | "es";

// Every human-language string carries both languages; technical labels
// (service names, tech tags) stay single-valued and shared.
type L = Record<Lang, string>;

export const nav: { href: string; label: L }[] = [
  { href: "/", label: { en: "Me", es: "Yo" } },
  { href: "/work/", label: { en: "Work", es: "Proyectos" } },
  { href: "/screens/", label: { en: "Screens", es: "Pantallas" } },
  { href: "/architecture/", label: { en: "Architecture", es: "Arquitectura" } },
  { href: "/stack/", label: { en: "Stack", es: "Stack" } },
];

// Written as what I have built and how I work, not as a services menu — the
// audience here is a hiring team, not a buyer.
export const capabilities: {
  title: L;
  body: L;
  points: Record<Lang, string[]>;
}[] = [
  {
    title: {
      en: "Backend & distributed systems",
      es: "Backend y sistemas distribuidos",
    },
    body: {
      en: "Event-driven services that stay up: message bus, idempotent consumers, retries and dead-letter handling, health checks and metrics from day one.",
      es: "Servicios event-driven que se mantienen arriba: bus de mensajes, consumidores idempotentes, reintentos y dead-letter, health checks y métricas desde el día uno.",
    },
    points: {
      en: ["FastAPI / Hono APIs", "Redis Streams event bus", "PostgreSQL + pgvector", "Prometheus & Grafana"],
      es: ["APIs FastAPI / Hono", "Bus de eventos Redis Streams", "PostgreSQL + pgvector", "Prometheus y Grafana"],
    },
  },
  {
    title: { en: "AI & LLM pipelines", es: "IA y pipelines de LLM" },
    body: {
      en: "Classification and extraction running on self-hosted hardware. No per-token bill, no data leaving the building — local models, batched and gated by VRAM.",
      es: "Clasificación y extracción corriendo en hardware propio. Sin cobro por token y sin datos saliendo del edificio — modelos locales, en batch y regulados por VRAM.",
    },
    points: {
      en: ["Ollama, local inference", "Embeddings & semantic search", "Entity and fact extraction", "MCP tooling"],
      es: ["Ollama, inferencia local", "Embeddings y búsqueda semántica", "Extracción de entidades y hechos", "Tooling MCP"],
    },
  },
  {
    title: {
      en: "Full-stack product delivery",
      es: "Entrega de producto full-stack",
    },
    body: {
      en: "The whole chain, not just one layer: ingestion, API, dashboard, auth, billing and the deploy that puts it in production.",
      es: "La cadena completa, no una sola capa: ingesta, API, dashboard, auth, cobros y el deploy que lo pone en producción.",
    },
    points: {
      en: ["Next.js 15 dashboards", "JWT / JWKS auth", "Flow.cl subscriptions", "Docker & Traefik"],
      es: ["Dashboards en Next.js 15", "Auth JWT / JWKS", "Suscripciones con Flow.cl", "Docker y Traefik"],
    },
  },
  {
    title: { en: "Ownership & collaboration", es: "Autonomía y equipo" },
    body: {
      en: "I take a problem from the first conversation to something running in production, and I write down the decisions on the way. Delivered that way for a regional public prosecutor's office and on my own products.",
      es: "Llevo un problema desde la primera conversación hasta algo corriendo en producción, y dejo las decisiones escritas en el camino. Así entregué para una fiscalía regional y en mis propios productos.",
    },
    points: {
      en: ["Scoping & architecture", "Solo or embedded in a team", "Spanish & English", "Remote, UTC-4"],
      es: ["Alcance y arquitectura", "Solo o integrado a un equipo", "Español e inglés", "Remoto, UTC-4"],
    },
  },
];

export const stats: { value: number; suffix: string; label: L }[] = [
  {
    value: 16,
    suffix: "",
    label: { en: "Services in production", es: "Servicios en producción" },
  },
  {
    value: 133,
    suffix: "",
    label: { en: "Outlets monitored", es: "Medios monitoreados" },
  },
  {
    value: 11000,
    suffix: "+",
    label: { en: "Articles classified", es: "Artículos clasificados" },
  },
  {
    value: 8500,
    suffix: "+",
    label: { en: "Entities resolved", es: "Entidades resueltas" },
  },
];

export const pipeline: { step: string; name: L; detail: L }[] = [
  {
    step: "01",
    name: { en: "Ingest", es: "Ingesta" },
    detail: { en: "Playwright · 133 outlets", es: "Playwright · 133 medios" },
  },
  {
    step: "02",
    name: { en: "Bus", es: "Bus" },
    detail: { en: "Redis Streams", es: "Redis Streams" },
  },
  {
    step: "03",
    name: { en: "Classify", es: "Clasifica" },
    detail: { en: "Local LLM · Ollama", es: "LLM local · Ollama" },
  },
  {
    step: "04",
    name: { en: "Store", es: "Almacena" },
    detail: { en: "Postgres · pgvector", es: "Postgres · pgvector" },
  },
  {
    step: "05",
    name: { en: "Serve", es: "Sirve" },
    detail: { en: "FastAPI · Traefik", es: "FastAPI · Traefik" },
  },
  {
    step: "06",
    name: { en: "View", es: "Vista" },
    detail: { en: "Next.js 15", es: "Next.js 15" },
  },
];

export const projects: {
  name: string;
  meta: L;
  kind: L;
  body: L;
  role: L;
  tags: string[];
  links: { label: L; href: string }[];
}[] = [
  {
    name: "Media Intelligence Platform",
    meta: { en: "2025 — present", es: "2025 — presente" },
    kind: { en: "Event-driven SaaS", es: "SaaS event-driven" },
    body: {
      en: "A national media-monitoring platform for the Chilean market, built as 16 services. It ingests news from 133 outlets, classifies it with local LLMs, extracts entities and facts, and turns that into alerts, dashboards and compliance reports.",
      es: "Una plataforma nacional de monitoreo de medios para el mercado chileno, construida como 16 servicios. Ingesta noticias de 133 medios, las clasifica con LLMs locales, extrae entidades y hechos, y convierte eso en alertas, dashboards e informes de compliance.",
    },
    role: {
      en: "Sole architect and engineer across all 16 repositories.",
      es: "Único arquitecto e ingeniero en los 16 repositorios.",
    },
    tags: ["FastAPI", "Redis Streams", "pgvector", "Next.js 15", "Flow.cl", "Traefik"],
    links: [
      {
        label: { en: "Architecture writeup", es: "Writeup de arquitectura" },
        href: "https://github.com/IntiCerda/media-intel-architecture",
      },
    ],
  },
  {
    name: "Compliance Monitor",
    meta: { en: "2025 — present", es: "2025 — presente" },
    kind: { en: "Personal product", es: "Producto propio" },
    body: {
      en: "Reputational-risk and regulatory monitoring for companies in regulated industries, on the same ingestion engine with its own auth boundary. A dedicated agent service runs a catalog of LLM enrichments over classified articles in a VRAM-gated batch.",
      es: "Monitoreo de riesgo reputacional y regulatorio para empresas de industrias reguladas, sobre el mismo motor de ingesta con su propia frontera de auth. Un servicio de agentes dedicado corre un catálogo de enriquecimientos LLM sobre los artículos clasificados en un batch regulado por VRAM.",
    },
    role: {
      en: "Product, architecture and implementation.",
      es: "Producto, arquitectura e implementación.",
    },
    tags: ["Ollama", "qwen3:8b", "Embeddings", "SQLAlchemy", "Alembic"],
    links: [
      {
        label: { en: "compliancemonitor.cl", es: "compliancemonitor.cl" },
        href: "https://compliancemonitor.cl",
      },
    ],
  },
  {
    name: "SEN Dashboard",
    meta: { en: "2025", es: "2025" },
    kind: {
      en: "Fiscalía Regional de Coquimbo",
      es: "Fiscalía Regional de Coquimbo",
    },
    body: {
      en: "Scraping and AI classification pipeline for police-news analysis, delivered for a regional public prosecutor's office. Fully containerized, with 36h dedup in Redis and a local model doing the classification.",
      es: "Pipeline de scraping y clasificación con IA para análisis de noticias policiales, entregado a una fiscalía regional. Totalmente contenedorizado, con dedup de 36h en Redis y un modelo local haciendo la clasificación.",
    },
    role: {
      en: "Capstone project and professional internship, delivered end to end.",
      es: "Proyecto de título y práctica profesional, entregado de punta a punta.",
    },
    tags: ["Docker", "Prisma", "Redis", "Ollama", "Next.js"],
    links: [],
  },
  {
    name: "ai-job-search",
    meta: { en: "2025", es: "2025" },
    kind: { en: "Open source", es: "Open source" },
    body: {
      en: "A job-application framework that runs on your own machine, built on Claude Code: evaluates postings, tailors CVs, writes cover letters and preps interviews.",
      es: "Un framework de postulación laboral que corre en tu propia máquina, construido sobre Claude Code: evalúa ofertas, adapta CVs, escribe cartas de presentación y prepara entrevistas.",
    },
    role: { en: "Author.", es: "Autor." },
    tags: ["TypeScript", "Claude Code", "MCP"],
    links: [
      {
        label: { en: "Source", es: "Código" },
        href: "https://github.com/IntiCerda/ai-job-search",
      },
    ],
  },
  {
    name: "Script-Dev-W10-W11",
    meta: { en: "2024", es: "2024" },
    kind: { en: "Open source", es: "Open source" },
    body: {
      en: "PowerShell bootstrap that takes a clean Windows install to a working development environment in one run.",
      es: "Bootstrap en PowerShell que lleva una instalación limpia de Windows a un entorno de desarrollo funcionando en una sola corrida.",
    },
    role: { en: "Author.", es: "Autor." },
    tags: ["PowerShell", "Windows"],
    links: [
      {
        label: { en: "Source", es: "Código" },
        href: "https://github.com/IntiCerda/Script-Dev-W10-W11",
      },
    ],
  },
];

// `slug` maps to a simple-icons brand mark; omit it where no mark exists and
// the Icon component falls back to a monogram.
export const stack: {
  name: L;
  items: { label: string; slug?: string }[];
}[] = [
  {
    name: { en: "Languages", es: "Lenguajes" },
    items: [
      { label: "TypeScript", slug: "typescript" },
      { label: "Python", slug: "python" },
      { label: "Go", slug: "go" },
      { label: "JavaScript", slug: "javascript" },
      { label: "Java", slug: "openjdk" },
      { label: "C++", slug: "cplusplus" },
      { label: "SQL" },
    ],
  },
  {
    name: { en: "Backend", es: "Backend" },
    items: [
      { label: "FastAPI", slug: "fastapi" },
      { label: "Hono", slug: "hono" },
      { label: "NestJS", slug: "nestjs" },
      { label: "Node.js", slug: "nodedotjs" },
      { label: "SQLAlchemy", slug: "sqlalchemy" },
      { label: "Prisma", slug: "prisma" },
    ],
  },
  {
    name: { en: "Frontend", es: "Frontend" },
    items: [
      { label: "Next.js", slug: "nextdotjs" },
      { label: "React", slug: "react" },
      { label: "Astro", slug: "astro" },
      { label: "Tailwind", slug: "tailwindcss" },
    ],
  },
  {
    name: { en: "AI", es: "IA" },
    items: [
      { label: "Ollama", slug: "ollama" },
      { label: "Claude Code", slug: "anthropic" },
      { label: "LLM pipelines" },
      { label: "pgvector", slug: "postgresql" },
      { label: "Embeddings" },
      { label: "MCP" },
    ],
  },
  {
    name: { en: "Infra & Data", es: "Infra y datos" },
    items: [
      { label: "Docker", slug: "docker" },
      { label: "PostgreSQL", slug: "postgresql" },
      { label: "Redis Streams", slug: "redis" },
      { label: "Traefik", slug: "traefikproxy" },
      { label: "Prometheus", slug: "prometheus" },
      { label: "Grafana", slug: "grafana" },
      { label: "Playwright" },
      { label: "GitHub Actions", slug: "githubactions" },
    ],
  },
];
