import { SVGAttributes } from "react"

// https://feathericons.dev/activity
export function Activity(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
		</svg>
	)
}
