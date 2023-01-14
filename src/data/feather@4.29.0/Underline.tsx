import { SVGAttributes } from "react"

// https://feathericons.dev/underline
export function Underline(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
			<line x1="4" x2="20" y1="21" y2="21" />
		</svg>
	)
}
