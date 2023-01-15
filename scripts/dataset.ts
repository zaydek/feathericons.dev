import * as fs from "node:fs"

import playwright from "playwright"

const ANCHOR_SELECTOR = "css-xt128v"

async function main() {
	const browser = await playwright.chromium.launch({ headless: false })
	const context = await browser.newContext(playwright.devices["Desktop Chrome HiDPI"])
	async function teardown() {
		await context.close() // Reverse order
		await browser.close()
	}

	// Extract hrefs from document anchor elements. Use x.slice(3) to step over:
	//
	// - <a href="feather-icons">
	// - <a href="dist">
	// - <a href="..">
	//
	const page1 = await context.newPage()
	await page1.goto("https://unpkg.com/browse/feather-icons/dist/icons/")
	const version = /@(\d+\.\d+\.\d+)/.exec(page1.url())![1]
	const hrefs = await page1.evaluate(async ([anchorSelector]) => {
		const anchors = [...document.getElementsByClassName(anchorSelector) as HTMLCollectionOf<HTMLAnchorElement>].slice(3)
		return anchors.map(a => a.href)
	}, [ANCHOR_SELECTOR])

	const page2 = await context.newPage()
	await page2.goto("https://raw.githubusercontent.com/feathericons/feather/master/src/tags.json")
	const tagset = (await page2.evaluate(async () => document.getElementsByTagName("pre")[0].innerHTML))
		.trim()
		.replaceAll("  ", "\t")
		.replaceAll("life-bouy", "life-buoy")
	await fs.promises.writeFile(`scripts/_tagset@${version}.json`, tagset + "\n")

	const dataset: { meta: { version: string }, data: Record<string, string> } = {
		meta: { version },
		data: {},
	}
	const page3 = await context.newPage()
	for (const href of hrefs) {
		await page3.goto(href.replace("/browse", ""))
		const name = href.slice(href.lastIndexOf("/") + 1, -1 * ".svg".length)
		const data = await page3.content()
		dataset.data[name] = data
	}
	await fs.promises.writeFile(`scripts/_dataset@${version}.json`, JSON.stringify(dataset, null, "\t") + "\n")
	await teardown()
}

main()
