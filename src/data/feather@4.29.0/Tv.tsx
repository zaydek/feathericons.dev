import { SVGAttributes } from "react"

// https://feathericons.dev/tv
export function Tv(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect rx="2" ry="2" x="2" y="7" />
			<polyline points="17 2 12 7 7 2" />
		</svg>
	)
}
