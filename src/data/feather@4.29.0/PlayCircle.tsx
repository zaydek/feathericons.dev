import { SVGAttributes } from "react"

// https://feathericons.dev/play-circle
export function PlayCircle(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="12" r="10" />
			<polygon points="10 8 16 12 10 16 10 8" />
		</svg>
	)
}
