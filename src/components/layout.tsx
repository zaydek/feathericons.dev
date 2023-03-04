import "./layout.sass"

import { cx, isMac } from "@/lib"
import { ClipboardContext, LayoutContext, SidebarState } from "@/state"
import { Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useEffect } from "react"

////////////////////////////////////////////////////////////////////////////////

function useDocumentAndBodyScrollLocking({ sidebar }: { sidebar: SidebarState }) {
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

function useCancelableShortcut({
	sidebar,
	setSidebar,
}: {
	sidebar: SidebarState
	setSidebar: Dispatch<SetStateAction<SidebarState>>
}) {
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

function useToggleShortcut({ setSidebar }: { setSidebar: Dispatch<SetStateAction<SidebarState>> }) {
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

	// TODO: Move to provider?
	useDocumentAndBodyScrollLocking({ sidebar })
	useCancelableShortcut({ sidebar, setSidebar })
	useToggleShortcut({ setSidebar })

	return (
		<aside className={cx("sidebar", sidebar && `is-${sidebar}`)}>
			<div className="drag-area" onClick={DEBUG_cycleSidebar}>
				<div className="handle"></div>
			</div>
			<div className="contents">{children}</div>
		</aside>
	)
}

function _SidebarOverlay() {
	const { sidebar, setSidebar } = useContext(LayoutContext)!
	const handleClickClose = useCallback(() => {
		if (sidebar === "maximized") {
			setSidebar("open")
		}
	}, [setSidebar, sidebar])
	return <div className="sidebar-overlay" onClick={handleClickClose}></div>
}

//// function _Main({ children }: PropsWithChildren) {
//// 	const { sidebar } = useContext(LayoutContext)!
//// 	return (
//// 		// @ts-expect-error
//// 		<main className="main" inert={sidebar === "maximized" ? "true" : null}>
//// 			{children}
//// 		</main>
//// 	)
//// }

function _Main({ children }: PropsWithChildren) {
	const { sidebar } = useContext(LayoutContext)!
	const { clearSelected } = useContext(ClipboardContext)!

	return (
		<main
			className="main"
			onClick={e => {
				e.stopPropagation()
				e.preventDefault()
				clearSelected()
			}}
			// @ts-expect-error
			inert={sidebar === "maximized" ? "true" : null}
		>
			{children}
		</main>
	)
}

export function Main({ children }: PropsWithChildren) {
	return (
		<>
			<_SidebarOverlay />
			<_Main>{children}</_Main>
		</>
	)
}
