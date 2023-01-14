import { SVGAttributes } from "react"

// https://feathericons.dev/file-text
export function FileText(props: SVGAttributes<SVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
			<polyline points="14 2 14 8 20 8" />
			<line x1="16" x2="8" y1="13" y2="13" />
			<line x1="16" x2="8" y1="17" y2="17" />
			<polyline points="10 9 9 9 8 9" />
		</svg>
	)
}
