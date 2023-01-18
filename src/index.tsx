import "the-new-css-reset"

import "./css/base.scss"
import "./css/vars.scss"

import "uno.css"

import { cloneElement, CSSProperties, PropsWithChildren, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import { toKebabCase } from "./lib/cases"
//// import { App } from "./app"

const MICRO_TIMEOUT = 10

export type TransitionProps = PropsWithChildren<{
	on:       boolean
	unmount?: "start" | "end"
	start:    CSSProperties
	end:      CSSProperties
	duration: number
	easing?:  string | readonly [number, number, number, number]
	delay?:   number
}>

function Transition({ on, unmount, start, end, duration, easing = "ease", delay = 0, children }: TransitionProps) {
	const ref = useRef<HTMLElement | null>(null)

	const [show, setShow] = useState(!(
		 (on && unmount === "end") ||
		(!on && unmount === "start")
	))

	const transitionProperty = useMemo(() => {
		return [
			...new Set([
				...Object.keys(start).map(key => toKebabCase(key)),
				...Object.keys(end).map(key => toKebabCase(key)),
			]),
		].join(", ")
	}, [end, start])

	const setStyle = useCallback((step: CSSProperties) => {
		ref.current!.style.transitionProperty = transitionProperty
		ref.current!.style.transitionDuration = `${duration}ms`
		ref.current!.style.transitionTimingFunction = typeof easing === "string"
			? easing
			: `cubic-bezier(${easing.join(", ")})`
		ref.current!.style.transitionDelay = `${delay ?? 0}ms`

		for (const [k, v] of Object.entries(step)) {
			// @ts-expect-error
			ref.current!.style[k] = v
		}
	}, [delay, duration, easing, transitionProperty])

	// On on...
	const onceRef = useRef(false)
	useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		const ds: number[] = []
		const [from, to] = on ? [start, end] : [end, start]
		setShow(true)
		const d = window.setTimeout(() => {
			setStyle(from)
			const d = window.setTimeout(() => {
				setStyle(to)
				const d = window.setTimeout(() => {
					setShow(!(
						(on && unmount === "end") ||
						(!on && unmount === "start")
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
	}, [setStyle, duration, end, on, start, unmount, delay])

	return <>
		{show && <>
			{cloneElement(children as ReactElement, {
				ref,
				style: {
					...on
						? end
						: start,
					transitionProperty,
					transitionDuration: `${duration}ms`,
					transitionTimingFunction: typeof easing === "string"
						? easing
						: `cubic-bezier(${easing.join(", ")})`,
					transitionDelay: `${delay ?? 0}ms`,
				},
			})}
		</>}
	</>
}

function Idea() {
	const [on, setOn] = useState(false)

	useEffect(() => {
		console.log({ on })
	}, [on])

	return <>
		<Transition
			on={on}
			start={{ backgroundColor: "red"  }}
			end={{   backgroundColor: "blue" }}
			duration={5_000}
		>
			<div onClick={e => setOn(curr => !curr)}>Hello</div>
		</Transition>
	</>
}

const root = document.getElementById("root")!
if (import.meta.env.DEV) {
	console.log("[DEBUG] createRoot")
	//// createRoot(root).render(<App initialPath={window.location.pathname} />)
	//// createRoot(root).render(<ProvidedApp />)
	createRoot(root).render(<Idea />)
} else {
	console.log("[DEBUG] hydrateRoot")
	//// hydrateRoot(root, <App initialPath={window.location.pathname} />)
	//// hydrateRoot(root, <ProvidedApp />)
	//// createRoot(root).render(<ProvidedApp />)
	createRoot(root).render(<Idea />)
}
