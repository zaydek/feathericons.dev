import fs from "node:fs/promises"
import path from "node:path"

import { JSDOM } from "jsdom"
import JSZip from "jszip"
import { optimize as optimizeSvg } from "svgo"
import { formatSvg } from "./format-svg"

////////////////////////////////////////////////////////////////////////////////

//// .replaceAll(/ fill="none"/g, "")               // Remove fill="none"
//// const svg_optimizedPrettyColor = svg_optimizedPretty.replace('fill="none"', 'fill="currentColor"')

// s1: Raw
// s2: Remove dead code
// s3: SVGO
// s4: formatSvg
//
async function parseSvgs(srcdir: string) {
	const svgs: Record<string, string> = {}
	const names = await fs.readdir(srcdir)
	for (const name of names) {
		const s1 = await fs.readFile(path.join(srcdir, name), "utf-8")
		// prettier-ignore
		const s2 = s1
			.replaceAll(/<g[^>]*>([\s\S]+)<\/g>/g, "$1")        // Remove <g>; preserve $1
			.replaceAll(/<clip-path>[\s\S]*<\/clip-path>/g, "") // Remove <clip-path>
		const s3 = optimizeSvg(s2).data
		const { window } = new JSDOM(s3)
		const s4 = formatSvg(window.document.body.firstElementChild as SVGSVGElement)
		console.log("✅", name)
		console.log(s4)
		svgs[name] = s4 + "\n" // EOF
	}
	return svgs
}

///// async function exportVector(icons: Record<string, string>, outdir: string) {
///// 	await fs.mkdir(outdir, { recursive: true }) // Ensure directory exists
///// 	for (const [name, icon] of Object.entries(icons)) {
///// 		await fs.writeFile(path.join(outdir, name), icon)
///// 	}
///// }

async function exportVectorZip(icons: Record<string, string>, outdir: string) {
	await fs.mkdir(outdir, { recursive: true }) // Ensure directory exists
	const zip = new JSZip()
	for (const [name, code] of Object.entries(icons)) {
		zip.file(name, code)
	}
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.writeFile(path.join(`${outdir}.zip`), buffer)
}

///// async function exportBinary(srcdir: string, outdir: string) {
///// 	await fs.mkdir(outdir, { recursive: true }) // Ensure directory exists
///// 	await fs.cp(srcdir, outdir, { recursive: true })
///// }

async function exportBinaryZip(srcdir: string, outdir: string) {
	await fs.mkdir(outdir, { recursive: true }) // Ensure directory exists
	const zip = new JSZip()
	const names = await fs.readdir(srcdir)
	for (const name of names) {
		const contents = await fs.readFile(path.join(srcdir, name), "utf-8")
		zip.file(name, contents)
	}
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.writeFile(path.join(`${outdir}.zip`), buffer)
}

async function exportSocialMediaIcons() {
	const svgs = await parseSvgs("icons/wolf-kit/figma/social-media-icons/svg")
	//// await exportVector(svgs, "icons/wolf-kit/production/social-media-icons/svg")
	await exportVectorZip(svgs, "icons/wolf-kit/production/social-media-icons/svg")
	//// await exportBinary("icons/wolf-kit/figma/social-media-icons/jpg@1x", "icons/wolf-kit/production/social-media-icons/jpg@1x")
	//// await exportBinary("icons/wolf-kit/figma/social-media-icons/jpg@2x", "icons/wolf-kit/production/social-media-icons/jpg@2x")
	//// await exportBinary("icons/wolf-kit/figma/social-media-icons/png@1x", "icons/wolf-kit/production/social-media-icons/png@1x")
	//// await exportBinary("icons/wolf-kit/figma/social-media-icons/png@2x", "icons/wolf-kit/production/social-media-icons/png@2x")
	await exportBinaryZip("icons/wolf-kit/figma/social-media-icons/jpg@1x", "icons/wolf-kit/production/social-media-icons/jpg@1x")
	await exportBinaryZip("icons/wolf-kit/figma/social-media-icons/jpg@2x", "icons/wolf-kit/production/social-media-icons/jpg@2x")
	await exportBinaryZip("icons/wolf-kit/figma/social-media-icons/png@1x", "icons/wolf-kit/production/social-media-icons/png@1x")
	await exportBinaryZip("icons/wolf-kit/figma/social-media-icons/png@2x", "icons/wolf-kit/production/social-media-icons/png@2x")
}

async function exportPaymentIcons() {
	const svgs = await parseSvgs("icons/wolf-kit/figma/payment-icons/svg")
	//// await exportVector(svgs, "icons/wolf-kit/production/payment-icons/svg")
	await exportVectorZip(svgs, "icons/wolf-kit/production/payment-icons/svg")
	//// await exportBinary("icons/wolf-kit/figma/payment-icons/jpg@1x", "icons/wolf-kit/production/payment-icons/jpg@1x")
	//// await exportBinary("icons/wolf-kit/figma/payment-icons/jpg@2x", "icons/wolf-kit/production/payment-icons/jpg@2x")
	//// await exportBinary("icons/wolf-kit/figma/payment-icons/png@1x", "icons/wolf-kit/production/payment-icons/png@1x")
	//// await exportBinary("icons/wolf-kit/figma/payment-icons/png@2x", "icons/wolf-kit/production/payment-icons/png@2x")
	await exportBinaryZip("icons/wolf-kit/figma/payment-icons/jpg@1x", "icons/wolf-kit/production/payment-icons/jpg@1x")
	await exportBinaryZip("icons/wolf-kit/figma/payment-icons/jpg@2x", "icons/wolf-kit/production/payment-icons/jpg@2x")
	await exportBinaryZip("icons/wolf-kit/figma/payment-icons/png@1x", "icons/wolf-kit/production/payment-icons/png@1x")
	await exportBinaryZip("icons/wolf-kit/figma/payment-icons/png@2x", "icons/wolf-kit/production/payment-icons/png@2x")
}

async function run() {
	await exportSocialMediaIcons()
	await exportPaymentIcons()
}

run()
