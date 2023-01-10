import { PropsWithChildren, useContext, useEffect, useState } from "react"
import { PathContext } from "./router"

export function Layout({ children }: PropsWithChildren) {
	const path = useContext(PathContext)!

	const [count, setCount] = useState(0)

	// On path changes...
	useEffect(() => {
		setCount(curr => curr + 1)
		console.log("a")
		//// return () => {
		//// 	setCount(curr => curr + 1)
		//// 	console.log("b")
		//// }
	}, [path])

	return <>
		<div>
			This is a wrapped component
			<div style={{
				transform: count % 2 === 1
					? "translateX(0px)"
					: "translateX(-16px)",
				transition: "transform 300ms ease",
			}}>
				{children}
			</div>
		</div>
	</>
}
