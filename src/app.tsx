import React from "react"

import { iota, round } from "@/lib"

function SidebarOverlay() {
	return <div className="sidebar-overlay"></div>
}

function Sidebar1({
	header,
	footer,
	children,
}: React.PropsWithChildren<{ header: React.ReactNode; footer: React.ReactNode }>) {
	const ref = React.useRef<HTMLDivElement | null>(null)
	const dragAreaRef = React.useRef<HTMLDivElement | null>(null)

	const [state, setState] = React.useState<"maximized" | "minimized" | null>(null)

	const [pointerDown, setPointerDown] = React.useState<boolean>(false)
	const [startClientX, setStartClientX] = React.useState<number | null>(null)
	const [clientX, setClientX] = React.useState<number | null>(null)

	const x = startClientX === null || clientX === null ? 0 : clientX - startClientX

	React.useEffect(() => {
		function handlePointerDown(e: PointerEvent) {
			if (e.button !== 0 && e.button !== 1) return
			// prettier-ignore
			if (
				dragAreaRef.current !== null && e.target instanceof HTMLDivElement &&
				!dragAreaRef.current.contains(e.target)) return

			e.preventDefault() // Prevent text selection
			setPointerDown(true)
			setStartClientX(round(e.clientX, { precision: 4 }))
			setClientX(round(e.clientX, { precision: 4 }))
		}
		function handlePointerMove(e: PointerEvent) {
			if (!pointerDown) return
			setClientX(e.clientX)
		}
		function handlePointerUp(e: PointerEvent) {
			const w = parseInt(window.getComputedStyle(ref.current!).getPropertyValue("--width"))
			const maxw = parseInt(window.getComputedStyle(ref.current!).getPropertyValue("--maximized-width"))
			const d = maxw - w
			//// if (start) {
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
			//// }
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
			data-pos="start"
			data-state={state}
			data-pointer-down={pointerDown || undefined} // Serialize
			style={{ "--x": `${x}px` } as React.CSSProperties}
		>
			<div ref={dragAreaRef} className="sidebar-drag-area">
				<div className="sidebar-drag-area-handle"></div>
			</div>
			<div className="sidebar-card">
				<div className="sidebar-card-content">
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

function Sidebar2({
	header,
	footer,
	children,
}: React.PropsWithChildren<{ header: React.ReactNode; footer: React.ReactNode }>) {
	return (
		<aside className="sidebar-2">
			<div className="sidebar-2-drag-area">
				<div className="sidebar-drag-handle"></div>
			</div>
			<div className="sidebar-2-card">
				{/* <header className="sidebar-header">
					{header}
					<hr className="collapse" />
				</header> */}
				<div className="sidebar-scroll-area">{children}</div>
				{/* <footer className="sidebar-footer">
					<hr className="collapse" />
					{footer}
				</footer> */}
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
			<Sidebar1
				// prettier-ignore
				header={<div>foo bar</div>}
				footer={<div>foo bar</div>}
			>
				{iota(20).map(index => (
					<React.Fragment key={index}>
						<div>foo bar</div>
					</React.Fragment>
				))}
			</Sidebar1>
			<Main>
				<div>foo bar</div>
				<div>foo bar</div>
				<div>foo bar</div>
				<div>foo bar</div>
			</Main>
			{/* <Sidebar2
				// prettier-ignore
				header={<div>foo bar</div>}
				footer={<div>foo bar</div>}
			>
				{iota(20).map(index => (
					<React.Fragment key={index}>
						<div>foo bar</div>
					</React.Fragment>
				))}
			</Sidebar2> */}
		</>
	)
}
