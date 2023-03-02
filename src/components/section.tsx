import "./section.sass"

import * as feather from "@icons/feather/tsx"

import { Icon } from "@/lib"
import { PropsWithChildren, useState } from "react"

////////////////////////////////////////////////////////////////////////////////

export function SidebarHeader({ children }: PropsWithChildren) {
	return <header className="sidebar-header">{children}</header>
}

export function SidebarContents({ children }: PropsWithChildren) {
	const [scroll, setScroll] = useState(false)

	return (
		<div className="sidebar-contents" onScroll={e => setScroll(e.currentTarget.scrollTop > 0)} data-scroll={scroll}>
			{children}
		</div>
	)
}

export function SidebarFooter({ children }: PropsWithChildren) {
	return <footer className="sidebar-footer">{children}</footer>
}

////////////////////////////////////////////////////////////////////////////////

export function NoNameSection({ children }: PropsWithChildren) {
	return <section className="section">{children}</section>
}

export function Section({ name, icon: Icon, children }: PropsWithChildren<{ name: string; icon: Icon }>) {
	return (
		<section className="section">
			<header className="section-header">
				<Icon className="section-header-icon" />
				<h6 className="section-header-name u-flex-1">{name}</h6>
			</header>
			{children}
		</section>
	)
}

export function UndoSection({
	name,
	icon: Icon,
	children,
	handleUndo,
}: PropsWithChildren<{ name: string; icon: Icon; handleUndo: () => void }>) {
	return (
		<section className="section">
			<header className="section-header">
				<Icon className="section-header-icon" />
				<h6 className="section-header-name u-flex-1">{name}</h6>
				<feather.RotateCcw className="section-header-icon" strokeWidth={4} onClick={handleUndo} />
			</header>
			{children}
		</section>
	)
}

export function SliderUndoSection({
	name,
	icon: Icon,
	value,
	formatValue,
	handleUndo,
	children,
}: PropsWithChildren<{
	name?: string
	icon: Icon
	value: number
	formatValue: (value: number) => string
	handleUndo: () => void
}>) {
	return (
		<section className="section">
			<header className="section-header">
				<Icon className="section-header-icon" />
				<h6 className="section-header-name u-flex-1">{name}</h6>
				<span className="section-header-slider-desc">{formatValue(value)}</span>
				<feather.RotateCcw className="section-header-icon" strokeWidth={4} onClick={handleUndo} />
			</header>
			{children}
		</section>
	)
}
