import { manifest } from "./data/manifest"

//// function countArray<Value>(arr: Value[], callback: (x: Value) => boolean) {
//// 	let count = 0
//// 	for (const el of arr) {
//// 		count += +callback(el)
//// 	}
//// 	return count
//// }

function main() {
	const seq: Record<string, string[]> = {}

	// For every name
	for (const name of manifest) {
		// For every part of every name
		for (const part of name.split(/(?=[A-Z])/)) {
			for (const value of manifest) {
				if (value.includes(part)) {
					if (part in seq) {
						if (seq[part].includes(name)) { continue }
						seq[part].push(name)
					} else {
						seq[part] = []
					}
				}
			}
		}
	}

	const ordered: Record<string, string[]> = {}

	let longest = Math.max(...Object.values(seq).map(arr => arr.length))
	for (; longest > 1; longest--) {
		for (const [name, arr] of Object.entries(seq)) {
			if (arr.length === longest) {
				ordered[name] = arr
			}
		}
	}

	for (const [key, arr] of Object.entries(ordered)) {
		console.log(`# ${key}`)
		for (const value of arr) {
			console.log(`svg/${value}.svg`)
		}
		console.log()
	}
	//// console.log(YAML.stringify(ordered))
	//// const contents = JSON.stringify(ordered, null, 2)
	//// fs.writeFileSync(path.join("src", "idea.out.json"), contents)
	// console.log(Object.entries(ordered).length)

	//// console.log("arrows", countArray(manifest, v => v.includes("arrow")))
	//// console.log("chevron", countArray(manifest, v => v.includes("chevron")))
}

main()
