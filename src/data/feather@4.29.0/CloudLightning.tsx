import { SVGAttributes } from "react"

// https://feathericons.dev/cloud-lightning
export function CloudLightning(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
			<polyline points="13 11 9 17 15 17 11 23" />
		</svg>
	)
}
