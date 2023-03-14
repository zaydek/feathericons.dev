import React from "react"

import { ProgressBarContext } from "@/providers"

const TICK_MS = 100
const TICK_END_MS = 200

export function ProgresssBar() {
	const { started } = React.useContext(ProgressBarContext)!

	const [progress, setProgress] = React.useState(0)
	const working = progress > 0 && progress < 1

	const progressRef = React.useRef(progress)
	React.useEffect(() => {
		progressRef.current = progress
	}, [progress])

	const onceRef = React.useRef(false)
	React.useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		if (started) {
			setProgress(0.5)
			const d = window.setInterval(() => {
				if (progressRef.current >= 0.95) {
					window.clearInterval(d)
					return
				}
				setProgress(curr => Math.min(0.95, curr + Math.random() * 0.25))
			}, TICK_MS)
			return () => window.clearInterval(d)
		} else {
			setProgress(1)
			const d = window.setTimeout(() => {
				setProgress(0)
			}, TICK_END_MS)
			return () => window.clearTimeout(d)
		}
	}, [started])

	return (
		<div
			className="progress-bar"
			style={{
				width: `${progress * 100}%`,
				opacity: working ? 1 : 0,
				transition: [`width ${TICK_MS}ms ease`, !working && `opacity ${TICK_END_MS}ms ease ${TICK_MS}ms`]
					.filter(Boolean)
					.join(", "),
			}}
			onTransitionEnd={e => {
				if (e.propertyName === "opacity") {
					setProgress(0)
				}
			}}
		></div>
	)
}
