import { SVGAttributes } from "react"

// https://feathericons.dev/arrow-left-circle
export function ArrowLeftCircle(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="12" r="10" />
			<polyline points="12 8 8 12 12 16" />
			<line x1="16" x2="8" y1="12" y2="12" />
		</svg>
	)
}
