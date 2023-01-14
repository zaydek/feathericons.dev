import { SVGAttributes } from "react"

// https://feathericons.dev/check
export function Check(props: SVGAttributes<SVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
			<polyline points="20 6 9 17 4 12" />
		</svg>
	)
}
