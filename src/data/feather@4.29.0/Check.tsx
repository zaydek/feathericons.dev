import { SVGAttributes } from "react"

// https://feathericons.dev/check
export function Check(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="20 6 9 17 4 12" />
		</svg>
	)
}
