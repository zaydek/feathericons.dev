export function DemoContainer({ children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		// TODO: Do we need overflow-clip anymore?
		<div className="h-256 rounded-24 bg-gray-50 shadow-[var(--hairline-shadow)]" {...props}>
			{children}
		</div>
	)
}
