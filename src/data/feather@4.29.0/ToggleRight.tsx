import { SVGAttributes } from "react"

// https://feathericons.dev/toggle-right
export function ToggleRight(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect rx="7" ry="7" x="1" y="5" />
			<circle cx="16" cy="12" r="3" />
		</svg>
	)
}
