import * as fs from "fs"
import * as path from "path"

import { renderToString } from "react-dom/server"
import { App } from "./app"
import { manifest } from "./data/react-feather-manifest"

// TODO: Pages can technically be sourced from disk, and names can be sourced
// from exports
const pages = {
	"/": { title: "Home" },
	...Object.keys(manifest).reduce<{ [key: string]: { title: string } }>((acc, name) => {
		acc[name] = { title: `Page -- ${name}` }
		return acc
	}, {}),
}

const DATE = new Date().toISOString().split("T")[0]

const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://feathericons.dev</loc>
    <lastmod>${DATE}</lastmod>
  </url>
  ${Object.keys(manifest)
		.map(name =>
			`
  <url>
    <loc>https://feathericons.dev/${name}</loc>
    <lastmod>${DATE}</lastmod>
  </url>`.replace("\n  ", "  ")
		)
		.join("\n")
		.trimStart()}
</urlset>
`.trimStart()

let buffer: Buffer
try {
	// Try to read the cached _index.html file -- this is supposed to be the
	// original index.html before static site generation
	buffer = fs.readFileSync("dist/_index.html")
} catch {
	buffer = fs.readFileSync("dist/index.html")
	fs.cpSync("dist/index.html", "dist/_index.html")
}

function getDiskPathname(pathname: string) {
	if (pathname.endsWith("/")) {
		return pathname.slice(0, -1) + "index.html"
	} else {
		return pathname + ".html"
	}
}

function formatDuration(ms: number) {
	if (ms < 1e3) {
		return `${ms}ms`
	} else {
		return `${ms / 1e3}s`
	}
}

async function main() {
	fs.writeFileSync("dist/sitemap.xml", sitemap)
	console.log("+ sitemap.xml")
	const contents = buffer.toString()
	for (const [pathname, info] of Object.entries(pages)) {
		const page = contents
			.replace(`<div id="root"></div>`, `<div id="root">${renderToString(<App initialPath={`/${pathname}`} />)}</div>`)
			.replace(/<title>[^<]*<\/title>/, `<title>${info.title}</title>`) // TODO: HTML entities need to be encoded
		const filename = `dist/${getDiskPathname(pathname)}`
		fs.mkdirSync(path.dirname(filename), { recursive: true })
		fs.writeFileSync(filename, page)
		console.log(`+ ${pathname}`)
		//// console.log(page)
	}
	console.log()
	console.log("Done in", formatDuration(Date.now() - start))
	console.log()
}

const start = Date.now()
main()
