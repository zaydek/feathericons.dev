////////////////////////////////////////////////////////////////////////////////

export function SidebarHead({ children }: React.PropsWithChildren) {
	return <header className="sidebar-head">{children}</header>
}

export function SidebarBody({ children }: React.PropsWithChildren) {
	return <div className="sidebar-body">{children}</div>
}

export function SidebarFoot({ children }: React.PropsWithChildren) {
	return <footer className="sidebar-foot">{children}</footer>
}

////////////////////////////////////////////////////////////////////////////////

export function Hairline({ collapse = undefined }: { collapse?: boolean }) {
	return <hr className="hairline" data-collapse={collapse} />
}

export function Section({
	pos,
	children,
}: React.PropsWithChildren<{
	// prettier-ignore
	pos:
		| "start"
		| "checkboxes"
		| "syntax-highlighting"
		| "end"
}>) {
	return (
		<section className="section" data-pos={pos}>
			{children}
		</section>
	)
}
