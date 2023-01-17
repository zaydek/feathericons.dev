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
	//// transition: {
	duration: number
	easing?:  string | readonly [number, number, number, number]
	delay?:   number
	//// }
}

function Transition({ when, unmount, start, end, duration, easing = "ease", delay = 0, children }: PropsWithChildren<TransitionProps>) {
	const [show, setShow] = useState(!(
		 (when && unmount === "end") ||
		(!when && unmount === "start")
	))
	const [state, setState] = useState<"start" | "end">(when ? "end" : "start")

	const ref = useRef<HTMLDivElement | null>(null)

	const Children = useMemo(() => {
		return (props: HTMLAttributes<HTMLDivElement>) => <>
			{cloneElement(children as ReactElement, { ref, ...props })}
		</>
	}, [children])

	useEffect(() => {
		setShow(true)
		setState(when ? "end" : "start")
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
					transition: `${duration}ms ${Array.isArray(easing) ? `cubic-bezier(${easing.join(", ")})` : easing} ${delay}ms`,
					transitionProperty: [
						...new Set([
							...Object.keys(start),
							...Object.keys(end),
						]),
					].join(", "),
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
			easing={[0, 1, 0.5, 1]} // No bounce here
		>
			<div
				id="A"
				className="fixed inset-0 z-100 [background-color]-hsl($base-h,_$base-s,_$base-l,_0.1)"
				onClick={e => setOpenModal(false)}
			></div>
		</Transition>
		<Transition
			when={openModal}
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
			<div
				id="B"
				className="fixed inset-0 z-100 flex flex-center [pointer-events]-none [&_>_*]:[pointer-events]-auto"
			>
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
