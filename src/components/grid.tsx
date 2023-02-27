import "./grid.sass"

import * as feather from "@icons/feather"

import { Icon } from "@/lib"
import { PropsWithChildren } from "react"

export function Grid({ children }: PropsWithChildren) {
	return <div className="grid">{children}</div>
}

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
					// Remove selection e.g. user-select: all
					const selection = window.getSelection()
					selection?.removeAllRanges()
				}}
				tabIndex={0}
			>
				<Icon />
			</figure>
			<figcaption>{name}</figcaption>
			<feather.Star className="bookmark" fill="currentColor" strokeWidth={6} />
		</article>
	)
}
