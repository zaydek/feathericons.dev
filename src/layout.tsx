import { PropsWithChildren, useContext, useEffect, useState } from "react"
import { PathContext } from "./router"

export function Layout({ children }: PropsWithChildren) {
	const path = useContext(PathContext)!

	const [started, setStarted] = useState(false)

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
					: "translateX(-16px)",
				transition: started
					? "1e3ms ease"
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
