import { SVGAttributes } from "react"

// https://feathericons.dev/corner-right-down
export function CornerRightDown(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="10 15 15 20 20 15" />
			<path d="M4 4h7a4 4 0 0 1 4 4v12" />
		</svg>
	)
}
