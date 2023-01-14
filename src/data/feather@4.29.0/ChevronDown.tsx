import { SVGAttributes } from "react"

// https://feathericons.dev/chevron-down
export function ChevronDown(props: SVGAttributes<SVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
			<polyline points="6 9 12 15 18 9" />
		</svg>
	)
}
