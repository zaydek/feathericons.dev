import { SVGAttributes } from "react"

// https://feathericons.dev/crop
export function Crop(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M6.13 1L6 16a2 2 0 0 0 2 2h15" />
			<path d="M1 6.13L16 6a2 2 0 0 1 2 2v15" />
		</svg>
	)
}
