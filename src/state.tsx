import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useMemo } from "react"
import { useParamState } from "./useParamState"

export const SIZE_MIN = 16
export const SIZE_MAX = 48
export const SIZE_STEP = 1
export const SIZE_DEFAULT = 24

export const STROKE_MIN = 0.5
export const STROKE_MAX = 3.5
export const STROKE_STEP = 0.125
export const STROKE_DEFAULT = 2

////////////////////////////////////////////////////////////////////////////////

// prettier-ignore
export const SliderContext =
	createContext<{
		size:           number
		setSize:        Dispatch<SetStateAction<number>>
		strokeWidth:    number
		setStrokeWidth: Dispatch<SetStateAction<number>>
	} | null>(null)

////////////////////////////////////////////////////////////////////////////////

export function StateProvider({ children }: PropsWithChildren) {
	const [size, setSize] = useParamState({
		key: "size",
		initialValue: 24,
		parser: value => {
			const parsed = +value
			return parsed >= SIZE_MIN && parsed <= SIZE_MAX ? parsed : SIZE_DEFAULT
		},
	})
	const [strokeWidth, setStrokeWidth] = useParamState({
		key: "strokeWidth",
		initialValue: 2,
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
		<SliderContext.Provider
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
		</SliderContext.Provider>
	)
}
