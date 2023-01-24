import * as feather from "../../../data/react-feather"

import { MDXProvider } from "@mdx-js/react"
import { ReactElement, ReactNode, useEffect, useMemo, useState } from "react"
import { getHighlighter, Highlighter, IThemedToken, Lang, Theme } from "shiki-es"
import { Icon } from "../../../lib/react/icon"
import Markdown from "./_markdown.mdx"

// Recursively concatenate strings
function getString(children: ReactNode) {
	let str = ""
	const flatChildren = [children].flat()
	for (const substr of flatChildren) {
		if (typeof substr === "string") {
			str += substr
		} else {
			// @ts-expect-error
			str += getString(substr.props.children)
		}
	}
	return str
}

// https://tomekdev.com/posts/anchors-for-headings-in-mdx#override-heading-component
function getId(str: string) {
	return str
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-zA-Z0-9-_]/g, "")
}

function Header1({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const id = getId(getString(children))
	const href = `#${id}`

	return (
		<h1
			id={id}
			className="relative text-gray-900
				[&:not(:first-child)]:mt-32 [&:not(:first-child)]:mb-16 [&:not(:first-child)]:scroll-mt-32"
			{...props}
		>
			{children}
			<a
				href={href}
				className="absolute top-0 right-[100%] bottom-0
					flex items-center px-10
						opacity-0 [h1:hover_&]:opacity-100"
			>
				<Icon className="h-24 w-24 text-[var(--trim-color)]" icon={feather.Link} />
			</a>
		</h1>
	)
}

function Header2({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const id = getId(getString(children))
	const href = `#${id}`

	return (
		<h2
			id={id}
			className="relative text-gray-900
				[&:not(:first-child)]:mt-32 [&:not(:first-child)]:mb-16 [&:not(:first-child)]:scroll-mt-32"
			{...props}
		>
			{children}
			<a
				href={href}
				className="absolute top-0 right-[100%] bottom-0
					flex items-center px-10
						opacity-0 [h2:hover_&]:opacity-100"
			>
				<Icon className="h-24 w-24 text-[var(--trim-color)]" icon={feather.Link} />
			</a>
		</h2>
	)
}

////////////////////////////////////////////////////////////////////////////////

function OrderedList({ children, ...props }: JSX.IntrinsicElements["ol"]) {
	return (
		<ol className="my-16 flex flex-col gap-8" style={{ counterReset: "li 0" }} {...props}>
			{children}
		</ol>
	)
}

// Hmm
function ListItem({ children, ...props }: JSX.IntrinsicElements["li"]) {
	return (
		<li
			// TODO: Add font here?
			// TODO: Use 10px or 8px here?
			className="relative rounded-1e3 pl-[calc(24px_+_10px)]
				before:absolute before:top-0 before:bottom-0 before:left-0 before:m-auto
					before:flex before:h-24 before:w-24 before:items-center before:justify-center
						before:rounded-1e3 before:bg-gray-200/75
							before:text-[10px] before:font-[600] before:tabular-nums before:text-gray-700
								before:[content:_counter(li)]"
			style={{ counterIncrement: "li 1" }}
			{...props}
		>
			{/* <div className="flex items-center">
				<div className="flex h-32 w-32 items-center justify-center rounded-1e3 bg-white [box-shadow:_var(--shadow-2)]">
					<div className="tabular-nums">x</div>
				</div>
			</div> */}
			{children}
		</li>
	)
}

function getLangFromClassName(className: string | undefined) {
	if (typeof className === "string") {
		if (className.includes(".")) {
			// E.g. "index.js"
			const index = className.lastIndexOf(".")
			return className.slice(index + 1)
		} else {
			// E.g. "language-js"
			return className.slice("language-".length)
		}
	}
	return undefined
}

function SyntaxHighlighting({ lang, code }: { wide?: boolean; lang?: Lang; code: string }) {
	const [highlighter, setHighlighter] = useState<Highlighter | null>(null)
	const [highlighted, setHighlighted] = useState<IThemedToken[][] | null>(null)
	const [copy, setCopy] = useState(false)

	useEffect(() => {
		async function initHighlighter() {
			const highlighter = await getHighlighter({ theme: "github-dark-dimmed" satisfies Theme })
			setHighlighter(highlighter)
		}
		initHighlighter()
	}, [])

	useEffect(() => {
		if (highlighter === null) { return } // prettier-ignore
		const tokens = highlighter.codeToThemedTokens(code, lang, undefined, {
			includeExplanation: false,
		})
		setHighlighted(tokens)
	}, [code, highlighter, lang])

	useEffect(() => {
		const d = window.setTimeout(() => {
			setCopy(false)
		}, 1e3)
		return () => window.clearTimeout(d)
	}, [copy])

	return (
		// TODO: [&:has(+_pre)]:rounded-b-0 is probably unsafe for Firefox
		<pre
			className="relative my-16 -mx-48 bg-gray-900 py-24 text-gray-300
				[pre_+_&]:-mt-24 [pre_+_&]:border-t [pre_+_&]:border-gray-700"
		>
			<code>
				{highlighted === null
					? code.split("\n").map((ys, y) => (
							<div key={y} className="group relative px-48 hover:bg-gray-800">
								<div className="absolute top-0 bottom-0 left-0 select-none">
									<div className="w-32 text-right text-gray-500 group-hover:text-gray-300">{y + 1}</div>
								</div>
								{ys || <br />}
							</div>
					  ))
					: highlighted.map((ys, y) => (
							<div key={y} className="group relative px-48 hover:bg-gray-800">
								<div className="absolute top-0 bottom-0 left-0 select-none">
									<div className="w-32 text-right text-gray-500 group-hover:text-gray-300">{y + 1}</div>
								</div>
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
			<div className="absolute top-0 right-0">
				<button className="flex h-[calc(22.5px_+_24px_*_2)] w-[calc(22.5px_+_24px_*_2)] items-center justify-center" onClick={e => setCopy(true)}>
					<Icon className="h-16 w-16 text-white" icon={copy ? feather.Check : feather.Copy} />
				</button>
			</div>
		</pre>
	)
}

function Pre({ children }: JSX.IntrinsicElements["pre"]) {
	console.log(children)

	const [lang, code] = useMemo(() => {
		const $children = children as ReactElement<{ className?: string; children: string }>
		return [getLangFromClassName($children.props.className) as Lang | undefined, $children.props.children.trim()] as const
	}, [children])

	return <SyntaxHighlighting lang={lang} code={code} />
}

//// function Code({ children, ...props }: JSX.IntrinsicElements["code"]) {
//// 	return (
//// 		// TODO: Add font here?
//// 		<code
//// 			className="m-2 border border-gray-300 bg-white p-2
//// 				text-[12px] font-[600] tabular-nums text-blue-500"
//// 			{...props}
//// 		>
//// 			{children}
//// 		</code>
//// 	)
//// }

function Code({ children, ...props }: JSX.IntrinsicElements["code"]) {
	return (
		// TODO: Add font here?
		<code
			className="bg-gray-200/75 p-4
				text-[12px] font-[600] tabular-nums text-gray-700"
			{...props}
		>
			{children}
		</code>
	)
}

////////////////////////////////////////////////////////////////////////////////

function Anchor({ children, ...props }: JSX.IntrinsicElements["a"]) {
	return (
		<a className="text-gray-500 underline" {...props}>
			{children}
		</a>
	)
}

function Strong({ children, ...props }: JSX.IntrinsicElements["strong"]) {
	return (
		<strong className="font-[500]" {...props}>
			{children}
		</strong>
	)
}

function Hairline(props: JSX.IntrinsicElements["hr"]) {
	return <hr className="my-16" {...props} />
}

////////////////////////////////////////////////////////////////////////////////

// prettier-ignore
const components = {
	a:      Anchor,
	code:   Code,
	h1:     Header1,
	h2:     Header2,
	hr:     Hairline,
	li:     ListItem,
	ol:     OrderedList,
	pre:    Pre,
	strong: Strong,
}

export default function Component() {
	return (
		// TODO: Move MDXProvider to root?
		<MDXProvider components={components}>
			<div className="flex justify-center py-64">
				<article className="prose flex basis-1e3 flex-col gap-8">
					<Markdown />
				</article>
			</div>
		</MDXProvider>
	)
}
