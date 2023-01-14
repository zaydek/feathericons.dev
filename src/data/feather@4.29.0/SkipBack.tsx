import { SVGAttributes } from "react"

// https://feathericons.dev/skip-back
export function SkipBack(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polygon points="19 20 9 12 19 4 19 20" />
			<line x1="5" x2="5" y1="19" y2="5" />
		</svg>
	)
}
