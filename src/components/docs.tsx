import * as feather from "../data/react-feather"

import { useContext, useEffect, useMemo, useState } from "react"
import { IThemedToken, Lang } from "shiki-es"
import { getStringFromChildren } from "../aria/utils"
import { ShikiContext } from "../state/shiki"
import { Anchor, AnchorProps, SoftAnchorProps } from "./anchor"
import { DynamicIcon, Icon } from "./dynamic-icon"
import {
	CodePenIcon,
	CodePenUrl,
	NextjsIcon,
	NextjsUrl,
	ReactjsIcon,
	ReactjsUrl,
	SassIcon,
	SassUrl,
	SvgIcon,
	SvgUrl,
	TailwindCssIcon,
	TailwindCssUrl,
	TwitterIcon,
	TwitterUrl,
	TypeScriptIcon,
	TypeScriptUrl,
} from "./icon-config"

////////////////////////////////////////////////////////////////////////////////

function getSlug(str: string) {
	return str
		.replace(/[^\w-]+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/, "")
		.toLowerCase()
}

export function Heading({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const [content, id, href] = useMemo(() => {
		const str = getStringFromChildren(children as any)
		const id = getSlug(str)
		const href = `#${id}`
		return [str, id, href] as const
	}, [children]) // 🤷‍♀️

	return (
		<h1 id={id} className="group/header relative text-black" {...props}>
			{children}
			{/* Use lowercase anchors here */}
			<a
				href={href}
				className="absolute top-0 right-100% bottom-0 flex items-center px-8 opacity-0
					group-hover/header:opacity-100"
				// prettier-ignore: aria-label
				aria-label={`Heading "${content}"`}
			>
				<DynamicIcon className="h-[1em] w-[1em] text-[#1570fb]" icon={feather.Link2} />
			</a>
		</h1>
	)
}

export function Subheading({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const [content, id, href] = useMemo(() => {
		const str = getStringFromChildren(children as any)
		const id = getSlug(str)
		const href = `#${id}`
		return [str, id, href] as const
	}, [children]) // 🤷‍♀️

	return (
		<h2 id={id} className="group/header relative text-black" {...props}>
			{children}
			{/* Use lowercase anchors here */}
			<a
				href={href}
				className="absolute top-0 right-100% bottom-0 flex items-center px-8 opacity-0
					group-hover/header:opacity-100"
				// prettier-ignore: aria-label
				aria-label={`Subheading "${content}"`}
			>
				<DynamicIcon className="h-[1em] w-[1em] text-[#1570fb]" icon={feather.Link2} />
			</a>
		</h2>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function Ordered({ children, ...props }: JSX.IntrinsicElements["ol"]) {
	return (
		<ol className="flex flex-col gap-8" {...props}>
			{children}
		</ol>
	)
}

export function Item({ children, ...props }: JSX.IntrinsicElements["li"]) {
	return (
		<li className="list-inside list-decimal" {...props}>
			{children}
		</li>
	)
}

////////////////////////////////////////////////////////////////////////////////

// TODO: What to do about style?
export function CodeSnippet({ style: _, lang, children: code, ...props }: { lang: Lang; children: string } & Omit<JSX.IntrinsicElements["pre"], "lang">) {
	const { highlighter } = useContext(ShikiContext)!

	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)

	useEffect(() => {
		if (highlighter === null) { return } // prettier-ignore
		const tokens = highlighter.codeToThemedTokens(code, lang, "github-light")
		setTokens(tokens)
	}, [code, highlighter, lang])

	return (
		//// <pre className="overflow-auto bg-gray-50 py-32 shadow-[var(--hairline-shadow-t),_var(--hairline-shadow-b)]" {...props}>
		//// <pre className="overflow-auto py-32 shadow-[var(--hairline-shadow-t),_var(--hairline-shadow-b)]" data-background-dots {...props}>
		<pre className="overflow-auto" {...props}>
			<code>
				{tokens === null
					? code.split("\n").map((ys, y) => <div key={y}>{ys || <br />}</div>)
					: tokens.map((ys, y) => (
							<div key={y}>
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
			</code>
		</pre>
	)
}

export function Code({ children: code, ...props }: { children: string } & JSX.IntrinsicElements["code"]) {
	return (
		<code className="rounded-1e3 bg-white py-2 px-8 text-[#1570fb] shadow-[var(--hairline-shadow)]" {...props}>
			{code}
		</code>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function TextAnchor({ children, ...props }: AnchorProps) {
	return (
		<Anchor className="underline decoration-gray-400" {...props}>
			{children}
		</Anchor>
	)
}

export function TextIconAnchor({ icon, children, ...props }: { icon: Icon } & AnchorProps) {
	return (
		<Anchor className="inline-flex items-center" {...props}>
			<span className="underline decoration-gray-400">{children}</span>&nbsp;
			<DynamicIcon className="h-[1em] w-[1em] text-gray-800" icon={icon} />
		</Anchor>
	)
}

export const CodePen     = ({ href, children, ...props }: SoftAnchorProps) => <TextIconAnchor href={href ?? CodePenUrl}     icon={CodePenIcon}     {...props}>{children ?? "CodePen"     }</TextIconAnchor> // prettier-ignore
export const Nextjs      = ({ href, children, ...props }: SoftAnchorProps) => <TextIconAnchor href={href ?? NextjsUrl}      icon={NextjsIcon}      {...props}>{children ?? "Next.js"     }</TextIconAnchor> // prettier-ignore
export const Reactjs     = ({ href, children, ...props }: SoftAnchorProps) => <TextIconAnchor href={href ?? ReactjsUrl}     icon={ReactjsIcon}     {...props}>{children ?? "React.js"    }</TextIconAnchor> // prettier-ignore
export const Sass        = ({ href, children, ...props }: SoftAnchorProps) => <TextIconAnchor href={href ?? SassUrl}        icon={SassIcon}        {...props}>{children ?? "Sass"        }</TextIconAnchor> // prettier-ignore
export const Svg         = ({ href, children, ...props }: SoftAnchorProps) => <TextIconAnchor href={href ?? SvgUrl}         icon={SvgIcon}         {...props}>{children ?? "SVG"         }</TextIconAnchor> // prettier-ignore
export const TailwindCss = ({ href, children, ...props }: SoftAnchorProps) => <TextIconAnchor href={href ?? TailwindCssUrl} icon={TailwindCssIcon} {...props}>{children ?? "Tailwind CSS"}</TextIconAnchor> // prettier-ignore
export const Twitter     = ({ href, children, ...props }: SoftAnchorProps) => <TextIconAnchor href={href ?? TwitterUrl}     icon={TwitterIcon}     {...props}>{children ?? "Twitter"     }</TextIconAnchor> // prettier-ignore
export const TypeScript  = ({ href, children, ...props }: SoftAnchorProps) => <TextIconAnchor href={href ?? TypeScriptUrl}  icon={TypeScriptIcon}  {...props}>{children ?? "TypeScript"  }</TextIconAnchor> // prettier-ignore
