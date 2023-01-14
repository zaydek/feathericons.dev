import { SVGAttributes } from "react"

// https://feathericons.dev/arrow-left
export function ArrowLeft(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<line x1="19" x2="5" y1="12" y2="12" />
			<polyline points="12 19 5 12 12 5" />
		</svg>
	)
}
