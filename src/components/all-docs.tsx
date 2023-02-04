import * as feather from "../data/react-feather"
import * as typography from "./all-typography"

import { useContext, useEffect, useMemo, useState } from "react"
import { IThemedToken, Lang } from "shiki-es"
import { getStringFromChildren } from "../aria/utils"
import { cx } from "../lib/cx"
import { ShikiContext } from "../providers/shiki"
import { A } from "./anchor"
import { Icon, SVG } from "./icon"
import {
	CodePenIcon,
	CodePenUrl,
	NextjsIcon,
	NextjsUrl,
	ReactjsIcon,
	ReactjsUrl,
	SassIcon,
	SvgIcon,
	TailwindCssIcon,
	TailwindCssUrl,
	TwitterIcon,
	TwitterUrl,
	TypeScriptIcon,
	TypeScriptUrl,
} from "./icon-config"

////////////////////////////////////////////////////////////////////////////////

export function Article({ children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		//// <div className="flex justify-center">
		//// 	<div className="w-100% max-w-1280">
		<typography.docs.Article className="docs text-gray-900" {...props}>
			{children}
		</typography.docs.Article>
		//// 	</div>
		//// </div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function getSlug(str: string) {
	return str
		.replace(/[^\w-]+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/, "")
		.toLowerCase()
}

export function H1({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const [content, id, href] = useMemo(() => {
		const str = getStringFromChildren(children as any)
		const id = getSlug(str)
		const href = `#${id}`
		return [str, id, href] as const
	}, [children]) // 🤷‍♀️

	return (
		<typography.docs.H1 id={id} className="group/header relative text-black" {...props}>
			{children}
			<a
				href={href}
				className="absolute top-0 right-100% bottom-0 flex items-center px-8 opacity-0
					group-hover/header:opacity-100"
				aria-label={`Link to header ${content}`}
			>
				<InlineIcon className="text-[#1570fb]" icon={feather.Link2} />
			</a>
		</typography.docs.H1>
	)
}

export function H2({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const [content, id, href] = useMemo(() => {
		const str = getStringFromChildren(children as any)
		const id = getSlug(str)
		const href = `#${id}`
		return [str, id, href] as const
	}, [children]) // 🤷‍♀️

	return (
		<typography.docs.H2 id={id} className="group/header relative text-black" {...props}>
			{children}
			<a
				href={href}
				className="absolute top-0 right-100% bottom-0 flex items-center px-8 opacity-0
					group-hover/header:opacity-100"
				aria-label={`Link to subheader ${content}`}
			>
				<InlineIcon className="text-[#1570fb]" icon={feather.Link2} />
			</a>
		</typography.docs.H2>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function Ol({ children, ...props }: JSX.IntrinsicElements["ol"]) {
	return (
		<ol className="flex flex-col gap-8" {...props}>
			{children}
		</ol>
	)
}

export function Li({ children, ...props }: JSX.IntrinsicElements["li"]) {
	return (
		<li className="list-inside list-decimal" {...props}>
			{children}
		</li>
	)
}

// Omit style because of <PageTransition>
export function Pre({ style: _, lang, children: code, ...props }: { lang: Lang; children: string } & Omit<JSX.IntrinsicElements["pre"], "lang">) {
	const { highlighter } = useContext(ShikiContext)!

	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)

	useEffect(() => {
		if (highlighter === null) { return } // prettier-ignore
		const tokens = highlighter.codeToThemedTokens(code, lang, "github-light")
		setTokens(tokens)
	}, [code, highlighter, lang])

	return (
		<pre className="overflow-auto bg-gray-50 py-32 shadow-[var(--hairline-shadow-t),_var(--hairline-shadow-b)]" {...props}>
			<typography.docs.PreCode>
				{tokens === null
					? code.split("\n").map((ys, y) => (
							<div key={y} className="px-64">
								{ys || <br />}
							</div>
					  ))
					: tokens.map((ys, y) => (
							<div key={y} className="px-64">
								{ys.length > 0 ? (
									ys.map(({ color, content }, x) => (
										<span key={x} style={{ color }}>
											{content}
										</span>
									))
								) : (
									<br />
								)}
							</div>
					  ))}
			</typography.docs.PreCode>
		</pre>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function Code({ children: code, ...props }: { children: string } & JSX.IntrinsicElements["code"]) {
	return (
		<typography.docs.Code className="rounded-1e3 bg-white py-2 px-8 text-[#1570fb] shadow-[var(--hairline-shadow)]" {...props}>
			{code}
		</typography.docs.Code>
	)
}

// TODO: Deprecate if possible
export function InlineIcon({ className, icon, children, ...props }: { icon: SVG } & JSX.IntrinsicElements["svg"]) {
	if (children === undefined || children === null) {
		return <Icon className={cx("inline-block h-[1em] w-[1em]", className)} icon={icon} {...props} />
	} else {
		return (
			// Use inline-flex h-0 items-center to optically center
			<span className="inline-flex h-0 items-center">
				{children}
				&nbsp;
				<Icon className={cx("inline-block h-[1em] w-[1em]", className)} icon={icon} {...props} />
			</span>
		)
	}
}

export function TextAnchor({ children, ...props }: JSX.IntrinsicElements["a"] & Required<Pick<JSX.IntrinsicElements["a"], "href">>) {
	return (
		<A className="underline decoration-gray-400" {...props}>
			{children}
		</A>
	)
}

export function TextIconAnchor({ icon, children, ...props }: { icon: SVG } & JSX.IntrinsicElements["a"] & Required<Pick<JSX.IntrinsicElements["a"], "href">>) {
	return (
		<A className="inline-flex items-center" {...props}>
			<span className="underline decoration-gray-400">{children}</span>&nbsp;
			<Icon className="h-[1em] w-[1em] text-gray-700" icon={icon} />
		</A>
	)
}

// Badges
export const CodePen = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<TextIconAnchor href={href ?? CodePenUrl} icon={CodePenIcon} {...props}>
		{children ?? "CodePen"}
	</TextIconAnchor>
)
export const Nextjs = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<TextIconAnchor href={href ?? NextjsUrl} icon={NextjsIcon} {...props}>
		{children ?? "Next.js"}
	</TextIconAnchor>
)
export const Reactjs = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<TextIconAnchor href={href ?? ReactjsUrl} icon={ReactjsIcon} {...props}>
		{children ?? "React.js"}
	</TextIconAnchor>
)
export const Sass = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<TextIconAnchor href={href ?? "TODO"} icon={SassIcon} {...props}>
		{children ?? "Sass"}
	</TextIconAnchor>
)
export const Svg = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<TextIconAnchor href={href ?? "TODO"} icon={SvgIcon} {...props}>
		{children ?? "SVG"}
	</TextIconAnchor>
)
export const TailwindCss = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<TextIconAnchor href={href ?? TailwindCssUrl} icon={TailwindCssIcon} {...props}>
		{children ?? "Tailwind CSS"}
	</TextIconAnchor>
)
export const Twitter = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<TextIconAnchor href={href ?? TwitterUrl} icon={TwitterIcon} {...props}>
		{children ?? "Twitter"}
	</TextIconAnchor>
)
export const TypeScript = ({ href, children, ...props }: JSX.IntrinsicElements["a"]) => (
	<TextIconAnchor href={href ?? TypeScriptUrl} icon={TypeScriptIcon} {...props}>
		{children ?? "TypeScript"}
	</TextIconAnchor>
)
