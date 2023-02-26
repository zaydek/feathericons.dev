import "./grid.sass"

import * as feather from "@icons/feather"

import { Icon } from "@/lib/icon"
import { PropsWithChildren } from "react"

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
		<li className="grid-item" data-bookmark={bookmark} data-selected={selected}>
			<article>
				<figure>
					<Icon strokeWidth={2.5} />
				</figure>
				<figcaption>{name}</figcaption>
				<feather.Star className="bookmark" fill="currentColor" strokeWidth={4} />
			</article>
		</li>
	)
}

export function Grid({ children }: PropsWithChildren) {
	return <ul className="grid">{children}</ul>
}
