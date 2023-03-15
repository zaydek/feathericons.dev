export function Hairline({ collapse = undefined }: { collapse?: boolean }) {
	return <hr className="hairline" data-collapse={collapse} />
}

// TODO: DEPRECATE
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

////////////////////////////////////////////////////////////////////////////////

export function SectionHead({
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
		<header className="section-head" data-pos={pos}>
			{children}
		</header>
	)
}

export function SectionBody({ children }: React.PropsWithChildren) {
	return <div className="section-body">{children}</div>
}

export function SectionFoot({ children }: React.PropsWithChildren) {
	return <footer className="section-foot">{children}</footer>
}
