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
		<li data-bookmark={bookmark} data-selected={selected}>
			<article>
				<figure className="u-flex-1">
					<Icon className="icon" strokeWidth={2.5} />
				</figure>
				<figcaption>{name}</figcaption>
				<feather.Star className="bookmark" fill="currentColor" strokeWidth={6} />
			</article>
		</li>
	)
}

export function Grid({ children }: PropsWithChildren) {
	return <ul className="grid">{children}</ul>
}
