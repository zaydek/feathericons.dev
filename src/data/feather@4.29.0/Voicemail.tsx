import { SVGAttributes } from "react"

// https://feathericons.dev/voicemail
export function Voicemail(props: SVGAttributes<SVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
			<circle cx="5.5" cy="11.5" r="4.5" />
			<circle cx="18.5" cy="11.5" r="4.5" />
			<line x1="5.5" x2="18.5" y1="16" y2="16" />
		</svg>
	)
}
