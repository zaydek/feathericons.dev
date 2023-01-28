import * as feather from "./data/react-feather"

import { useContext, useEffect, useMemo, useState } from "react"
import { IThemedToken, Lang } from "shiki-es"
import { getStringFromReactElements } from "./aria/utils"
import { cx } from "./lib/cx"
import { Icon, IconComponent } from "./lib/react/icon"
import { ShikiContext } from "./shiki"

function parseId(str: string) {
	return str
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^a-zA-Z0-9-_]/g, "")
		.toLowerCase()
}

// TODO: Update scroll-my-*
export function Heading1({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const [id, href] = useMemo(() => {
		const id = parseId(getStringFromReactElements(children as any))
		const href = `#${id}`
		return [id, href] as const
	}, [children]) // 🤷‍♀️

	return (
		// Use !my-* because of space-y-*
		<h1 id={id} className="group/header relative !mb-32 scroll-my-32 text-black [&:not(:first-child)]:!mt-64" {...props}>
			{children}
			<a href={href} className="absolute top-0 right-100% bottom-0 flex items-center px-8 opacity-0 group-hover/header:opacity-100" aria-label={`Link ${id}`}>
				<HeadingIcon className="text-[#1570fb]" icon={feather.Link2} />
			</a>
		</h1>
	)
}

// TODO: Update scroll-my-*
export function Heading2({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const [id, href] = useMemo(() => {
		const id = parseId(getStringFromReactElements(children as any))
		const href = `#${id}`
		return [id, href] as const
	}, [children]) // 🤷‍♀️

	return (
		// Use !my-* because of space-y-*
		<h2 id={id} className="group/header relative !mb-32 scroll-my-32 text-black [&:not(:first-child)]:!mt-64" {...props}>
			{children}
			<a href={href} className="absolute top-0 right-100% bottom-0 flex items-center px-8 opacity-0 group-hover/header:opacity-100" aria-label={`Link ${id}`}>
				<HeadingIcon className="text-[#1570fb]" icon={feather.Link2} />
			</a>
		</h2>
	)
}

export function Paragraph({ children, ...props }: JSX.IntrinsicElements["p"]) {
	return <p {...props}>{children}</p>
}

export function OrderedList({ children, ...props }: JSX.IntrinsicElements["ol"]) {
	return (
		<ol className="flex flex-col gap-8 2xl:mx-16 [&:not(:first-child)]:!my-32" {...props}>
			{children}
		</ol>
	)
}

export function ListItem({ children, ...props }: JSX.IntrinsicElements["li"]) {
	return (
		<li className="list-inside list-decimal" {...props}>
			{children}
		</li>
	)
}

export function Pre({ lang, children: code, ...props }: { lang: Lang; children: string } & Omit<JSX.IntrinsicElements["pre"], "lang">) {
	const { highlighter } = useContext(ShikiContext)!

	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)

	useEffect(() => {
		if (highlighter === null) { return } // prettier-ignore
		const tokens = highlighter.codeToThemedTokens(code, lang, "github-light")
		setTokens(tokens)
	}, [code, highlighter, lang])

	return (
		// Use !my-* because of space-y-*
		<pre className="overflow-auto 2xl:mx-16 [&:not(:first-child)]:!my-32 " {...props}>
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

export function Hairline(props: JSX.IntrinsicElements["hr"]) {
	return <hr className="[&:not(:first-child)]:!my-32" {...props} />
}

////////////////////////////////////////////////////////////////////////////////

export function Anchor({ children, ...props }: JSX.IntrinsicElements["a"]) {
	return (
		<a className="text-gray-500 decoration-gray-400 hover:underline" {...props}>
			{children}
		</a>
	)
}

export function Code({ lang, children: code, ...props }: { lang: Lang; children: string } & Omit<JSX.IntrinsicElements["code"], "lang">) {
	const { highlighter } = useContext(ShikiContext)!

	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)

	useEffect(() => {
		if (highlighter === null) { return } // prettier-ignore
		const tokens = highlighter.codeToThemedTokens(code, lang, "github-light")
		setTokens(tokens)
	}, [code, highlighter, lang])

	return (
		<code className="rounded-1e3 border border-gray-300 bg-white py-2 px-8" {...props}>
			{tokens === null
				? code.split("\n").map((ys, y) => <span key={y}>{ys || <br />}</span>)
				: tokens.map((ys, y) => (
						<span key={y}>
							{ys.length > 0 ? (
								ys.map(({ color, content }, x) => (
									<span key={x} style={{ color }}>
										{content}
									</span>
								))
							) : (
								<br />
							)}
						</span>
				  ))}
		</code>
	)
}

export function HeadingIcon({ className, icon, children, ...props }: { icon: IconComponent } & JSX.IntrinsicElements["svg"]) {
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

export function TextIcon({ className, icon, children, ...props }: { icon: IconComponent } & JSX.IntrinsicElements["svg"]) {
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
