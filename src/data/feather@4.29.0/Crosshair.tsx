import { SVGAttributes } from "react"

// https://feathericons.dev/crosshair
export function Crosshair(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="12" r="10" />
			<line x1="22" x2="18" y1="12" y2="12" />
			<line x1="6" x2="2" y1="12" y2="12" />
			<line x1="12" x2="12" y1="6" y2="2" />
			<line x1="12" x2="12" y1="22" y2="18" />
		</svg>
	)
}
