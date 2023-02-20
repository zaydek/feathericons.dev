// Node
import fs from "node:fs/promises"

// NPM
import playwright from "playwright"

// Omit window to make this isomorphic for Node.js and the browser
export function sleep(durationMs: number) {
	return new Promise(resolve => setTimeout(resolve, durationMs))
}

async function run() {
	const browser = await playwright.chromium.launch({ headless: false })
	const context = await browser.newContext(playwright.devices["Desktop Chrome HiDPI"])
	const page = await context.newPage()
	page.setViewportSize({ width: 3456 / 2, height: 8956 / 2 })

	//// const browser = await chromium.launch()
	//// const page = await browser.newPage()
	await page.goto("https://www.creditonebank.com")

	await sleep(5e3)

	//// // Wait for the page to load completely
	//// await page.waitForLoadState("networkidle")

	// Take a full-page screenshot
	const screenshot = await page.screenshot()

	// Save the screenshot to a file
	await fs.rm("screen.png", { force: true })
	await fs.writeFile("screen.png", screenshot)

	await browser.close()
}

run()
