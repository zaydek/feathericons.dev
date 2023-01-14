import { SVGAttributes } from "react"

// https://feathericons.dev/arrow-down
export function ArrowDown(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<line x1="12" x2="12" y1="5" y2="19" />
			<polyline points="19 12 12 19 5 12" />
		</svg>
	)
}
