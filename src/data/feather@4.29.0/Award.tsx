import { SVGAttributes } from "react"

// https://feathericons.dev/award
export function Award(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="8" r="7" />
			<polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
		</svg>
	)
}
