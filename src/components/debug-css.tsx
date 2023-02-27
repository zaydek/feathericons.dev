import "./debug-css.sass"

import { useEffect, useState } from "react"

export function DebugCssEffect() {
	const [showOutline, setShowOutline] = useState(false)

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "`") {
				setShowOutline(curr => !curr)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [])

	useEffect(() => {
		if (showOutline) {
			document.body.setAttribute("data-debug-css", "true")
		} else {
			document.body.removeAttribute("data-debug-css")
		}
	}, [showOutline])

	return <></>
}
