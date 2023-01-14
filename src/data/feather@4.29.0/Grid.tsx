import { SVGAttributes } from "react"

// https://feathericons.dev/grid
export function Grid(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect x="3" y="3" />
			<rect x="14" y="3" />
			<rect x="14" y="14" />
			<rect x="3" y="14" />
		</svg>
	)
}
