import { SVGAttributes } from "react"

// https://feathericons.dev/upload-cloud
export function UploadCloud(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="16 16 12 12 8 16" />
			<line x1="12" x2="12" y1="12" y2="21" />
			<path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
			<polyline points="16 16 12 12 8 16" />
		</svg>
	)
}
