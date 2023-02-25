import { cx } from "@/lib"
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useMemo, useState } from "react"

////////////////////////////////////////////////////////////////////////////////

export type SidebarState = null | "minimized" | "maximized"

// prettier-ignore
const SidebarContext =
	createContext<{
		sidebar1:    SidebarState
		setSidebar1: Dispatch<SetStateAction<SidebarState>>
		sidebar2:    SidebarState
		setSidebar2: Dispatch<SetStateAction<SidebarState>>
	} | null>(null)

export function SidebarProvider({ children }: PropsWithChildren) {
	const [sidebar1, setSidebar1] = useState<SidebarState>(null)
	const [sidebar2, setSidebar2] = useState<SidebarState>(null)

	return (
		<SidebarContext.Provider
			value={useMemo(
				() => ({
					sidebar1,
					setSidebar1,
					sidebar2,
					setSidebar2,
				}),
				[sidebar1, sidebar2],
			)}
		>
			{children}
		</SidebarContext.Provider>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function Sidebar1({ children }: PropsWithChildren) {
	const { sidebar1: state, setSidebar1: setState } = useContext(SidebarContext)!

	const cycleState = useCallback(() => {
		if (state === null) {
			setState("maximized")
		} else if (state === "maximized") {
			setState("minimized")
		} else {
			setState(null)
		}
	}, [setState, state])

	return (
		<aside className={cx("sidebar", state && `is-${state}`)}>
			<div className="sidebar-drag-area" onClick={cycleState}>
				<div className="sidebar-handle"></div>
			</div>
			<div className="sidebar-contents">{children}</div>
		</aside>
	)
}

export function Sidebar2({ children }: PropsWithChildren) {
	const { sidebar2: state, setSidebar2: setState } = useContext(SidebarContext)!

	const cycleState = useCallback(() => {
		if (state === null) {
			setState("maximized")
		} else if (state === "maximized") {
			setState("minimized")
		} else {
			setState(null)
		}
	}, [setState, state])

	return (
		<aside className={cx("sidebar", state && `is-${state}`)}>
			<div className="sidebar-drag-area" onClick={cycleState}>
				<div className="sidebar-handle"></div>
			</div>
			<div className="sidebar-contents">{children}</div>
		</aside>
	)
}

function SidebarOverlay() {
	const { sidebar1, setSidebar1, sidebar2, setSidebar2 } = useContext(SidebarContext)!

	const closeAll = useCallback(() => {
		if (sidebar1 === "maximized") {
			setSidebar1(null)
		} else if (sidebar2 === "maximized") {
			setSidebar2(null)
		}
	}, [setSidebar1, setSidebar2, sidebar1, sidebar2])

	return <div className="sidebar-overlay" onClick={closeAll}></div>
}

export function Main({ children }: PropsWithChildren) {
	return (
		<>
			<SidebarOverlay />
			<main className="main">{children}</main>
		</>
	)
}
