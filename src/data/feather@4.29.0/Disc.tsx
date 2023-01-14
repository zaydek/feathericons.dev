import { SVGAttributes } from "react"

// https://feathericons.dev/disc
export function Disc(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="12" r="10" />
			<circle cx="12" cy="12" r="3" />
		</svg>
	)
}
