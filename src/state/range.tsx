import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useEffect, useMemo } from "react"
import { useParam } from "./use-param"

export const SIZE_MIN       = 16 // prettier-ignore
export const SIZE_MAX       = 48 // prettier-ignore
export const SIZE_STEP      = 1 // prettier-ignore
export const SIZE_DEFAULT   = 32 // prettier-ignore

export const STROKE_MIN     = 1 // prettier-ignore
export const STROKE_MAX     = 3 // prettier-ignore
export const STROKE_STEP    = 0.125 // prettier-ignore
export const STROKE_DEFAULT = 2 // prettier-ignore

// prettier-ignore
export const RangeContext =
	createContext<{
		size:             number
		setSize:          Dispatch<SetStateAction<number>>
		strokeWidth:      number
		setStrokeWidth:   Dispatch<SetStateAction<number>>
		resetSize:        () => void
		resetStrokeWidth: () => void
	} | null>(null)

export function RangeProvider({ children }: PropsWithChildren) {
	const [size, setSize] = useParam({
		key: "size",
		initialValue: SIZE_DEFAULT,
		parser: value => {
			const parsed = +value
			return parsed >= SIZE_MIN && parsed <= SIZE_MAX ? parsed : SIZE_DEFAULT
		},
	})

	const [strokeWidth, setStrokeWidth] = useParam({
		key: "stroke-width",
		initialValue: STROKE_DEFAULT,
		parser: value => {
			const parsed = +value
			return parsed >= STROKE_MIN && parsed <= STROKE_MAX ? parsed : STROKE_DEFAULT
		},
	})

	const resetSize = useCallback(() => setSize(SIZE_DEFAULT), [setSize])
	const resetStrokeWidth = useCallback(() => setStrokeWidth(STROKE_DEFAULT), [setStrokeWidth])

	useEffect(() => {
		document.body.style.setProperty("--size", "" + size)
	}, [size])

	useEffect(() => {
		document.body.style.setProperty("--stroke-width", "" + strokeWidth)
	}, [strokeWidth])

	return (
		<RangeContext.Provider
			value={useMemo(
				() => ({
					size,
					setSize,
					strokeWidth,
					setStrokeWidth,
					resetSize,
					resetStrokeWidth,
				}),
				[resetSize, resetStrokeWidth, setSize, setStrokeWidth, size, strokeWidth],
			)}
		>
			{children}
		</RangeContext.Provider>
	)
}
