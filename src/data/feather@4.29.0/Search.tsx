import { SVGAttributes } from "react"

// https://feathericons.dev/search
export function Search(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="11" cy="11" r="8" />
			<line x1="21" x2="16.65" y1="21" y2="16.65" />
		</svg>
	)
}
