/**
 * llms.txt — the site in plain Markdown, for a model that will never render
 * the CSS.
 *
 * Built from the same objects the pages render, in English, because the file
 * is one document at one URL and a mixed-language digest is worse for a reader
 * of either language. The Spanish pages are listed as alternates so a model
 * that wants them can follow the links.
 *
 * Deliberately a digest, not a dump: enough for a model to answer "who is this
 * and what has he built" without re-scraping five pages, and every claim
 * traceable to a page it can go read.
 */

import type { APIRoute } from "astro";
import { abs } from "../data/seo";
import { nav, person, projects, stack } from "../data/site";

export const GET: APIRoute = ({ site }) => {
  const lines: string[] = [
    `# ${person.name}`,
    "",
    `> ${person.role.en} — ${person.summary.en}`,
    "",
    `- Location: ${person.locality}, ${person.region}, ${person.country} (${person.timezone})`,
    `- Education: ${person.alumniOf}`,
    `- Contact: ${person.email}`,
    ...person.profiles.map((url) => `- Profile: ${url}`),
    "",
    "## Pages",
    "",
    ...nav.map(
      ({ href, label }) =>
        `- [${label.en}](${abs(site, "en", href)}) — Spanish: ${abs(site, "es", href)}`,
    ),
    "",
    "## Projects",
    "",
  ];

  for (const project of projects) {
    lines.push(`### ${project.name}`);
    lines.push("");
    lines.push(`${project.meta.en} · ${project.kind.en}`);
    lines.push("");
    lines.push(project.body.en);
    lines.push("");
    lines.push(`Role: ${project.role.en}`);
    lines.push(`Stack: ${project.tags.join(", ")}`);
    for (const link of project.links) {
      lines.push(`${link.label.en}: ${link.href}`);
    }
    lines.push("");
  }

  lines.push("## Stack");
  lines.push("");
  for (const group of stack) {
    lines.push(`- ${group.name.en}: ${group.items.map((i) => i.label).join(", ")}`);
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
