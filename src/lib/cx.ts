export function cx(...args: unknown[]) {
	// prettier-ignore
	const className = args
		.flat()
		.filter(Boolean)
		.join(" ")
		.replaceAll(/\s+/g, " ")
		.trim()
	return className === "" ? undefined : className
}
