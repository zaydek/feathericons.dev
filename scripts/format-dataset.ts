import fs from "node:fs"

import dataset from "./_dataset@4.29.0.json"
import tagset from "./_tagset@4.29.0.json"

import { JSDOM } from "jsdom"
import { toTitleCase } from "../src/lib/cases"
import { detab } from "../src/lib/format"
import { formatAsSvg, formatAsTsx } from "./formats"
import { stringify } from "./stringify"

const omitAttrs = ["class"]

async function feather() {
	// src/data/feather/
	await fs.promises.rm(`src/data/feather@${dataset.meta.version}`, { recursive: true, force: true })
	await fs.promises.mkdir(`src/data/feather@${dataset.meta.version}`, { recursive: true })

	// src/data/react-feather/<name>.svg
	for (const [name, data] of Object.entries(dataset.data)) {
		const { window } = new JSDOM(data)
		const code = stringify(window.document.body.firstElementChild as SVGSVGElement, { strictJsx: false, omitAttrs })
		const svgCode = formatAsSvg(name, code, {
			LICENSE: `<!-- Feather v${dataset.meta.version} | MIT License | https://github.com/feathericons/feather -->`,
			comment: `https://feathericons.dev/${name}`,
		})
		await fs.promises.writeFile(`src/data/feather@${dataset.meta.version}/${name}.svg`, svgCode + "\n")
	}
}

async function react_feather() {
	// src/data/react-feather-manifest.json
	const data = Object.keys(dataset.data).reduce<Record<string, string[]>>((acc, name) => {
		acc[toTitleCase(name)] = tagset[name as keyof typeof tagset] ?? []
		return acc
	}, {})
	const imports = `import * as feather from "./react-feather@${dataset.meta.version}"\n\nexport const manifest: Record<keyof typeof feather, string[]> = ${JSON.stringify(data, null, 2).replace("]\n}", "],\n}")}`
	await fs.promises.writeFile(`src/data/react-feather-manifest@${dataset.meta.version}.ts`, imports + "\n")

	// src/data/react-feather/
	await fs.promises.rm(`src/data/react-feather@${dataset.meta.version}`, { recursive: true, force: true })
	await fs.promises.mkdir(`src/data/react-feather@${dataset.meta.version}`, { recursive: true })

	// src/data/react-feather/index.ts
	const exports = Object.keys(dataset.data).map(name => detab(`
		export * from "./${toTitleCase(name)}"
	`).trim()).join("\n")
	await fs.promises.writeFile(`src/data/react-feather@${dataset.meta.version}/index.ts`, exports + "\n")

	// src/data/react-feather/<Name>.tsx
	for (const [name, data] of Object.entries(dataset.data)) {
		const { window } = new JSDOM(data)
		const code = stringify(window.document.body.firstElementChild as SVGSVGElement, { strictJsx: true, omitAttrs })
		const reactCode = formatAsTsx(toTitleCase(name), code, {
			LICENSE: `/*! Feather v${dataset.meta.version} | MIT License | https://github.com/feathericons/feather */`,
			comment: `https://feathericons.dev/${name}`,
		})
		await fs.promises.writeFile(`src/data/react-feather@${dataset.meta.version}/${toTitleCase(name)}.tsx`, reactCode + "\n")
	}
}

async function main() {
	await feather()
	await react_feather()
}

main()
