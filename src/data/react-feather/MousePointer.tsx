// https://feathericons.dev/mouse-pointer
export function MousePointer(props: JSX.IntrinsicElements["svg"]) {
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
			<path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
			<path d="M13 13l6 6" />
		</svg>
	)
}
