import * as fs from "fs"
import * as path from "path"

import { renderToString } from "react-dom/server"
import { App } from "./app"
import { manifest } from "./manifest"

// TODO: Pages can technically be sourced from disk, and names can be sourced
// from exports
const pages = {
  "/": { title: "Home" },

  // Destructure pages
  ...manifest.reduce<Record<typeof manifest[number], { title: string }>>((acc, name) => {
    acc[`/${name}`] = { title: `Page -- ${name}` }
    return acc
  }, {})
}

let buffer: Buffer
try {
  // Try to read the cached _index.html file -- this is supposed to be the
  // original index.html before static site generation
  buffer = fs.readFileSync("dist/_index.html")
} catch {
  buffer = fs.readFileSync("dist/index.html")
  fs.writeFileSync("dist/index.html", "dist/_index.html")
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
  const contents = buffer.toString()

  const start = Date.now()
  for (const [pathname, info] of Object.entries(pages)) {
    const page = contents
      //// .replace(`<div id="root"></div>\n`, `<div id="root">${renderToString(<App />)}</div>`)
      .replace(`<div id="root"></div>\n${" ".repeat(4)}`, `<div id="root">${renderToString(<App initialPath={pathname} />)}</div>`)
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

main()
