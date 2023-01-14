import { SVGAttributes } from "react"

// https://feathericons.dev/corner-right-up
export function CornerRightUp(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="10 9 15 4 20 9" />
			<path d="M4 20h7a4 4 0 0 0 4-4V4" />
		</svg>
	)
}
