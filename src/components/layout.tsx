import "./layout.sass"

import { cx, isMac } from "@/lib"
import { LayoutContext, SidebarState } from "@/providers"
import { Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useEffect } from "react"

function useScrollLocking({ state }: { state: SidebarState }) {
	useEffect(() => {
		if (state === "maximized") {
			document.body.style.overflowY = "clip"
		} else {
			document.body.style.overflowY = ""
			if (document.body.style.length === 0) {
				document.body.removeAttribute("style")
			}
		}
	}, [state])
	return void 0
}

function useEscapeKeyShortcut({ state, setState }: { state: SidebarState; setState: Dispatch<SetStateAction<SidebarState>> }) {
	useEffect(() => {
		if (state !== "maximized") { return } // prettier-ignore
		function handleKeyDown(e: KeyboardEvent) {
			setState(null)
		}
		document.addEventListener("keydown", handleKeyDown, false)
		return () => document.removeEventListener("keydown", handleKeyDown, false)
	}, [setState, state])
	return void 0
}

function useToggleSidebarShortcut({ setState }: { setState: Dispatch<SetStateAction<SidebarState>> }) {
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((isMac() && e.metaKey && e.key === "\\") || (!isMac() && e.ctrlKey && e.key === "/")) {
				setState(curr => {
					if (curr === null || curr === "maximized") {
						return "minimized"
					} else {
						return null
					}
				})
			}
		}
		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [setState])
	return void 0
}

export function Sidebar1({ children }: PropsWithChildren) {
	//// const { sidebar1: state, setSidebar1: setState } = useContext(SidebarContext)!
	////
	//// const cycleState = useCallback(() => {
	//// 	if (state === null) {
	//// 		setState("maximized")
	//// 	} else if (state === "maximized") {
	//// 		setState("minimized")
	//// 	} else {
	//// 		setState(null)
	//// 	}
	//// }, [setState, state])
	////
	//// useEffect(() => {
	//// 	if (state === "maximized") {
	//// 		document.body.style.overflowY = "clip"
	//// 	} else {
	//// 		document.body.style.overflowY = ""
	//// 		if (document.body.style.length === 0) {
	//// 			document.body.removeAttribute("style")
	//// 		}
	//// 	}
	//// }, [state])

	return (
		<aside className="sidebar">
			{/* <div className="drag-area" onClick={cycleState}>
				<div className="handle"></div>
			</div> */}
			<div className="contents">{children}</div>
		</aside>
	)
}

export function Sidebar2({ children }: PropsWithChildren) {
	const { sidebar2: state, setSidebar2: setState } = useContext(LayoutContext)!

	const cycleState = useCallback(() => {
		if (state === null) {
			setState("maximized")
		} else if (state === "maximized") {
			setState("minimized")
		} else {
			setState(null)
		}
	}, [setState, state])

	useScrollLocking({ state })
	useEscapeKeyShortcut({ state, setState })
	useToggleSidebarShortcut({ setState })

	return (
		<aside className={cx("sidebar", state && `is-${state}`)}>
			<div className="drag-area" onClick={cycleState}>
				<div className="handle"></div>
			</div>
			<div className="contents">{children}</div>
		</aside>
	)
}

function _SidebarOverlay() {
	const { sidebar1, setSidebar1, sidebar2, setSidebar2 } = useContext(LayoutContext)!

	const closeAll = useCallback(() => {
		if (sidebar1 === "maximized") {
			setSidebar1(null)
		} else if (sidebar2 === "maximized") {
			setSidebar2(null)
		}
	}, [setSidebar1, setSidebar2, sidebar1, sidebar2])

	return <div className="sidebar-overlay" onClick={closeAll}></div>
}

function _Main({ children }: PropsWithChildren) {
	const { sidebar1: s1, sidebar2: s2 } = useContext(LayoutContext)!

	// prettier-ignore
	const inert =
		s1 === "maximized" ||
		s2 === "maximized"
			? "true"
			: null

	return (
		// @ts-expect-error
		<main className="main" inert={inert}>
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
