import "./section.sass"

import * as feather from "@icons/feather"

import { PropsWithChildren } from "react"

export function Section({
	tag: Tag = "section",
	name,
	canUndo = undefined,
	children,
}: PropsWithChildren<{
	tag?: keyof JSX.IntrinsicElements
	name?: string
	canUndo?: boolean
}>) {
	return (
		<Tag className="section">
			{name !== undefined && (
				<header>
					<span className="type">{name}</span>
					{canUndo !== undefined && canUndo && <feather.RotateCcw strokeWidth={4} />}
				</header>
			)}
			{children}
		</Tag>
	)
}
