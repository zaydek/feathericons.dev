import { SVGAttributes } from "react"

// https://feathericons.dev/stop-circle
export function StopCircle(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="12" r="10" />
			<rect x="9" y="9" />
		</svg>
	)
}
