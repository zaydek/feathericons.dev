import Link from "next/link"

export type AnchorProps = Omit<JSX.IntrinsicElements["a"], "rel" | "target"> & Required<Pick<JSX.IntrinsicElements["a"], "href">>

export type SoftAnchorProps = Omit<JSX.IntrinsicElements["a"], "rel" | "target"> & Pick<JSX.IntrinsicElements["a"], "href">

export function Anchor({ href, children, ...props }: AnchorProps) {
	if (href.startsWith("/")) {
		return (
			// @ts-expect-error
			<Link href={href} scroll={false} {...props}>
				{children}
			</Link>
		)
	} else {
		return (
			<a href={href} rel="noopener noreferrer" target="_blank" {...props}>
				{children}
			</a>
		)
	}
}
