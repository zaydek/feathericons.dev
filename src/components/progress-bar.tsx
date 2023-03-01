import "./progress-bar.sass"

import { ProgressBarContext } from "@/state"
import { useContext, useEffect, useState } from "react"

const TICK_MS = 200
const TICK_END_MS = 400

export function ProgresssBar() {
	const { started } = useContext(ProgressBarContext)!

	const [progress, setProgress] = useState(0)
	const working = progress > 0 && progress < 1

	useEffect(() => {
		if (!started) return
		const intervalId = setInterval(() => {
			if (progress >= 0.95) {
				clearInterval(intervalId)
				return
			}
			setProgress(curr => Math.min(0.95, curr + Math.random() * 0.25))
		}, 250)
		return () => clearInterval(intervalId)
	}, [progress, started])

	return (
		<div
			className="progress-bar"
			style={{
				width: `${progress * 100}%`,
				// TODO: Change to revert?
				opacity: working ? "initial" : 0,
				transition: [`width ${TICK_MS}ms ease`, !working && `opacity ${TICK_END_MS}ms ease ${TICK_MS}ms`].filter(Boolean).join(", "),
			}}
			onTransitionEnd={e => {
				if (e.propertyName === "opacity") {
					setProgress(0)
				}
			}}
		></div>
	)
}
