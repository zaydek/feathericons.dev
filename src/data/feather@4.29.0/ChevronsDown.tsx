import { SVGAttributes } from "react"

// https://feathericons.dev/chevrons-down
export function ChevronsDown(props: SVGAttributes<SVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
			<polyline points="7 13 12 18 17 13" />
			<polyline points="7 6 12 11 17 6" />
		</svg>
	)
}
