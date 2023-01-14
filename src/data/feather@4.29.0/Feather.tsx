import { SVGAttributes } from "react"

// https://feathericons.dev/feather
export function Feather(props: SVGAttributes<SVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
			<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
			<line x1="16" x2="2" y1="8" y2="22" />
			<line x1="17.5" x2="9" y1="15" y2="15" />
		</svg>
	)
}
