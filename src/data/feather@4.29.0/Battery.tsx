import { SVGAttributes } from "react"

// https://feathericons.dev/battery
export function Battery(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect rx="2" ry="2" x="1" y="6" />
			<line x1="23" x2="23" y1="13" y2="11" />
		</svg>
	)
}
