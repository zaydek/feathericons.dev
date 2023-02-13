import { cx } from "@/lib"

////////////////////////////////////////////////////////////////////////////////

export function Text({ children, ...props }: JSX.IntrinsicElements["div"]) {
	return <div {...props}>{children}</div>
}

export function MultilineText({ className, children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		<div className={cx("leading-[1.5]", className)} {...props}>
			{children}
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function Code({ children, ...props }: JSX.IntrinsicElements["code"]) {
	return <code {...props}>{children}</code>
}

export function MultilineCode({ className, children, ...props }: JSX.IntrinsicElements["code"]) {
	return (
		<code className={cx("leading-[1.5]", className)} {...props}>
			{children}
		</code>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function Underline({ className, children, ...props }: JSX.IntrinsicElements["span"]) {
	return (
		<span className={cx("underline underline-offset-[3px]", className)} {...props}>
			{children}
		</span>
	)
}
