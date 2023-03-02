import "./section.sass"

import * as feather from "@icons/feather/tsx"

import { Icon } from "@/lib"
import { PropsWithChildren, useState } from "react"

////////////////////////////////////////////////////////////////////////////////

export function Header({ children }: PropsWithChildren) {
	return <header className="header">{children}</header>
}

export function Footer({ children }: PropsWithChildren) {
	return <footer className="footer">{children}</footer>
}

export function ScrollContainer({ children }: PropsWithChildren) {
	const [scroll, setScroll] = useState(false)

	return (
		<div className="scroll-container" onScroll={e => setScroll(e.currentTarget.scrollTop > 0)} data-scroll={scroll}>
			{children}
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function EmptySection({ children }: PropsWithChildren) {
	return <section className="section">{children}</section>
}

export function Section({ name, icon: Icon, children }: PropsWithChildren<{ name: string; icon: Icon }>) {
	return (
		<section className="section">
			<header className="section-header">
				{Icon !== undefined && <Icon />}
				<h6 className="section-header-name">{name}</h6>
			</header>
			{children}
		</section>
	)
}

export function ResetSection({
	name,
	icon: Icon,
	children,
	handleUndo,
}: PropsWithChildren<{ name: string; icon: Icon; handleUndo: () => void }>) {
	return (
		<section className="section">
			{name !== undefined && (
				<header className="section-header">
					{Icon !== undefined && <Icon />}
					<h6 className="section-header-name">{name}</h6>
					<feather.RotateCcw strokeWidth={4} onClick={handleUndo} />
				</header>
			)}
			{children}
		</section>
	)
}

export function SliderResetSection({
	name,
	icon: Icon,
	value,
	formatValue,
	handleUndo,
	children,
}: PropsWithChildren<{
	name?: string
	icon?: Icon
	value: number
	formatValue: (value: number) => string
	handleUndo: () => void
}>) {
	return (
		<section className="section">
			{name !== undefined && (
				<header className="section-header">
					{Icon !== undefined && <Icon />}
					<h6 className="section-header-name">{name}</h6>
					<span>{formatValue(value)}</span>
					<feather.RotateCcw strokeWidth={4} onClick={handleUndo} />
				</header>
			)}
			{children}
		</section>
	)
}
