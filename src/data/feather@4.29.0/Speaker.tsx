import { SVGAttributes } from "react"

// https://feathericons.dev/speaker
export function Speaker(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect rx="2" ry="2" x="4" y="2" />
			<circle cx="12" cy="14" r="4" />
			<line x1="12" x2="12.01" y1="6" y2="6" />
		</svg>
	)
}
