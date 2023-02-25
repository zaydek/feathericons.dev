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

	return <>{showOutline && <style>{`*:not(svg *) { outline: 1px solid hsl(0, 100%, 50%, 0.125); }`}</style>}</>
}
