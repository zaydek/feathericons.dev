import React from "react"

import { clampValue, roundValue } from "@/lib/precision"
import { Accessible } from "./accessible"

// prettier-ignore
export type AriaSliderProps = Accessible<JSX.IntrinsicElements["div"]> & {
	thumb:    HTMLDivElement | null
	track:    HTMLDivElement | null
	value:    number
	setValue: React.Dispatch<React.SetStateAction<number>>
	min:      number
	max:      number
	step:     number
}

//// // https://stackoverflow.com/a/21696585
//// function oneOrMoreElementsVisuallyHidden(...args: HTMLElement[]) {
//// 	return args.some(arg => arg.offsetParent === null)
//// }

// https://stackoverflow.com/a/21696585
function visuallyHidden(arg: HTMLElement) {
	return arg.offsetParent === null
}

export function AriaSlider({
	// prettier-ignore
	thumb,
	track,
	value,
	setValue,
	min,
	max,
	step,
	children,
	...props
}: AriaSliderProps) {
	const sliderRef = React.useRef<HTMLDivElement>(null)

	// TODO: Hmm, yeah pointerDown can be a ref
	const pointerDownRef = React.useRef(false)

	const progress = React.useMemo(() => {
		return (value - min) / (max - min)
	}, [max, min, value])

	React.useEffect(() => {
		if (thumb === null || visuallyHidden(thumb)) return // TODO
		if (track === null || visuallyHidden(track)) return // TODO
		const thumbObserver = new ResizeObserver(() => {
			const translateX = progress * (track.getBoundingClientRect().width - thumb.getBoundingClientRect().width)
			thumb.style.transform = `translateX(${translateX}px)`
		})
		const trackObserver = new ResizeObserver(() => {
			const translateX = progress * (track.getBoundingClientRect().width - thumb.getBoundingClientRect().width)
			thumb.style.transform = `translateX(${translateX}px)`
		})
		thumbObserver.observe(thumb)
		trackObserver.observe(track)
		return () => {
			thumbObserver.disconnect()
			trackObserver.disconnect()
		}
	}, [progress, thumb, track])

	React.useEffect(() => {
		if (thumb === null || visuallyHidden(thumb)) return
		if (track === null || visuallyHidden(track)) return
		function handlePointerDown(e: PointerEvent) {
			if (!(e.button === 0 && e.composedPath().includes(sliderRef.current!))) return
			e.preventDefault() // COMPAT/Safari: Prevent text selection
			pointerDownRef.current = true
			const thumbClient = thumb!.getBoundingClientRect()
			const trackClient = track!.getBoundingClientRect()
			const v1 = (e.clientX - trackClient.x - thumbClient.width / 4) / (trackClient.width - thumbClient.width)
			const v2 = clampValue(v1, { min: 0, max: 1 })
			const v3 = roundValue(v2, { precision: 2 })
			const v4 = v3 * (max - min) + min
			const v5 = v4 - (v4 % step)
			setValue(v5)
		}
		function handlePointerMove(e: PointerEvent) {
			if (!pointerDownRef.current) return
			e.preventDefault() // COMPAT/Safari: Prevent text selection
			const thumbClient = thumb!.getBoundingClientRect()
			const trackClient = track!.getBoundingClientRect()
			const v1 = (e.clientX - trackClient.x - thumbClient.width / 4) / (trackClient.width - thumbClient.width)
			const v2 = clampValue(v1, { min: 0, max: 1 })
			const v3 = roundValue(v2, { precision: 2 })
			const v4 = v3 * (max - min) + min
			const v5 = v4 - (v4 % step)
			setValue(v5)
		}
		function handlePointerUp(e: PointerEvent) {
			e.preventDefault() // COMPAT/Safari: Prevent text selection
			pointerDownRef.current = false
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

	return (
		<div
			ref={sliderRef}
			{...props}
			style={{ "--progress": `${progress * 100}%` } as React.CSSProperties}
			onKeyDown={e => {
				if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
					e.preventDefault()
					const nextValue = value - step
					const clampedNextValue = clampValue(nextValue, { min, max })
					setValue(clampedNextValue)
				} else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
					e.preventDefault()
					const nextValue = value + step
					const clampedNextValue = clampValue(nextValue, { min, max })
					setValue(clampedNextValue)
				}
				// Preserve
				props.onKeyDown?.(e)
			}}
			// A11y
			role="slider"
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={value}
			tabIndex={0}
			// /A11y
		>
			{children}
		</div>
	)
}
