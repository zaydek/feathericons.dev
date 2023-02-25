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
			<div className="icon-container u-flex-1">
				<Icon className="icon" />
			</div>
			<div className="name">{name}</div>
			<div className="copy-button">
				<div className="type">COPY TSX</div>
			</div>
			{/* <feather.Star className="bookmark" /> */}
		</article>
	)
}

export function Grid({ children }: PropsWithChildren) {
	return <div className="grid">{children}</div>
}
