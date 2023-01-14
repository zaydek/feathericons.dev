import { SVGAttributes } from "react"

// https://feathericons.dev/slash
export function Slash(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="12" r="10" />
			<line x1="4.93" x2="19.07" y1="4.93" y2="19.07" />
		</svg>
	)
}
