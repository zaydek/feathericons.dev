import * as feather from "../../../data/react-feather"

import { Nextdotjs as NextJsIcon, ReactJs as ReactJsIcon, Sass as SassIcon, Tailwindcss as TailwindCssIcon, Typescript as TypeScriptIcon } from "@icons-pack/react-simple-icons"
import { ReactElement, useEffect, useState } from "react"
import { getHighlighter, Highlighter, IThemedToken, Lang, Theme } from "shiki-es"
import { siNextdotjs as NextJs, siReact as ReactJs, siSass as Sass, siTailwindcss as TailwindCss, siTypescript as TypeScript } from "simple-icons"
import { JSXIcon, SVGIcon, TSXIcon } from "../../../icon-config"
import { cx } from "../../../lib/cx"
import { detab } from "../../../lib/format"
import { Icon, IconComponent } from "../../../lib/react/icon"

type Arrayable<T> = T | T[]

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

// https://tomekdev.com/posts/anchors-for-headings-in-mdx#override-heading-component
function getId(str: string) {
	return str
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-zA-Z0-9-_]/g, "")
}

function H1({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const id = getId(getString(children as any))
	const href = `#${id}`

	return (
		<h1 id={id} className="relative my-16 scroll-my-16 text-gray-900" {...props}>
			{children}
			<a
				href={href}
				className="absolute top-0 right-[100%] bottom-0
					flex items-center px-10
						opacity-0 [h1:hover_&]:opacity-100"
			>
				<Icon className="h-16 w-16 text-[var(--trim-color)]" icon={feather.Link} />
			</a>
		</h1>
	)
}

function H2({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const id = getId(getString(children as any))
	const href = `#${id}`

	return (
		<h2 id={id} className="relative my-16 scroll-my-16 text-gray-800" {...props}>
			{children}
			<a
				href={href}
				className="absolute top-0 right-[100%] bottom-0
					flex items-center px-10
						opacity-0 [h2:hover_&]:opacity-100"
			>
				<Icon className="h-16 w-16 text-[var(--trim-color)]" icon={feather.Link} />
			</a>
		</h2>
	)
}

////////////////////////////////////////////////////////////////////////////////

function Ol({ children, ...props }: JSX.IntrinsicElements["ol"]) {
	return (
		<ol className="my-16 flex flex-col gap-8" style={{ counterReset: "li 0" }} {...props}>
			{children}
		</ol>
	)
}

// Hmm
function Li({ children, ...props }: JSX.IntrinsicElements["li"]) {
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

function Pre({ lang, children: code }: { lang: Lang; children: string }) {
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

//// function Pre({ children }: JSX.IntrinsicElements["pre"]) {
//// 	const [lang, code] = useMemo(() => {
//// 		const $children = children as ReactElement<{ className?: string; children: string }>
//// 		return [getLangFromClassName($children.props.className) as Lang | undefined, $children.props.children.trim()] as const
//// 	}, [children])
////
//// 	return <SyntaxHighlighting lang={lang} code={code} />
//// }

//// function Code({ children, ...props }: JSX.IntrinsicElements["code"]) {
//// 	return (
//// 		// TODO: Add font here?
//// 		<code
//// 			className="mx-2 border border-gray-300 bg-white p-2
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

function A({ children, ...props }: JSX.IntrinsicElements["a"]) {
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

//// // prettier-ignore
//// const components = {
//// 	SelectedName: () => <Code>feather</Code>,
////
//// 	a:      Anchor,
//// 	code:   Code,
//// 	h1:     Header1,
//// 	h2:     Header2,
//// 	hr:     Hairline,
//// 	li:     ListItem,
//// 	ol:     OrderedList,
//// 	pre:    Pre,
//// 	strong: Strong,
//// }

function P({ children, ...props }: JSX.IntrinsicElements["p"]) {
	return <p {...props}>{children}</p>
}

function Hr(props: JSX.IntrinsicElements["hr"]) {
	return <hr className="my-16" {...props} />
}

// Expose className for color or use style
function TextIcon({ className, icon, ...props }: { icon: IconComponent } & JSX.IntrinsicElements["svg"]) {
	return <Icon className={cx("inline-block h-[1.25em] w-[1.25em] align-[-0.1875em]", className)} icon={icon} {...props} />
}

export default function Component() {
	//// return (
	//// 	// TODO: Move MDXProvider to root?
	//// 	<MDXProvider components={components}>
	//// 		<div className="flex justify-center py-64">
	//// 			<article className="prose flex basis-1e3 flex-col gap-8">
	//// 				<Markdown />
	//// 			</article>
	//// 		</div>
	//// 	</MDXProvider>
	//// )

	return (
		<div className="flex justify-center py-64">
			<article className="prose flex basis-1e3 flex-col gap-8">
				<H1>
					Feather Icons&nbsp;
					<TextIcon className="text-gray-500" icon={feather.Feather} />
				</H1>
				<P>
					<A href="https://github.com/feathericons/feather">Feather</A> is a collection of simply beautiful open source icons. Each icon is designed on a 24×24 grid with an emphasis on simplicity, consistency, and flexibility.
				</P>
				<P>
					Feather can easily be used in most environments. Use this website to quickly search and copy icon codes as SVG&nbsp;
					<TextIcon className="text-[var(--svg-color)]" icon={SVGIcon} />, React.js&nbsp;
					<TextIcon className="text-[var(--jsx-color)]" icon={JSXIcon} /> or TypeScript React.js&nbsp;
					<TextIcon className="text-[var(--tsx-color)]" icon={TSXIcon} /> or use one of the <A href="https://github.com/feathericons/feather#related-projects">related projects</A>.
				</P>
				<Hr />
				<H2>
					Using the <Code>Feather</Code> Icon With a CDN
				</H2>
				<P>To get started with Feather using a CDN (content delivery network), follow these steps:</P>
				<Ol>
					<Li>
						Add <Code>{`<script src="https://unpkg.com/feather-icons"></script>`}</Code> to <Code>{`<head>`}</Code>
					</Li>
					<Li>
						Add as many icons as desired using <Code>{`<i data-feather="{icon-name}"></i>`}</Code> syntax
					</Li>
					<Li>
						Call <Code>{`feather.replace()`}</Code>
					</Li>
				</Ol>
				<p>For example:</p>
				<Pre lang="html">
					{detab(`
						<!DOCTYPE html>
						<html lang="en">
							<head>
								<script src="https://unpkg.com/feather-icons"></script>
							</head>
							<body>
								<i data-feather="smile"></i>
								<script>
									feather.replace()
								</script>
							</body>
						</html>
					`)}
				</Pre>
				<Hr />
				<H2>
					Using the <Code>Feather</Code> Icon With React.js&nbsp;
					<TextIcon className="text-[var(--jsx-color)]" icon={JSXIcon} />
				</H2>
				<P>To get started with Feather using React.js, follow these steps:</P>
				{/* <P>
					To get started with Feather using React.js&nbsp;
					<Inline className="text-[var(--jsx-color)]" icon={JSXIcon} />, follow these steps:
				</P> */}
				<Ol>
					<Li>
						Run <Code>{`npm i react-feather`}</Code> or <Code>{`yarn add react-feather`}</Code>
					</Li>
					<Li>
						Import icons using <Code>{`import { IconName } from "react-feather"`}</Code> syntax
					</Li>
					<Li>
						Render icons using <Code>{`<IconName />`}</Code> syntax
					</Li>
				</Ol>
				<p>For example:</p>
				<Pre lang="sh">
					{detab(`
						npm i react-feather
						# Or yarn add react-feather
					`)}
				</Pre>
				<Pre lang="tsx">
					{detab(`
						import { Smile } from "react-feather"

						export default function App() {
							return (
								<div className="flex h-screen items-center justify-center">
									<div className="flex h-10 items-center gap-2 rounded-2xl bg-sky-500 px-4">
										<Smile className="h-4 w-4 text-white" />
										<div className="text-sm font-semibold tracking-wider text-white">HELLO WORLD</div>
									</div>
								</div>
							)
						}
					`)}
				</Pre>
				<Hr />
				<div>
					<small>Feather is by @colebemis and feathericons.dev is by @username_ZAYDEK</small>
					<br />
					<small>Icons are licensed as MIT open source. Icons may be used for personal and commercial use without attribution.</small>
					<br />
					<small>
						Built using{" "}
						<A href="https://reactjs.org">
							React.js&nbsp;
							<TextIcon style={{ color: ReactJs.hex }} icon={ReactJsIcon as any} />
						</A>
						,{" "}
						<A href="https://nextjs.org">
							Next.js&nbsp;
							<TextIcon style={{ color: NextJs.hex }} icon={NextJsIcon as any} />
						</A>
						,{" "}
						<A href="https://typescriptlang.org">
							TypeScript&nbsp;
							<TextIcon style={{ color: TypeScript.hex }} icon={TypeScriptIcon as any} />
						</A>
						,{" "}
						<A href="https://tailwindcss.com">
							Tailwind CSS&nbsp;
							<TextIcon style={{ color: TailwindCss.hex }} icon={TailwindCssIcon as any} />
						</A>
						,{" "}
						<A href="https://sass-lang.com">
							and Sass&nbsp;
							<TextIcon style={{ color: Sass.hex }} icon={SassIcon as any} />
						</A>
					</small>
					<br />
				</div>
			</article>
		</div>
	)
}
