import "./grid.sass"

import { Icon, toKebabCase } from "@/lib"
import { memo, Suspense } from "react"

export const MemoGrid = memo(function Grid({
	results,
}: {
	results: (readonly [string[], React.LazyExoticComponent<any>])[]
}) {
	return (
		<ul className="grid">
			<Suspense>
				{results.map(([names, Icon]) =>
					names.map((name, index) => (
						<GridItem
							key={name}
							name={name}
							icon={p => <Icon name={name} {...p} />}
							bookmark={index % 15 === 0}
							//// selected={index === 0}
						/>
					)),
				)}
			</Suspense>
		</ul>
	)
})

// TODO: Add caching? Or use text-transform?
function toNameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

export function GridItem({
	name,
	icon: Icon,
	selected,
	bookmark,
}: {
	name: string
	icon: Icon
	bookmark?: boolean
	selected?: boolean
}) {
	return (
		<li className="grid-item" data-bookmark={bookmark} data-selected={selected}>
			<figure
				className="grid-item-frame"
				onFocus={e => {
					// Remove previous selection e.g. user-select: all
					const selection = window.getSelection()
					selection?.removeAllRanges()
				}}
				// Enabling drag-paste
				onDragStart={e => {
					e.dataTransfer.setData("text/plain", "Hello, world!")
					// TODO
				}}
				draggable
				tabIndex={0}
			>
				<Icon className="grid-item-frame-icon" />
			</figure>
			<figcaption className="grid-item-name">{toNameCase(name)}</figcaption>
			{/* <feather.Star className="grid-item-bookmark" fill="currentColor" strokeWidth={4} /> */}
		</li>
	)
}
