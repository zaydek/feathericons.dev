import { cx, isMac } from "@/lib"
import { LayoutContext } from "@/state"
import { PropsWithChildren, useCallback, useContext, useEffect } from "react"

////////////////////////////////////////////////////////////////////////////////

export function Sidebar1({ children }: PropsWithChildren) {
	//// const { sidebar2 } = useContext(LayoutContext)!
	return (
		<aside className="sidebar">
			<div className="sidebar-contents">{children}</div>
		</aside>
	)
}

////////////////////////////////////////////////////////////////////////////////

function useShortcutEscToCloseSidebarOverlay() {
	const { sidebar2, setSidebar2 } = useContext(LayoutContext)!
	useEffect(() => {
		if (sidebar2 !== "maximized") return
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setSidebar2("open")
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [setSidebar2, sidebar2])
	return void 0
}

function useShortcutCtrlBackslashToCycleSidebar() {
	const { setSidebar2 } = useContext(LayoutContext)!
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			// prettier-ignore
			if (!(
				(isMac() ? e.metaKey : e.ctrlKey) &&
				e.key === "\\"
			)) return
			setSidebar2(curr => {
				switch (curr) {
					case "minimized":
						return "open"
					case "open":
						return "maximized"
					case "maximized":
						return "minimized"
				}
			})
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [setSidebar2])
	return void 0
}

function useSideEffectHtmlAndBodyScrollLocking() {
	const { sidebar2 } = useContext(LayoutContext)!
	useEffect(() => {
		const targets = [document.documentElement, document.body]
		for (const target of targets) {
			target.style.overflow = sidebar2 === "maximized" ? "hidden" : ""
		}
		return () => {
			for (const target of targets) {
				target.style.overflow = ""
			}
		}
	}, [sidebar2])
	return void 0
}

export function Sidebar2({ children }: PropsWithChildren) {
	const { sidebar2, setSidebar2 } = useContext(LayoutContext)!

	// DEBUG
	const DEBUG_cycleSidebar = useCallback(() => {
		setSidebar2(curr => {
			switch (curr) {
				case "minimized":
					return "open"
				case "open":
					return "maximized"
				case "maximized":
					return "minimized"
			}
		})
	}, [setSidebar2])

	useShortcutEscToCloseSidebarOverlay()
	useShortcutCtrlBackslashToCycleSidebar()

	useSideEffectHtmlAndBodyScrollLocking()

	return (
		<aside className={cx("sidebar", sidebar2 && `is-${sidebar2}`)}>
			<div className="drag-area" onClick={DEBUG_cycleSidebar}>
				<div className="handle"></div>
			</div>
			<div className="sidebar-contents">{children}</div>
		</aside>
	)
}

////////////////////////////////////////////////////////////////////////////////

// Expose props for app.tsx (TODO)
export function Main({ children, ...props }: JSX.IntrinsicElements["main"]) {
	const { setSidebar2 } = useContext(LayoutContext)!

	return (
		<>
			<div className="sidebar-overlay" onClick={e => setSidebar2("open")}></div>
			<main className="main" {...props}>
				{children}
			</main>
		</>
	)
}
