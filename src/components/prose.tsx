import * as feather from "../data/react-feather"

import Link from "next/link"
import { useContext, useEffect, useMemo, useState } from "react"
import { IThemedToken, Lang } from "shiki-es"
import { getStringFromChildren } from "../aria/utils"
import { cx } from "../lib/cx"
import { Icon, SVG } from "../lib/react/icon"
import { ShikiContext } from "../providers/shiki"

////////////////////////////////////////////////////////////////////////////////

export function Article({ children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		<article
			// Use !my-* because of space-y-*
			className="prose space-y-16 text-gray-900
				[&_>_:not(pre)]:mx-64
				[&_>_pre]:!my-32"
			{...props}
		>
			{children}
		</article>
	)
}

////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////

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

//// function countDigits(num: number) {
//// 	if (num === 0) return 1
//// 	return Math.trunc(Math.log10(Math.abs(num))) + 1
//// }

export function Pre({ lang, children: code, ...props }: { lang: Lang; children: string } & Omit<JSX.IntrinsicElements["pre"], "lang">) {
	const { highlighter } = useContext(ShikiContext)!

	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)
	const [click1, setClick1] = useState(false)
	const [click2, setClick2] = useState(false)

	useEffect(() => {
		if (highlighter === null) { return } // prettier-ignore
		const tokens = highlighter.codeToThemedTokens(code, lang, "github-light")
		setTokens(tokens)
	}, [code, highlighter, lang])

	useEffect(() => {
		if (!click1) { return } // prettier-ignore
		const d = window.setTimeout(() => {
			setClick1(false)
		}, 1e3)
		return () => window.clearTimeout(d)
	}, [click1])

	useEffect(() => {
		if (!click2) { return } // prettier-ignore
		const d = window.setTimeout(() => {
			setClick2(false)
		}, 1e3)
		return () => window.clearTimeout(d)
	}, [click2])

	return (
		<pre className="relative overflow-auto bg-gray-50 py-32 shadow-[var(--hairline-shadow-t),_var(--hairline-shadow-b)]" {...props}>
			<code>
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
			</code>
			<div className="absolute top-8 right-64 hidden lg:block">
				<div className="flex">
					<div className="flex cursor-pointer items-center rounded-1e3 px-8 pr-16 hover:active:bg-gray-200" onClick={e => setClick1(true)}>
						<div className="flex h-32 w-32 items-center justify-center">
							<Icon
								className="h-16 w-16 text-[#1570fb]"
								icon={click1 ? feather.Check : feather.Clipboard}
								// Use a slightly thicker stroke when checked
								{...(click1 && { strokeWidth: 2.5 })}
							/>
						</div>
						<TypeCaps>COPY</TypeCaps>
					</div>
					<div className="flex cursor-pointer items-center rounded-1e3 px-8 pr-16 hover:active:bg-gray-200" onClick={e => setClick2(true)}>
						<div className="flex h-32 w-32 items-center justify-center">
							<Icon
								className="h-16 w-16 text-[#1570fb]"
								icon={click2 ? feather.Check : feather.Download}
								// Use a slightly thicker stroke when checked
								{...(click2 && { strokeWidth: 2.5 })}
							/>
						</div>
						<TypeCaps>DOWNLOAD</TypeCaps>
					</div>
				</div>
			</div>
		</pre>
	)
}

function TypeCaps({ className, children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		<div className={cx("font-sans text-[11px] font-[500] slashed-zero tabular-nums leading-[normal] tracking-[0.05em]", className)} {...props}>
			{children}
		</div>
	)
}

export function Hr(props: JSX.IntrinsicElements["hr"]) {
	return <hr {...props} />
}

////////////////////////////////////////////////////////////////////////////////

// Make href required
export function A({ href, children, ...props }: { href: string } & Omit<JSX.IntrinsicElements["a"], "href" | "rel" | "target">) {
	if (href.startsWith("/")) {
		return (
			// @ts-expect-error: Type 'string' is not assignable to type
			// 'Ref<HTMLAnchorElement> | undefined'.ts(2322)
			<Link className="decoration-gray-400 hover:underline" href={href} {...props}>
				{children}
			</Link>
		)
	} else {
		return (
			<a className="decoration-gray-400 hover:underline" href={href} rel="noopener noreferrer" target="_blank" {...props}>
				{children}
			</a>
		)
	}
}

export function Code({ children: code, ...props }: { children: string } & JSX.IntrinsicElements["code"]) {
	return (
		//// <code className="rounded-1e3 bg-gray-100 py-2 px-8 shadow-[var(--hairline-shadow)]" {...props}>
		// TODO: Hairline needs to be darker here
		<code className="rounded-1e3 bg-white py-2 px-8 text-[#1570fb] shadow-[var(--hairline-shadow)]" {...props}>
			{code}
		</code>
	)
}

// TODO: DEPRECATE?
function HeadingIcon({ className, icon, children, ...props }: { icon: SVG } & JSX.IntrinsicElements["svg"]) {
	if (children === undefined || children === null) {
		return <Icon className={cx("inline-block h-[1.1em] w-[1.1em]", className)} icon={icon} {...props} />
	} else {
		return (
			// Use inline-flex h-0 items-center to optically center
			<span className="inline-flex h-0 items-center">
				{children}
				<span className="no-underline">
					&nbsp;
					<Icon className={cx("inline-block h-[1em] w-[1em]", className)} icon={icon} {...props} />
				</span>
			</span>
		)
	}
}

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
