export function cx(...args: unknown[]) {
	const className = args.filter(Boolean).join(" ")
	return className || undefined
}
