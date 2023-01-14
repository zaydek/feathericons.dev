import { SVGAttributes } from "react"

// https://feathericons.dev/corner-down-right
export function CornerDownRight(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="15 10 20 15 15 20" />
			<path d="M4 4v7a4 4 0 0 0 4 4h12" />
		</svg>
	)
}
