import "the-new-css-reset"

import "./css/base.scss"
import "./css/vars.scss"

import "uno.css"

import { cloneElement, CSSProperties, HTMLAttributes, PropsWithChildren, ReactElement, useEffect, useMemo, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
//// import { App } from "./app"

type TransitionProps = {
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

function Transition({ when, unmount, start, end, duration, easing = "ease", delay = 0, children }: PropsWithChildren<TransitionProps>) {
	const ref = useRef<HTMLElement | null>(null)

	const [show, setShow] = useState(!(
		 (when && unmount === "end") ||
		(!when && unmount === "start")
	))
	const [state, setState] = useState<"start" | "end">(when ? "end" : "start")

	// Eagerly compute for convenience
	const transition = useMemo(() => {
		return `${duration}ms ${Array.isArray(easing) ? `cubic-bezier(${easing.join(", ")})` : easing} ${delay}ms`
	}, [delay, duration, easing])

	// Eagerly compute for convenience
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
			{cloneElement(children as ReactElement, { ref, ...props })}
		</>
	}, [children])

	const onceRef = useRef(false)
	useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		setShow(true)
		/// nextFrame(() => setState(when ? "end" : "start"))
		setTimeout(() => setState(when ? "end" : "start"), 10)
		const timeoutId = setTimeout(() => {
			setShow(!(
				(when && unmount === "end") ||
				(!when && unmount === "start")
			))
		}, duration)
		return () => {
			clearTimeout(timeoutId)
		}
	}, [duration, unmount, when])

	return <>
		{show && <>
			<Children
				style={{
					...state === "start"
						? start
						: end,
					transition,
					transitionProperty,
				}}
			/>
		</>}
	</>
}

function Experiment() {
	const [openModal, setOpenModal] = useState(false)

	return <>
		<div className="fixed tl-16 z-200">
			<button className="px-16 h-32 rounded-10 [background-color]-#faa" onClick={e => setOpenModal(curr => !curr)}>
				Toggle modal
			</button>
		</div>

		<Transition
			when={openModal}
			unmount="start"
			start={{
				opacity: 0,
			}}
			end={{
				opacity: 1,
			}}
			duration={1_000}
			easing={[0, 1, 0.5, 1]}
		>
			<div className="fixed inset-0 z-100 [background-color]-hsl($base-h,_$base-s,_$base-l,_0.1)" onClick={e => setOpenModal(false)}></div>
		</Transition>
		<Transition
			when={openModal}
			unmount="start"
			start={{
				transform: "scale(0.9)",
				opacity: 0,
			}}
			end={{
				transform: "scale(1)",
				opacity: 1,
			}}
			duration={1_000}
			easing={[0, 1, 0.5, 1.1]}
		>
			<div className="fixed inset-0 z-100 flex flex-center [pointer-events]-none [&_>_*]:[pointer-events]-auto">
				<div className="relative">
					<div className="h-320 w-512 rounded-32 [background-color]-#fff [box-shadow]-$shadow-6"></div>
					<div className="absolute tr-16">
						<button className="flex flex-center h-48 w-48 rounded-1e3 [background-color]-#0001" onClick={e => setOpenModal(false)}>
							<div className="h-24 w-24 rounded-1e3 [background-color]-#000a"></div>
						</button>
					</div>
				</div>
			</div>
		</Transition>
	</>
}

const root = document.getElementById("root")!
if (import.meta.env.DEV) {
	console.log("[DEBUG] createRoot")
	//// createRoot(root).render(<App initialPath={window.location.pathname} />)
	//// createRoot(root).render(<ProvidedApp />)
	createRoot(root).render(<Experiment />)
} else {
	console.log("[DEBUG] hydrateRoot")
	//// hydrateRoot(root, <App initialPath={window.location.pathname} />)
	//// hydrateRoot(root, <ProvidedApp />)
	//// createRoot(root).render(<ProvidedApp />)
	createRoot(root).render(<Experiment />)
}
