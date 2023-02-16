// Node
import fs from "node:fs/promises"
import path from "node:path"

// NPM
import playwright from "playwright"

const EOF = "\n"

async function run(outdir: string) {
	await fs.rm(outdir, { recursive: true, force: true })

	const browser = await playwright.chromium.launch({ headless: false })
	const context = await browser.newContext(playwright.devices["Desktop Chrome HiDPI"])
	const page = await context.newPage()

	//////////////////////////////////////////////////////////////////////////////
	// Get version and URLs from unpkg

	await page.goto("https://unpkg.com/browse/feather-icons/dist/icons/")
	const version = /@(\d+\.\d+\.\d+)/.exec(page.url())![1]
	const urls = await page.evaluate(async () => {
		// Use x.slice(3) to step over:
		//
		// - <a href="feather-icons">
		// - <a href="dist">
		// - <a href="..">
		//
		const anchors = [...(document.getElementsByClassName("css-xt128v") as HTMLCollectionOf<HTMLAnchorElement>)].slice(3)
		return anchors.map(a => a.href)
	})

	//////////////////////////////////////////////////////////////////////////////
	// Get tags from GitHub

	await page.goto("https://raw.githubusercontent.com/feathericons/feather/master/src/tags.json")
	// prettier-ignore
	const tags = (await page.evaluate(async () => document.getElementsByTagName("pre")[0].innerHTML))
		.trim()
		.replaceAll("life-bouy", "life-buoy")

	//////////////////////////////////////////////////////////////////////////////
	// Get icons from URLs

	const icons: Record<string, string> = {}
	for (const url of urls) {
		await page.goto(url.replace("/browse", ""))
		const { name } = path.parse(url)
		const icon = await page.content()
		icons[name] = icon
	}

	//////////////////////////////////////////////////////////////////////////////
	// Write version, icons, and tags

	await fs.mkdir(outdir, { recursive: true })
	await fs.writeFile(path.join(path.dirname(outdir), "version.json"), JSON.stringify({ version }, null, 2) + EOF)
	for (const [name, icon] of Object.entries(icons)) {
		await fs.writeFile(path.join(outdir, `${name}.svg`), icon + EOF)
	}
	await fs.writeFile(path.join(path.dirname(outdir), "tags.json"), tags + EOF)

	//////////////////////////////////////////////////////////////////////////////

	await browser.close()
}

run("icons/feather/unpkg")
