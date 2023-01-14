import { SVGAttributes } from "react"

// https://feathericons.dev/trello
export function Trello(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect rx="2" ry="2" x="3" y="3" />
			<rect x="7" y="7" />
			<rect x="14" y="7" />
		</svg>
	)
}
