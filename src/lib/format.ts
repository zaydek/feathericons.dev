export function tab(str: string, tabCount: number) {
	const lines = str.split("\n")

	return (
		lines
			.map((line, index) => {
				// If the line is the first line
				if (index === 0) {
					// Return the line
					return line
				} else if (line.length > 0) {
					// Otherwise, if the line is not empty
					// Return the line with the appropriate number of tabs
					return "\t".repeat(tabCount) + line
				} else {
					// Otherwise, the line is empty
					// Return the line
					return line
				}
			})
			// Join the lines back into a string
			.join("\n")
	)
}

export function detab(str: string, { spaces = false }: { spaces?: boolean } = {}) {
	// Split the string into lines
	const lines = str.trim().split("\n")

	// Get the index of the first non-tab character on each line
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

	// Get the minimum index of all lines
	const min = Math.min(...indexes.filter(index => index > 0))

	// Remove the minimum number of tabs from all lines
	const str2 = lines
		.map(line => {
			if (line === "" || !line.startsWith("\t")) {
				return line
			}
			return line.slice(min)
		})
		.join("\n")

	// Replace all tabs with two spaces if the spaces option is true
	if (spaces) {
		return str2.replaceAll("\t", "  ")
	} else {
		return str2
	}
}
