import * as fs from "node:fs/promises"
import * as path from "node:path"

import { sleep } from "@/lib"

async function copyFilesWithRegex({
	srcDir,
	dstDir,
	nameRegex,
	renameRegex,
}: {
	srcDir: string
	dstDir: string
	nameRegex: RegExp
	renameRegex?: readonly [RegExp, string]
}) {
	await fs.rm(dstDir, { recursive: true, force: true })
	await sleep(100) // 😪

	await fs.mkdir(dstDir, { recursive: true })
	const files = await fs.readdir(srcDir)
	for (const file of files) {
		const src = path.join(srcDir, file)
		let dst = path.join(dstDir, file)
		if (nameRegex.test(file) && (await fs.stat(src)).isFile()) {
			if (renameRegex !== undefined) {
				dst = dst.replace(...renameRegex)
			}
			await fs.copyFile(src, dst)
			console.log(`✅ Copied ${src} to ${dst}`)
		}
	}
}

async function organizeWkSocial() {
	// prettier-ignore
	const args = [
		{ target: "original" },
		{ target: "mono", renameRegex: [/(-mono)(\.)/, "$2"] as const },
	]
	for (const { target, renameRegex } of args) {
		// LOG
		console.log(`📋 Copying *.svg files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wk/figma/social/${target}/all`,
			dstDir: `./icons/wk/figma/social/${target}/svg`,
			nameRegex: /\.svg$/,
			renameRegex,
		})
		// LOG
		console.log(`📋 Copying *.png files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wk/figma/social/${target}/all`,
			dstDir: `./icons/wk/figma/social/${target}/png@1x`,
			nameRegex: /@1x\.png$/,
			renameRegex,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wk/figma/social/${target}/all`,
			dstDir: `./icons/wk/figma/social/${target}/png@2x`,
			nameRegex: /@2x\.png$/,
			renameRegex,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wk/figma/social/${target}/all`,
			dstDir: `./icons/wk/figma/social/${target}/png@4x`,
			nameRegex: /@4x\.png$/,
			renameRegex,
		})
		// LOG
		console.log(`📋 Copying *.jpg files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wk/figma/social/${target}/all`,
			dstDir: `./icons/wk/figma/social/${target}/jpg@1x`,
			nameRegex: /@1x\.jpg$/,
			renameRegex,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wk/figma/social/${target}/all`,
			dstDir: `./icons/wk/figma/social/${target}/jpg@2x`,
			nameRegex: /@2x\.jpg$/,
			renameRegex,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wk/figma/social/${target}/all`,
			dstDir: `./icons/wk/figma/social/${target}/jpg@4x`,
			nameRegex: /@4x\.jpg$/,
			renameRegex,
		})
	}
}

async function organizeWkPayments() {
	// prettier-ignore
	const args = [
		{ target: "original" },
		{ target: "original-filled" },
		{ target: "mono",        renameRegex: [/(-mono)(\.)/, "$2"] as const },
		{ target: "mono-filled", renameRegex: [/(-mono)(\.)/, "$2"] as const },
	]
	for (const { target, renameRegex } of args) {
		// LOG
		console.log(`📋 Copying *.svg files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wk/figma/payments/${target}/all`,
			dstDir: `./icons/wk/figma/payments/${target}/svg`,
			nameRegex: /\.svg$/,
			renameRegex,
		})
		// LOG
		console.log(`📋 Copying *.png files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wk/figma/payments/${target}/all`,
			dstDir: `./icons/wk/figma/payments/${target}/png@1x`,
			nameRegex: /@1x\.png$/,
			renameRegex,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wk/figma/payments/${target}/all`,
			dstDir: `./icons/wk/figma/payments/${target}/png@2x`,
			nameRegex: /@2x\.png$/,
			renameRegex,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wk/figma/payments/${target}/all`,
			dstDir: `./icons/wk/figma/payments/${target}/png@4x`,
			nameRegex: /@4x\.png$/,
			renameRegex,
		})
		// LOG
		console.log(`📋 Copying *.jpg files to ${target}...`)
		await copyFilesWithRegex({
			srcDir: `./icons/wk/figma/payments/${target}/all`,
			dstDir: `./icons/wk/figma/payments/${target}/jpg@1x`,
			nameRegex: /@1x\.jpg$/,
			renameRegex,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wk/figma/payments/${target}/all`,
			dstDir: `./icons/wk/figma/payments/${target}/jpg@2x`,
			nameRegex: /@2x\.jpg$/,
			renameRegex,
		})
		await copyFilesWithRegex({
			srcDir: `./icons/wk/figma/payments/${target}/all`,
			dstDir: `./icons/wk/figma/payments/${target}/jpg@4x`,
			nameRegex: /@4x\.jpg$/,
			renameRegex,
		})
	}
}

async function main() {
	await organizeWkSocial()
	await organizeWkPayments()
	console.log("🎉 Done")
}

main()
