import React from "react"

import { getCssVarAsNumber, iota, round } from "@/lib"

function SidebarOverlay() {
	return <div className="sidebar-overlay"></div>
}

function Sidebar({
	pos,
	header,
	footer,
	children,
}: React.PropsWithChildren<{ pos: "start" | "end"; header: React.ReactNode; footer: React.ReactNode }>) {
	const ref = React.useRef<HTMLDivElement | null>(null)
	const dragAreaRef = React.useRef<HTMLDivElement | null>(null)

	const [state, setState] = React.useState<"maximized" | "minimized" | null>(null)
	const [transition, setTransition] = React.useState(false)

	const [pointerDown, setPointerDown] = React.useState<boolean>(false)
	const [startClientX, setStartClientX] = React.useState<number | null>(null)
	const [clientX, setClientX] = React.useState<number | null>(null)

	const x = startClientX === null || clientX === null ? 0 : clientX - startClientX

	const [maximizedWidth, setMaximizedWidth] = React.useState<number | null>(null)
	React.useEffect(() => {
		void state
		setMaximizedWidth(getCssVarAsNumber("--maximized-width", { scope: ref.current! }))
	}, [state])

	React.useEffect(() => {
		function handlePointerDown(e: PointerEvent) {
			if (e.button !== 0 && e.button !== 1) return
			if (!dragAreaRef.current!.contains(e.target as HTMLDivElement)) return
			e.preventDefault() // Prevent text selection
			setPointerDown(true)
			setStartClientX(round(e.clientX, { precision: 4 }))
			setClientX(round(e.clientX, { precision: 4 }))
		}
		function handlePointerMove(e: PointerEvent) {
			if (!pointerDown) return
			setClientX(round(e.clientX, { precision: 4 }))
		}
		function handlePointerUp(e: PointerEvent) {
			const w = getCssVarAsNumber("--width", { scope: ref.current! })
			const maxw = getCssVarAsNumber("--maximized-width", { scope: ref.current! })
			const d = maxw - w
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
					if (x > w) {
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
					if (x < -w) {
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
	})

	return (
		<aside
			ref={ref}
			// Styling
			className="sidebar"
			data-pos={pos}
			data-state={state}
			data-transition={transition || undefined} // Serialize non-truthy values
			data-pointer-down={pointerDown || undefined} // Serialize non-truthy values
			style={{ "--x": `${x}px` } as React.CSSProperties}
			onTransitionEnd={e => {
				setTransition(false)
			}}
		>
			<div ref={dragAreaRef} className="sidebar-drag-area">
				<div className="sidebar-drag-area-handle"></div>
			</div>
			<div className="sidebar-card">
				<div
					className="sidebar-card-content"
					style={{ width: state === "maximized" ? maximizedWidth ?? undefined : undefined }}
				>
					<header className="sidebar-header">
						{header}
						<hr className="collapse" />
					</header>
					<div className="sidebar-scroll-area">{children}</div>
					<footer className="sidebar-footer">
						<hr className="collapse" />
						{footer}
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
			<Sidebar
				// prettier-ignore
				pos="start"
				header={<div>foo bar</div>}
				footer={<div>foo bar</div>}
			>
				{iota(20).map(index => (
					<React.Fragment key={index}>
						<div>foo bar</div>
					</React.Fragment>
				))}
			</Sidebar>
			<Main>
				<div>foo bar</div>
				<div>foo bar</div>
				<div>foo bar</div>
				<div>foo bar</div>
			</Main>
			<Sidebar
				// prettier-ignore
				pos="end"
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
