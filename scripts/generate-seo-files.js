import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { indexablePaths } from "../src/seo/seoPages.js";

const outputDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const configuredSiteUrl =
  process.env.VITE_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL;

const normalizeSiteUrl = (value) => {
  if (!value) return null;
  const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  return url.origin;
};

const siteUrl = normalizeSiteUrl(configuredSiteUrl);
const robots = [
  "User-agent: *",
  "Allow: /",
  "Disallow: /auth",
  "Disallow: /profile",
  "Disallow: /pdf",
  "Disallow: /infinite",
  "Disallow: /features/demo-auth",
  "Disallow: /features/infinite-scroll2",
];

await mkdir(outputDirectory, { recursive: true });

if (siteUrl) {
  const sitemapEntries = indexablePaths
    .map((path) => {
      const url = new URL(path, siteUrl).toString();
      return `  <url><loc>${url}</loc></url>`;
    })
    .join("\n");
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    sitemapEntries,
    "</urlset>",
    "",
  ].join("\n");

  robots.push(`Sitemap: ${siteUrl}/sitemap.xml`);
  await writeFile(new URL("sitemap.xml", `file://${outputDirectory.replaceAll("\\", "/")}/`), sitemap);
} else {
  console.warn("SEO sitemap was not generated. Set VITE_SITE_URL to the production origin.");
}

await writeFile(new URL("robots.txt", `file://${outputDirectory.replaceAll("\\", "/")}/`), `${robots.join("\n")}\n`);