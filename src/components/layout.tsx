import "./layout.sass"

import { cx, isMac } from "@/lib"
import { LayoutContext, SidebarState } from "@/state"
import { Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useEffect } from "react"

////////////////////////////////////////////////////////////////////////////////

function useBodyScrollLocking({ sidebar }: { sidebar: SidebarState }) {
	useEffect(() => {
		if (sidebar === "maximized") {
			document.body.style.overflowY = "clip"
		} else {
			document.body.style.overflowY = ""
			if (document.body.style.length === 0) {
				document.body.removeAttribute("style")
			}
		}
	}, [sidebar])
	return void 0
}

function useCancelableShortcut({ sidebar, setSidebar }: { sidebar: SidebarState; setSidebar: Dispatch<SetStateAction<SidebarState>> }) {
	useEffect(() => {
		if (sidebar !== "maximized") { return } // prettier-ignore
		function handleKeyDown(e: KeyboardEvent) {
			setSidebar("normal")
		}
		document.addEventListener("keydown", handleKeyDown, false)
		return () => document.removeEventListener("keydown", handleKeyDown, false)
	}, [setSidebar, sidebar])
	return void 0
}

function useToggleShortcut({ setSidebar }: { setSidebar: Dispatch<SetStateAction<SidebarState>> }) {
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((isMac() && e.metaKey && e.key === "\\") || (!isMac() && e.ctrlKey && e.key === "/")) {
				setSidebar(curr => {
					if (curr === "normal" || curr === "maximized") {
						return "minimized"
					} else {
						return "normal"
					}
				})
			}
		}
		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [setSidebar])
	return void 0
}

////////////////////////////////////////////////////////////////////////////////

export function Sidebar1({ children }: PropsWithChildren) {
	return (
		<aside className="sidebar">
			<div className="contents">{children}</div>
		</aside>
	)
}

export function Sidebar2({ children }: PropsWithChildren) {
	const { sidebar, setSidebar } = useContext(LayoutContext)!

	// DEBUG
	const DEBUG_cycleState = useCallback(() => {
		if (sidebar === "normal") {
			setSidebar("maximized")
		} else if (sidebar === "maximized") {
			setSidebar("minimized")
		} else {
			setSidebar("normal")
		}
	}, [setSidebar, sidebar])

	useBodyScrollLocking({ sidebar })
	useCancelableShortcut({ sidebar, setSidebar })
	useToggleShortcut({ setSidebar })

	return (
		<aside className={cx("sidebar", sidebar && `is-${sidebar}`)}>
			<div className="drag-area" onClick={DEBUG_cycleState}>
				<div className="handle"></div>
			</div>
			<div className="contents">{children}</div>
		</aside>
	)
}

function InternalSidebarOverlay() {
	const { sidebar, setSidebar } = useContext(LayoutContext)!

	const handleClickClose = useCallback(() => {
		if (sidebar === "maximized") {
			setSidebar("normal")
		}
	}, [setSidebar, sidebar])

	return <div className="sidebar-overlay" onClick={handleClickClose}></div>
}

function InternalMain({ children }: PropsWithChildren) {
	const { sidebar } = useContext(LayoutContext)!

	return (
		// @ts-expect-error
		<main className="main" inert={sidebar === "maximized" ? "true" : null}>
			{children}
		</main>
	)
}

export function Main({ children }: PropsWithChildren) {
	return (
		<>
			<InternalSidebarOverlay />
			<InternalMain>{children}</InternalMain>
		</>
	)
}
