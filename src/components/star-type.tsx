import { createElement } from "react"
import { cx } from "../lib/cx"

function Tag<T extends keyof JSX.IntrinsicElements>({
	tag,
	prependClassName,
	className,
	appendClassName,
	children,
	...props
}: { tag: T; prependClassName?: string; appendClassName?: string } & JSX.IntrinsicElements[T]) {
	return <>{createElement(tag, { className: cx(prependClassName, className, appendClassName), ...props }, children)}</>
}

////////////////////////////////////////////////////////////////////////////////

export function TypeCaps<T extends keyof JSX.IntrinsicElements>({ className, children, ...props }: { tag?: T } & JSX.IntrinsicElements[T]) {
	return (
		<Tag
			tag="div"
			className="whitespace-pre
				font-sans text-[11px] font-[500] slashed-zero tabular-nums
				leading-[normal] tracking-[0.05em]"
			appendClassName={className}
			{...props}
		>
			{children}
		</Tag>
	)
}

export function TypeSansSmall<T extends keyof JSX.IntrinsicElements>({ className, children, ...props }: { tag?: T } & JSX.IntrinsicElements[T]) {
	return (
		<Tag
			tag="div"
			className="whitespace-normal
				font-sans text-[12px] font-[400] slashed-zero tabular-nums
				leading-[normal] tracking-[0.0125em]"
			appendClassName={className}
			{...props}
		>
			{children}
		</Tag>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function TypeProse({ className, children, ...props }: JSX.IntrinsicElements["article"]) {
	return (
		<Tag
			tag="article"
			className="whitespace-normal
				font-sans text-[16px] font-[400] slashed-zero tabular-nums
				leading-[1.6]"
			appendClassName={className}
			{...props}
		>
			{children}
		</Tag>
	)
}

export function TypeProseH1({ className, children, ...props }: JSX.IntrinsicElements["h2"]) {
	return (
		<Tag
			tag="h1"
			className="
				text-[1.25em]
				font-[500]
				leading-[1.25]"
			appendClassName={className}
			{...props}
		>
			{children}
		</Tag>
	)
}

export function TypeProseH2({ className, children, ...props }: JSX.IntrinsicElements["h2"]) {
	return (
		<Tag
			tag="h2"
			className="
				text-[1.125em]
				font-[500]
				leading-[1.25]"
			appendClassName={className}
			{...props}
		>
			{children}
		</Tag>
	)
}

export function TypeProsePreCode({ className, children, ...props }: JSX.IntrinsicElements["code"]) {
	return (
		<Tag tag="code" className="text-[0.875em]" appendClassName={className} {...props}>
			{children}
		</Tag>
	)
}

export function TypeProseCode({ className, children, ...props }: JSX.IntrinsicElements["code"]) {
	return (
		<Tag tag="code" className="text-[0.875em]" appendClassName={className} {...props}>
			{children}
		</Tag>
	)
}
