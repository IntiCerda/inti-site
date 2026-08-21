/**
 * robots.txt, generated so the sitemap URL is derived from `site` rather than
 * pasted into a static file that outlives the domain it names.
 *
 * Nothing is disallowed: every page here is meant to be read.
 */

import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${new URL("/sitemap.xml", site).href}`,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
