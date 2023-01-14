import { SVGAttributes } from "react"

// https://feathericons.dev/chevron-down
export function ChevronDown(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="6 9 12 15 18 9" />
		</svg>
	)
}
