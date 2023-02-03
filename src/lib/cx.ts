export function cx(...args: unknown[]) {
	// prettier-ignore
	const className = args
		.flat()
		.filter(Boolean)
		.join(" ")
		.trim()
		.replace(/\s+/g, " ")
	return className || undefined
}
