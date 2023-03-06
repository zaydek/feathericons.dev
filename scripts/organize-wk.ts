import * as fs from "node:fs/promises"
import * as path from "path"

import { sleep } from "@/lib"

async function copyFilesWithRegex({
	srcDir,
	dstDir,
	patternRegex,
	replaceRegex,
}: {
	srcDir: string
	dstDir: string
	patternRegex: RegExp
	replaceRegex?: readonly [RegExp, string]
}) {
	await fs.rm(dstDir, { recursive: true, force: true })
	await sleep(100) // 😪

	await fs.mkdir(dstDir, { recursive: true })
	const files = await fs.readdir(srcDir)
	for (const file of files) {
		const src = path.join(srcDir, file)
		let dst = path.join(dstDir, file)
		if (patternRegex.test(file) && (await fs.stat(src)).isFile()) {
			if (replaceRegex !== undefined) {
				dst = dst.replace(...replaceRegex)
			}
			await fs.copyFile(src, dst)
			console.log(`✅ Copied ${src} to ${dst}`)
		}
	}
}

async function organizeSocial() {
	// prettier-ignore
	const args = [
		{ target: "original" },
		{
			target: "original-circle",
			replaceRegex: [
				/(-circle)(\.)/,
				"$2",
			] as const,
		},
		{
			target: "original-square",
			replaceRegex: [
				/(-square)(\.)/,
				"$2",
			] as const,
		},
		{
			target: "mono",
			replaceRegex: [
				/(-mono)(\.)/,
				"$2",
			] as const,
		},
		{
			target: "mono-circle",
			replaceRegex: [
				/(-circle-mono)(\.)/,
				"$2",
			] as const,
		},
		{
			target: "mono-square",
			replaceRegex: [
				/(-square-mono)(\.)/,
				"$2",
			] as const,
		},
	]
	for (const { target, replaceRegex } of args) {
		console.log(`📋 Copying *.svg files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/social/${target}/all`,
			dstDir: `./icons/wolfkit/figma/social/${target}/svg`,
			patternRegex: /\.svg$/,
			replaceRegex,
		})
		console.log(`📋 Copying *.png files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/social/${target}/all`,
			dstDir: `./icons/wolfkit/figma/social/${target}/png@1x`,
			patternRegex: /@1x\.png$/,
			replaceRegex,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/social/${target}/all`,
			dstDir: `./icons/wolfkit/figma/social/${target}/png@2x`,
			patternRegex: /@2x\.png$/,
			replaceRegex,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/social/${target}/all`,
			dstDir: `./icons/wolfkit/figma/social/${target}/png@4x`,
			patternRegex: /@4x\.png$/,
			replaceRegex,
		})
		console.log(`📋 Copying *.jpg files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/social/${target}/all`,
			dstDir: `./icons/wolfkit/figma/social/${target}/jpg@1x`,
			patternRegex: /@1x\.jpg$/,
			replaceRegex,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/social/${target}/all`,
			dstDir: `./icons/wolfkit/figma/social/${target}/jpg@2x`,
			patternRegex: /@2x\.jpg$/,
			replaceRegex,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/social/${target}/all`,
			dstDir: `./icons/wolfkit/figma/social/${target}/jpg@4x`,
			patternRegex: /@4x\.jpg$/,
			replaceRegex,
		})
	}
}

async function organizePayments() {
	for (const target of ["original", "original-filled", "mono", "mono-filled"]) {
		console.log(`📋 Copying *.svg files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/payments/${target}/all`,
			dstDir: `./icons/wolfkit/figma/payments/${target}/svg`,
			patternRegex: /\.svg$/,
		})
		console.log(`📋 Copying *.png files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/payments/${target}/all`,
			dstDir: `./icons/wolfkit/figma/payments/${target}/png@1x`,
			patternRegex: /@1x\.png$/,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/payments/${target}/all`,
			dstDir: `./icons/wolfkit/figma/payments/${target}/png@2x`,
			patternRegex: /@2x\.png$/,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/payments/${target}/all`,
			dstDir: `./icons/wolfkit/figma/payments/${target}/png@4x`,
			patternRegex: /@4x\.png$/,
		})
		console.log(`📋 Copying *.jpg files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/payments/${target}/all`,
			dstDir: `./icons/wolfkit/figma/payments/${target}/jpg@1x`,
			patternRegex: /@1x\.jpg$/,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/payments/${target}/all`,
			dstDir: `./icons/wolfkit/figma/payments/${target}/jpg@2x`,
			patternRegex: /@2x\.jpg$/,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wolfkit/figma/payments/${target}/all`,
			dstDir: `./icons/wolfkit/figma/payments/${target}/jpg@4x`,
			patternRegex: /@4x\.jpg$/,
		})
	}
}

async function main() {
	await organizeSocial()
	await organizePayments()
	console.log("🎉 Done")
}

main()
