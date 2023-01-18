import { cloneElement, CSSProperties, HTMLAttributes, PropsWithChildren, ReactElement, useEffect, useMemo, useRef, useState } from "react"

export type TransitionProps = {
	when:     boolean
	unmount?: "start" | "end"
	start:    CSSProperties
	end:      CSSProperties
	duration: number
	easing?:  string | readonly [number, number, number, number]
	delay?:   number
}

//// function nextFrame(fn: () => void) {
//// 	requestAnimationFrame(() => {
//// 		requestAnimationFrame(fn)
//// 	})
//// }

const MICRO_TIMEOUT = 10

export function Transition({ when, unmount, start, end, duration, easing = "ease", delay = 0, children }: PropsWithChildren<TransitionProps>) {
	const [show, setShow] = useState(!(
		 (when && unmount === "end") ||
		(!when && unmount === "start")
	))
	const [state, setState] = useState<"start" | "end">(when ? "end" : "start")

	//// // Eagerly compute
	//// const transition = useMemo(() => {
	//// 	return `${duration}ms ${typeof easing === "string" ? easing : `cubic-bezier(${easing.join(", ")})`} ${delay}ms`
	//// }, [delay, duration, easing])

	// Eagerly compute
	const transitionProperty = useMemo(() => {
		return [
			...new Set([
				...Object.keys(start),
				...Object.keys(end),
			]),
		].join(", ")
	}, [end, start])

	const Children = useMemo(() => {
		return (props: HTMLAttributes<HTMLElement>) => <>
			{cloneElement(children as ReactElement, props)}
		</>
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const onceRef = useRef(false)
	useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		const ds: number[] = []
		const d = window.setTimeout(() => {
			setShow(true)
			const d = window.setTimeout(() => {
				setState(when ? "end" : "start")
				const d = window.setTimeout(() => {
					setShow(!(
						(when && unmount === "end") ||
						(!when && unmount === "start")
					))
				}, duration === 0 ? MICRO_TIMEOUT : duration)
				ds.push(d)
			}, MICRO_TIMEOUT)
			ds.push(d)
		}, delay === 0 ? MICRO_TIMEOUT : delay)
		ds.push(d)
		return () => {
			ds
				.reverse()
				.forEach(tid => window.clearTimeout(tid))
		}
	}, [delay, duration, unmount, when])

	return <>
		{show && <>
			<Children
				style={{
					...state === "start"
						? start
						: end,
					transitionProperty,
					transitionDuration: `${duration}ms`,
					transitionTimingFunction: typeof easing === "string"
						? easing
						: `cubic-bezier(${easing.join(", ")})`,
					transitionDelay: `${delay ?? 0}ms`,
				}}
			/>
		</>}
	</>
}
