import * as feather from "./data/react-feather"

import { ReactElement, useContext, useEffect, useState } from "react"
import { IThemedToken, Lang } from "shiki-es"
import { cx } from "./lib/cx"
import { Icon, IconComponent } from "./lib/react/icon"
import { Arrayable } from "./lib/types"
import { ShikiContext } from "./shiki"

// Recursively concatenate strings
function getString(children: undefined | Arrayable<string> | Arrayable<ReactElement<{ children?: string }>>) {
	if (children === undefined) { return "" } // prettier-ignore

	let str = ""
	const flatChildren = [children].flat()
	for (const child of flatChildren) {
		if (typeof child === "string") {
			str += child
		} else {
			str += getString(child.props.children)
		}
	}
	return str
}

function getId(str: string) {
	return str
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^a-zA-Z0-9-_]/g, "")
		.toLowerCase()
}

export function Heading1({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const id = getId(getString(children as any))
	const href = `#${id}`

	return (
		<h1 id={id} className="relative my-16 scroll-my-16 text-black" {...props}>
			{children}
			{/* prettier-ignore */}
			<a
				href={href}
				className="absolute top-0 right-[100%] bottom-0 flex items-center px-8 opacity-0 [h1:hover_&]:opacity-100"
				aria-label={`Link ${id}`}
			>
				<InlineIcon className="text-[var(--trim-color)]" icon={feather.Link} />
			</a>
		</h1>
	)
}

export function Heading2({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const id = getId(getString(children as any))
	const href = `#${id}`

	return (
		<h2 id={id} className="relative my-16 scroll-my-16 text-black" {...props}>
			{children}
			{/* prettier-ignore */}
			<a
				href={href}
				className="absolute top-0 right-[100%] bottom-0 flex items-center px-8 opacity-0 [h1:hover_&]:opacity-100"
				aria-label={`Link ${id}`}
			>
				<InlineIcon className="text-[var(--trim-color)]" icon={feather.Link} />
			</a>
		</h2>
	)
}

export function Paragraph({ children, ...props }: JSX.IntrinsicElements["p"]) {
	return <p {...props}>{children}</p>
}

export function OrderedList({ children, ...props }: JSX.IntrinsicElements["ol"]) {
	return (
		<ol className="my-8 flex flex-col gap-8" style={{ counterReset: "li 0" }} {...props}>
			{children}
		</ol>
	)
}

export function ListItem({ children, ...props }: JSX.IntrinsicElements["li"]) {
	return (
		<li
			className="relative rounded-1e3 pl-[calc(24px_+_12px)]
				before:absolute before:top-0 before:bottom-0 before:left-0 before:m-auto
					before:flex before:h-24 before:w-24 before:items-center before:justify-center
						before:rounded-1e3 before:bg-gray-200/75
							before:font-code before:text-[0.75em] before:tabular-nums before:text-gray-800
								before:[content:_counter(li)]"
			style={{ counterIncrement: "li 1" }}
			{...props}
		>
			{children}
		</li>
	)
}

export function CodeBlock({ lang, selected, children: code }: { lang: Lang; selected?: number[]; children: string }) {
	const { highlighter } = useContext(ShikiContext)!

	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)
	const [copy, setCopy] = useState(false)

	useEffect(() => {
		if (highlighter === null) { return } // prettier-ignore
		const tokens = highlighter.codeToThemedTokens(code, lang, "github-dark", {
			includeExplanation: false,
		})
		setTokens(tokens)
	}, [code, highlighter, lang])

	useEffect(() => {
		if (!copy) { return } // prettier-ignore
		const d = window.setTimeout(() => {
			setCopy(false)
		}, 1e3)
		return () => window.clearTimeout(d)
	}, [copy])

	return (
		<pre className="relative my-16 -mx-48 overflow-x-auto bg-gray-900 py-24 text-gray-300 [pre_+_&]:-mt-24 [pre_+_&]:border-t [pre_+_&]:border-gray-700">
			<code>
				{tokens === null
					? code.split("\n").map((ys, y) => (
							<div key={y} className={selected?.includes(y) ? "relative bg-gray-800 px-48" : "relative px-48"}>
								<div className="absolute top-0 bottom-0 left-0 select-none">
									<div className="w-32 text-right text-gray-500">{y + 1}</div>
								</div>
								{ys || <br />}
							</div>
					  ))
					: tokens.map((ys, y) => (
							<div key={y} className={selected?.includes(y) ? "relative bg-gray-800 px-48" : "relative px-48"}>
								<div className="absolute top-0 bottom-0 left-0 select-none">
									<div className="w-32 text-right text-gray-500">{y + 1}</div>
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
				<button
					className="flex h-[calc(21px_+_24px_*_2)] w-[calc(21px_+_24px_*_2)] items-center justify-center"
					onClick={async e => {
						await navigator.clipboard.writeText(code + "\n")
						setCopy(true)
					}}
					aria-label="Copy code to the clipboard"
				>
					<Icon className="h-16 w-16 text-white" icon={copy ? feather.Check : feather.Copy} />
				</button>
			</div>
		</pre>
	)
}

export function Hairline(props: JSX.IntrinsicElements["hr"]) {
	return <hr className="my-16" {...props} />
}

////////////////////////////////////////////////////////////////////////////////

export function Anchor({ children, ...props }: JSX.IntrinsicElements["a"]) {
	return (
		<a className="text-gray-500 underline" {...props}>
			{children}
		</a>
	)
}

export function Code({ children, ...props }: JSX.IntrinsicElements["code"]) {
	return (
		<code className="bg-gray-200/75 p-4 text-gray-800" {...props}>
			{children}
		</code>
	)
}

// Expose className for color or use style
export function InlineIcon({ className, icon, ...props }: { icon: IconComponent } & JSX.IntrinsicElements["svg"]) {
	return <Icon className={cx("mx-[0.125em] inline-block h-[1.125em] w-[1.125em] align-[-0.1875em]", className)} icon={icon} {...props} />
}
