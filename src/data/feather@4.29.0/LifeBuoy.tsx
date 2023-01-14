import { SVGAttributes } from "react"

// https://feathericons.dev/life-buoy
export function LifeBuoy(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="12" r="10" />
			<circle cx="12" cy="12" r="4" />
			<line x1="4.93" x2="9.17" y1="4.93" y2="9.17" />
			<line x1="14.83" x2="19.07" y1="14.83" y2="19.07" />
			<line x1="14.83" x2="19.07" y1="9.17" y2="4.93" />
			<line x1="14.83" x2="18.36" y1="9.17" y2="5.64" />
			<line x1="4.93" x2="9.17" y1="19.07" y2="14.83" />
		</svg>
	)
}
