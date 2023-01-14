import { SVGAttributes } from "react"

// https://feathericons.dev/trending-down
export function TrendingDown(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
			<polyline points="17 18 23 18 23 12" />
		</svg>
	)
}
