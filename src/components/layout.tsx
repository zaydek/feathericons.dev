import { cx, isMac } from "@/lib"
import { LayoutContext } from "@/state"
import { PropsWithChildren, useCallback, useContext, useEffect } from "react"

////////////////////////////////////////////////////////////////////////////////

export function Sidebar1({ children }: PropsWithChildren) {
	return (
		<aside className="sidebar">
			<div className="sidebar-contents">{children}</div>
		</aside>
	)
}

////////////////////////////////////////////////////////////////////////////////

function useShortcutEscCancel() {
	const { sidebar, setSidebar } = useContext(LayoutContext)!
	useEffect(() => {
		if (sidebar !== "maximized") return
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setSidebar("open")
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [setSidebar, sidebar])
	return void 0
}

function useShortcutCtrlBackslashCycle() {
	const { setSidebar } = useContext(LayoutContext)!
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			// prettier-ignore
			if (!(
				(isMac() ? e.metaKey : e.ctrlKey) &&
				e.key === "\\"
			)) return
			setSidebar(curr => {
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
	}, [setSidebar])
	return void 0
}

function useSideEffectHtmlAndBodyScrollLocking() {
	const { sidebar } = useContext(LayoutContext)!
	useEffect(() => {
		const targets = [document.documentElement, document.body]
		for (const target of targets) {
			target.style.overflow = sidebar === "maximized" ? "hidden" : ""
		}
		return () => {
			for (const target of targets) {
				target.style.overflow = ""
			}
		}
	}, [sidebar])
	return void 0
}

export function Sidebar2({ children }: PropsWithChildren) {
	const { sidebar, setSidebar } = useContext(LayoutContext)!

	// DEBUG
	const DEBUG_cycleSidebar = useCallback(() => {
		setSidebar(curr => {
			switch (curr) {
				case "minimized":
					return "open"
				case "open":
					return "maximized"
				case "maximized":
					return "minimized"
			}
		})
	}, [setSidebar])

	useShortcutEscCancel()
	useShortcutCtrlBackslashCycle()

	useSideEffectHtmlAndBodyScrollLocking()

	return (
		<aside className={cx("sidebar", sidebar && `is-${sidebar}`)}>
			<div className="drag-area" onClick={DEBUG_cycleSidebar}>
				<div className="handle"></div>
			</div>
			<div className="sidebar-contents">{children}</div>
		</aside>
	)
}

////////////////////////////////////////////////////////////////////////////////

function _SidebarOverlay() {
	const { sidebar, setSidebar } = useContext(LayoutContext)!

	return (
		<div
			className="sidebar-overlay"
			onClick={e => setSidebar("open")}
			// @ts-expect-error
			inert={sidebar !== "maximized" ? "true" : null}
		></div>
	)
}

// Expose props for <main>
function _Main({ children, ...props }: JSX.IntrinsicElements["main"]) {
	const { sidebar } = useContext(LayoutContext)!

	return (
		// @ts-expect-error
		<main className="main" inert={sidebar === "maximized" ? "true" : null} {...props}>
			{children}
		</main>
	)
}

// Expose props for <main>
export function Main({ children, ...props }: JSX.IntrinsicElements["main"]) {
	return (
		<>
			<_SidebarOverlay />
			<_Main {...props}>{children}</_Main>
		</>
	)
}
