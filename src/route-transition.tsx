import { useRouter } from "next/router"
import { PropsWithChildren, useState } from "react"
import { useIsomorphicLayoutEffect } from "./lib/react/use-isomorphic-layout-effect"

export function RouteTransition({ children }: PropsWithChildren) {
	const path = useRouter().asPath

	const [started, setStarted] = useState(false)
	const forwards = path !== "/"

	useIsomorphicLayoutEffect(() => {
		setTimeout(() => {
			setStarted(true)
		}, 10)
		return () => setStarted(false)
	}, [path])

	return (
		// prettier-ignore
		<div
			style={{
				opacity: started
					? 1
					: 0,
				transform: started
					? "translateX(0)"
					: `translateX(${forwards ? -16 : 16}px)`,
				transition: started
					? "300ms ease"
					: "none",
			}}
		>
			{started && children}
		</div>
	)
}
