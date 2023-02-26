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
			<div className="icon-frame u-flex-1">
				<Icon className="icon" />
			</div>
			{/* <div className="name">
				<Icon className="icon" strokeWidth={2.5} />
				&ensp;{name}
			</div> */}
			<div className="name">{name}</div>
			<div className="buttons">
				<div className="button u-flex-1">
					<div className="type">COPY SVG</div>
				</div>
				<div className="button">
					<feather.ChevronDown className="icon" strokeWidth={6} />
				</div>
			</div>
			{/* <div className="copy-button">
				<div className="type">COPY</div>
			</div> */}
			<feather.Star className="bookmark" fill="currentColor" strokeWidth={6} />
		</li>
	)
}

export function Grid({ children }: PropsWithChildren) {
	return <ul className="grid">{children}</ul>
}
