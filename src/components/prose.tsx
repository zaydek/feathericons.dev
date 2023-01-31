import * as feather from "../data/react-feather"

import { useContext, useEffect, useMemo, useState } from "react"
import { IThemedToken, Lang } from "shiki-es"
import { getStringFromChildren } from "../aria/utils"
import { cx } from "../lib/cx"
import { Icon, SVG } from "../lib/react/icon"
import { ShikiContext } from "../providers/shiki"

export function Article({ children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		<article className="prose text-gray-900" {...props}>
			{children}
		</article>
	)
}

function parseId(str: string) {
	return str
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^a-zA-Z0-9-_]/g, "")
		.toLowerCase()
}

export function H1({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const [str, id, href] = useMemo(() => {
		const str = getStringFromChildren(children as any)
		const id = parseId(str)
		const href = `#${id}`
		return [str, id, href] as const
	}, [children]) // 🤷‍♀️

	return (
		<h1 id={id} className="group/header relative text-black" {...props}>
			{children}
			<a
				href={href}
				className="absolute top-0 right-100% bottom-0 flex items-center px-8 opacity-0
					group-hover/header:opacity-100"
				aria-label={`Link to header ${str}`}
			>
				<HeadingIcon className="text-[#1570fb]" icon={feather.Link2} />
			</a>
		</h1>
	)
}

export function H2({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const [str, id, href] = useMemo(() => {
		const str = getStringFromChildren(children as any)
		const id = parseId(str)
		const href = `#${id}`
		return [str, id, href] as const
	}, [children]) // 🤷‍♀️

	return (
		<h2 id={id} className="group/header relative text-black" {...props}>
			{children}
			<a
				href={href}
				className="absolute top-0 right-100% bottom-0 flex items-center px-8 opacity-0
					group-hover/header:opacity-100"
				aria-label={`Link to subheader ${str}`}
			>
				<HeadingIcon className="text-[#1570fb]" icon={feather.Link2} />
			</a>
		</h2>
	)
}

export function P({ children, ...props }: JSX.IntrinsicElements["p"]) {
	return <p {...props}>{children}</p>
}

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

export function Pre({
	lang,
	children: code,
	...props
}: { lang: Lang; children: string } & Omit<JSX.IntrinsicElements["pre"], "lang">) {
	const { highlighter } = useContext(ShikiContext)!

	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)

	useEffect(() => {
		if (highlighter === null) { return } // prettier-ignore
		const tokens = highlighter.codeToThemedTokens(code, lang, "github-light")
		setTokens(tokens)
	}, [code, highlighter, lang])

	return (
		// TODO
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

export function Hr(props: JSX.IntrinsicElements["hr"]) {
	return <hr {...props} />
}

////////////////////////////////////////////////////////////////////////////////

export function A({ children, ...props }: JSX.IntrinsicElements["a"]) {
	return (
		<a className="text-gray-500 decoration-gray-400 hover:underline" {...props}>
			{children}
		</a>
	)
}

export function Code({ children: code, ...props }: { children: string } & JSX.IntrinsicElements["code"]) {
	return (
		<code className="rounded-1e3 bg-gray-100 py-2 px-8 shadow-[var(--hairline-shadow)]" {...props}>
			{code}
		</code>
	)
}

function HeadingIcon({ className, icon, children, ...props }: { icon: SVG } & JSX.IntrinsicElements["svg"]) {
	if (children === undefined || children === null) {
		return <Icon className={cx("inline-block h-[1.1em] w-[1.1em]", className)} icon={icon} {...props} />
	} else {
		return (
			// Use inline-flex h-0 items-center to optically center
			<span className="inline-flex h-0 items-center">
				{children}&nbsp;
				<Icon className={cx("inline-block h-[1em] w-[1em]", className)} icon={icon} {...props} />
			</span>
		)
	}
}

export function InlineIcon({ className, icon, children, ...props }: { icon: SVG } & JSX.IntrinsicElements["svg"]) {
	if (children === undefined || children === null) {
		return <Icon className={cx("inline-block h-[1.125em] w-[1.125em]", className)} icon={icon} {...props} />
	} else {
		return (
			// Use inline-flex h-0 items-center to optically center
			<span className="inline-flex h-0 items-center">
				{children}&nbsp;
				<Icon className={cx("inline-block h-[1.125em] w-[1.125em]", className)} icon={icon} {...props} />
			</span>
		)
	}
}
