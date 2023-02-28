import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useMemo } from "react"
import { useParameterState } from "./use-parameter-state"

export const SIZE_MIN       = 16 // prettier-ignore
export const SIZE_MAX       = 48 // prettier-ignore
export const SIZE_STEP      = 1 // prettier-ignore
export const SIZE_DEFAULT   = 24 // prettier-ignore

export const STROKE_MIN     = 0.5 // prettier-ignore
export const STROKE_MAX     = 3.5 // prettier-ignore
export const STROKE_STEP    = 0.125 // prettier-ignore
export const STROKE_DEFAULT = 2 // prettier-ignore

// prettier-ignore
export const RangeContext =
	createContext<{
		size:           number
		setSize:        Dispatch<SetStateAction<number>>
		strokeWidth:    number
		setStrokeWidth: Dispatch<SetStateAction<number>>
	} | null>(null)

export function RangeProvider({ children }: PropsWithChildren) {
	const [size, setSize] = useParameterState({
		key: "size",
		initialValue: SIZE_DEFAULT,
		parser: value => {
			const parsed = +value
			return parsed >= SIZE_MIN && parsed <= SIZE_MAX ? parsed : SIZE_DEFAULT
		},
	})
	const [strokeWidth, setStrokeWidth] = useParameterState({
		key: "stroke-width",
		initialValue: STROKE_DEFAULT,
		parser: value => {
			const parsed = +value
			return parsed >= STROKE_MIN && parsed <= STROKE_MAX ? parsed : STROKE_DEFAULT
		},
	})

	useEffect(() => {
		document.body.style.setProperty("--icon-size", "" + size)
	}, [size])

	useEffect(() => {
		document.body.style.setProperty("--icon-stroke-width", "" + strokeWidth)
	}, [strokeWidth])

	return (
		<RangeContext.Provider
			value={useMemo(
				() => ({
					size,
					setSize,
					strokeWidth,
					setStrokeWidth,
				}),
				[setSize, setStrokeWidth, size, strokeWidth],
			)}
		>
			{children}
		</RangeContext.Provider>
	)
}
