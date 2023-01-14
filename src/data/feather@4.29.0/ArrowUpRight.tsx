import { SVGAttributes } from "react"

// https://feathericons.dev/arrow-up-right
export function ArrowUpRight(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<line x1="7" x2="17" y1="17" y2="7" />
			<polyline points="7 7 17 7 17 17" />
		</svg>
	)
}
