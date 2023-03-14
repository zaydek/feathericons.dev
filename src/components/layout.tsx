import React from "react"

import { getCssVarAsNumber, round } from "@/lib"
import { LayoutContext, SidebarState } from "@/providers"

function useSideEffectHtmlAndBodyScrollLocking() {
	const { sidebar1, sidebar2 } = React.useContext(LayoutContext)!
	React.useEffect(() => {
		const hasMaximized = [sidebar1, sidebar2].some(s => s === "maximized")
		if (hasMaximized) {
			const targets = [document.documentElement, document.body]
			for (const target of targets) {
				target.style.overflow = "hidden"
			}
		} else {
			const targets = [document.documentElement, document.body]
			for (const target of targets) {
				target.style.overflow = ""
				if (target.style.length === 0) {
					target.removeAttribute("style")
				}
			}
		}
		return () => {
			const targets = [document.documentElement, document.body]
			for (const target of targets) {
				target.style.overflow = ""
				if (target.style.length === 0) {
					target.removeAttribute("style")
				}
			}
		}
	}, [sidebar1, sidebar2])
	return void 0
}

export function SidebarOverlay() {
	const { sidebar1, setSidebar1, sidebar2, setSidebar2 } = React.useContext(LayoutContext)!

	const open = sidebar1 === "maximized" || sidebar2 === "maximized"
	const setState = sidebar1 === "maximized" ? setSidebar1 : setSidebar2

	return <div className="sidebar-overlay" data-open={open} onClick={e => setState(null)}></div>
}

export function Sidebar({
	pos,
	children,
}: React.PropsWithChildren<{
	pos: "start" | "end"
}>) {
	const { sidebar1, setSidebar1, sidebar2, setSidebar2 } = React.useContext(LayoutContext)!

	let state: SidebarState
	let setState: React.Dispatch<React.SetStateAction<SidebarState>>
	if (pos === "start") {
		state = sidebar1
		setState = setSidebar1
	} else {
		state = sidebar2
		setState = setSidebar2
	}

	const ref = React.useRef<HTMLDivElement | null>(null)
	const dragAreaRef = React.useRef<HTMLDivElement | null>(null)

	const [transition, setTransition] = React.useState(false)
	const [pointerDown, setPointerDown] = React.useState<boolean>(false)
	const [startClientX, setStartClientX] = React.useState<number | null>(null)
	const [clientX, setClientX] = React.useState<number | null>(null)

	const x = startClientX === null || clientX === null ? 0 : clientX - startClientX

	React.useEffect(() => {
		function handlePointerDown(e: PointerEvent) {
			// Guards
			if (e.button !== 0 && e.button !== 1) return
			if (!dragAreaRef.current!.contains(e.target as HTMLElement)) return
			// Starts here
			e.preventDefault() // Prevent text selection
			setTransition(false) // FORCE transition=false
			setPointerDown(true)
			//// const boundingBox = dragAreaRef.current!.getBoundingClientRect()
			//// setStartClientX(boundingBox.x + boundingBox.width / 2)
			setStartClientX(round(e.clientX, { precision: 2 }))
			setClientX(round(e.clientX, { precision: 2 }))
		}
		function handlePointerMove(e: PointerEvent) {
			// Guards
			if (!pointerDown) return
			// Starts here
			setClientX(round(e.clientX, { precision: 2 }))
		}
		function handlePointerUp(e: PointerEvent) {
			// Guards
			if (!pointerDown) return
			// Starts here
			const width = getCssVarAsNumber("--__width", { scope: ref.current! })
			const maxWidth = getCssVarAsNumber("--__max-width", { scope: ref.current! })
			const d = maxWidth - width
			if (pos === "start") {
				if (state === "minimized") {
					if (x > width) {
						setState("maximized")
					} else if (x > 0) {
						setState(null)
					}
				} else if (state === null) {
					if (x > 0) {
						setState("maximized")
					} else if (x < 0) {
						setState("minimized")
					}
				} else if (state === "maximized") {
					if (x < -d) {
						setState("minimized")
					} else if (x < 0) {
						setState(null)
					}
				}
			} else {
				if (state === "minimized") {
					if (x < -width) {
						setState("maximized")
					} else if (x < 0) {
						setState(null)
					}
				} else if (state === null) {
					if (x < 0) {
						setState("maximized")
					} else if (x > 0) {
						setState("minimized")
					}
				} else if (state === "maximized") {
					if (x > d) {
						setState("minimized")
					} else if (x > 0) {
						setState(null)
					}
				}
			}
			setTransition(true)
			setPointerDown(false)
			setStartClientX(null)
			setClientX(null)
		}
		document.addEventListener("pointerdown", handlePointerDown, false)
		document.addEventListener("pointermove", handlePointerMove, false)
		document.addEventListener("pointerup",   handlePointerUp,   false) // prettier-ignore
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown, false)
			document.removeEventListener("pointermove", handlePointerMove, false)
			document.removeEventListener("pointerup",   handlePointerUp,   false) // prettier-ignore
		}
	}, [pointerDown, pos, setState, state, x])

	// Synchronously (useLayoutEffect) sync state changes -> transition
	const onceRef = React.useRef(false)
	React.useLayoutEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		void state
		setTransition(true)
	}, [state])

	//// // Use setTimeout to ensure transition=false. Preferred over onTransitionEnd.
	//// React.useEffect(() => {
	//// 	if (!transition) return
	//// 	const d = window.setTimeout(() => setTransition(false), 1e3)
	//// 	return () => window.clearTimeout(d)
	//// }, [transition])

	return (
		<aside
			ref={ref}
			className="sidebar"
			data-pos={pos}
			data-state={state}
			data-transition={transition}
			style={{ "--__x": `${x}px` } as React.CSSProperties}
			onTransitionEnd={e => setTransition(false)}
		>
			<div
				ref={dragAreaRef}
				className="sidebar-drag-area"
				//// onKeyDown={e => {
				//// 	if (e.key === "ArrowLeft") {
				//// 		if (pos === "start") {
				//// 			// ...
				//// 		} else {
				//// 			// ...
				//// 		}
				//// 	} else if (e.key === "ArrowRight") {
				//// 		if (pos === "start") {
				//// 			// ...
				//// 		} else {
				//// 			// ...
				//// 		}
				//// 	}
				//// }}
				tabIndex={0}
			>
				<div className="sidebar-drag-area-handle"></div>
			</div>
			<div className="sidebar-card">
				<div className="sidebar-card-body">{children}</div>
			</div>
		</aside>
	)
}

// Expose props for app.tsx (TODO)
export function Main({ children, ...props }: JSX.IntrinsicElements["main"]) {
	// Register effects once
	//// useShortcutFigmaStyleToggleSidebars()
	useSideEffectHtmlAndBodyScrollLocking()

	return (
		<>
			<main className="main" {...props}>
				{children}
			</main>
		</>
	)
}
