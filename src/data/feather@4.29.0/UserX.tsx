import { SVGAttributes } from "react"

// https://feathericons.dev/user-x
export function UserX(props: SVGAttributes<SVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
			<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
			<circle cx="8.5" cy="7" r="4" />
			<line x1="18" x2="23" y1="8" y2="13" />
			<line x1="23" x2="18" y1="8" y2="13" />
		</svg>
	)
}