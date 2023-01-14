import { SVGAttributes } from "react"

// https://feathericons.dev/hash
export function Hash(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<line x1="4" x2="20" y1="9" y2="9" />
			<line x1="4" x2="20" y1="15" y2="15" />
			<line x1="10" x2="8" y1="3" y2="21" />
			<line x1="16" x2="14" y1="3" y2="21" />
		</svg>
	)
}
