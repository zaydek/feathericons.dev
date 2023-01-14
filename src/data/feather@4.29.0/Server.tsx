import { SVGAttributes } from "react"

// https://feathericons.dev/server
export function Server(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect rx="2" ry="2" x="2" y="2" />
			<rect rx="2" ry="2" x="2" y="14" />
			<line x1="6" x2="6.01" y1="6" y2="6" />
			<line x1="6" x2="6.01" y1="18" y2="18" />
		</svg>
	)
}
