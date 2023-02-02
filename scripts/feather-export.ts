import fs from "node:fs"

import JSZip from "jszip"
import _featherTags from "./_feather-tags.generated.json"
import _feather from "./_feather.generated.json"

import { JSDOM } from "jsdom"
import { toTitleCase } from "../src/lib/cases"
import { detab } from "../src/lib/format"
import { formatAsSvg, formatAsTsx } from "./utils/format"
import { stringify } from "./utils/stringify"

const omitAttrs = ["class"]

function getTags(kebab: keyof typeof _featherTags) {
	return (_featherTags[kebab] ?? []) as string[]
}

function getMore(kebab: keyof typeof _featherTags) {
	const more = new Set<string>()
	const chunks = kebab.split("-")
	ctx: for (const [name, tags] of Object.entries(_featherTags)) {
		// Dedupe
		if (kebab === name) { continue } // prettier-ignore
		for (const n of name.split("-")) {
			for (const chunk of chunks) {
				if (chunk === n) {
					more.add(toTitleCase(name))
					continue ctx
				}
			}
		}
		for (const tag of tags) {
			for (const t of tag.split("-")) {
				for (const chunk of chunks) {
					if (chunk === t) {
						more.add(toTitleCase(name))
						continue ctx
					}
				}
			}
		}
	}
	return [...more]
}

async function exportAsSvg() {
	const zip = new JSZip()

	// src/data/feather
	try {
		await fs.promises.rm(`src/data/feather`, { recursive: true, force: true })
	} catch {}
	await fs.promises.mkdir(`src/data/feather`, { recursive: true })

	// src/data/feather/<name>.svg
	for (const [name, data] of Object.entries(_feather.data)) {
		const { window } = new JSDOM(data)
		const code = stringify(window.document.body.firstElementChild as SVGSVGElement, { strictJsx: false, omitAttrs })
		const codeAsSvg = formatAsSvg(name, code, {
			//// license: `<!-- Feather v${feather.meta.version} | MIT License | https://github.com/feathericons/feather -->`,
			comment: `https://feathericons.com/${name}`,
		})
		await fs.promises.writeFile(`src/data/feather/${name}.svg`, codeAsSvg + "\n")
		zip.file(`${name}.svg`, codeAsSvg.replaceAll("\t", "  ") + "\n")
	}

	// src/data/feather.zip
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.promises.writeFile(`src/data/feather.zip`, buffer)
}

async function exportAsTsx() {
	// src/data/manifest.json
	const data = Object.keys(_feather.data).reduce<Record<string, { tags: string[]; more: string[] }>>((acc, key) => {
		const kebab = key as keyof typeof _featherTags // 🍢
		acc[toTitleCase(kebab)] = {
			tags: getTags(kebab),
			more: getMore(kebab),
		}
		return acc
	}, {})
	// prettier-ignore
	const imports = `import * as feather from "./react-feather"\n\nexport const version = ${JSON.stringify(_feather.meta.version)}\n\nexport const manifest: Record<keyof typeof feather, { tags: string[], more: (keyof typeof feather)[] }> = ${JSON.stringify(data, null, 2).replace("]\n}", "],\n}")}`
	await fs.promises.writeFile(`src/data/react-feather-manifest.ts`, imports + "\n")

	// src/data/react-feather
	try {
		await fs.promises.rm(`src/data/react-feather`, { recursive: true, force: true })
	} catch { }
	await fs.promises.mkdir(`src/data/react-feather`, { recursive: true })

	// src/data/react-feather/index.ts
	// prettier-ignore
	const exports = Object.keys(_feather.data).map(name => detab(`
		export * from "./${toTitleCase(name)}"
	`).trim()).join("\n")
	await fs.promises.writeFile(`src/data/react-feather/index.ts`, exports + "\n")

	// src/data/react-feather/<Name>.tsx
	for (const [name, data] of Object.entries(_feather.data)) {
		const { window } = new JSDOM(data)
		const code = stringify(window.document.body.firstElementChild as SVGSVGElement, { strictJsx: true, omitAttrs })
		const codeAsTsx = formatAsTsx(toTitleCase(name), code, {
			//// license: `/*! Feather v${feather.meta.version} | MIT License | https://github.com/feathericons/feather */`,
			comment: `https://feathericons.com/${name}`,
		})
		await fs.promises.writeFile(`src/data/react-feather/${toTitleCase(name)}.tsx`, codeAsTsx + "\n")
	}
}

async function main() {
	await exportAsSvg()
	await exportAsTsx()
}

main()
