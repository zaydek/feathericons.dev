import { PropsWithChildren, useContext, useEffect, useState } from "react"
import { PathContext } from "./router"

export function Layout({ children }: PropsWithChildren) {
	const path = useContext(PathContext)!

	//// const [count, setCount] = useState(0)
	const [started, setStarted] = useState(false)

	// On path changes...
	useEffect(() => {
		setTimeout(() => {
			setStarted(true)
		}, 100)
		return () => {
			setStarted(false)
		}
	}, [path])

	return <>
		<div>
			This is a wrapped component
			<div style={{
				transform: started
					? "translateX(0px)"
					: "translateX(-16px)",
				transition: "transform 300ms ease",
			}}>
				{children}
			</div>
		</div>
	</>
}
