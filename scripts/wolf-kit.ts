import fs from "node:fs/promises"
import path from "node:path"

import { JSDOM } from "jsdom"
import JSZip from "jszip"
import { optimize as optimizeSvg } from "svgo"
import { formatSvg } from "./format-svg"

//// // Maps names to an optimized <svg>
//// const svgoCache = {}

////////////////////////////////////////////////////////////////////////////////

async function exportOptimizedSvg(srcdir: string, dstdir: string) {
	const zip = new JSZip()
	const names = await fs.readdir(srcdir)
	for (const name of names) {
		const filename = path.join(srcdir, name)
		const buffer = await fs.readFile(filename)
		// prettier-ignore
		const svg = buffer.toString()
			//// .replaceAll(/ fill="none"/g, "")               // Remove fill="none"
			.replaceAll(/<g[^>]*>([\s\S]+)<\/g>/g, "$1")        // Remove <g>; preserve $1
			.replaceAll(/<clip-path>[\s\S]*<\/clip-path>/g, "") // Remove <clip-path>
		const svg2 = optimizeSvg(svg).data
		const { window } = new JSDOM(svg2)
		const svg3 = formatSvg(window.document.body.firstElementChild as SVGSVGElement)
		//// const svg_optimizedPrettyColor = svg_optimizedPretty.replace('fill="none"', 'fill="currentColor"')
		console.log("✅", name)
		console.log(svg3)
		zip.file(name, svg3 + "\n") // EOF
	}
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.mkdir(dstdir, { recursive: true })
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
		await exportOptimizedSvg(src, dst)
		//// await exportOptimizedTypeScriptReactSvg(dirname, "")
		//// await exportZip(dirname, "")
	}
}

run()
