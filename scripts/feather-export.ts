import fs from "node:fs"

import JSZip from "jszip"
import _featherTags from "./_feather-tags.generated.json"
import _feather from "./_feather.generated.json"

import { JSDOM } from "jsdom"
import { convertToTitleCase } from "../src/lib/cases"
import { detab } from "../src/lib/format"
import { formatAsSvg, formatAsTsx } from "./utils/-format"
import { stringify } from "./utils/-stringify"

const omitAttrs = ["class"]

function getTags(arg: keyof typeof _featherTags) {
	return _featherTags[arg] ?? []
}

function getMore(arg: keyof typeof _featherTags) {
	const more = new Set<string>()
	const argTags = _featherTags[arg] ?? []
	ctx: for (const [name, tags] of Object.entries(_featherTags)) {
		// Compare argument name vs. name
		for (const k of arg.split("-")) {
			for (const n of name.split("-")) {
				if (n === k) {
					more.add(name)
					continue ctx
				}
			}
		}
		//// // Compare argument name vs. tags
		//// for (const k of arg.split("-")) {
		//// 	for (const tag of tags) {
		//// 		for (const t of tag.split("-")) {
		//// 			if (t === k) {
		//// 				more.add(name)
		//// 				continue ctx
		//// 			}
		//// 		}
		//// 	}
		//// }
		// Compare argument tags vs. tags
		for (const argTag of argTags) {
			for (const tag of tags) {
				if (tag === argTag) {
					more.add(name)
					continue ctx
				}
			}
		}
	}
	return [...more]
		.filter(m => m !== arg) // Dedupe
		.map(m => convertToTitleCase(m))
}

async function exportAsSvg() {
	const zip = new JSZip()

	// public/feather
	try {
		await fs.promises.rm(`public/feather`, { recursive: true, force: true })
	} catch {}
	await fs.promises.mkdir(`public/feather`, { recursive: true })

	// public/feather/<name>.svg
	for (const [name, data] of Object.entries(_feather.data)) {
		const { window } = new JSDOM(data)
		const code = stringify(window.document.body.firstElementChild as SVGSVGElement, { strictJsx: false, omitAttrs })
		const codeAsSvg = formatAsSvg(name, code, {
			//// license: `<!-- Feather v${feather.meta.version} | MIT License | https://github.com/feathericons/feather -->`,
			comment: `https://feathericons.com/${name}`,
		})
		await fs.promises.writeFile(`public/feather/${name}.svg`, codeAsSvg + "\n")
		zip.file(`${name}.svg`, codeAsSvg.replaceAll("\t", "  ") + "\n")
	}

	// public/feather.zip
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.promises.writeFile(`public/feather.zip`, buffer)
}

async function exportAsTsx() {
	// src/data/manifest.json
	const data = Object.keys(_feather.data).reduce<Record<string, { tags: string[]; more: string[] }>>((acc, key) => {
		const kebab = key as keyof typeof _featherTags // 🍢
		acc[convertToTitleCase(kebab)] = {
			tags: getTags(kebab),
			more: getMore(kebab),
		}
		return acc
	}, {})
	// prettier-ignore
	const imports = `import * as feather from "./react-feather"\n\nexport const version = ${JSON.stringify(_feather.meta.version)}\n\nexport const manifest: Record<keyof typeof feather, { tags: string[], more: (keyof typeof feather)[] }> = ${JSON.stringify(data, null, 2).replace("]\n}", "],\n}")}`
	await fs.promises.writeFile(`src/data/manifest.ts`, imports + "\n")

	// src/data/react-feather
	try {
		await fs.promises.rm(`src/data/react-feather`, { recursive: true, force: true })
	} catch {}
	await fs.promises.mkdir(`src/data/react-feather`, { recursive: true })

	// src/data/react-feather/index.ts
	// prettier-ignore
	const exports = Object.keys(_feather.data).map(name => detab(`
		export * from "./${convertToTitleCase(name)}"
	`).trim()).join("\n")
	await fs.promises.writeFile(`src/data/react-feather/index.ts`, exports + "\n")

	// src/data/react-feather/<Name>.tsx
	for (const [name, data] of Object.entries(_feather.data)) {
		const { window } = new JSDOM(data)
		const code = stringify(window.document.body.firstElementChild as SVGSVGElement, { strictJsx: true, omitAttrs })
		const codeAsTsx = formatAsTsx(convertToTitleCase(name), code, {
			//// license: `/*! Feather v${feather.meta.version} | MIT License | https://github.com/feathericons/feather */`,
			comment: `https://feathericons.com/${name}`,
		})
		await fs.promises.writeFile(`src/data/react-feather/${convertToTitleCase(name)}.tsx`, codeAsTsx + "\n")
	}
}

async function main() {
	await exportAsSvg()
	await exportAsTsx()
}

main()
