import { SVGAttributes } from "react"

// https://feathericons.dev/chevrons-right
export function ChevronsRight(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="13 17 18 12 13 7" />
			<polyline points="6 17 11 12 6 7" />
		</svg>
	)
}
