import React from "react"

import { clamp, useParam } from "@/lib"

export const SIZE_MIN       = 16.0 // prettier-ignore
export const SIZE_MAX       = 32.0 // prettier-ignore
export const SIZE_STEP      =  1.0 // prettier-ignore
export const SIZE_DEFAULT   = 24.0 // prettier-ignore

export const STROKE_MIN     =  0.5 // prettier-ignore
export const STROKE_MAX     =  3.5 // prettier-ignore
export const STROKE_STEP    =  0.1 // prettier-ignore
export const STROKE_DEFAULT =  2.0 // prettier-ignore

// prettier-ignore
export const RangeContext = React.createContext<{
	size:           number
	setSize:        React.Dispatch<React.SetStateAction<number>>
	strokeWidth:    number
	setStrokeWidth: React.Dispatch<React.SetStateAction<number>>
} | null>(null)

export function RangeProvider({ children }: React.PropsWithChildren) {
	const [size, setSize] = useParam({
		key: "size",
		initialValue: SIZE_DEFAULT,
		parser: value => {
			const parsed = +value
			return clamp(parsed, { min: SIZE_MIN, max: SIZE_MAX })
		},
	})

	const [strokeWidth, setStrokeWidth] = useParam({
		key: "stroke-width",
		initialValue: STROKE_DEFAULT,
		parser: value => {
			const parsed = +value
			return clamp(parsed, { min: STROKE_MIN, max: STROKE_MAX })
		},
	})

	return (
		<RangeContext.Provider
			value={{
				size,
				setSize,
				strokeWidth,
				setStrokeWidth,
			}}
		>
			{children}
		</RangeContext.Provider>
	)
}
