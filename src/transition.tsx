import { cloneElement, CSSProperties, PropsWithChildren, ReactElement, useEffect, useMemo, useRef, useState } from "react"
import { toKebabCase } from "./lib/cases"

const MICRO_TIMEOUT = 10

// prettier-ignore
export type TransitionProps = PropsWithChildren<{
	when:     boolean
	unmount?: "start" | "end"
	s1:       CSSProperties
	s2:       CSSProperties
	duration: number
	ease?:    string | readonly [number, number, number, number]
	delay?:   number
}>

export function Transition({ when, unmount, s1: start, s2: end, duration, ease = "ease", delay = 0, children }: TransitionProps) {
	// prettier-ignore
	const [show, setShow] = useState(!(
		 (when && unmount === "end") ||
		(!when && unmount === "start")
	))
	const [state, setState] = useState<"tl" | "end">(when ? "end" : "start")

	const transitionProperty = useMemo(() => {
		return [...new Set([...Object.keys(start).map(key => toKebabCase(key)), ...Object.keys(end).map(key => toKebabCase(key))])].join(", ")
	}, [end, start])

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
					// prettier-ignore
					setShow(!(
						(when && unmount === "end") ||
						(!when && unmount === "start")
					))
				}, Math.max(MICRO_TIMEOUT, duration))
				ds.push(d)
			}, MICRO_TIMEOUT)
			ds.push(d)
		}, Math.max(MICRO_TIMEOUT, delay))
		ds.push(d)
		return () => {
			ds.reverse().forEach(tid => window.clearTimeout(tid))
		}
	}, [delay, duration, unmount, when])

	return (
		<>
			{show &&
				cloneElement(children as ReactElement, {
					style: {
						...(state === "tl" ? start : end),
						transitionProperty,
						transitionDuration: `${duration}ms`,
						// prettier-ignore
						transitionTimingFunction: typeof ease === "string"
							? ease
							: `cubic-bezier(${ease.join(", ")})`,
						transitionDelay: `${delay ?? 0}ms`,
					},
				})}
		</>
	)
}
