// https://feathericons.dev/corner-left-up
export function CornerLeftUp(props: JSX.IntrinsicElements["svg"]) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			{...props}
		>
			<polyline points="14 9 9 4 4 9" />
			<path d="M20 20h-7a4 4 0 0 1-4-4V4" />
		</svg>
	)
}
