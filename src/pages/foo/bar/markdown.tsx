import * as feather from "../../../data/react-feather"

import { MDXProvider } from "@mdx-js/react"
import { ReactNode } from "react"
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
		<h1 id={id} className="relative scroll-mt-20 text-gray-900" {...props}>
			{children}
			<a
				href={href}
				className="absolute top-0 right-[100%] bottom-0 flex items-center px-10 opacity-0 [h1:hover_&]:opacity-100"
			>
				<ThickIcon className="h-20 w-20 text-[var(--trim-color)]" icon={feather.Link2} />
			</a>
		</h1>
	)
}

function H2({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	const [id, href] = getIdAndHref(getString(children))

	return (
		<h2 id={id} className="relative scroll-mt-20 text-gray-800" {...props}>
			{children}
			<a
				href={href}
				className="absolute top-0 right-[100%] bottom-0 flex items-center px-10 opacity-0 [h2:hover_&]:opacity-100"
			>
				<ThickIcon className="h-20 w-20 text-[var(--trim-color)]" icon={feather.Link2} />
			</a>
		</h2>
	)
}

function Pre({ children, ...props }: JSX.IntrinsicElements["pre"]) {
	return (
		// TODO: Add overflow here?
		// Syntax highlighting?
		// Line numbers?
		<pre className="rounded-16 bg-gray-900 py-16 px-24 text-gray-200" {...props}>
			<code>
				{/* @ts-expect-error */}
				{children.props.children}
			</code>
		</pre>
	)
}

function Code({ children, ...props }: JSX.IntrinsicElements["code"]) {
	return (
		<code className="mx-2 rounded-2 border border-solid border-gray-300 bg-white py-2 px-4 text-blue-500" {...props}>
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

//// relative pl-10 xl:grid grid-cols-5 gap-16 before:content-[counter(step)] before:absolute before:left-0 before:flex before:items-center before:justify-center before:w-[calc(1.375rem+1px)] before:h-[calc(1.375rem+1px)] before:text-[0.625rem] before:font-bold before:text-slate-700 before:rounded-md before:shadow-sm before:ring-1 before:ring-slate-900/5 dark:before:bg-slate-700 dark:before:text-slate-200 dark:before:ring-0 dark:before:shadow-none dark:before:highlight-white/5 pb-8 after:absolute after:top-[calc(1.875rem+1px)] after:bottom-0 after:left-[0.6875rem] after:w-px after:bg-slate-200 dark:after:bg-slate-200/5

//// .a {
//// 	counter-reset: step 0;
//// }
//// .b {
//// 	position: relative;
//// 	padding-left: 20px;
//// 	&::before {
//// 		content: counter(step);
//// 		position: absolute;
//// 		top: 0;
//// 		bottom: 0;
//// 		left: 0;
//// 		margin: auto;
//// 	}
//// }

// Hmm
function ListItem({ children, ...props }: JSX.IntrinsicElements["li"]) {
	return (
		<li
			className="relative rounded-1e3 pl-[calc(28px_+_10px)]
				before:absolute before:top-0 before:bottom-0 before:left-0 before:m-auto
					before:flex before:h-28 before:w-28 before:items-center before:justify-center
						before:rounded-[43.75%] before:bg-gray-200/50
							before:text-[12px] before:font-[600] before:tabular-nums before:text-gray-700
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

const components = {
	code: Code,
	h1: H1,
	h2: H2,
	ol: OrderedList,
	li: ListItem,
	pre: Pre,
}

export default function Component() {
	return (
		// TODO: Move MDXProvider to root?
		<MDXProvider components={components}>
			<div className="flex justify-center py-64">
				<article className="prose flex basis-1e3 flex-col gap-20">
					<Markdown />
				</article>
			</div>
		</MDXProvider>
	)
}
