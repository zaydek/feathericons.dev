import fs from "node:fs"

import JSZip from "jszip"
import featherTags from "./_feather-tags@4.29.0.json"
import feather from "./_feather@4.29.0.json"

import { JSDOM } from "jsdom"
import { toTitleCase } from "../src/lib/cases"
import { detab } from "../src/lib/format"
import { formatAsSvg, formatAsTsx } from "./format"
import { stringify } from "./stringify"

const omitAttrs = ["class"]

async function feather_svg() {
	const zip = new JSZip()

	// src/data/feather/
	try {
		await fs.promises.rm(`src/data/feather@${feather.meta.version}`, { recursive: true, force: true })
	} catch { }
	await fs.promises.mkdir(`src/data/feather@${feather.meta.version}`, { recursive: true })

	// src/data/react-feather/<name>.svg
	for (const [name, data] of Object.entries(feather.data)) {
		const { window } = new JSDOM(data)
		const code = stringify(window.document.body.firstElementChild as SVGSVGElement, { strictJsx: false, omitAttrs })
		const codeAsSvg = formatAsSvg(name, code, {
			license: `<!-- Feather v${feather.meta.version} | MIT License | https://github.com/feathericons/feather -->`,
			comment: `https://feathericons.dev/${name}`,
		})
		// Prefer spaces because this can be downloaded
		await fs.promises.writeFile(`src/data/feather@${feather.meta.version}/${name}.svg`, codeAsSvg)
		zip.file(`${name}.svg`, codeAsSvg.replaceAll("\t", "  ") + "\n")
	}

	// src/data/feather.zip
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.promises.writeFile(`src/data/feather@${feather.meta.version}.zip`, buffer)
}

async function feather_tsx() {
	// src/data/react-feather-manifest.json
	const data = Object.keys(feather.data).reduce<Record<string, string[]>>((acc, name) => {
		acc[toTitleCase(name)] = featherTags[name as keyof typeof featherTags] ?? []
		return acc
	}, {})
	const imports = `import * as feather from "./react-feather@${feather.meta.version}"\n\nexport const manifest: Record<keyof typeof feather, string[]> = ${JSON.stringify(data, null, 2).replace("]\n}", "],\n}")}`
	await fs.promises.writeFile(`src/data/react-feather-manifest@${feather.meta.version}.ts`, imports + "\n")

	// src/data/react-feather/
	try {
		await fs.promises.rm(`src/data/react-feather@${feather.meta.version}`, { recursive: true, force: true })
	} catch { }
	await fs.promises.mkdir(`src/data/react-feather@${feather.meta.version}`, { recursive: true })

	// src/data/react-feather/index.ts
	const exports = Object.keys(feather.data).map(name => detab(`
		export * from "./${toTitleCase(name)}"
	`).trim()).join("\n")
	await fs.promises.writeFile(`src/data/react-feather@${feather.meta.version}/index.ts`, exports + "\n")

	// src/data/react-feather/<Name>.tsx
	for (const [name, data] of Object.entries(feather.data)) {
		const { window } = new JSDOM(data)
		const code = stringify(window.document.body.firstElementChild as SVGSVGElement, { strictJsx: true, omitAttrs })
		const codeAsTsx = formatAsTsx(toTitleCase(name), code, {
			license: `/*! Feather v${feather.meta.version} | MIT License | https://github.com/feathericons/feather */`,
			comment: `https://feathericons.dev/${name}`,
		})
		await fs.promises.writeFile(`src/data/react-feather@${feather.meta.version}/${toTitleCase(name)}.tsx`, codeAsTsx + "\n")
	}
}

async function main() {
	await feather_svg()
	await feather_tsx()
}

main()
