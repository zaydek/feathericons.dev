import { SVGAttributes } from "react"

// https://feathericons.dev/bar-chart-2
export function BarChart2(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<line x1="18" x2="18" y1="20" y2="10" />
			<line x1="12" x2="12" y1="20" y2="4" />
			<line x1="6" x2="6" y1="20" y2="14" />
		</svg>
	)
}
