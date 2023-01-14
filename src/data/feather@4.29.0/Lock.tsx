import { SVGAttributes } from "react"

// https://feathericons.dev/lock
export function Lock(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect rx="2" ry="2" x="3" y="11" />
			<path d="M7 11V7a5 5 0 0 1 10 0v4" />
		</svg>
	)
}
