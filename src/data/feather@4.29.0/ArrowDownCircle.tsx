import { SVGAttributes } from "react"

// https://feathericons.dev/arrow-down-circle
export function ArrowDownCircle(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="12" r="10" />
			<polyline points="8 12 12 16 16 12" />
			<line x1="12" x2="12" y1="8" y2="16" />
		</svg>
	)
}
