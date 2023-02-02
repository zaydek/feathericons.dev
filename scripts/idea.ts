import _featherTags from "./_feather-tags.generated.json"
import _feather from "./_feather.generated.json"

import { toTitleCase } from "../src/lib/cases"

function getTags(kebab: keyof typeof _featherTags) {
	return _featherTags[kebab] ?? []
}

function getMore(kebab: keyof typeof _featherTags) {
	const more = new Set<string>()
	const chunks = kebab.split("-")
ctx:
	for (const [name, tags] of Object.entries(_featherTags)) {
		for (const n of name.split("-")) {
			for (const chunk of chunks) {
				if (chunk === n) {
					more.add(name)
					continue ctx
				}
			}
		}
		for (const tag of tags) {
			for (const t of tag.split("-")) {
				for (const chunk of chunks) {
					if (chunk === t) {
						more.add(name)
						continue ctx
					}
				}
			}
		}
	}
	return [...more]
}

async function main() {
	// src/data/manifest.json
	const data = Object.keys(_feather.data).reduce<Record<string, { tags: string[], more: string[] }>>((acc, key) => {
		const kebab = key as keyof typeof _featherTags // 🍢
		acc[toTitleCase(kebab)] = {
			tags: getTags(kebab),
			more: getMore(kebab),
		}
		return acc
	}, {})
	console.log(JSON.stringify(data, null, 2))
}

main()
