// https://stackoverflow.com/a/11832950
export function roundValue(value: number, { precision }: { precision: number } = { precision: 0 }) {
	const maxValue = 10 ** precision
	return Math.round((value + Number.EPSILON) * maxValue) / maxValue
}

export function clampValue(value: number, { min, max, precision }: { min: number; max: number; precision?: number }) {
	const nextValue = Math.min(Math.max(value, min), max)
	return precision === undefined ? nextValue : roundValue(nextValue, { precision })
}
