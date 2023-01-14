import { SVGAttributes } from "react"

// https://feathericons.dev/fast-forward
export function FastForward(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polygon points="13 19 22 12 13 5 13 19" />
			<polygon points="2 19 11 12 2 5 2 19" />
		</svg>
	)
}
