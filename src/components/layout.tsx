import React from "react"

import { getCssVarAsNumber, round } from "@/lib"
import { LayoutContext, SidebarState } from "@/providers"

////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////

// TODO: This should be a general purpose component not integrated to a context
export function Sidebar({
	pos,
	children,
}: React.PropsWithChildren<{
	pos: "start" | "end"
}>) {
	const { sidebar1, setSidebar1, sidebar2, setSidebar2 } = React.useContext(LayoutContext)!

	let state: SidebarState
	let otherState: SidebarState
	let setState: React.Dispatch<React.SetStateAction<SidebarState>>
	if (pos === "start") {
		state = sidebar1
		otherState = sidebar2
		setState = setSidebar1
	} else {
		state = sidebar2
		otherState = sidebar1
		setState = setSidebar2
	}

	const ref = React.useRef<HTMLDivElement | null>(null)
	const dragAreaRef = React.useRef<HTMLDivElement | null>(null)

	const [transition, setTransition] = React.useState(false)
	const [pointerDown, setPointerDown] = React.useState<boolean>(false)
	const [startClientX, setStartClientX] = React.useState<number | null>(null)
	const [clientX, setClientX] = React.useState<number | null>(null)

	const x = startClientX === null || clientX === null ? 0 : clientX - startClientX

	// Sync state changes -> transition
	const onceRef = React.useRef(false)
	React.useLayoutEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		void state
		setTransition(true)
	}, [state])

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
						setState("open")
					}
				} else if (state === "open") {
					if (x > 0) {
						setState("maximized")
					} else if (x < 0) {
						setState("minimized")
					}
				} else if (state === "maximized") {
					if (x < -d) {
						setState("minimized")
					} else if (x < 0) {
						setState("open")
					}
				}
			} else {
				if (state === "minimized") {
					if (x < -width) {
						setState("maximized")
					} else if (x < 0) {
						setState("open")
					}
				} else if (state === "open") {
					if (x < 0) {
						setState("maximized")
					} else if (x > 0) {
						setState("minimized")
					}
				} else if (state === "maximized") {
					if (x > d) {
						setState("minimized")
					} else if (x > 0) {
						setState("open")
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

	return (
		<aside
			ref={ref}
			className="sidebar"
			data-pos={pos}
			// Omit state from [data-state] for CSS
			data-state={state === "open" ? undefined : state}
			data-transition={transition}
			style={{ "--__x": `${x}px` } as React.CSSProperties}
			onTransitionEnd={e => setTransition(false)}
			// @ts-expect-error
			inert={otherState === "maximized" ? "true" : undefined}
		>
			<div
				ref={dragAreaRef}
				className="sidebar-drag-area"
				onKeyDown={e => {
					if (pos === "start") {
						// pos=start
						if (e.key === "ArrowLeft") {
							switch (state) {
								case "minimized":
									// No-op
									break
								case "open":
									setState("minimized")
									break
								case "maximized":
									setState("open")
									break
							}
						} else if (e.key === "ArrowRight") {
							switch (state) {
								case "minimized":
									setState("open")
									break
								case "open":
									setState("maximized")
									break
								case "maximized":
									// No-op
									break
							}
						}
					} else {
						// pos=end
						if (e.key === "ArrowLeft") {
							switch (state) {
								case "minimized":
									setState("open")
									break
								case "open":
									setState("maximized")
									break
								case "maximized":
									// No-op
									break
							}
						} else if (e.key === "ArrowRight") {
							switch (state) {
								case "minimized":
									// No-op
									break
								case "open":
									setState("minimized")
									break
								case "maximized":
									setState("open")
									break
							}
						}
					}
				}}
				tabIndex={0}
			>
				<div className="sidebar-drag-area-grip"></div>
			</div>
			<div
				className="sidebar-card"
				// @ts-expect-error
				inert={state === "minimized" ? "true" : undefined}
			>
				<div className="sidebar-card-body">{children}</div>
			</div>
		</aside>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function SidebarOverlay() {
	const { sidebar1, setSidebar1, sidebar2, setSidebar2 } = React.useContext(LayoutContext)!

	const open = sidebar1 === "maximized" || sidebar2 === "maximized"
	const setState = sidebar1 === "maximized" ? setSidebar1 : setSidebar2

	return (
		<div
			className="sidebar-overlay"
			data-open={open}
			onClick={e => setState("open")}
			// @ts-expect-error
			inert={!open ? "true" : undefined}
		></div>
	)
}

////////////////////////////////////////////////////////////////////////////////

// Expose props for app.tsx (TODO)
export function Main({ children, ...props }: JSX.IntrinsicElements["main"]) {
	const { sidebar1, sidebar2 } = React.useContext(LayoutContext)!!

	// Register effects once
	//// useShortcutFigmaStyleToggleSidebars()
	useSideEffectHtmlAndBodyScrollLocking()

	const open = sidebar1 === "maximized" || sidebar2 === "maximized"

	return (
		<>
			<main
				className="main"
				// @ts-expect-error
				inert={open ? "true" : undefined}
				{...props}
			>
				{children}
			</main>
		</>
	)
}
