import type { APIContext } from "astro";
import { getTeamMembers } from "../utils/sanity";

export async function GET({ site }: APIContext) {
  const members = await getTeamMembers();
  const base = site?.href.replace(/\/$/, "") ?? "";

  const pages = [
    "",
    "/about",
    "/contact",
    ...members.map((m) => `/about/${m.slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${base}${p}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
