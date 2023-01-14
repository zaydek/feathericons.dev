import { SVGAttributes } from "react"

// https://feathericons.dev/meh
export function Meh(props: SVGAttributes<SVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
			<circle cx="12" cy="12" r="10" />
			<line x1="8" x2="16" y1="15" y2="15" />
			<line x1="9" x2="9.01" y1="9" y2="9" />
			<line x1="15" x2="15.01" y1="9" y2="9" />
		</svg>
	)
}
