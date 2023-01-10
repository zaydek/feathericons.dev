import { PropsWithChildren, useContext, useEffect, useMemo, useState } from "react"
import { PathContext } from "./router"

export function Layout({ children }: PropsWithChildren) {
	const path = useContext(PathContext)!

	const [started, setStarted] = useState(false)
	const forwards = useMemo(() => path === "/", [path])

	// On path changes...
	useEffect(() => {
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
		<div>
			This is a wrapped component
			<div style={{
				opacity: started
					? 1
					: 0,
				transform: started
					? "translateX(0px)"
					: forwards ? "translateX(16px)" : "translateX(-16px)",
				transition: started
					? "600ms ease"
					: "revert", // Transition only forwards
				transitionProperty: started
					? "opacity, transform"
					: "revert",
			}}>
				{children}
			</div>
		</div>
	</>
}
