import { SVGAttributes } from "react"

// https://feathericons.dev/menu
export function Menu(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<line x1="3" x2="21" y1="12" y2="12" />
			<line x1="3" x2="21" y1="6" y2="6" />
			<line x1="3" x2="21" y1="18" y2="18" />
		</svg>
	)
}
