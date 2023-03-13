import react from "react"

// prettier-ignore
export type ProgressRangeProps = {
	value:    number
	setValue: react.Dispatch<react.SetStateAction<number>>
	min:      number
	max:      number
	step:     number
}

export function ProgressRange({ value, setValue, min, max, step }: ProgressRangeProps) {
	return (
		<input
			style={{ "--progress": ((value - min) / (max - min)) * 100 + "%" } as react.CSSProperties}
			type="range"
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={e => setValue(e.currentTarget.valueAsNumber)}
		/>
	)
}
