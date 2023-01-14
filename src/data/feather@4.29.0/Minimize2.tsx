import { SVGAttributes } from "react"

// https://feathericons.dev/minimize-2
export function Minimize2(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="4 14 10 14 10 20" />
			<polyline points="20 10 14 10 14 4" />
			<line x1="14" x2="21" y1="10" y2="3" />
			<line x1="3" x2="10" y1="21" y2="14" />
		</svg>
	)
}
