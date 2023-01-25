import { useRouter } from "next/router"
import { cloneElement, ReactElement, TransitionEvent, useEffect, useState } from "react"
import { Arrayable } from "./lib/types"

export function RouteTransition({ children }: { children: Arrayable<ReactElement> }) {
	const path = useRouter().asPath

	const [started, setStarted] = useState(false)
	const [ended, setEnded] = useState(false)

	const forwards = path !== "/"

	// TODO: Does this need useIsomorphicLayoutEffect? For rendering on the
	// server, we want content to be rendered but invisible. This likely doesn't
	// matter unless we are unmounting elements.
	useEffect(() => {
		setTimeout(() => {
			setStarted(true)
		}, 10)
		return () => setStarted(false)
	}, [path])

	return (
		<>
			{[children].flat().map((child, index) =>
				cloneElement(child, {
					key: index,
					style: ended
						? null
						: {
								transform: started ? "translateX(0)" : `translateX(${forwards ? -16 : 16}px)`,
								opacity: started ? 1 : 0,
								// prettier-ignore
								transition: started ? [
									"transform 300ms ease",
									"opacity 300ms ease",
								].join(", ") : "none",
						  },
					onTransitionEnd:
						index === 0
							? (e: TransitionEvent<HTMLDivElement>) => {
									setEnded(true)
							  }
							: null,
				})
			)}
		</>
	)
}
