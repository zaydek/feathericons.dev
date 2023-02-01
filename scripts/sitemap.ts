import fs from "node:fs"

import { manifest } from "../src/data/react-feather-manifest"
import { toKebabCase } from "../src/lib/cases"
import { detab } from "../src/lib/format"

const DATE = new Date().toISOString().split("T")[0]

async function main() {
	const sitemap = detab(`
		<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			<url>
				<loc>https://feathericons.dev</loc>
				<lastmod>${DATE}</lastmod>
			</url>
			${Object.keys(manifest).map(name => `
			<url>
				<loc>https://feathericons.dev/${toKebabCase(name)}</loc>
				<lastmod>${DATE}</lastmod>
			</url>`.replace("\n\t\t", "\t\t")).join("\n").trimStart()}
		</urlset>
	`).replaceAll("\t", "  ") + "\n"
  await fs.promises.writeFile("out/sitemap.xml", sitemap)
  console.log("+ sitemap.xml")
}

main()
