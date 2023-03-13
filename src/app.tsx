import React from "react"

import { iota, round } from "@/lib"

function SidebarOverlay() {
	return <div className="sidebar-overlay"></div>
}

function Sidebar({
	pos,
	minWidth,
	maxWidth,
	header,
	footer,
	children,
}: React.PropsWithChildren<{
	pos: "start" | "end"
	minWidth: number
	maxWidth: number
	header: React.ReactNode
	footer: React.ReactNode
}>) {
	const ref = React.useRef<HTMLDivElement | null>(null)
	const dragAreaRef = React.useRef<HTMLDivElement | null>(null)

	// Attributes e.g. [data-state], [data-transition]
	const [state, setState] = React.useState<"maximized" | "minimized" | null>(null)
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
			// COMPAT/Safari: Typically we don't need to setTransition(false) here but
			// Safari onTransitionEnd doesn't always fire? (╯°□°)╯︵ ┻━┻
			setTransition(false)
			setPointerDown(true)
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
	}, [maxWidth, minWidth, pointerDown, pos, state, x])

	return (
		<aside
			ref={ref}
			className="sidebar"
			data-pos={pos}
			data-state={state}
			data-transition={transition || undefined}
			style={
				{
					"--__x": `${x}px`,
					"--__min-width": `${minWidth}px`,
					"--__max-width": `${maxWidth}px`,
				} as React.CSSProperties
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
					<header className="sidebar-header">
						{/* {header}
						<hr className="collapse" /> */}
					</header>
					<div className="sidebar-scroll-area">{/* {children} */}</div>
					<footer className="sidebar-footer">
						{/* <hr className="collapse" />
						{footer} */}
					</footer>
				</div>
			</div>
		</aside>
	)
}

function Main({ children }: React.PropsWithChildren) {
	return <main className="main">{children}</main>
}

export function App() {
	return (
		<>
			<SidebarOverlay />
			{/* <Sidebar
				// prettier-ignore
				pos="start"
				minWidth={384}
				maxWidth={384 * 2}
				header={<div>foo bar</div>}
				footer={<div>foo bar</div>}
			>
				{iota(20).map(index => (
					<React.Fragment key={index}>
						<div>foo bar</div>
					</React.Fragment>
				))}
			</Sidebar> */}
			<Main>
				{/* <div>foo bar</div>
				<div>foo bar</div>
				<div>foo bar</div>
				<div>foo bar</div> */}
			</Main>
			<Sidebar
				// prettier-ignore
				pos="end"
				minWidth={384}
				maxWidth={384 * 2}
				header={<div>foo bar</div>}
				footer={<div>foo bar</div>}
			>
				{iota(20).map(index => (
					<React.Fragment key={index}>
						<div>foo bar</div>
					</React.Fragment>
				))}
			</Sidebar>
		</>
	)
}
