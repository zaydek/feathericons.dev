import { SVGAttributes } from "react"

// https://feathericons.dev/chevron-right
export function ChevronRight(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="9 18 15 12 9 6" />
		</svg>
	)
}
