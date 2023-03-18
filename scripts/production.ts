// Node
import fs from "node:fs/promises"
import path from "node:path"

// NPM
import { JSDOM } from "jsdom"
import JSZip from "jszip"
import SVGO from "svgo"

import { detab, sleep, toTitleCase } from "../src/lib"
import { formatSvg } from "./utils/format-svg"
import { transformSvg, transformTsx } from "./utils/transform-svg"

////////////////////////////////////////////////////////////////////////////////

const EOF = "\n"

const svgBanner = (name: string) => `<!-- https://feathericons.dev/?search=${name} -->`
const tsxBanner = (name: string) => `// https://feathericons.dev/?search=${name}`

////////////////////////////////////////////////////////////////////////////////

async function readIcons(srcdir: string) {
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
	const copy: Record<string, string> = {}
	for (const [name, icon] of Object.entries(icons)) {
		const icon2 = icon.replaceAll(/<g[^>]*>([\s\S]+)<\/g>/g, "$1") // Remove <g>
		const icon3 = SVGO.optimize(icon2, {
			plugins: [
				"preset-default",
				//// {
				//// 	name: "collapseGroups",
				//// },
				{
					name: "prefixIds",
					params: {
						prefix: name,
					},
				},
				{
					name: "convertColors",
					params: {
						currentColor: "#687076",
					},
				},
			],
		}).data
		copy[name] = icon3
	}
	return copy
}

function formatIcons(icons: Record<string, string>, { strictJsx }: { strictJsx: boolean }) {
	const copy: Record<string, string> = {}
	for (const [name, icon] of Object.entries(icons)) {
		const { window } = new JSDOM(icon)
		const icon2 = formatSvg(window.document.body.firstElementChild as SVGSVGElement, { strictJsx })
		copy[name] = icon2
	}
	return copy
}

////////////////////////////////////////////////////////////////////////////////

async function exportSvgAndZip(
	icons: Record<string, string>,
	outdir: string,
	{ banner }: { banner: (name: string) => string },
) {
	await fs.mkdir(outdir, { recursive: true })
	const zip = new JSZip()
	for (const [name, icon] of Object.entries(icons)) {
		const icon2 = transformSvg(icon, { banner: banner(name) })
		await fs.writeFile(path.join(outdir, `${name}.svg`), icon2 + EOF)
		zip.file(name, icon)
	}
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.writeFile(path.join(`${outdir}.zip`), buffer)
}

async function exportTsx(
	icons: Record<string, string>,
	outdir: string,
	{ banner }: { banner: (name: string) => string },
) {
	await fs.mkdir(outdir, { recursive: true })
	for (const [name, icon] of Object.entries(icons)) {
		const icon2 = transformTsx(toTitleCase(name), icon, { banner: banner(name) })
		await fs.writeFile(path.join(outdir, `${toTitleCase(name)}.tsx`), icon2 + EOF)
	}
	// prettier-ignore
	const exports = Object.keys(icons).map(name => detab(`
		export * from "./${toTitleCase(name)}"
	`).trim()).join("\n")
	await fs.writeFile(path.join(outdir, "index.ts"), exports + EOF)
}

async function exportZip(srcdir: string, outdir: string) {
	await fs.mkdir(outdir, { recursive: true })
	const zip = new JSZip()
	const names = await fs.readdir(srcdir)
	for (const name of names) {
		const contents = await fs.readFile(path.join(srcdir, name), "utf-8")
		zip.file(name, contents)
	}
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.writeFile(`${outdir}.zip`, buffer)
}

////////////////////////////////////////////////////////////////////////////////

async function exportFeather() {
	await fs.rm("icons/feather/production", { recursive: true, force: true })
	await sleep(100) // 😪
	const icons = await readIcons("icons/feather/unpkg")
	const svgIcons = formatIcons(icons, { strictJsx: false })
	const tsxIcons = formatIcons(icons, { strictJsx: true })
	for (const [name, icon] of Object.entries(svgIcons)) {
		console.log(`✅ ${name}.svg`)
		console.log(icon)
		console.log()
	}
	// Source assets
	await exportSvgAndZip(svgIcons, "icons/feather/production/svg", { banner: svgBanner })
	await exportTsx(tsxIcons, "icons/feather/production/tsx", { banner: tsxBanner })
	const names = Object.keys(svgIcons).map(name => toTitleCase(name))
	await fs.writeFile("icons/feather/production/manifest.json", JSON.stringify(names, null, "  ") + EOF)
	// Binary assets
	await exportZip("icons/feather/figma/jpg@1x", "icons/feather/production/jpg@1x")
	await exportZip("icons/feather/figma/jpg@2x", "icons/feather/production/jpg@2x")
	await exportZip("icons/feather/figma/png@1x", "icons/feather/production/png@1x")
	await exportZip("icons/feather/figma/png@2x", "icons/feather/production/png@2x")
}

