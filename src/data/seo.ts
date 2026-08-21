/**
 * Everything a machine reads about this site, derived from `site.ts`.
 *
 * The rule is that no artifact here restates content — the JSON-LD, the
 * sitemap and llms.txt each project the same objects into a different shape.
 * Adding a project means editing `projects` once; the graph, the URL list and
 * the LLM digest follow on the next build. Anything hand-maintained alongside
 * them would be a second source of truth, which is the thing this file exists
 * to prevent.
 *
 * All of it is computed at build time. Nothing here runs in a browser.
 */

import {
  langs,
  localeHref,
  nav,
  person,
  projects,
  stack,
  type Lang,
} from "./site";

/** Absolute URL for `href` in `lang`, against the configured `site`. */
export function abs(site: URL | undefined, lang: Lang, href: string): string {
  return new URL(localeHref(lang, href), site).href;
}

/** Every page of the site, once per locale. The nav is the route table. */
export function routes(site: URL | undefined): { lang: Lang; href: string; url: string }[] {
  return langs.flatMap((lang) =>
    nav.map(({ href }) => ({ lang, href, url: abs(site, lang, href) })),
  );
}

/** Flat list of every technology named in the stack page. */
function skills(): string[] {
  return stack.flatMap((group) => group.items.map((item) => item.label));
}

/**
 * schema.org Person for the home page.
 *
 * `knowsAbout` comes from the stack table rather than a curated keyword list:
 * a curated list is exactly the copy that goes stale the first time the stack
 * page changes and nobody remembers the JSON-LD exists.
 */
export function personSchema(site: URL | undefined, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${new URL("/", site).href}#person`,
    name: person.name,
    jobTitle: person.role[lang],
    description: person.summary[lang],
    url: abs(site, lang, "/"),
    email: `mailto:${person.email}`,
    image: new URL("/og.png", site).href,
    address: {
      "@type": "PostalAddress",
      addressLocality: person.locality,
      addressRegion: person.region,
      addressCountry: person.country,
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: person.alumniOf },
    knowsLanguage: ["es", "en"],
    knowsAbout: skills(),
    sameAs: person.profiles,
  };
}

/**
 * schema.org CollectionPage + ItemList for the work page.
 *
 * A project links out to its own repository or writeup where one exists; the
 * private ones carry no `url` at all rather than a link that 404s, because a
 * broken `url` in structured data is worse than an absent one.
 */
export function workSchema(site: URL | undefined, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${abs(site, lang, "/work/")}#work`,
    url: abs(site, lang, "/work/"),
    inLanguage: lang,
    about: { "@id": `${new URL("/", site).href}#person` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: project.name,
          description: project.body[lang],
          keywords: project.tags.join(", "),
          creator: { "@id": `${new URL("/", site).href}#person` },
          ...(project.links[0] ? { url: project.links[0].href } : {}),
        },
      })),
    },
  };
}
