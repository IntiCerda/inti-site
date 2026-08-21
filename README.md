# inti-site

Personal site for [Inti Cerda](https://github.com/IntiCerda) — backend engineer, Coquimbo, Chile.

Astro, static output, no client framework. Five pages behind tabs: Me, Work, Screens, Architecture, Stack.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run verify   # build, then check the generated SEO artifacts agree
```

## Layout

```
src/
├── data/site.ts              # all page content — edit here, not in the pages
├── data/seo.ts               # JSON-LD, route list — derived from site.ts
├── layouts/Base.astro        # tokens, type scale, top bar, reveal script
├── styles/components.css     # shared surfaces: panel, card, flow, figure, tags
├── components/
│   ├── Icon.astro            # simple-icons brand mark, monogram fallback
│   ├── Shot.astro            # desktop + mobile screenshot frame
│   └── diagrams/             # inline SVG architecture diagrams
├── assets/screens/           # captures, optimised to webp at build time
└── pages/                    # one file per tab, plus the generated endpoints
    ├── sitemap.xml.ts        # every route × every locale, with alternates
    ├── llms.txt.ts           # the site as plain Markdown, for models
    └── robots.txt.ts         # points at the sitemap
```

## Machine-readable output

Search engines and language models get the same content the pages do, generated
from `data/site.ts` at build time — never hand-maintained beside it:

| Artifact | Built from |
|---|---|
| `sitemap.xml` | the `nav` route table × both locales, with `hreflang` alternates |
| `llms.txt` | `person`, `nav`, `projects` and `stack`, as plain Markdown |
| `robots.txt` | the configured `site`, so the sitemap URL survives a domain change |
| JSON-LD `Person` | `person` + every technology named in `stack` |
| JSON-LD `CollectionPage` | `projects`, once per locale, in that locale's prose |

The route rules (`localeHref`, `basePath`) live in `data/site.ts` and are shared
by the layout and the sitemap, so a page's `canonical` and its sitemap entry are
computed by the same function rather than by two that agree today.

`npm run verify` builds and then asserts they still agree: every sitemap URL was
built, the `hreflang` sets match between page and sitemap, every JSON-LD block
parses and declares its language, and every project reached all three artifacts.
It exits non-zero when one drifts — a generated artifact nobody checks is a
hand-maintained one with extra steps.

## Conventions

- **Monochrome.** No hue anywhere. Hierarchy comes from weight, size and spacing.
- **Dark first.** Light is the opt-in via `prefers-color-scheme: light`.
- **Latin font subsets only.** The full Shippori Mincho family ships every
  Japanese glyph range — 236 woff2 files and 26MB of build output for a site
  written entirely in Latin script. Import `latin-*.css`, never the bare weight.
- **Degrade safely.** Revealed content is hidden only when `.js` is on the root
  element, counters render their final value server-side, and the architecture
  switcher is radio inputs with no script at all.
- **Motion is decoration.** `prefers-reduced-motion` kills every animation and
  the page stays fully legible.

## Screenshots

Captured with headless Chromium at 1440 and 390 wide, `deviceScaleFactor: 2`,
then run through `astro:assets` into webp. To refresh one, serve the target and
capture it into `src/assets/screens/`.
