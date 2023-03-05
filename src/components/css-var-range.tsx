import { CSSProperties, Dispatch, SetStateAction } from "react"

// prettier-ignore
export type RangeProps = {
	value:    number
	setValue: Dispatch<SetStateAction<number>>
	min:      number
	max:      number
	step:     number
}

export function CssVarRange({ value, setValue, min, max, step }: RangeProps) {
	return (
		<input
			style={{ "--progress": ((value - min) / (max - min)) * 100 + "%" } as CSSProperties}
			type="range"
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={e => setValue(e.currentTarget.valueAsNumber)}
		/>
	)
}
