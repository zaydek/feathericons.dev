import { SVGAttributes } from "react"

// https://feathericons.dev/minus-square
export function MinusSquare(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect rx="2" ry="2" x="3" y="3" />
			<line x1="8" x2="16" y1="12" y2="12" />
		</svg>
	)
}
