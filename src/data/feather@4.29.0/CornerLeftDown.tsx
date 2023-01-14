import { SVGAttributes } from "react"

// https://feathericons.dev/corner-left-down
export function CornerLeftDown(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="14 15 9 20 4 15" />
			<path d="M20 4h-7a4 4 0 0 0-4 4v12" />
		</svg>
	)
}
