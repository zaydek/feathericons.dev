export function tab(str: string, tabCount: number) {
	const lines = str.split("\n")
	return lines
		.map((line, index) => {
			if (index === 0) {
				return line
			} else {
				return "\t".repeat(tabCount) + line
			}
		})
		.join("\n")
}

export function detab(str: string, { spaces }: { spaces: boolean } = { spaces: false }) {
	const lines = str.trim().split("\n")
	const indexes = lines.map(line => {
		let index = 0
		while (index < line.length) {
			if (line[index] !== "\t") {
				break
			}
			index++
		}
		return index
	})
	const min = Math.min(...indexes.filter(index => index > 0))
	const detabbed = lines
		.map(line => {
			if (line === "" || !line.startsWith("\t")) {
				return line
			}
			return line.slice(min)
		})
		.join("\n")
	if (spaces) {
		return detabbed.replaceAll("\t", "  ")
	} else {
		return detabbed
	}
}
