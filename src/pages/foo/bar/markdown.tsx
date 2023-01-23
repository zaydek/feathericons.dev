import * as feather from "../../../data/react-feather"

import { MDXProvider } from "@mdx-js/react"
import { ReactElement, ReactNode, useEffect, useState } from "react"
import { getHighlighter, Highlighter, IThemedToken } from "shiki-es"
import { Icon } from "../../../lib/react/icon"
import { ThickIcon } from "../../../typography"
import Markdown from "./_markdown.mdx"

// https://tomekdev.com/posts/anchors-for-headings-in-mdx#override-heading-component
function getIdAndHref(str: string) {
	const id = str
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-zA-Z0-9-_]/g, "")
	const href = `#${id}`
	return [id, href] as const
}

// Recursive function to extract a string from children
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

function H1({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const [id, href] = getIdAndHref(getString(children))

	return (
		<h1
			id={id}
			className="relative text-gray-900
				[&:not(:first-child)]:mt-32
				[&:not(:first-child)]:scroll-mt-32"
			{...props}
		>
			{children}
			<a
				href={href}
				className="absolute top-0 right-[100%] bottom-0 flex items-center px-10
					opacity-0 [h1:hover_&]:opacity-100"
			>
				<ThickIcon className="h-20 w-20 text-[var(--trim-color)]" icon={feather.Link2} />
			</a>
		</h1>
	)
}

function H2({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const [id, href] = getIdAndHref(getString(children))

	return (
		<h2
			id={id}
			className="relative text-gray-900
				[&:not(:first-child)]:mt-32
				[&:not(:first-child)]:scroll-mt-32"
			{...props}
		>
			{children}
			<a
				href={href}
				className="absolute top-0 right-[100%] bottom-0 flex items-center px-10
					opacity-0 [h2:hover_&]:opacity-100"
			>
				<ThickIcon className="h-20 w-20 text-[var(--trim-color)]" icon={feather.Link2} />
			</a>
		</h2>
	)
}

//// function IconPreview() {
//// 	const { selectedName, viewSource, formatAs, clipboard } = useContext(SelectedContext)!
////
//// 	const [highlighter, setHighlighter] = useState<Highlighter | null>(null)
//// 	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)
////
//// 	useEffect(() => {
//// 		async function init() {
//// 			const highlighter = await getHighlighter({ theme: "github-light" })
//// 			setHighlighter(highlighter)
//// 		}
//// 		init()
//// 	}, [])
////
//// 	useEffect(() => {
//// 		if (highlighter === null) { return } // prettier-ignore
//// 		const tokens = highlighter.codeToThemedTokens(clipboard + "\n", formatAs === "svg" ? "xml" : "tsx", undefined, {
//// 			includeExplanation: false,
//// 		})
//// 		setTokens(tokens)
//// 	}, [clipboard, formatAs, highlighter])
////
//// 	return viewSource ? (
//// 		// Use overflow-x-scroll > inline-block p-* because of overflow-x bug
//// 		<pre className="min-h-256 overflow-x-scroll rounded-24 bg-white text-gray-800 [box-shadow:_var(--shadow-2)]">
//// 			<code className="inline-block p-24">
//// 				{tokens === null ? (
//// 					<div className="text-gray-400">Initializing shiki-es…</div>
//// 				) : (
//// 					tokens.map((token, y) => (
//// 						<Fragment key={y}>
//// 							<div className="relative -mx-[1ch] pl-[4ch]">
//// 								<div className="absolute top-0 bottom-0 left-0 select-none">
//// 									<div className="w-[2ch] text-right text-gray-300">{y + 1}</div>
//// 								</div>
//// 								{token.map(({ content, color }, x) => (
//// 									<span key={x} style={{ color }}>
//// 										{y === 0 ? <Anchor>{content}</Anchor> : content}
//// 									</span>
//// 								))}
//// 							</div>
//// 						</Fragment>
//// 					))
//// 				)}
//// 			</code>
//// 		</pre>
//// 	) : (
//// 		<div className="dots-pattern flex aspect-[1.5] items-center justify-center rounded-24 bg-white [box-shadow:_var(--shadow-2)]">
//// 			<Icon
//// 				className="h-64 w-64 text-gray-800 [stroke-width:_var(--stroke-width)] [transform:_scale(var(--scale))]"
//// 				icon={feather[selectedName]}
//// 			/>
//// 		</div>
//// 	)
//// }

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

function Pre({ children, ...props }: JSX.IntrinsicElements["pre"]) {
	const $children = children as ReactElement<{ className: string; children: string }>
	const [lang, code] = [getLangFromClassName($children.props.className), $children.props.children.trim()] as const

	const [highlighter, setHighlighter] = useState<Highlighter | null>(null)
	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)

	const [copy, setCopy] = useState(false)

	// Load highlighter
	useEffect(() => {
		async function init() {
			const highlighter = await getHighlighter({ theme: "github-dark" })
			setHighlighter(highlighter)
		}
		init()
	}, [])

	// Run highlighter
	useEffect(() => {
		if (highlighter === null) { return } // prettier-ignore
		const tokens = highlighter.codeToThemedTokens(code, lang, undefined, {
			includeExplanation: false,
		})
		setTokens(tokens)
	}, [code, highlighter, lang])

	// Revert copy
	useEffect(() => {
		const d = window.setTimeout(() => {
			setCopy(false)
		}, 1e3)
		return () => window.clearTimeout(d)
	}, [copy])

	return (
		<pre
			className="relative -mx-24 my-10 rounded-24 bg-gray-900 py-24 text-gray-200 [tab-size:_2]
				[pre_+_&]:-mt-32 [pre_+_&]:border [pre_+_&]:border-solid [pre_+_&]:border-gray-700 [&_+_pre]:rounded-t-0
					[&:has(+_pre)]:rounded-b-0"
			{...props}
		>
			<code>
				{tokens === null
					? // Loading syntax highlighting
					  code.split("\n").map((line, y) => (
							<div key={y} className="px-24 hover:bg-gray-800">
								{line || <br />}
							</div>
					  ))
					: // Syntax highlighting
					  tokens.map((token, y) => (
							<div key={y} className="px-24 hover:bg-gray-800">
								{token.length > 0 ? (
									token.map(({ content, color }, x) => (
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
				<button
					//// className="flex h-40 w-40 items-center justify-center rounded-1e3 bg-gray-800"
					className="flex h-48 w-48 items-center justify-center"
					onClick={e => setCopy(true)}
				>
					<Icon className="h-16 w-16 text-sky-300" icon={copy ? feather.Check : feather.Copy} />
				</button>
			</div>
		</pre>
	)
}

function Code({ children, ...props }: JSX.IntrinsicElements["code"]) {
	return (
		// TODO
		<code className="bg-gray-200/50 p-4 text-[12px] font-[600] tabular-nums text-gray-700" {...props}>
			{children}
		</code>
	)
}

function OrderedList({ children, ...props }: JSX.IntrinsicElements["ol"]) {
	return (
		<ol className="flex flex-col gap-10" style={{ counterReset: "li 0" }} {...props}>
			{children}
		</ol>
	)
}

// Hmm
function ListItem({ children, ...props }: JSX.IntrinsicElements["li"]) {
	return (
		<li
			className="relative rounded-1e3 pl-[calc(28px_+_10px)]
				before:absolute before:top-0 before:bottom-0 before:left-0 before:m-auto
					before:flex before:h-28 before:w-28 before:items-center before:justify-center
						before:rounded-1e3 before:bg-gray-200/50
							before:text-[12px] before:font-[500] before:tabular-nums before:text-gray-700
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

// prettier-ignore
const components = {
	a:      Anchor,
	code:   Code,
	h1:     H1,
	h2:     H2,
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
				<article className="prose flex basis-1e3 flex-col gap-16">
					<Markdown />
				</article>
			</div>
		</MDXProvider>
	)
}
