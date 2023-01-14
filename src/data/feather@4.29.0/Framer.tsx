import { SVGAttributes } from "react"

// https://feathericons.dev/framer
export function Framer(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7" />
		</svg>
	)
}
