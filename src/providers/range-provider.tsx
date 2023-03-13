import { useParam } from "@/lib"
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useMemo } from "react"

export const SIZE_MIN       = 16 // prettier-ignore
export const SIZE_MAX       = 32 // prettier-ignore
export const SIZE_STEP      = 1 // prettier-ignore
export const SIZE_DEFAULT   = 24 // prettier-ignore

export const STROKE_MIN     = 1 // prettier-ignore
export const STROKE_MAX     = 3 // prettier-ignore
export const STROKE_STEP    = 0.125 // prettier-ignore
export const STROKE_DEFAULT = 2 // prettier-ignore

// prettier-ignore
export const SizeContext = createContext<{
	size:             number
	setSize:          Dispatch<SetStateAction<number>>
	resetSize:        () => void
} | null>(null)

// prettier-ignore
export const StrokeWidthContext = createContext<{
	strokeWidth:      number
	setStrokeWidth:   Dispatch<SetStateAction<number>>
	resetStrokeWidth: () => void
} | null>(null)

export function RangeProvider({ children }: PropsWithChildren) {
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

	const resetSize = useCallback(() => {
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

	const resetStrokeWidth = useCallback(() => {
		setStrokeWidth(STROKE_DEFAULT)
	}, [setStrokeWidth])

	return (
		<SizeContext.Provider
			value={useMemo(
				() => ({
					size,
					setSize,
					resetSize,
				}),
				[resetSize, setSize, size],
			)}
		>
			<StrokeWidthContext.Provider
				value={useMemo(
					() => ({
						strokeWidth,
						setStrokeWidth,
						resetStrokeWidth,
					}),
					[resetStrokeWidth, setStrokeWidth, strokeWidth],
				)}
			>
				{children}
			</StrokeWidthContext.Provider>
		</SizeContext.Provider>
	)
}
