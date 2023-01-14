import { SVGAttributes } from "react"

// https://feathericons.dev/volume-x
export function VolumeX(props: SVGAttributes<SVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
			<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
			<line x1="23" x2="17" y1="9" y2="15" />
			<line x1="17" x2="23" y1="9" y2="15" />
		</svg>
	)
}
