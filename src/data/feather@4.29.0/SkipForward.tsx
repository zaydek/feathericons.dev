import { SVGAttributes } from "react"

// https://feathericons.dev/skip-forward
export function SkipForward(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polygon points="5 4 15 12 5 20 5 4" />
			<line x1="19" x2="19" y1="5" y2="19" />
		</svg>
	)
}
