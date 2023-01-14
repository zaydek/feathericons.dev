import { SVGAttributes } from "react"

// https://feathericons.dev/arrow-right
export function ArrowRight(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<line x1="5" x2="19" y1="12" y2="12" />
			<polyline points="12 5 19 12 12 19" />
		</svg>
	)
}
