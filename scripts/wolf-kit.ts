//// export as pretty, optimized svg
//// use that to generate typescript react source
//// create a zip for jpg1, jpg2, png1, png2, svg, components?

import fs from "node:fs/promises"
import path from "node:path"

import { JSDOM } from "jsdom"
import JSZip from "jszip"
import { optimize as optimizeSvg } from "svgo"
import { stringifySvgElement } from "./stringify"

//// // Maps names to an optimized <svg>
//// const svgoCache = {}

////////////////////////////////////////////////////////////////////////////////

async function exportOptimizedSvg(dirname: string, outdir: string) {
	const zip = new JSZip()
	const names = await fs.readdir(dirname)
	for (const name of names) {
		console.log("✅", name)
		const filename = path.join(dirname, name)
		const buffer = await fs.readFile(filename)
		// prettier-ignore
		const svg = buffer.toString()
			.replaceAll(/ fill="none"/g, "")                    // Remove fill="none"
			.replaceAll(/<g[^>]*>([\s\S]+)<\/g>/g, "$1")        // Remove <g>; preserve $1
			.replaceAll(/<clip-path>[\s\S]*<\/clip-path>/g, "") // Remove <clip-path>
		const svg_optimized = optimizeSvg(svg).data
		const { window } = new JSDOM(svg_optimized)
		const svg_optimizedPretty = stringifySvgElement(window.document.body.firstElementChild as SVGSVGElement)
		//// const svg_optimizedPrettyColor = svg_optimizedPretty.replace('fill="none"', 'fill="currentColor"')
		console.log(svg_optimizedPretty)
		zip.file(`${name}.svg`, svg_optimizedPretty)
	}
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.writeFile(`idea.zip`, buffer)
}

async function exportOptimizedTypeScriptReactSvg(dirname: string, outdir: string) {
	// run through svgo
	// run through stringify
	// create exports
}

// Zips svg, png@1x, png@2x, jpg@1x, jpg@2x
async function exportZip(dirname: string, outdir: string) {
	// run through svgo
	// run through jszip
}

async function run() {
	//// // Read files from a directory
	//// const filenames = await fs.readdir("public/wolf-kit/social-media/figma/svg")
	//// console.log(filenames)
	const dirnames = ["public/wolf-kit/social-media/figma/svg"]
	for (const dirname of dirnames) {
		await exportOptimizedSvg(dirname, "")
		//// await exportOptimizedTypeScriptReactSvg(dirname, "")
		//// await exportZip(dirname, "")
	}
}

run()
