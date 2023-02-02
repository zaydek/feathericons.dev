import playwright from "playwright"

import { manifest } from "../src/data/manifest"
import { toKebabCase } from "../src/lib/cases"

async function main() {
	const browser = await playwright.chromium.launch({ headless: false })
	const context = await browser.newContext(playwright.devices["Desktop Chrome HiDPI"])
	const page = await context.newPage()
	for (const name of Object.keys(manifest)) {
		await page.goto(`http://localhost:3010/${toKebabCase(name).toLowerCase()}`)
		await page.locator("#og").screenshot({ path: `public/og/${toKebabCase(name).toLowerCase()}.png` })
	}
	await browser.close()
}

main()
