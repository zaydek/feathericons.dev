import * as feather from "@icons/feather"

import { PropsWithChildren } from "react"

export function Section({
	tag: Tag = "section",
	name,
	canUndo = true,
	children,
}: PropsWithChildren<{ tag?: keyof JSX.IntrinsicElements; name?: string; canUndo?: boolean }>) {
	return (
		<Tag className="section">
			{name !== undefined && (
				<header className="section-header">
					<h2 className="type u-flex-1">{name}</h2>
					{canUndo && <feather.RotateCcw className="undo" strokeWidth={4} />}
				</header>
			)}
			{children}
		</Tag>
	)
}
