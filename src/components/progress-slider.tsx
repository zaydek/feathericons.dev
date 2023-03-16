import React from "react"

// prettier-ignore
export type ProgressSliderProps = {
	value:    number
	setValue: React.Dispatch<React.SetStateAction<number>>
	min:      number
	max:      number
	step:     number
}

export function ProgressSlider({ value, setValue, min, max, step }: ProgressSliderProps) {
	return (
		<input
			style={{ "--progress": ((value - min) / (max - min)) * 100 + "%" } as React.CSSProperties}
			type="range"
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={e => setValue(e.currentTarget.valueAsNumber)}
		/>
	)
}
