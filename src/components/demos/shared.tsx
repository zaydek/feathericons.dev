export function Container({ children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		<div className="h-256 rounded-24 bg-gray-50 shadow-[var(--hairline-shadow)]" {...props}>
			{children}
		</div>
	)
}
