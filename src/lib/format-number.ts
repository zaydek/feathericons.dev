// https://stackoverflow.com/a/11832950
export function round(value: number, { precision }: { precision: number } = { precision: 0 }) {
	const maxValue = 10 ** precision
	return Math.round((value + Number.EPSILON) * maxValue) / maxValue
}

export function clamp(value: number, { min, max }: { min: number; max: number }) {
	return Math.min(Math.max(value, min), max)
}
