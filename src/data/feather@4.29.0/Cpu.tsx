import { SVGAttributes } from "react"

// https://feathericons.dev/cpu
export function Cpu(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect rx="2" ry="2" x="4" y="4" />
			<rect x="9" y="9" />
			<line x1="9" x2="9" y1="1" y2="4" />
			<line x1="15" x2="15" y1="1" y2="4" />
			<line x1="9" x2="9" y1="20" y2="23" />
			<line x1="15" x2="15" y1="20" y2="23" />
			<line x1="20" x2="23" y1="9" y2="9" />
			<line x1="20" x2="23" y1="14" y2="14" />
			<line x1="1" x2="4" y1="9" y2="9" />
			<line x1="1" x2="4" y1="14" y2="14" />
		</svg>
	)
}
