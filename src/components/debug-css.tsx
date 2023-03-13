import react from "react"

export function DEV_DebugCss({ children }: react.PropsWithChildren) {
	const [showOutline, setShowOutline] = react.useState(false)

	if (import.meta.env.DEV) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		react.useEffect(() => {
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
		react.useEffect(() => {
			if (showOutline) {
				document.body.setAttribute("data-debug-css", "true")
			} else {
				document.body.removeAttribute("data-debug-css")
			}
		}, [showOutline])
	}

	return <>{children}</>
}
