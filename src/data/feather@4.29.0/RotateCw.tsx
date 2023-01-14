import { SVGAttributes } from "react"

// https://feathericons.dev/rotate-cw
export function RotateCw(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="23 4 23 10 17 10" />
			<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
		</svg>
	)
}
