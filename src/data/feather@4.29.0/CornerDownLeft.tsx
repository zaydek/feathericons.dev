import { SVGAttributes } from "react"

// https://feathericons.dev/corner-down-left
export function CornerDownLeft(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="9 10 4 15 9 20" />
			<path d="M20 4v7a4 4 0 0 1-4 4H4" />
		</svg>
	)
}
