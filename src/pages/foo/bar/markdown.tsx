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
		<code className="mx-2 rounded-2 border border-solid border-gray-300 bg-white p-4 text-blue-500" {...props}>
			{children}
		</code>
	)
}

const components = {
	h1: H1,
	h2: H2,
	pre: Pre,
	code: Code,
}

export default function Component() {
	return (
		<MDXProvider components={components}>
			<div className="flex justify-center">
				<article className="prose flex basis-1e3 flex-col gap-20">
					<Markdown />
				</article>
			</div>
		</MDXProvider>
	)
}
