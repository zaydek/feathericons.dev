// prettier-ignore
export function canonicalize(str: string) {
	return str
		.replace(/[^\w\s-]/g, "") // Remove bad characters
		.replace(/\s+/g, " ")     // Remove excess spaces
		.trim()                   // Trim start and end spaces
}
