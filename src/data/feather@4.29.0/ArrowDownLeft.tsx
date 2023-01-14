import { SVGAttributes } from "react"

// https://feathericons.dev/arrow-down-left
export function ArrowDownLeft(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<line x1="17" x2="7" y1="7" y2="17" />
			<polyline points="17 17 7 17 7 7" />
		</svg>
	)
}
