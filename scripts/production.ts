// Node
import fs from "node:fs/promises"
import path from "node:path"

// NPM
import { JSDOM } from "jsdom"
import JSZip from "jszip"
import SVGO from "svgo"

import { detab, sleep, toTitleCase } from "@/lib"
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

// prettier-ignore
const wolfKitSvgBanner = (name: string) => detab(`
	<!--

	Sourced from The Wolf Kit https://figma.com/community/file/1203393186896008602
	Licensed as CC BY 4.0

	https://feathericons.dev/${name}

	-->
`)

// prettier-ignore
const wolfKitTsxBanner = (name: string) => detab(`
	// Sourced from The Wolf Kit https://figma.com/community/file/1203393186896008602
	// Licensed as CC BY 4.0
	//
	// https://feathericons.dev/${name}
`)

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
		// @ts-expect-error
		const icon2 = icon.replaceAll(/<g[^>]*>([\s\S]+)<\/g>/g, "$1") // Remove <g>
		const icon3 = SVGO.optimize(icon2, {
			plugins: [
				"preset-default",
				//// // This doesn't work so use icon.replaceAll(/<g[^>]*>([\s\S]+)<\/g>/g, "$1")
				//// {
				//// 	name: "collapseGroups",
				//// },
				{
					name: "prefixIds",
					params: {
						prefix: name,
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

async function exportSvgAndZip(icons: Record<string, string>, outdir: string, { banner }: { banner: (name: string) => string }) {
	await fs.mkdir(outdir, { recursive: true })
	const zip = new JSZip()
	for (const [name, icon] of Object.entries(icons)) {
		const icon2 = transformSvg(toTitleCase(name), icon, { banner: banner(name) })
		await fs.writeFile(path.join(outdir, `${name}.svg`), icon2 + EOF)
		zip.file(name, icon)
	}
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.writeFile(path.join(`${outdir}.zip`), buffer)
}

async function exportTsx(icons: Record<string, string>, outdir: string, { banner }: { banner: (name: string) => string }) {
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

async function exportAllFeather() {
	await fs.rm("icons/feather/production", { recursive: true, force: true })
	await sleep(100)

	const icons = await readIcons("icons/feather/unpkg")
	const svgs = formatIcons(icons, { strictJsx: false })
	const tsxs = formatIcons(icons, { strictJsx: true })
	for (const [name, icon] of Object.entries(svgs)) {
		console.log(`✅ ${name}.svg`)
		console.log(icon)
		console.log()
	}

	// Source assets
	await exportSvgAndZip(svgs, "icons/feather/production/svg", { banner: featherSvgBanner })
	await exportTsx(tsxs, "icons/feather/production/tsx", { banner: featherTsxBanner })
	const names = Object.keys(svgs).map(name => toTitleCase(name))
	await fs.writeFile("icons/feather/production/manifest.json", JSON.stringify(names, null, "  ") + EOF)

	// Binary assets
	await exportZip("icons/feather/figma/jpg@1x", "icons/feather/production/jpg@1x")
	await exportZip("icons/feather/figma/jpg@2x", "icons/feather/production/jpg@2x")
	await exportZip("icons/feather/figma/png@1x", "icons/feather/production/png@1x")
	await exportZip("icons/feather/figma/png@2x", "icons/feather/production/png@2x")
}

async function exportAllWolfKitBrands() {
	await fs.rm("icons/wolf-kit/production/brands", { recursive: true, force: true })
	await sleep(100)

	const icons = await readIcons("icons/wolf-kit/figma/brands/svg")
	const optimizedIcons = optimizeIcons(icons)
	const svgs = formatIcons(optimizedIcons, { strictJsx: false })
	const tsxs = formatIcons(optimizedIcons, { strictJsx: true })
	for (const [name, icon] of Object.entries(svgs)) {
		console.log(`✅ ${name}.svg`)
		console.log(icon)
		console.log()
	}

	// Source assets
	await exportSvgAndZip(svgs, "icons/wolf-kit/production/brands/svg", { banner: wolfKitSvgBanner })
	await exportTsx(tsxs, "icons/wolf-kit/production/brands/tsx", { banner: wolfKitTsxBanner })
	const names = Object.keys(svgs).map(name => toTitleCase(name))
	await fs.writeFile("icons/wolf-kit/production/brands/manifest.json", JSON.stringify(names, null, "  ") + EOF)

	// Binary assets
	await exportZip("icons/wolf-kit/figma/brands/jpg@1x", "icons/wolf-kit/production/brands/jpg@1x")
	await exportZip("icons/wolf-kit/figma/brands/jpg@2x", "icons/wolf-kit/production/brands/jpg@2x")
	await exportZip("icons/wolf-kit/figma/brands/png@1x", "icons/wolf-kit/production/brands/png@1x")
	await exportZip("icons/wolf-kit/figma/brands/png@2x", "icons/wolf-kit/production/brands/png@2x")
}

async function exportAllWolfKitPayments() {
	await fs.rm("icons/wolf-kit/production/payment", { recursive: true, force: true })
	await sleep(100)

	const icons = await readIcons("icons/wolf-kit/figma/payments/svg")
	const optimizedIcons = optimizeIcons(icons)
	const svgs = formatIcons(optimizedIcons, { strictJsx: false })
	const tsxs = formatIcons(optimizedIcons, { strictJsx: true })
	for (const [name, icon] of Object.entries(svgs)) {
		console.log(`✅ ${name}.svg`)
		console.log(icon)
		console.log()
	}

	// Source assets
	await exportSvgAndZip(svgs, "icons/wolf-kit/production/payments/svg", { banner: wolfKitSvgBanner })
	await exportTsx(tsxs, "icons/wolf-kit/production/payments/tsx", { banner: wolfKitTsxBanner })
	const names = Object.keys(svgs).map(name => toTitleCase(name))
	await fs.writeFile("icons/wolf-kit/production/payments/manifest.json", JSON.stringify(names, null, "  ") + EOF)

	// Binary assets
	await exportZip("icons/wolf-kit/figma/payments/jpg@1x", "icons/wolf-kit/production/payments/jpg@1x")
	await exportZip("icons/wolf-kit/figma/payments/jpg@2x", "icons/wolf-kit/production/payments/jpg@2x")
	await exportZip("icons/wolf-kit/figma/payments/png@1x", "icons/wolf-kit/production/payments/png@1x")
	await exportZip("icons/wolf-kit/figma/payments/png@2x", "icons/wolf-kit/production/payments/png@2x")
}

////////////////////////////////////////////////////////////////////////////////

async function run() {
	await exportAllFeather()
	await exportAllWolfKitBrands()
	await exportAllWolfKitPayments()
}

run()
