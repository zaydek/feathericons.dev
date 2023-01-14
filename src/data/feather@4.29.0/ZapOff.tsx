import { SVGAttributes } from "react"

// https://feathericons.dev/zap-off
export function ZapOff(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="12.41 6.75 13 2 10.57 4.92" />
			<polyline points="18.57 12.91 21 10 15.66 10" />
			<polyline points="8 8 3 14 12 14 11 22 16 16" />
			<line x1="1" x2="23" y1="1" y2="23" />
		</svg>
	)
}
