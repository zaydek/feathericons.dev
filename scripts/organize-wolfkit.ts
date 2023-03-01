import * as fs from "node:fs/promises"
import * as path from "path"

async function copyFilesWithRegex({ srcDir, dstDir, pattern }: { srcDir: string; dstDir: string; pattern: RegExp }) {
	await fs.mkdir(dstDir, { recursive: true })
	const files = await fs.readdir(srcDir)
	for (const file of files) {
		const src = path.join(srcDir, file)
		const dst = path.join(dstDir, file)
		if (pattern.test(file) && (await fs.stat(src)).isFile()) {
			await fs.copyFile(src, dst)
			console.log(`✅ Copied ${src} to ${dst}`)
		}
	}
}

async function organizeBrands() {
	for (const target of ["original", "original-circle", "original-square", "mono", "mono-circle", "mono-square"]) {
		console.log(`📋 Copying *.svg files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/brands/${target}/all`,
			dstDir: `./icons/wolfkit/figma/brands/${target}/svg`,
			pattern: /\.svg$/,
		})
		console.log(`📋 Copying *.png files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/brands/${target}/all`,
			dstDir: `./icons/wolfkit/figma/brands/${target}/png@1x`,
			pattern: /@1x\.png$/,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/brands/${target}/all`,
			dstDir: `./icons/wolfkit/figma/brands/${target}/png@2x`,
			pattern: /@2x\.png$/,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/brands/${target}/all`,
			dstDir: `./icons/wolfkit/figma/brands/${target}/png@4x`,
			pattern: /@4x\.png$/,
		})
		console.log(`📋 Copying *.jpg files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/brands/${target}/all`,
			dstDir: `./icons/wolfkit/figma/brands/${target}/jpg@1x`,
			pattern: /@1x\.jpg$/,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/brands/${target}/all`,
			dstDir: `./icons/wolfkit/figma/brands/${target}/jpg@2x`,
			pattern: /@2x\.jpg$/,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/brands/${target}/all`,
			dstDir: `./icons/wolfkit/figma/brands/${target}/jpg@4x`,
			pattern: /@4x\.jpg$/,
		})
	}
}

async function organizePayments() {
	for (const target of ["original", "original-filled", "mono", "mono-filled"]) {
		console.log(`📋 Copying *.svg files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/payments/${target}/all`,
			dstDir: `./icons/wolfkit/figma/payments/${target}/svg`,
			pattern: /\.svg$/,
		})
		console.log(`📋 Copying *.png files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/payments/${target}/all`,
			dstDir: `./icons/wolfkit/figma/payments/${target}/png@1x`,
			pattern: /@1x\.png$/,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/payments/${target}/all`,
			dstDir: `./icons/wolfkit/figma/payments/${target}/png@2x`,
			pattern: /@2x\.png$/,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/payments/${target}/all`,
			dstDir: `./icons/wolfkit/figma/payments/${target}/png@4x`,
			pattern: /@4x\.png$/,
		})
		console.log(`📋 Copying *.jpg files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/payments/${target}/all`,
			dstDir: `./icons/wolfkit/figma/payments/${target}/jpg@1x`,
			pattern: /@1x\.jpg$/,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/payments/${target}/all`,
			dstDir: `./icons/wolfkit/figma/payments/${target}/jpg@2x`,
			pattern: /@2x\.jpg$/,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/payments/${target}/all`,
			dstDir: `./icons/wolfkit/figma/payments/${target}/jpg@4x`,
			pattern: /@4x\.jpg$/,
		})
	}
}

async function main() {
	await organizeBrands()
	await organizePayments()
	console.log("🎉 Done")
}

main()
