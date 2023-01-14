import { SVGAttributes } from "react"

// https://feathericons.dev/video
export function Video(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polygon points="23 7 16 12 23 17 23 7" />
			<rect rx="2" ry="2" x="1" y="5" />
		</svg>
	)
}
