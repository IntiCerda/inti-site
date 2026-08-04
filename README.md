# inti-site

Personal site for [Inti Cerda](https://github.com/IntiCerda) — backend engineer, Coquimbo, Chile.

Astro, static output, no client framework. Five pages behind tabs: Me, Work, Screens, Architecture, Stack.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

## Layout

```
src/
├── data/site.ts              # all page content — edit here, not in the pages
├── layouts/Base.astro        # tokens, type scale, top bar, reveal script
├── styles/components.css     # shared surfaces: panel, card, flow, figure, tags
├── components/
│   ├── Icon.astro            # simple-icons brand mark, monogram fallback
│   ├── Shot.astro            # desktop + mobile screenshot frame
│   └── diagrams/             # inline SVG architecture diagrams
├── assets/screens/           # captures, optimised to webp at build time
└── pages/                    # one file per tab
```

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
