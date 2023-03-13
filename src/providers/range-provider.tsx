import react from "react"

import { useParam } from "@/lib"

export const SIZE_MIN       = 16 // prettier-ignore
export const SIZE_MAX       = 32 // prettier-ignore
export const SIZE_STEP      = 1 // prettier-ignore
export const SIZE_DEFAULT   = 24 // prettier-ignore

export const STROKE_MIN     = 1 // prettier-ignore
export const STROKE_MAX     = 3 // prettier-ignore
export const STROKE_STEP    = 0.125 // prettier-ignore
export const STROKE_DEFAULT = 2 // prettier-ignore

// prettier-ignore
export const RangeSizeContext = react.createContext<{
	size:             number
	setSize:          react.Dispatch<react.SetStateAction<number>>
	resetSize:        () => void
} | null>(null)

// prettier-ignore
export const RangeStrokeWidthContext = react.createContext<{
	strokeWidth:      number
	setStrokeWidth:   react.Dispatch<react.SetStateAction<number>>
	resetStrokeWidth: () => void
} | null>(null)

export function RangeProvider({ children }: react.PropsWithChildren) {
	const [size, setSize] = useParam({
		key: "size",
		initialValue: SIZE_DEFAULT,
		parser: value => {
			const parsed = +value
			if (parsed >= SIZE_MIN && parsed <= SIZE_MAX) {
				return parsed
			} else {
				return SIZE_DEFAULT
			}
		},
	})

	const resetSize = react.useCallback(() => {
		setSize(SIZE_DEFAULT)
	}, [setSize])

	const [strokeWidth, setStrokeWidth] = useParam({
		key: "stroke-width",
		initialValue: STROKE_DEFAULT,
		parser: value => {
			const parsed = +value
			if (parsed >= STROKE_MIN && parsed <= STROKE_MAX) {
				return parsed
			} else {
				return STROKE_DEFAULT
			}
		},
	})

	const resetStrokeWidth = react.useCallback(() => {
		setStrokeWidth(STROKE_DEFAULT)
	}, [setStrokeWidth])

	return (
		<RangeSizeContext.Provider
			value={react.useMemo(
				() => ({
					size,
					setSize,
					resetSize,
				}),
				[resetSize, setSize, size],
			)}
		>
			<RangeStrokeWidthContext.Provider
				value={react.useMemo(
					() => ({
						strokeWidth,
						setStrokeWidth,
						resetStrokeWidth,
					}),
					[resetStrokeWidth, setStrokeWidth, strokeWidth],
				)}
			>
				{children}
			</RangeStrokeWidthContext.Provider>
		</RangeSizeContext.Provider>
	)
}
