import * as feather from "@icons/feather"

import { PropsWithChildren } from "react"

export function Section({ tag: Tag = "section", name, children }: PropsWithChildren<{ tag?: keyof JSX.IntrinsicElements; name: string }>) {
	return (
		<Tag className="section">
			<header className="section-header">
				<h2 className="type u-flex-1">{name}</h2>
				<feather.RotateCcw className="undo" strokeWidth={4} />
			</header>
			{children}
		</Tag>
	)
}
