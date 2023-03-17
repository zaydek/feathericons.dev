import React from "react"

export function DEV_DebugCss({ children }: React.PropsWithChildren) {
	const [showOutline, setShowOutline] = React.useState(false)

	if (import.meta.env.DEV) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		React.useEffect(() => {
			function handleKeyDown(e: KeyboardEvent) {
				if (e.key === "`") {
					setShowOutline(curr => !curr)
				}
			}
			window.addEventListener("keydown", handleKeyDown, false)
			return () => window.removeEventListener("keydown", handleKeyDown, false)
		}, [])
	}

	if (import.meta.env.DEV) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		React.useEffect(() => {
			if (showOutline) {
				document.body.setAttribute("data-debug-css", "true")
			} else {
				document.body.removeAttribute("data-debug-css")
			}
		}, [showOutline])
	}

	return <>{children}</>
}
