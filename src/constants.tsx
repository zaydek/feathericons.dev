import { PropsWithChildren } from "react"
import { detab } from "./lib/format"

function Underline({ children }: PropsWithChildren) {
	return <span className="underline-offset-3 underline">{children}</span>
}

export const feather = {
	name: "Feather",
	desc: [
		<>
			24x24px user interface icons, designed by{" "}
			<a href="TODO">
				@<Underline>colebemis</Underline>
			</a>
		</>,
		<>
			For example: <Underline>arrow</Underline>, <Underline>chevron</Underline>
		</>,
	],
}

export const socialMedia = {
	name: "Social media",
	desc: [
		<>
			24x24px user interface icons, designed by{" "}
			<a href="TODO">
				@<Underline>colebemis</Underline>
			</a>
		</>,
		<>
			For example: <Underline>twitter</Underline>, <Underline>facebook</Underline>
		</>,
	],
}

export const paymentServices = {
	name: "Payment servies",
	desc: [
		<>
			56x32px payment services icons, sourced from{" "}
			<a href="TODO">
				<Underline>Wolf Kit</Underline>
			</a>
		</>,
		<>
			For example: <Underline>stripe</Underline>, <Underline>paypal</Underline>
		</>,
	],
}

export const svgPlaceholder = detab(`
	<!-- https://feathericons.dev/feather -->
	<svg class="feather feather-feather" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
		<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
		<line x1="16" x2="2" y1="8" y2="22"></line>
		<line x1="17.5" x2="9" y1="15" y2="15"></line>
	</svg>
`)

export const jsxPlaceholder = detab(`
	// https://feathericons.dev/feather
	export function Feather(props) {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" {...props}>
				<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
				<line x1="16" x2="2" y1="8" y2="22" />
				<line x1="17.5" x2="9" y1="15" y2="15" />
			</svg>
		);
	}
`)

export const tsxPlaceholder = detab(`
	// https://feathericons.dev/feather
	export function Feather(props: JSX.IntrinsicElements["svg"]) {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" {...props}>
				<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
				<line x1="16" x2="2" y1="8" y2="22" />
				<line x1="17.5" x2="9" y1="15" y2="15" />
			</svg>
		);
	}
`)

export const sizeInitial        = 32 // prettier-ignore
export const sizeMin            = sizeInitial - 16 // prettier-ignore
export const sizeMax            = sizeInitial + 16 // prettier-ignore
export const sizeStep           = 1 // prettier-ignore

export const strokeWidthInitial = 2 // prettier-ignore
export const strokeWidthMin     = strokeWidthInitial - 1.5 // prettier-ignore
export const strokeWidthMax     = strokeWidthInitial + 1.5 // prettier-ignore
export const strokeWidthStep    = 0.125 // prettier-ignore

export const twitterShareUrl = `http://twitter.com/intent/tweet?text=${encodeURI(
	`Check out Feather – Simply beautiful open source icons\n\nIcons by @colebemis, website by @username_ZAYDEK feathericons.dev 😍`,
)}`
