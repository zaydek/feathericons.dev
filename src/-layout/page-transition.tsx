import { useRouter } from "next/router"
import { PropsWithChildren, useLayoutEffect, useState } from "react"
import { queue } from "../lib/queue"

const useClientLayoutEffect = typeof window === "undefined" ? () => {} : useLayoutEffect

export function PageTransition({ children }: PropsWithChildren) {
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
		<div
			style={
				ended
					? undefined
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
					  }
			}
			onTransitionEnd={e => {
				setEnded(true)
			}}
		>
			{children}
		</div>
	)
}
