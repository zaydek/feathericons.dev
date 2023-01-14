import { SVGAttributes } from "react"

// https://feathericons.dev/percent
export function Percent(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<line x1="19" x2="5" y1="5" y2="19" />
			<circle cx="6.5" cy="6.5" r="2.5" />
			<circle cx="17.5" cy="17.5" r="2.5" />
		</svg>
	)
}
