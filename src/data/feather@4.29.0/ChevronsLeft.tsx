import { SVGAttributes } from "react"

// https://feathericons.dev/chevrons-left
export function ChevronsLeft(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="11 17 6 12 11 7" />
			<polyline points="18 17 13 12 18 7" />
		</svg>
	)
}
