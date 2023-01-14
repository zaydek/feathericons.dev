import { SVGAttributes } from "react"

// https://feathericons.dev/x-circle
export function XCircle(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="12" r="10" />
			<line x1="15" x2="9" y1="9" y2="15" />
			<line x1="9" x2="15" y1="9" y2="15" />
		</svg>
	)
}
