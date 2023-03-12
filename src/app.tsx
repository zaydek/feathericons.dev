import React from "react"

import { PropsWithChildren } from "react"
import { iota } from "./lib"

function SidebarOverlay() {
	return <div className="sidebar-overlay"></div>
}

function Sidebar1({
	header,
	footer,
	children,
}: PropsWithChildren<{ header: React.ReactNode; footer: React.ReactNode }>) {
	const [pointerIsDown, setPointerIsDown] = React.useState<boolean>(false)
	const [startClientX, setStartClientX] = React.useState<number | null>(null)
	const [clientX, setClientX] = React.useState<number | null>(null)

	const translateX =
		startClientX === null || clientX === null
			? "translateX(-128px)"
			: `translateX(calc(-128px + ${clientX - startClientX}px))`

	return (
		<aside
			className="sidebar-1"
			style={{
				// X-axis dragging
				touchAction: "pan-x",
				transform: translateX,
			}}
		>
			<div
				className="sidebar-1-drag-area"
				onPointerDown={e => {
					setPointerIsDown(true)
					setStartClientX(e.clientX)
					setClientX(e.clientX)
				}}
				onPointerMove={e => {
					if (!pointerIsDown) return
					setClientX(e.clientX)
				}}
				onPointerUp={e => {
					setPointerIsDown(false)
					setStartClientX(null)
					setClientX(null)
				}}
			>
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
