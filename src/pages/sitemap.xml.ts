/**
 * sitemap.xml, generated from the nav table in `data/site.ts`.
 *
 * Hand-rolled rather than pulled from an integration: the route list already
 * exists as data and the alternate-link rules already exist as a function, so
 * the whole file is a projection of both. A crawler-based generator would
 * rediscover from the built output what this reads from the source.
 *
 * Every URL carries `xhtml:link` alternates for both locales — the same pairs
 * the pages emit as `hreflang` — so the two can never disagree.
 */

import type { APIRoute } from "astro";
import { abs, routes } from "../data/seo";
import { langs } from "../data/site";

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const GET: APIRoute = ({ site }) => {
  const body = routes(site)
    .map(({ href, url }) => {
      const alternates = langs
        .map(
          (other) =>
            `    <xhtml:link rel="alternate" hreflang="${other}" href="${escape(abs(site, other, href))}"/>`,
        )
        .concat(
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(abs(site, "en", href))}"/>`,
        )
        .join("\n");

      // The home page outranks the rest; nothing else claims a priority it has
      // not earned, so the remaining pages share one.
      const priority = href === "/" ? "1.0" : "0.8";

      return [
        "  <url>",
        `    <loc>${escape(url)}</loc>`,
        alternates,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
