import * as feather from "../../../data/react-feather"

import { MDXProvider } from "@mdx-js/react"
import { ThickIcon } from "../../../typography"
import Markdown from "./_wow.mdx"

function H1({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	return (
		// Hmm
		<div className="~pt-20 group relative flex flex-col">
			<h1 className="text-gray-900" {...props}>
				{children}
			</h1>
			<div className="absolute top-0 bottom-0 -left-[calc(16px_+_10px)] hidden [&_>_*]:h-[100%] [.group:hover_&]:block">
				<div className="flex items-center justify-center">
					<ThickIcon className="h-16 w-16 text-[var(--trim-color)]" icon={feather.Link} />
				</div>
			</div>
		</div>
	)
}

function H2({ children, ...props }: JSX.IntrinsicElements["h1"]) {
	return (
		// Hmm
		<div className="~pt-10 relative flex flex-col">
			<h2 className="text-gray-800" {...props}>
				{children}
			</h2>
			<div className="absolute top-0 bottom-0 -left-[calc(16px_+_10px)] hidden [&_>_*]:h-[100%] [.group:hover_&]:block">
				<div className="flex items-center justify-center">
					<ThickIcon className="h-16 w-16 text-[var(--trim-color)]" icon={feather.Link} />
				</div>
			</div>
		</div>
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
