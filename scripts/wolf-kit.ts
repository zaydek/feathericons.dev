import fs from "node:fs/promises"
import path from "node:path"

import { JSDOM } from "jsdom"
import JSZip from "jszip"
import { optimize as optimizeSvg } from "svgo"
import { formatSvg } from "./format-svg"

////////////////////////////////////////////////////////////////////////////////

type Icons = Record<string, string>

async function getIcons(srcdir: string) {
	const icons: Icons = {}
	const names = await fs.readdir(srcdir)
	for (const name of names) {
		const filename = path.join(srcdir, name)
		const buffer = await fs.readFile(filename)
		// prettier-ignore
		const contents = buffer.toString()
			//// .replaceAll(/ fill="none"/g, "")               // Remove fill="none"
			.replaceAll(/<g[^>]*>([\s\S]+)<\/g>/g, "$1")        // Remove <g>; preserve $1
			.replaceAll(/<clip-path>[\s\S]*<\/clip-path>/g, "") // Remove <clip-path>
		const formatted = optimizeSvg(contents).data
		const { window } = new JSDOM(formatted)
		const optimized = formatSvg(window.document.body.firstElementChild as SVGSVGElement)
		//// const svg_optimizedPrettyColor = svg_optimizedPretty.replace('fill="none"', 'fill="currentColor"')
		console.log("✅", filename)
		console.log(optimized)
		icons[name] = optimized + "\n" // EOF
	}
	return icons
}

async function exportSvg(icons: Icons, dstdir: string) {
	await fs.mkdir(path.join(dstdir, "svg"), { recursive: true })
	for (const [name, icon] of Object.entries(icons)) {
		await fs.writeFile(path.join(dstdir, "svg", name), icon)
	}
}

async function exportSvgZip(icons: Icons, dstdir: string) {
	await fs.mkdir(dstdir, { recursive: true })
	const zip = new JSZip()
	for (const [name, icon] of Object.entries(icons)) {
		zip.file(name, icon)
	}
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.writeFile(path.join(dstdir, "svg.zip"), buffer)
}

//// async function exportOptimizedTypeScriptReactSvg(dirname: string, outdir: string) {
//// 	// run through svgo
//// 	// run through stringify
//// 	// create exports
//// }
////
//// // Zips svg, png@1x, png@2x, jpg@1x, jpg@2x
//// async function exportZip(dirname: string, outdir: string) {
//// 	// run through svgo
//// 	// run through jszip
//// }

async function run() {
	const config = [
		{
			src: "icons/wolf-kit/figma/social-media-icons/svg",
			dst: "icons/wolf-kit/production/social-media-icons",
		},
		{
			src: "icons/wolf-kit/figma/payment-icons/svg",
			dst: "icons/wolf-kit/production/payment-icons",
		},
	]
	for (const { src, dst } of config) {
		const icons = await getIcons(src)
		await exportSvg(icons, dst)
		await exportSvgZip(icons, dst)
		//// await exportOptimizedTypeScriptReactSvg(dirname, "")
		//// await exportZip(dirname, "")
	}
}

run()
