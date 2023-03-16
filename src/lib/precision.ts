// https://stackoverflow.com/a/11832950
export function roundValue(value: number, { precision }: { precision: number } = { precision: 0 }) {
	const maxValue = 10 ** precision
	return Math.round((value + Number.EPSILON) * maxValue) / maxValue
}

export function clampValue(value: number, { min, max }: { min: number; max: number }) {
	return Math.min(Math.max(value, min), max)
}
