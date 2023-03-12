import React, { useEffect } from "react";

import { PropsWithChildren } from "react";
import { iota } from "./lib";

function SidebarOverlay() {
	return <div className="sidebar-overlay"></div>
}

function Sidebar1({
	header,
	footer,
	children,
}: PropsWithChildren<{ header: React.ReactNode; footer: React.ReactNode }>) {
	const dragRef = React.useRef<HTMLDivElement | null>(null)

	const [pointerIsDown, setPointerIsDown] = React.useState<boolean>(false)
	const [startClientX, setStartClientX] = React.useState<number | null>(null)
	const [clientX, setClientX] = React.useState<number | null>(null)

	const translateX =
		startClientX === null || clientX === null
			? "translateX(-128px)"
			: `translateX(calc(-128px + ${clientX - startClientX}px))`

	useEffect(() => {
		function handlePointerDown(e: PointerEvent) {
			if (e.button !== 0 && e.button !== 1) { return } // Guard mouse buttons
			if (
				dragRef.current !== null && e.target instanceof HTMLDivElement &&
				!dragRef.current.contains(e.target)
			) { return }
			e.preventDefault() // Prevent text selection
			setPointerIsDown(true)
			setStartClientX(e.clientX)
			setClientX(e.clientX)
		}
		function handlePointerMove(e: PointerEvent) {
			if (!pointerIsDown) return
			setClientX(e.clientX)
		}
		function handlePointerUp(e: PointerEvent) {
			setPointerIsDown(false)
			setStartClientX(null)
			setClientX(null)
		}
		document.addEventListener("pointerdown", handlePointerDown, false)
		document.addEventListener("pointermove", handlePointerMove, false)
		document.addEventListener("pointerup", handlePointerUp, false) // prettier-ignore
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown, false)
			document.removeEventListener("pointermove", handlePointerMove, false)
			document.removeEventListener("pointerup", handlePointerUp, false) // prettier-ignore
		}
	})

	return (
		<aside
			className="sidebar-1"
			style={{
				// X-axis dragging
				touchAction: "pan-x",
				transform: translateX,
			}}
		>
			<div ref={dragRef} className="sidebar-1-drag-area">
				<div className="sidebar-drag-handle"></div>
			</div>
			<div className="sidebar-1-card">
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
		</aside>
	)
}

function Sidebar2({
	header,
	footer,
	children,
}: PropsWithChildren<{ header: React.ReactNode; footer: React.ReactNode }>) {
	return (
		<aside className="sidebar-2">
			<div className="sidebar-2-drag-area">
				<div className="sidebar-drag-handle"></div>
			</div>
			<div className="sidebar-2-card">
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
		</aside>
	)
}

function Main({ children }: PropsWithChildren) {
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
			<Sidebar2
				// prettier-ignore
				header={<div>foo bar</div>}
				footer={<div>foo bar</div>}
			>
				{iota(20).map(index => (
					<React.Fragment key={index}>
						<div>foo bar</div>
					</React.Fragment>
				))}
			</Sidebar2>
		</>
	)
}
