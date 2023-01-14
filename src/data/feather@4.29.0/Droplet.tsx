import { SVGAttributes } from "react"

// https://feathericons.dev/droplet
export function Droplet(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
		</svg>
	)
}
