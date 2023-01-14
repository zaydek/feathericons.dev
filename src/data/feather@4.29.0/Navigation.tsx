import { SVGAttributes } from "react"

// https://feathericons.dev/navigation
export function Navigation(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polygon points="3 11 22 2 13 21 11 13 3 11" />
		</svg>
	)
}
