import "./grid.sass"

import * as feather from "@icons/feather"

import { Icon } from "@/lib"
import { PropsWithChildren } from "react"

export function Grid({ children }: PropsWithChildren) {
	return <div className="grid">{children}</div>
}

// TODO: May want to ensure <article> is visible when toggling the sidebar
export function GridItem({
	name,
	icon: Icon,
	selected = undefined,
	bookmark = undefined,
}: {
	name: string
	icon: Icon
	bookmark?: boolean
	selected?: boolean
}) {
	return (
		<article className="grid-item" data-bookmark={bookmark} data-selected={selected}>
			<figure
				onFocus={e => {
					// Remove previous selection e.g. user-select: all
					const selection = window.getSelection()
					selection?.removeAllRanges()
				}}
				onDragStart={e => {
					e.dataTransfer.setData("text/plain", "Hello, world!")
					// TODO
				}}
				draggable
				tabIndex={0}
			>
				<Icon />
			</figure>
			<figcaption>{name}</figcaption>
			<feather.Star className="bookmark" fill="currentColor" strokeWidth={4} />
		</article>
	)
}
