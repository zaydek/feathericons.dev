// Node
import fs from "node:fs/promises"
import path from "node:path"

// NPM
import { JSDOM } from "jsdom"
import JSZip from "jszip"
import SVGO from "svgo"

import { convertToTitleCase, detab, sleep } from "@/lib"
import { formatSvg } from "./utils/format-svg"
import { transformSvg, transformTsx } from "./utils/transform-svg"

const EOF = "\n"

// prettier-ignore
const featherSvgBanner = (name: string) => detab(`
	<!-- https://feathericons.dev/${name} -->
`)

// prettier-ignore
const featherTsxBanner = (name: string) => detab(`
	// https://feathericons.dev/${name}
`)

////////////////////////////////////////////////////////////////////////////////

async function getIcons(srcdir: string) {
	const icons: Record<string, string> = {}
	const basenames = await fs.readdir(srcdir)
	for (const basename of basenames) {
		const { name } = path.parse(basename)
		const icon = await fs.readFile(path.join(srcdir, basename), "utf-8")
		icons[name] = icon
	}
	return icons
}

function optimizeIcons(icons: Record<string, string>) {
	const icons2: Record<string, string> = {}
	for (const [name, icon] of Object.entries(icons)) {
		const icon2 = SVGO.optimize(icon, {
			plugins: [
				"preset-default",
				{
					name: "collapseGroups",
				},
				{
					name: "prefixIds",
					params: { prefix: name },
				},
			],
		}).data
		icons2[name] = icon2
	}
	return icons2
}

function formatIcons(icons: Record<string, string>, { strictJsx }: { strictJsx: boolean }) {
	const icons2: Record<string, string> = {}
	for (const [name, icon] of Object.entries(icons)) {
		const { window } = new JSDOM(icon)
		const icon2 = formatSvg(window.document.body.firstElementChild as SVGSVGElement, { strictJsx })
		icons2[name] = icon2
	}
	return icons2
}

////////////////////////////////////////////////////////////////////////////////

async function exportSvgAndZip(icons: Record<string, string>, outdir: string, { banner }: { banner: (name: string) => string }) {
	await fs.mkdir(outdir, { recursive: true })
	const zip = new JSZip()
	for (const [name, icon] of Object.entries(icons)) {
		const icon2 = transformSvg(convertToTitleCase(name), icon, { banner: banner(name) })
		await fs.writeFile(path.join(outdir, `${name}.svg`), icon2 + EOF)
		zip.file(name, icon)
	}
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.writeFile(path.join(`${outdir}.zip`), buffer)
}

async function exportTsx(icons: Record<string, string>, outdir: string, { banner }: { banner: (name: string) => string }) {
	await fs.mkdir(outdir, { recursive: true })
	for (const [name, icon] of Object.entries(icons)) {
		const icon2 = transformTsx(convertToTitleCase(name), icon, { banner: banner(name) })
		await fs.writeFile(path.join(outdir, `${convertToTitleCase(name)}.tsx`), icon2 + EOF)
	}
	// prettier-ignore
	const exports = Object.keys(icons).map(name => detab(`
		export * from "./${convertToTitleCase(name)}"
	`).trim()).join("\n")
	await fs.writeFile(path.join(outdir, "index.ts"), exports + EOF)
}

//// async function exportZip(srcdir: string, outdir: string) {
//// 	await fs.mkdir(outdir, { recursive: true })
//// 	const zip = new JSZip()
//// 	const names = await fs.readdir(srcdir)
//// 	for (const name of names) {
//// 		const contents = await fs.readFile(path.join(srcdir, name), "utf-8")
//// 		zip.file(name, contents)
//// 	}
//// 	const buffer = await zip.generateAsync({ type: "nodebuffer" })
//// 	await fs.writeFile(path.join(`${outdir}.zip`), buffer)
//// }

////////////////////////////////////////////////////////////////////////////////

async function exportAllFeather() {
	const icons = await getIcons("icons/feather/unpkg")
	const svgIcons = formatIcons(icons, { strictJsx: false })
	const tsxIcons = formatIcons(icons, { strictJsx: true })
	for (const [name, icon] of Object.entries(svgIcons)) {
		console.log(`✅ ${name}.svg`)
		console.log(icon)
		console.log()
	}
	await exportSvgAndZip(svgIcons, "icons/feather/production/svg", { banner: featherSvgBanner })
	await exportTsx(tsxIcons, "icons/feather/production/tsx", { banner: featherTsxBanner })
	//// await exportZip("icons/wolf-kit/figma/payment/jpg@1x", "icons/wolf-kit/production/payment/jpg@1x")
	//// await exportZip("icons/wolf-kit/figma/payment/jpg@2x", "icons/wolf-kit/production/payment/jpg@2x")
	//// await exportZip("icons/wolf-kit/figma/payment/png@1x", "icons/wolf-kit/production/payment/png@1x")
	//// await exportZip("icons/wolf-kit/figma/payment/png@2x", "icons/wolf-kit/production/payment/png@2x")
}

////////////////////////////////////////////////////////////////////////////////

async function run() {
	await fs.rm("icons/feather/production", { recursive: true, force: true })
	await sleep(100)

	await exportAllFeather()
}

run()
