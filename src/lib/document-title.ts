import React from "react"

export function useDocumentTitle(title: string) {
	React.useEffect(() => {
		const originalTitle = document.title
		document.title = title
		return () => void (document.title = originalTitle)
	}, [title])
	return void 0
}

export function useVisibleDocumentTitle([active, inactive]: readonly [string, string]) {
	React.useEffect(() => {
		const originalTitle = document.title
		function handleVisibilityChange() {
			document.title = document.visibilityState === "visible" ? active : inactive
		}
		handleVisibilityChange()
		window.addEventListener("visibilitychange", handleVisibilityChange, false)
		return () => {
			window.removeEventListener("visibilitychange", handleVisibilityChange, false)
			document.title = originalTitle
		}
	}, [active, inactive])
	return void 0
}
