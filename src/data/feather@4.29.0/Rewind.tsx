import { SVGAttributes } from "react"

// https://feathericons.dev/rewind
export function Rewind(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polygon points="11 19 2 12 11 5 11 19" />
			<polygon points="22 19 13 12 22 5 22 19" />
		</svg>
	)
}