////////////////////////////////////////////////////////////////////////////////

async function exportWkBrands() {
	await fs.rm("icons/wk/production/brands", { recursive: true, force: true })
	await sleep(100) // 😪
	//// for (const target of ["original", "original-circle", "original-square", "mono", "mono-circle", "mono-square"]) {
	for (const target of ["original", "mono"]) {
		const icons = await readIcons(`icons/wk/figma/brands/${target}/svg`)
		const optimizedIcons = optimizeIcons(icons)
		const svgIcons = formatIcons(optimizedIcons, { strictJsx: false })
		const tsxIcons = formatIcons(optimizedIcons, { strictJsx: true })
		for (const [name, icon] of Object.entries(svgIcons)) {
			console.log(`✅ ${name}.svg`)
			console.log(icon)
			console.log()
		}
		// Source assets
		await exportSvgAndZip(svgIcons, `icons/wk/production/brands/${target}/svg`, { banner: svgBanner })
		await exportTsx(tsxIcons, `icons/wk/production/brands/${target}/tsx`, { banner: tsxBanner })
		const names = Object.keys(svgIcons).map(name => toTitleCase(name))
		await fs.writeFile(`icons/wk/production/brands/${target}/manifest.json`, JSON.stringify(names, null, "  ") + EOF)
		// Binary assets
		await exportZip(`icons/wk/figma/brands/${target}/jpg@1x`, `icons/wk/production/brands/${target}/jpg@1x`)
		await exportZip(`icons/wk/figma/brands/${target}/jpg@2x`, `icons/wk/production/brands/${target}/jpg@2x`)
		await exportZip(`icons/wk/figma/brands/${target}/png@1x`, `icons/wk/production/brands/${target}/png@1x`)
		await exportZip(`icons/wk/figma/brands/${target}/png@2x`, `icons/wk/production/brands/${target}/png@2x`)
	}
}

////////////////////////////////////////////////////////////////////////////////

async function exportWkPayments() {
	await fs.rm("icons/wk/production/payment", { recursive: true, force: true })
	await sleep(100) // 😪
	for (const target of ["original", "original-filled", "mono", "mono-filled"]) {
		const icons = await readIcons(`icons/wk/figma/payments/${target}/svg`)
		const optimizedIcons = optimizeIcons(icons)
		const svgIcons = formatIcons(optimizedIcons, { strictJsx: false })
		const tsxIcons = formatIcons(optimizedIcons, { strictJsx: true })
		for (const [name, icon] of Object.entries(svgIcons)) {
			console.log(`✅ ${name}.svg`)
			console.log(icon)
			console.log()
		}
		// Source assets
		await exportSvgAndZip(svgIcons, `icons/wk/production/payments/${target}/svg`, { banner: svgBanner })
		await exportTsx(tsxIcons, `icons/wk/production/payments/${target}/tsx`, { banner: tsxBanner })
		const names = Object.keys(svgIcons).map(name => toTitleCase(name))
		await fs.writeFile(`icons/wk/production/payments/${target}/manifest.json`, JSON.stringify(names, null, "  ") + EOF)
		// Binary assets
		await exportZip(`icons/wk/figma/payments/${target}/jpg@1x`, `icons/wk/production/payments/${target}/jpg@1x`)
		await exportZip(`icons/wk/figma/payments/${target}/jpg@2x`, `icons/wk/production/payments/${target}/jpg@2x`)
		await exportZip(`icons/wk/figma/payments/${target}/png@1x`, `icons/wk/production/payments/${target}/png@1x`)
		await exportZip(`icons/wk/figma/payments/${target}/png@2x`, `icons/wk/production/payments/${target}/png@2x`)
	}
}

////////////////////////////////////////////////////////////////////////////////

async function run() {
	await exportFeather()
	await exportWkBrands()
	await exportWkPayments()
}

run()
