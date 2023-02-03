import Link from "next/link"

export function A({ href, children, ...props }: JSX.IntrinsicElements["a"] & Required<Pick<JSX.IntrinsicElements["a"], "href">>) {
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
