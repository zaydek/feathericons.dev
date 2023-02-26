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
				<header className="section-header">
					<h2 className="type">{name}</h2>
					{canUndo !== undefined && canUndo && <feather.RotateCcw className="undo" strokeWidth={4} />}
				</header>
			)}
			{children}
		</Tag>
	)
}
