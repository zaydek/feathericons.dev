import { SVGAttributes } from "react"

// https://feathericons.dev/smartphone
export function Smartphone(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect rx="2" ry="2" x="5" y="2" />
			<line x1="12" x2="12.01" y1="18" y2="18" />
		</svg>
	)
}
