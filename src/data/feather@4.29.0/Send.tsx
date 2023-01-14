import { SVGAttributes } from "react"

// https://feathericons.dev/send
export function Send(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<line x1="22" x2="11" y1="2" y2="13" />
			<polygon points="22 2 15 22 11 13 2 9 22 2" />
		</svg>
	)
}
