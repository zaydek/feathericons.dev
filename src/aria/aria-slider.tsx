import { CSSProperties, Dispatch, HTMLAttributes, SetStateAction, useEffect, useMemo, useRef } from "react"
import { clamp } from "../lib/precision"

// prettier-ignore
export type AriaSliderProps = {
	track:    HTMLDivElement | null
	thumb:    HTMLDivElement | null
	min:      number
	max:      number
	step:     number
	value:    number
	setValue: Dispatch<SetStateAction<number>>
} & HTMLAttributes<HTMLDivElement>

export function AriaSlider({ track, thumb, min, max, step, value, setValue, children, ...props }: AriaSliderProps) {
	const pointerDownRef = useRef(false)

	const progress = useMemo(() => {
		return (value - min) / (max - min)
	}, [max, min, value])

	const translateX = useMemo(() => {
		if (track === null || thumb === null) { return null } // prettier-ignore
		return progress * (track.getBoundingClientRect().width - thumb.getBoundingClientRect().width)
	}, [progress, thumb, track])

	// TODO
	//// useEffect(() => {
	//// 	function handleResize(e: UIEvent) {
	//// 		// ...
	//// 	}
	//// 	window.addEventListener("resize", handleResize, false)
	//// 	return () => window.removeEventListener("resize", handleResize, false)
	//// }, [])

	useEffect(() => {
		if (track === null || thumb === null) { return } // prettier-ignore
		function handlePointerDown(e: PointerEvent) {
			if (!(e.button === 0 && e.composedPath().includes(track!))) { return } // prettier-ignore
			pointerDownRef.current = true
			// FIXME: Temporarily disable; this breaks Next.js navigation when using
			// mouse side buttons
			//// e.preventDefault()
			const trackClient = track!.getBoundingClientRect()
			const thumbClient = thumb!.getBoundingClientRect()
			const range = clamp((e.clientX - trackClient.x - thumbClient.width / 2) / (trackClient.width - thumbClient.width), { min: 0, max: 1 })
			const value = range * (max - min) + min
			setValue(value - (value % step))
		}
		function handlePointerMove(e: PointerEvent) {
			if (!pointerDownRef.current) { return } // prettier-ignore
			// FIXME: Temporarily disable; this breaks Next.js navigation when using
			// mouse side buttons
			//// e.preventDefault()
			const trackClient = track!.getBoundingClientRect()
			const thumbClient = thumb!.getBoundingClientRect()
			const range = clamp((e.clientX - trackClient.x - thumbClient.width / 2) / (trackClient.width - thumbClient.width), { min: 0, max: 1 })
			const value = range * (max - min) + min
			setValue(value - (value % step))
		}
		function handlePointerUp(e: PointerEvent) {
			pointerDownRef.current = false
			// FIXME: Temporarily disable; this breaks Next.js navigation when using
			// mouse side buttons
			//// e.preventDefault()
		}
		document.addEventListener("pointerdown", handlePointerDown, false)
		document.addEventListener("pointermove", handlePointerMove, false)
		document.addEventListener("pointerup",   handlePointerUp,   false) // prettier-ignore
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown, false)
			document.removeEventListener("pointermove", handlePointerMove, false)
			document.removeEventListener("pointerup",   handlePointerUp,   false) // prettier-ignore
		}
	}, [max, min, setValue, step, thumb, track])

	useEffect(() => {
		if (thumb === null) { return } // prettier-ignore
		thumb.style.transform = `translateX(${translateX!}px)`
	}, [thumb, translateX])

	return (
		<div
			style={{ "--progress": progress } as CSSProperties}
			onKeyDown={e => {
				if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
					e.preventDefault()
					const nextValue = value - step
					const clampedNextValue = clamp(nextValue, { min, max })
					setValue(clampedNextValue)
				} else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
					e.preventDefault()
					const nextValue = value + step
					const clampedNextValue = clamp(nextValue, { min, max })
					setValue(clampedNextValue)
				}
			}}
			// A11y
			role="slider"
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={value}
			tabIndex={0}
			// /A11y
			{...props}
		>
			{children}
		</div>
	)
}
