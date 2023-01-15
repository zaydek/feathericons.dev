import fs from "node:fs"
import path from "node:path"

import { manifest } from "./data/feather-manifest@4.29.0"

async function main() {
	const sequence: Record<string, number> = {}
	const orderedSequence: Record<string, number> = {}

	const parts = [...new Set(Object.keys(manifest).map(name => name.split(/(?=[A-Z])/)).flat())]

	for (const part of parts) {
		for (const name of Object.keys(manifest)) {
			if (name.includes(part)) {
				if (part in sequence) {
					sequence[part]++
				} else {
					sequence[part] = 1
				}
			}
		}
	}

	let longest = Math.max(...Object.values(sequence).map(count => count))
	for (; longest > 1; longest--) {
		for (const [name, count] of Object.entries(sequence)) {
			if (count === longest) {
				orderedSequence[name] = count
			}
		}
	}

	const contents = JSON.stringify(orderedSequence, null, 2)
	await fs.promises.writeFile(path.join("src", "idea2.out.json"), contents)
}

main()
