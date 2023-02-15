import fs from "node:fs/promises"
import path from "node:path"

import { JSDOM } from "jsdom"
import JSZip from "jszip"
import SVGO from "svgo"

import { convertToTitleCase, detab, sleep } from "@/lib"
import { formatSvg } from "./utils/format-svg"
import { transformSvg, transformTsx } from "./utils/transform-svg"

// prettier-ignore
const svgBanner = (name: string) => detab(`
	<!--

	Sourced from The Wolf Kit https://figma.com/community/file/1203393186896008602
	Licensed as CC BY 4.0

	https://feathericons.dev/${name}

	-->
`)

// prettier-ignore
const jsBanner = (name: string) => detab(`
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
		const icon2 = icon.replaceAll(/<g[^>]*>([\s\S]+)<\/g>/g, "$1") // Remove <g>; preserve $1
		//// .replaceAll(/<clip-path>[\s\S]*<\/clip-path>/g, "") // Remove <clip-path>
		icons[name] = icon2 + "\n" // Add an EOF (once)
	}
	return icons
}

function optimizeIcons(icons: Record<string, string>) {
	const copy: Record<string, string> = {}
	for (const [name, icon] of Object.entries(icons)) {
		const icon2 = SVGO.optimize(icon, {
			plugins: [
				"preset-default",
				{
					name: "prefixIds",
					params: {
						prefix: name,
						//// delim: "-",
					},
				},
			],
		}).data
		copy[name] = icon2
	}
	return copy
}

function formatIcons(icons: Record<string, string>, { strictJsx }: { strictJsx: boolean }) {
	const copy: Record<string, string> = {}
	for (const [name, icon] of Object.entries(icons)) {
		const { window } = new JSDOM(icon)
		const icon2 = formatSvg(window.document.body.firstElementChild as SVGSVGElement, { strictJsx })
		copy[name] = icon2

		// LOG
		console.log(`✅ ${name}.svg`)
		console.log(icon2)
		console.log()
	}
	return copy
}

////////////////////////////////////////////////////////////////////////////////

async function exportSvgAndZip(icons: Record<string, string>, outdir: string, { banner }: { banner: (name: string) => string }) {
	await fs.mkdir(outdir, { recursive: true })
	const zip = new JSZip()
	for (const [name, code] of Object.entries(icons)) {
		const transformed = transformSvg(convertToTitleCase(name), code, { banner: banner(name) })
		await fs.writeFile(path.join(outdir, `${name}.svg`), transformed)
		zip.file(name, code)
	}
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.writeFile(path.join(`${outdir}.zip`), buffer)
}

async function exportTsx(icons: Record<string, string>, outdir: string, { banner }: { banner: (name: string) => string }) {
	await fs.mkdir(outdir, { recursive: true })
	for (const [name, code] of Object.entries(icons)) {
		const transformed = transformTsx(convertToTitleCase(name), code, { banner: banner(name) })
		await fs.writeFile(path.join(outdir, `${convertToTitleCase(name)}.tsx`), transformed)
	}
	// prettier-ignore
	const exports = Object.keys(icons).map(name => detab(`
		export * from "./${convertToTitleCase(name)}"
	`).trim()).join("\n")
	await fs.writeFile(path.join(outdir, "index.ts"), exports + "\n") // EOF
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
	await fs.writeFile(path.join(`${outdir}.zip`), buffer)
}

////////////////////////////////////////////////////////////////////////////////

async function exportWolfKitSocialMedia() {
	const icons = await readIcons("icons/wolf-kit/figma/social-media/svg")
	const optimized = optimizeIcons(icons)
	const svg = formatIcons(optimized, { strictJsx: false })
	const tsx = formatIcons(optimized, { strictJsx: true })
	await exportSvgAndZip(svg, "icons/wolf-kit/production/social-media/svg", { banner: svgBanner })
	await exportTsx(tsx, "icons/wolf-kit/production/social-media/tsx", { banner: jsBanner })
	await exportZip("icons/wolf-kit/figma/social-media/jpg@1x", "icons/wolf-kit/production/social-media/jpg@1x")
	await exportZip("icons/wolf-kit/figma/social-media/jpg@2x", "icons/wolf-kit/production/social-media/jpg@2x")
	await exportZip("icons/wolf-kit/figma/social-media/png@1x", "icons/wolf-kit/production/social-media/png@1x")
	await exportZip("icons/wolf-kit/figma/social-media/png@2x", "icons/wolf-kit/production/social-media/png@2x")
}

async function exportWolfKitPayment() {
	const icons = await readIcons("icons/wolf-kit/figma/payment/svg")
	const optimized = optimizeIcons(icons)
	const svg = formatIcons(optimized, { strictJsx: false })
	const tsx = formatIcons(optimized, { strictJsx: true })
	await exportSvgAndZip(svg, "icons/wolf-kit/production/payment/svg", { banner: svgBanner })
	await exportTsx(tsx, "icons/wolf-kit/production/payment/tsx", { banner: jsBanner })
	await exportZip("icons/wolf-kit/figma/payment/jpg@1x", "icons/wolf-kit/production/payment/jpg@1x")
	await exportZip("icons/wolf-kit/figma/payment/jpg@2x", "icons/wolf-kit/production/payment/jpg@2x")
	await exportZip("icons/wolf-kit/figma/payment/png@1x", "icons/wolf-kit/production/payment/png@1x")
	await exportZip("icons/wolf-kit/figma/payment/png@2x", "icons/wolf-kit/production/payment/png@2x")
}

////////////////////////////////////////////////////////////////////////////////

async function run() {
	await fs.rm("icons/wolf-kit/production", { recursive: true })
	await sleep(100)

	await exportWolfKitSocialMedia()
	await exportWolfKitPayment()
}

run()
