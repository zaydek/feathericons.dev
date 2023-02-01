import playwright from "playwright"

async function main() {
	const browser = await playwright.chromium.launch({ headless: false })
	const context = await browser.newContext(playwright.devices["Desktop Chrome HiDPI"])
	const page = await context.newPage()
	for (const name of ["ArrowRight"]) {
		await page.goto(`http://localhost:3010/${name}`)
		await page.locator("#og").screenshot({ path: "screenshot.png" })
	}
	await browser.close()
}

main()
