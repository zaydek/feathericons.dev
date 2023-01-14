import { SVGAttributes } from "react"

// https://feathericons.dev/divide
export function Divide(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="6" r="2" />
			<line x1="5" x2="19" y1="12" y2="12" />
			<circle cx="12" cy="18" r="2" />
		</svg>
	)
}
