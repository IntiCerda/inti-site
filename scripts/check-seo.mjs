/**
 * Consistency check over the built output. Run after `astro build`:
 *
 *   node scripts/check-seo.mjs
 *
 * The point of generating JSON-LD, the sitemap and llms.txt from one source is
 * that they cannot drift. This asserts that they did not — that every page in
 * the sitemap exists on disk, that the alternates in the sitemap are the same
 * pairs the pages emit as hreflang, that every JSON-LD block parses and names
 * the language of the page it sits on, and that every project on the work page
 * made it into all three artifacts.
 *
 * A generated artifact nobody checks is a hand-maintained artifact with extra
 * steps: the generator can be wrong, and the failure is silent because the
 * page still looks right.
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const read = (p) => readFileSync(join(DIST, p), "utf8");

let failures = 0;
const check = (name, cond, detail = "") => {
  if (cond) {
    console.log(`  ok  ${name}`);
  } else {
    failures += 1;
    console.log(`  FAIL ${name}${detail ? ` — ${detail}` : ""}`);
  }
};

// A URL path maps to the file the static build wrote for it.
const fileFor = (path) => {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `${clean}/index.html` : "index.html";
};

const jsonLd = (html) => {
  const m = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  return m ? JSON.parse(m[1]) : null;
};

console.log("\nsitemap");

const sitemap = read("sitemap.xml");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check("the sitemap is not empty", locs.length > 0);

const origin = new URL(locs[0]).origin;
const missing = locs.filter((url) => !existsSync(join(DIST, fileFor(new URL(url).pathname))));
check("every listed page was actually built", missing.length === 0, missing.join(", "));

const bothLocales = locs.filter((u) => new URL(u).pathname.startsWith("/es/")).length;
check(
  "both locales are listed in equal numbers",
  bothLocales * 2 === locs.length,
  `${bothLocales} es of ${locs.length}`,
);

console.log("\nhreflang agrees between page and sitemap");

for (const url of locs) {
  const path = new URL(url).pathname;
  const html = read(fileFor(path));

  const onPage = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
    .map((m) => `${m[1]} ${m[2]}`)
    .sort();

  // The sitemap block for this URL, up to the closing </url>.
  const block = sitemap.slice(sitemap.indexOf(`<loc>${url}</loc>`));
  const inSitemap = [
    ...block
      .slice(0, block.indexOf("</url>"))
      .matchAll(/hreflang="([^"]+)" href="([^"]+)"/g),
  ]
    .map((m) => `${m[1]} ${m[2]}`)
    .sort();

  check(
    `${path} lists the same alternates in both places`,
    JSON.stringify(onPage) === JSON.stringify(inSitemap),
    `page ${onPage.length} vs sitemap ${inSitemap.length}`,
  );
}

console.log("\nstructured data");

const home = jsonLd(read("index.html"));
check("the home page carries a Person", home?.["@type"] === "Person");
check("the Person has a canonical id", home?.["@id"] === `${origin}/#person`);
check("the Person names its profiles", (home?.sameAs ?? []).length > 0);

const work = jsonLd(read("work/index.html"));
const workEs = jsonLd(read("es/work/index.html"));
check("the work page carries a CollectionPage", work?.["@type"] === "CollectionPage");
check("the Spanish work page declares its language", workEs?.inLanguage === "es");
check(
  "both locales list the same number of projects",
  work?.mainEntity?.itemListElement?.length === workEs?.mainEntity?.itemListElement?.length,
);
check(
  "the Spanish descriptions are not the English ones",
  work?.mainEntity?.itemListElement?.[0]?.item?.description !==
    workEs?.mainEntity?.itemListElement?.[0]?.item?.description,
);
check(
  "the project list credits the Person",
  work?.mainEntity?.itemListElement?.every(
    (entry) => entry.item.creator?.["@id"] === `${origin}/#person`,
  ),
);

// A `url` that 404s is worse than no `url`, so private projects carry none —
// but the ones that do carry a link must carry an absolute one.
const relative = (work?.mainEntity?.itemListElement ?? [])
  .map((entry) => entry.item.url)
  .filter((url) => url && !url.startsWith("http"));
check("every project url is absolute", relative.length === 0, relative.join(", "));

console.log("\nllms.txt");

const llms = read("llms.txt");
const names = (work?.mainEntity?.itemListElement ?? []).map((entry) => entry.item.name);
const absent = names.filter((name) => !llms.includes(name));
check("every project reached llms.txt", absent.length === 0, absent.join(", "));
check(
  "every page reached llms.txt",
  locs.filter((u) => !u.includes("/es/")).every((u) => llms.includes(u)),
);
check("llms.txt points at the Spanish pages too", llms.includes(`${origin}/es/`));

console.log("\nrobots.txt");

const robots = read("robots.txt");
check("robots points at the sitemap", robots.includes(`${origin}/sitemap.xml`));

console.log(failures === 0 ? "\ntodo verde\n" : `\n${failures} fallo(s)\n`);
process.exit(failures === 0 ? 0 : 1);
