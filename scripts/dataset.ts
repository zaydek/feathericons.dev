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
	const page1 = await context.newPage()
	await page1.goto("https://unpkg.com/browse/feather-icons/dist/icons/")
	const version = /(@\d+\.\d+\.\d+)/.exec(page1.url())![1]
	// Extract hrefs from document anchor elements. Use x.slice(3) to step over:
	//
	// - <a href="feather-icons">
	// - <a href="dist">
	// - <a href="..">
	//
	const hrefs = await page1.evaluate(async ([anchorSelector]) => {
		const anchors = [...document.getElementsByClassName(anchorSelector) as HTMLCollectionOf<HTMLAnchorElement>].slice(3)
		return anchors.map(a => a.href)
	}, [ANCHOR_SELECTOR])
	const dataset: { name: string, data: string }[] = []
	const page2 = await context.newPage()
	for (const href of hrefs) {
		await page2.goto(href.replace("/browse", ""))
		const name = href.slice(href.lastIndexOf("/") + 1, -1 * ".svg".length)
		const data = await page2.evaluate(async () => document.documentElement.outerHTML)
		dataset.push({ name, data })
	}
	await fs.promises.writeFile(`src/data/dataset${version}.json`, JSON.stringify(dataset, null, "  ") + "\n")
	await teardown()
}

main()
