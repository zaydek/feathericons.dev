import { createContext, PropsWithChildren, useContext, useLayoutEffect, useMemo, useState } from "react"
import { PathContext } from "./router"

const _TransitionContext = createContext<{ started: boolean, forwards: boolean } | null>(null)

export function Transition({ children }: PropsWithChildren) {
	const { started, forwards } = useContext(_TransitionContext)!

	return <>
		<div style={{
			opacity: started
				? 1
				: 0,
			transform: started
				? "translateX(0px)"
				: forwards ? "translateX(16px)" : "translateX(-16px)",
			// Transition only forwards
			transition: started
				? "600ms ease"
				: "revert",
			transitionProperty: started
				? "opacity, transform"
				: "revert",
		}}>
			{children}
		</div>
	</>
}

export function TransitionProvider({ children }: PropsWithChildren) {
	const path = useContext(PathContext)!

	const [started, setStarted] = useState(false)
	const forwards = useMemo(() => path === "/", [path])

	// On path changes...
	useLayoutEffect(() => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				setStarted(true)
			})
		})
		return () => {
			setStarted(false)
		}
	}, [path])

	return <>
		{/* eslint-disable-next-line react/jsx-pascal-case */}
		<_TransitionContext.Provider value={useMemo(() => ({ started, forwards }), [forwards, started])}>
			{children}
		</_TransitionContext.Provider>
	</>
}
