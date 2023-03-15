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
