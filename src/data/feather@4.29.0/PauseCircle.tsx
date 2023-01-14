import { SVGAttributes } from "react"

// https://feathericons.dev/pause-circle
export function PauseCircle(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="12" r="10" />
			<line x1="10" x2="10" y1="15" y2="9" />
			<line x1="14" x2="14" y1="15" y2="9" />
		</svg>
	)
}
