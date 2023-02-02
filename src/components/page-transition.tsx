import { useRouter } from "next/router"
import { cloneElement, ReactElement, TransitionEvent, useLayoutEffect, useState } from "react"
import { queue } from "../lib/queue"
import { Arrayable } from "../lib/types"

const useClientLayoutEffect = typeof window === "undefined" ? () => {} : useLayoutEffect

export function PageTransition({ children }: { children: Arrayable<ReactElement> }) {
	const path = useRouter().asPath

	const [started, setStarted] = useState(false)
	const [ended, setEnded] = useState(false)

	const forwards = path !== "/"

	useClientLayoutEffect(() => {
		queue(() => setStarted(true))
		return () => {
			setStarted(false)
			setEnded(false)
		}
	}, [path])

	return (
		<>
			{[children].flat().map((child, index) =>
				cloneElement(child, {
					key: index,
					style: ended
						? null
						: {
								// prettier-ignore
								transform: started
									? "translateX(0px)"
									: `translateX(${forwards ? -16 : 16}px)`,
								// prettier-ignore
								opacity: started
									? 1
									: 0,
								// prettier-ignore
								transition: started
									? ["transform 300ms ease", "opacity 300ms ease"].join(", ")
									: "none",
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
