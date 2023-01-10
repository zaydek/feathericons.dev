import { manifest } from "./src/manifest"

const DATE = new Date().toISOString().split("T")[0]

const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://feathericons.dev</loc>
    <lastmod>${DATE}</lastmod>
  </url>
  ${manifest.map(name => `
  <url>
    <loc>https://feathericons.dev/${name}</loc>
    <lastmod>${DATE}</lastmod>
  </url>`.replace("\n  ", "  ")).join("\n").trimStart()}
</urlset>
`.trimStart()

console.log(sitemap)
