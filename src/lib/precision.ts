// https://stackoverflow.com/a/11832950
export function round(float: number, { precision }: { precision: number } = { precision: 0 }) {
	const magnitude = 10 ** precision
	return Math.round((float + Number.EPSILON) * magnitude) / magnitude
}

export function clamp(n: number, { min, max }: { min: number; max: number }) {
	return Math.min(Math.max(n, min), max)
}
