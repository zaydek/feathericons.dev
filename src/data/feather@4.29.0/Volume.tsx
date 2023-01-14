import { SVGAttributes } from "react"

// https://feathericons.dev/volume
export function Volume(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
		</svg>
	)
}
