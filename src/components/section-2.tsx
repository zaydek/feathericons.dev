import { PropsWithChildren } from "react"
import "./section-2.sass"

////////////////////////////////////////////////////////////////////////////////

export function Section2Header({ children }: PropsWithChildren) {
	return <header className="section-2-header">{children}</header>
}

export function Section2Body({ children }: PropsWithChildren) {
	return <div className="section-2-body">{children}</div>
}

export function Section2Spacer() {
	return <div className="section-2-spacer"></div>
}

export function Section2Footer({ children }: PropsWithChildren) {
	return <footer className="section-2-footer">{children}</footer>
}

////////////////////////////////////////////////////////////////////////////////

export function Section2HeaderHeader({ children }: PropsWithChildren) {
	return <header className="section-2-header-header">{children}</header>
}

export function Section2HeaderBody({ children }: PropsWithChildren) {
	return <div className="section-2-header-body">{children}</div>
}
