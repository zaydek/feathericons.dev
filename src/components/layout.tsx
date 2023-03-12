import { cx, isMac } from "@/lib"
import { LayoutContext } from "@/state"
import { PropsWithChildren, useCallback, useContext, useEffect } from "react"

////////////////////////////////////////////////////////////////////////////////

export function Sidebar1({ children }: PropsWithChildren) {
	const { sidebar2 } = useContext(LayoutContext)!
	return (
		// @ts-expect-error
		<aside className="sidebar" inert={sidebar2 ? "true" : null}>
			<div className="sidebar-contents">{children}</div>
		</aside>
	)
}

////////////////////////////////////////////////////////////////////////////////

function useShortcutEscCloseSidebarOverlay() {
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

function useShortcutCtrlBackslashCycleSidebar() {
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

	useShortcutEscCloseSidebarOverlay()
	useShortcutCtrlBackslashCycleSidebar()

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
	const { sidebar2, setSidebar2 } = useContext(LayoutContext)!

	return (
		<>
			<div
				className="sidebar-overlay"
				onClick={e => setSidebar2("open")}
				// @ts-expect-error
				inert={sidebar2 !== "maximized" ? "true" : null}
			></div>
			{/* @ts-expect-error */}
			<main className="main" inert={sidebar2 === "maximized" ? "true" : null} {...props}>
				{children}
			</main>
		</>
	)
}
