import { SVGAttributes } from "react"

// https://feathericons.dev/chevrons-down
export function ChevronsDown(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="7 13 12 18 17 13" />
			<polyline points="7 6 12 11 17 6" />
		</svg>
	)
}
