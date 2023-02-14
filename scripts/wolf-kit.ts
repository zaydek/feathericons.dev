//// export as pretty, optimized svg
//// use that to generate typescript react source
//// create a zip for jpg1, jpg2, png1, png2, svg, components?

import fs from "node:fs/promises"
import path from "node:path"

import { optimize as optimizeSvg } from "svgo"

//// // Maps names to an optimized <svg>
//// const svgoCache = {}

async function exportOptimizedSvg(dirname: string, outdir: string) {
	const names = await fs.readdir(dirname)
	for (const name of names.slice(0, 1)) {
		console.log("✅", name)
		const filename = path.join(dirname, name)
		const buffer = await fs.readFile(filename)
		const contents = buffer.toString()
		const optimized = optimizeSvg(contents)

		//// const { window } = new JSDOM(optimized.data)
		//// const code = stringify(window.document.body.firstElementChild as SVGSVGElement, { strictJsx: false, omitAttrs: [] })
		//// const svgCode = formatAsSvg(convertToTitleCase(name), code, {
		//// 	//// license: `/*! Feather v${feather.meta.version} | MIT License | https://github.com/feathericons/feather */`,
		//// 	comment: `https://feathericons.com/${name}`,
		//// })

		console.log(optimized.data)
	}

	// run through svgo
	// run through stringify
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
