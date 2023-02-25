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
		<article className="grid-item" data-bookmark={bookmark} data-selected={selected}>
			<div className="icon-frame u-flex-1">
				<Icon className="icon" />
			</div>
			<div className="icon-name">{name}</div>
			<div className="copy-button">
				<div className="copy-button-text">COPY TSX</div>
			</div>
			<feather.Star className="bookmark" fill="currentColor" strokeWidth={4} />
		</article>
	)
}

export function Grid({ children }: PropsWithChildren) {
	return <div className="grid">{children}</div>
}
