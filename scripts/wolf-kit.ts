import fs from "node:fs/promises"
import path from "node:path"

import { convertToTitleCase, detab } from "@/lib"
import { JSDOM } from "jsdom"
import JSZip from "jszip"
import { optimize as optimizeSvg } from "svgo"
import { formatSvg } from "./utils/format-svg"
import { transformTsx } from "./utils/transform-svg"

////////////////////////////////////////////////////////////////////////////////

//// .replaceAll(/ fill="none"/g, "")               // Remove fill="none"
//// const svg_optimizedPrettyColor = svg_optimizedPretty.replace('fill="none"', 'fill="currentColor"')

// s1: Raw
// s2: Remove dead code
// s3: SVGO
// s4: formatSvg
//
async function parseIcons(srcdir: string) {
	const icons: Record<string, string> = {}
	const basenames = await fs.readdir(srcdir)
	for (const basename of basenames) {
		const s1 = await fs.readFile(path.join(srcdir, basename), "utf-8")
		// prettier-ignore
		const s2 = s1
			.replaceAll(/<g[^>]*>([\s\S]+)<\/g>/g, "$1")        // Remove <g>; preserve $1
			.replaceAll(/<clip-path>[\s\S]*<\/clip-path>/g, "") // Remove <clip-path>
		const s3 = optimizeSvg(s2).data
		const { window } = new JSDOM(s3)
		const s4 = formatSvg(window.document.body.firstElementChild as SVGSVGElement)
		console.log("✅", basename)
		console.log(s4)
		icons[path.parse(basename).name] = s4 + "\n" // EOF
	}
	return icons
}

////////////////////////////////////////////////////////////////////////////////

async function exportVector(icons: Record<string, string>, outdir: string) {
	await fs.mkdir(outdir, { recursive: true })
	for (const [name, code] of Object.entries(icons)) {
		await fs.writeFile(path.join(outdir, name), code)
	}
}

async function exportTypeScriptReactComponents(icons: Record<string, string>, outdir: string) {
	await fs.mkdir(outdir, { recursive: true })
	for (const [name, code] of Object.entries(icons)) {
		const transformed = transformTsx(convertToTitleCase(name), code, { comment: `https://feathericons.dev/${name}` })
		await fs.writeFile(path.join(outdir, `${convertToTitleCase(name)}.tsx`), transformed)
	}
	// prettier-ignore
	const exports = Object.keys(icons).map(name => detab(`
		export * from "./${convertToTitleCase(name)}"
	`).trim()).join("\n")
	await fs.writeFile(path.join(outdir, "index.ts"), exports + "\n") // EOF
}

async function exportVectorZip(icons: Record<string, string>, outdir: string) {
	await fs.mkdir(outdir, { recursive: true })
	const zip = new JSZip()
	for (const [name, code] of Object.entries(icons)) {
		zip.file(name, code)
	}
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.writeFile(path.join(`${outdir}.zip`), buffer)
}

async function exportBinaryZip(srcdir: string, outdir: string) {
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

async function exportSocialMediaIcons() {
	await fs.rmdir("icons/wolf-kit/production", { recursive: true })

	const icons = await parseIcons("icons/wolf-kit/figma/social-media-icons/svg")
	await exportVector(icons, "icons/wolf-kit/production/social-media-icons/svg")
	await exportTypeScriptReactComponents(icons, "icons/wolf-kit/production/social-media-icons/tsx")
	await exportVectorZip(icons, "icons/wolf-kit/production/social-media-icons/svg")
	await exportBinaryZip("icons/wolf-kit/figma/social-media-icons/jpg@1x", "icons/wolf-kit/production/social-media-icons/jpg@1x")
	await exportBinaryZip("icons/wolf-kit/figma/social-media-icons/jpg@2x", "icons/wolf-kit/production/social-media-icons/jpg@2x")
	await exportBinaryZip("icons/wolf-kit/figma/social-media-icons/png@1x", "icons/wolf-kit/production/social-media-icons/png@1x")
	await exportBinaryZip("icons/wolf-kit/figma/social-media-icons/png@2x", "icons/wolf-kit/production/social-media-icons/png@2x")
}

async function exportPaymentIcons() {
	await fs.rmdir("icons/wolf-kit/production", { recursive: true })

	const icons = await parseIcons("icons/wolf-kit/figma/payment-icons/svg")
	await exportVector(icons, "icons/wolf-kit/production/payment-icons/svg")
	await exportTypeScriptReactComponents(icons, "icons/wolf-kit/production/payment-icons/tsx")
	await exportVectorZip(icons, "icons/wolf-kit/production/payment-icons/svg")
	await exportBinaryZip("icons/wolf-kit/figma/payment-icons/jpg@1x", "icons/wolf-kit/production/payment-icons/jpg@1x")
	await exportBinaryZip("icons/wolf-kit/figma/payment-icons/jpg@2x", "icons/wolf-kit/production/payment-icons/jpg@2x")
	await exportBinaryZip("icons/wolf-kit/figma/payment-icons/png@1x", "icons/wolf-kit/production/payment-icons/png@1x")
	await exportBinaryZip("icons/wolf-kit/figma/payment-icons/png@2x", "icons/wolf-kit/production/payment-icons/png@2x")
}

////////////////////////////////////////////////////////////////////////////////

async function run() {
	await exportSocialMediaIcons()
	await exportPaymentIcons()
}

run()
