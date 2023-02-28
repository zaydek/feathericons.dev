import { useEffect } from "react"
import { Range } from "./components"
import { useParamState } from "./useParamState"

// prettier-ignore
const SIZE = {
	MIN:     16,
	MAX:     48,
	STEP:    1,
	DEFAULT: 24,
}

// prettier-ignore
const STROKE = {
	MIN:     0.5,
	MAX:     3.5,
	STEP:    0.125,
	DEFAULT: 2,
}

export function SizeRange() {
	const [size, setSize] = useParamState({
		key: "size",
		initialValue: 24,
		parser: value => {
			const parsed = +value
			return parsed >= SIZE.MIN && parsed <= SIZE.MAX ? parsed : SIZE.DEFAULT
		},
	})

	useEffect(() => {
		document.body.style.setProperty("--icon-size", "" + size)
	}, [size])

	return <Range value={size} setValue={setSize} min={SIZE.MIN} max={SIZE.MAX} step={SIZE.STEP} />
}

export function StrokeWidthRange() {
	const [strokeWidth, setStrokeWidth] = useParamState({
		key: "stroke",
		initialValue: 2,
		parser: value => {
			const parsed = +value
			return parsed >= STROKE.MIN && parsed <= STROKE.MAX ? parsed : STROKE.DEFAULT
		},
	})

	useEffect(() => {
		document.body.style.setProperty("--icon-stroke-width", "" + strokeWidth)
	}, [strokeWidth])

	return <Range value={strokeWidth} setValue={setStrokeWidth} min={STROKE.MIN} max={STROKE.MAX} step={STROKE.STEP} />
}
