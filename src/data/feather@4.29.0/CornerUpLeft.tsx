import { SVGAttributes } from "react"

// https://feathericons.dev/corner-up-left
export function CornerUpLeft(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="9 14 4 9 9 4" />
			<path d="M20 20v-7a4 4 0 0 0-4-4H4" />
		</svg>
	)
}
