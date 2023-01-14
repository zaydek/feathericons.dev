import { SVGAttributes } from "react"

// https://feathericons.dev/chevrons-up
export function ChevronsUp(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="17 11 12 6 7 11" />
			<polyline points="17 18 12 13 7 18" />
		</svg>
	)
}
