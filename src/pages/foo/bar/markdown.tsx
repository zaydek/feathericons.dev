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
		<h1
			id={id}
			className="relative text-gray-900 [&:not(:first-child)]:mt-32 [&:not(:first-child)]:scroll-mt-32"
			{...props}
		>
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
		<h2
			id={id}
			className="relative text-gray-800 [&:not(:first-child)]:mt-32 [&:not(:first-child)]:scroll-mt-32"
			{...props}
		>
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
		<pre className="-mx-24 my-10 rounded-24 bg-gray-900 p-24 text-gray-200" {...props}>
			<code>
				{/* @ts-expect-error */}
				{children.props.children}
			</code>
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

function Anchor({ children, ...props }: JSX.IntrinsicElements["a"]) {
	return (
		<a className="text-gray-500 underline" {...props}>
			{children}
		</a>
	)
}

// prettier-ignore
const components = {
	a:    Anchor,
	code: Code,
	h1:   H1,
	h2:   H2,
	li:   ListItem,
	ol:   OrderedList,
	pre:  Pre,
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
