export function Anchor({
	href,
	children,
	...props
}: Omit<JSX.IntrinsicElements["a"], "target" | "rel"> & { href: string }) {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer" {...props}>
			{children}
		</a>
	)
}
