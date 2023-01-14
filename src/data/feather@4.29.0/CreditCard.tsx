import { SVGAttributes } from "react"

// https://feathericons.dev/credit-card
export function CreditCard(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect rx="2" ry="2" x="1" y="4" />
			<line x1="1" x2="23" y1="10" y2="10" />
		</svg>
	)
}
