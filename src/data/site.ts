export const nav = [
  { href: "/", label: "Me" },
  { href: "/work/", label: "Work" },
  { href: "/screens/", label: "Screens" },
  { href: "/architecture/", label: "Architecture" },
  { href: "/stack/", label: "Stack" },
];

export const services = [
  {
    title: "Backend & distributed systems",
    body: "Event-driven services that stay up: message bus, idempotent consumers, retries and dead-letter handling, health checks and metrics from day one.",
    points: ["FastAPI / Hono APIs", "Redis Streams event bus", "PostgreSQL + pgvector", "Prometheus & Grafana"],
  },
  {
    title: "AI & LLM pipelines",
    body: "Classification and extraction that runs on your own hardware. No per-token bill, no data leaving the building — local models, batched and gated by VRAM.",
    points: ["Ollama, local inference", "Embeddings & semantic search", "Entity and fact extraction", "MCP tooling"],
  },
  {
    title: "Full-stack product delivery",
    body: "The whole chain, not just one layer: ingestion, API, dashboard, auth, billing and the deploy that puts it in front of a customer.",
    points: ["Next.js 15 dashboards", "JWT / JWKS auth", "Stripe subscriptions", "Docker & Traefik"],
  },
  {
    title: "Freelance & consulting",
    body: "Delivered for a regional public prosecutor's office and for private clients. Comfortable owning a project from the first conversation to production.",
    points: ["Scoping & architecture", "Solo or embedded in a team", "Spanish & English", "Remote, UTC-4"],
  },
];

export const stats = [
  { value: 16, suffix: "", label: "Services in production" },
  { value: 160, suffix: "+", label: "Outlets ingested" },
  { value: 3800, suffix: "+", label: "Articles classified daily" },
  { value: 16, suffix: "", label: "Regions covered" },
];

export const pipeline = [
  { step: "01", name: "Ingest", detail: "Playwright · 160+ outlets" },
  { step: "02", name: "Bus", detail: "Redis Streams" },
  { step: "03", name: "Classify", detail: "Local LLM · Ollama" },
  { step: "04", name: "Store", detail: "Postgres · pgvector" },
  { step: "05", name: "Serve", detail: "FastAPI · Traefik" },
  { step: "06", name: "View", detail: "Next.js 15" },
];

export const projects = [
  {
    name: "Media Intelligence Platform",
    meta: "2025 — present",
    kind: "Event-driven SaaS",
    body: "A national media-monitoring platform for the Chilean market, built as 16 services. It ingests news from 160+ outlets, classifies it with local LLMs, extracts entities and facts, and turns that into alerts, dashboards and compliance reports.",
    role: "Sole architect and engineer across all 16 repositories.",
    tags: ["FastAPI", "Redis Streams", "pgvector", "Next.js 15", "Stripe", "Traefik"],
    links: [
      {
        label: "Architecture writeup",
        href: "https://github.com/IntiCerda/media-intel-architecture",
      },
    ],
  },
  {
    name: "Compliance Monitor",
    meta: "2025 — present",
    kind: "Commercial product",
    body: "Reputational-risk and regulatory monitoring for companies in regulated industries, on the same ingestion engine with its own auth boundary. A dedicated agent service runs a catalog of LLM enrichments over classified articles in a VRAM-gated batch.",
    role: "Product, architecture and implementation.",
    tags: ["Ollama", "qwen3:8b", "Embeddings", "SQLAlchemy", "Alembic"],
    links: [
      { label: "compliancemonitor.cl", href: "https://compliancemonitor.cl" },
    ],
  },
  {
    name: "SEN Dashboard",
    meta: "2025",
    kind: "Fiscalía Regional de Coquimbo",
    body: "Scraping and AI classification pipeline for police-news analysis, delivered for a regional public prosecutor's office. Fully containerized, with 36h dedup in Redis and a local model doing the classification.",
    role: "Delivered end to end as a freelance engagement.",
    tags: ["Docker", "Prisma", "Redis", "Ollama", "Next.js"],
    links: [],
  },
  {
    name: "ai-job-search",
    meta: "2025",
    kind: "Open source",
    body: "A job-application framework that runs on your own machine, built on Claude Code: evaluates postings, tailors CVs, writes cover letters and preps interviews.",
    role: "Author.",
    tags: ["TypeScript", "Claude Code", "MCP"],
    links: [
      { label: "Source", href: "https://github.com/IntiCerda/ai-job-search" },
    ],
  },
  {
    name: "Script-Dev-W10-W11",
    meta: "2024",
    kind: "Open source",
    body: "PowerShell bootstrap that takes a clean Windows install to a working development environment in one run.",
    role: "Author.",
    tags: ["PowerShell", "Windows"],
    links: [
      {
        label: "Source",
        href: "https://github.com/IntiCerda/Script-Dev-W10-W11",
      },
    ],
  },
];

export const stack = [
  {
    name: "Languages",
    items: ["TypeScript", "Python", "Go", "SQL", "Java", "C++"],
  },
  {
    name: "Backend",
    items: ["FastAPI", "Hono", "NestJS", "Node.js", "SQLAlchemy", "Prisma"],
  },
  { name: "Frontend", items: ["Next.js", "React", "Astro", "Tailwind"] },
  {
    name: "AI",
    items: [
      "Ollama",
      "LLM pipelines",
      "pgvector",
      "Embeddings",
      "MCP",
      "Claude Code",
    ],
  },
  {
    name: "Infra & Data",
    items: [
      "Docker",
      "PostgreSQL",
      "Redis Streams",
      "Traefik",
      "Prometheus",
      "Grafana",
      "Playwright",
    ],
  },
];
