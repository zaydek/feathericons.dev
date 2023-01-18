import { cloneElement, CSSProperties, PropsWithChildren, ReactElement, useEffect, useMemo, useRef, useState } from "react"
import { toKebabCase } from "./lib/cases"

const MICRO_TIMEOUT = 10

export type TransitionProps = PropsWithChildren<{
	when:     boolean
	unmount?: "start" | "end"
	start:    CSSProperties
	end:      CSSProperties
	duration: number
	ease?:    string | readonly [number, number, number, number]
	delay?:   number
}>

export function Transition({ when, unmount, start, end, duration, ease = "ease", delay = 0, children }: TransitionProps) {
	const [show, setShow] = useState(!(
		 (when && unmount === "end") ||
		(!when && unmount === "start")
	))
	const [state, setState] = useState<"start" | "end">(when ? "end" : "start")

	const transitionProperty = useMemo(() => {
		return [
			...new Set([
				...Object.keys(start).map(key => toKebabCase(key)),
				...Object.keys(end).map(key => toKebabCase(key)),
			]),
		].join(", ")
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
			ds
				.reverse()
				.forEach(tid => window.clearTimeout(tid))
		}
	}, [delay, duration, when, unmount])

	return <>
		{show && <>
			{cloneElement(children as ReactElement, {
				style: {
					...state === "start"
						? start
						: end,
					transitionProperty,
					transitionDuration: `${duration}ms`,
					transitionTimingFunction: typeof ease === "string"
						? ease
						: `cubic-bezier(${ease.join(", ")})`,
					transitionDelay: `${delay ?? 0}ms`,
				},
			})}
		</>}
	</>
}
