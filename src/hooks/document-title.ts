import { useEffect } from "react"

export function useDocumentTitle(title: string) {
	useEffect(() => {
		const originalTitle = document.title
		document.title = title
		return () => {
			document.title = originalTitle
		}
	}, [title])
	return void 0
}

export function useVisibleDocumentTitle({ active, inactive }: { active: string; inactive: string }) {
	useEffect(() => {
		const originalTitle = document.title
		function handleVisibilityChange() {
			document.title = document.visibilityState === "visible" ? active : inactive
		}
		handleVisibilityChange()
		document.addEventListener("visibilitychange", handleVisibilityChange)
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange)
			document.title = originalTitle
		}
	}, [active, inactive])
	return void 0
}
