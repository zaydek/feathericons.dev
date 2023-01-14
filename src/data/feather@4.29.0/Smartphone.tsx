import { SVGAttributes } from "react"

// https://feathericons.dev/smartphone
export function Smartphone(props: SVGAttributes<SVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
			<rect height="20" rx="2" ry="2" width="14" x="5" y="2" />
			<line x1="12" x2="12.01" y1="18" y2="18" />
		</svg>
	)
}
