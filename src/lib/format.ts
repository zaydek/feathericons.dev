export function tab(str: string, tabCount: number) {
	// Split the string into lines
	const lines = str.split("\n")

	// Return a new string with the lines indented
	return lines
		.map((line, index) => {
			// For the first line, don't add any indentation
			if (index === 0) {
				return line
			} else {
				// For all other lines, add indentation before the line
				return "\t".repeat(tabCount) + line
			}
		})
		.join("\n")
}

export function detab(str: string, { spaces = false }: { spaces?: boolean } = {}) {
	// Split the string into lines
	const lines = str.trim().split("\n")

	// Get the number of tabs at the start of each line
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

	// Get the smallest number of tabs at the start of any line
	const min = Math.min(...indexes.filter(index => index > 0))

	// Return a new string with the lines deindented
	return lines
		.map(line => {
			// For empty lines or lines that don't start with tabs, don't remove any indentation
			if (line === "" || !line.startsWith("\t")) {
				return line
			}

			// For all other lines, remove the minimum number of tabs
			return line.slice(min)
		})
		.join("\n")
}
