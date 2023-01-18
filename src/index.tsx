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
	ease?:    string | readonly [number, number, number, number]
	delay?:   number
}>

function Transition({ on, unmount, start, end, duration, ease = "ease", delay = 0, children }: TransitionProps) {
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
		ref.current!.style.transitionTimingFunction = typeof ease === "string"
			? ease
			: `cubic-bezier(${ease.join(", ")})`
		ref.current!.style.transitionDelay = `${delay ?? 0}ms`

		for (const [k, v] of Object.entries(step)) {
			// @ts-expect-error
			ref.current!.style[k] = v
		}
	}, [delay, duration, ease, transitionProperty])

	// On on...
	const onceRef = useRef(false)
	useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}

		setShow(true)

		//// setShow(true)
		//// setTimeout(() => {
		//// 	setStyle(on ? start : end)
		//// 	setTimeout(() => {
		//// 		setStyle(on ? end : start)
		//// 		setTimeout(() => {
		//// 			setShow(!(
		//// 				(on && unmount === "end") ||
		//// 				(!on && unmount === "start")
		//// 			))
		//// 		}, Math.max(MICRO_TIMEOUT, duration))
		//// 	}, MICRO_TIMEOUT)
		//// }, Math.max(MICRO_TIMEOUT, delay))

		const ds: number[] = []
		const d = window.setTimeout(() => {
			setShow(true)
			const d = window.setTimeout(() => {
				setStyle(on ? end : start)
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
	}, [delay, duration, end, on, setStyle, start, unmount])

	return <>
		{show && <>
			{cloneElement(children as ReactElement, {
				ref,
				style: {
					...on
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

function Idea() {
	const [on, setOn] = useState(false)

	//// useEffect(() => {
	//// 	console.log({ on })
	//// }, [on])

	return <>
		<button className="fixed tl-8 z-100" onClick={e => setOn(curr => !curr)}>
			Hello
		</button>
		<div className="flex flex-center h-100vh">
			<Transition
				unmount="start"
				on={on}
				start={{
					transform: "scale(0.9)",
					opacity: 0,
				}}
				end={{
					transform: "scale(1)",
					opacity: 1,
				}}
				duration={1e3}
				ease={[0, 1, 1, 1.125]}
			>
				<div className="h-160 w-320 rounded-32 [background-color]-#fff [box-shadow]-$shadow-6"></div>
			</Transition>
		</div>
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
