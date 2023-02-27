import "./section.sass"

import { PropsWithChildren, useState } from "react"

export function Header({ children }: PropsWithChildren) {
	return <header className="header">{children}</header>
}

export function Footer({ children }: PropsWithChildren) {
	return <footer className="footer">{children}</footer>
}

export function Section({ name, children }: PropsWithChildren<{ name?: string }>) {
	return (
		<section className="section">
			{name !== undefined && <h6>{name}</h6>}
			{children}
		</section>
	)
}

export function OverflowYContainer({ children }: PropsWithChildren) {
	const [scroll, setScroll] = useState(false)

	return (
		<div className="overflow-y-container" onScroll={e => setScroll(e.currentTarget.scrollTop > 0)} data-scroll={scroll}>
			{children}
		</div>
	)
}
