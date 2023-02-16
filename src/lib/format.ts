export function tab(str: string, count: number) {
	const lines = str.split("\n")
	return lines
		.map((line, index) => {
			if (index === 0) {
				return line
			} else {
				if (line.length > 0) {
					return "\t".repeat(count) + line
				} else {
					return line
				}
			}
		})
		.join("\n")
}

export function detab(str: string) {
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
	return lines
		.map(line => {
			if (line === "" || !line.startsWith("\t")) {
				return line
			}
			return line.slice(min)
		})
		.join("\n")
}
