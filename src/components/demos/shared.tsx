export function Container({ children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		// Use overflow-clip to clip bleeding backgrounds
		<div className="h-256 overflow-clip rounded-24 bg-gray-50 shadow-[var(--hairline-shadow)]" {...props}>
			{children}
		</div>
	)
}
