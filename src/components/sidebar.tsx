import react from "react"

import { attr, isMac, round } from "@/lib"
import { sidebarContext, SidebarState } from "@/providers"

////////////////////////////////////////////////////////////////////////////////

// TODO: Make aware of both sidebars
function useShortcutEscToCloseSidebarOverlay() {
	const { sidebar2, setSidebar2 } = react.useContext(sidebarContext)!
	react.useEffect(() => {
		if (sidebar2 !== "maximized") return
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setSidebar2(null)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [setSidebar2, sidebar2])
	return void 0
}

// TODO: Make aware of both sidebars
function useShortcutCtrlBackslashToCycleSidebar() {
	const { setSidebar2 } = react.useContext(sidebarContext)!
	react.useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			// prettier-ignore
			if (!(
				(isMac() ? e.metaKey : e.ctrlKey) &&
				e.key === "\\"
			)) return
			setSidebar2(curr => {
				switch (curr) {
					case "minimized":
						return null
					case null:
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

// TODO: Make aware of both sidebars
function useSideEffectHtmlAndBodyScrollLocking() {
	const { sidebar2 } = react.useContext(sidebarContext)!
	react.useEffect(() => {
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

////////////////////////////////////////////////////////////////////////////////

export function SidebarOverlay() {
	const { sidebar1, setSidebar1, sidebar2, setSidebar2 } = react.useContext(sidebarContext)!

	//// let state: SidebarState
	//// let setState: React.Dispatch<React.SetStateAction<SidebarState>>
	//// if (pos === "start") {
	//// 	state = sidebar1
	//// 	setState = setSidebar1
	//// } else {
	//// 	state = sidebar2
	//// 	setState = setSidebar2
	//// }

	const open = sidebar1 === "maximized" || sidebar2 === "maximized"
	const setState = sidebar1 === "maximized" ? setSidebar1 : setSidebar2

	return (
		<div
			className="sidebar-overlay"
			data-open={attr(open)}
			onClick={e => {
				console.log("Test")
				setState(null)
			}}
		></div>
	)
}

//// ////////////////////////////////////////////////////////////////////////////////
////
//// //// export function Sidebar1({ children }: react.PropsWithChildren) {
//// //// 	//// const { sidebar2 } = React.useContext(LayoutContext)!
//// //// 	return (
//// //// 		<aside className="sidebar">
//// //// 			<div className="sidebar-contents">{children}</div>
//// //// 		</aside>
//// //// 	)
//// //// }
////
//// ////////////////////////////////////////////////////////////////////////////////
////
//// //// export function Sidebar2({ children }: react.PropsWithChildren) {
//// //// 	const { sidebar2, setSidebar2 } = react.useContext(LayoutContext)!
//// ////
//// //// 	// DEBUG
//// //// 	const DEBUG_cycleSidebar = react.useCallback(() => {
//// //// 		setSidebar2(curr => {
//// //// 			switch (curr) {
//// //// 				case "minimized":
//// //// 					return null
//// //// 				case null:
//// //// 					return "maximized"
//// //// 				case "maximized":
//// //// 					return "minimized"
//// //// 			}
//// //// 		})
//// //// 	}, [setSidebar2])
//// ////
//// //// 	useShortcutEscToCloseSidebarOverlay()
//// //// 	useShortcutCtrlBackslashToCycleSidebar()
//// ////
//// //// 	useSideEffectHtmlAndBodyScrollLocking()
//// ////
//// //// 	return (
//// //// 		<aside className={cx("sidebar", sidebar2 && `is-${sidebar2}`)}>
//// //// 			<div className="drag-area" onClick={DEBUG_cycleSidebar}>
//// //// 				<div className="handle"></div>
//// //// 			</div>
//// //// 			<div className="sidebar-contents">{children}</div>
//// //// 		</aside>
//// //// 	)
//// //// }

export function Sidebar({
	pos,
	minWidth,
	maxWidth,
	children,
}: react.PropsWithChildren<{
	pos: "start" | "end"
	minWidth: number
	maxWidth: number
}>) {
	const { sidebar1, setSidebar1, sidebar2, setSidebar2 } = react.useContext(sidebarContext)!

	let state: SidebarState
	let setState: react.Dispatch<react.SetStateAction<SidebarState>>
	if (pos === "start") {
		state = sidebar1
		setState = setSidebar1
	} else {
		state = sidebar2
		setState = setSidebar2
	}

	const ref = react.useRef<HTMLDivElement | null>(null)
	const dragAreaRef = react.useRef<HTMLDivElement | null>(null)

	const [transition, setTransition] = react.useState(false)
	const [pointerDown, setPointerDown] = react.useState<boolean>(false)
	const [startClientX, setStartClientX] = react.useState<number | null>(null)
	const [clientX, setClientX] = react.useState<number | null>(null)

	const x = startClientX === null || clientX === null ? 0 : clientX - startClientX

	react.useEffect(() => {
		function handlePointerDown(e: PointerEvent) {
			// Guards
			if (e.button !== 0 && e.button !== 1) return
			if (!dragAreaRef.current!.contains(e.target as HTMLElement)) return
			// Starts here
			e.preventDefault() // Prevent text selection
			// COMPAT/Safari: Typically we don't need to setTransition(false) here but
			// Safari onTransitionEnd doesn't always fire? (╯°□°)╯︵ ┻━┻
			setTransition(false)
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
			const d = maxWidth - minWidth
			if (pos === "start") {
				if (state === null) {
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
				} else if (state === "minimized") {
					if (x > minWidth) {
						setState("maximized")
					} else if (x > 0) {
						setState(null)
					}
				}
			} else {
				if (state === null) {
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
				} else if (state === "minimized") {
					if (x < -minWidth) {
						setState("maximized")
					} else if (x < 0) {
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
	}, [maxWidth, minWidth, pointerDown, pos, setState, state, x])

	// Synchronously (useLayoutEffect) sync state changes -> transition
	const onceRef = react.useRef(false)
	react.useLayoutEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		void state
		setTransition(true)
	}, [state])

	return (
		<aside
			ref={ref}
			className="sidebar"
			data-pos={attr(pos)}
			data-state={attr(state)}
			data-transition={attr(transition)}
			style={
				{
					"--__x": `${x}px`,
					"--__min-width": `${minWidth}px`,
					"--__max-width": `${maxWidth}px`,
				} as react.CSSProperties
			}
			onTransitionEnd={e => setTransition(false)}
		>
			<div
				ref={dragAreaRef}
				className="sidebar-drag-area"
				onKeyDown={e => {
					if (e.key === "ArrowLeft") {
						if (pos === "start") {
							// ...
						} else {
							// ...
						}
					} else if (e.key === "ArrowRight") {
						if (pos === "start") {
							// ...
						} else {
							// ...
						}
					}
				}}
				tabIndex={0}
			>
				<div className="sidebar-drag-area-handle"></div>
			</div>
			<div className="sidebar-card">
				<div className="sidebar-card-content" style={{ width: state === "maximized" ? maxWidth : undefined }}>
					{children}
				</div>
			</div>
		</aside>
	)
}

////////////////////////////////////////////////////////////////////////////////

// Expose props for app.tsx (TODO)
export function Main({ children, ...props }: JSX.IntrinsicElements["main"]) {
	return (
		<>
			<main className="main" {...props}>
				{children}
			</main>
		</>
	)
}
