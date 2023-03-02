import "./main-grid.sass"

import * as feather from "@icons/feather/tsx"

import { Icon, toKebabCase } from "@/lib"
import { memo, Suspense } from "react"

// Memoize <Grid> to suppress useless rerenders
export const MemoMainGrid = memo(function MainGrid({
	results,
}: {
	results: (readonly [string[], React.LazyExoticComponent<any>])[]
}) {
	return (
		<ul className="main-grid">
			<Suspense>
				{results.map(([names, Icon]) =>
					names.map((name, index) => (
						<MainGridItem
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

export function MainGridItem({
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
		<li className="main-grid-item" data-bookmark={bookmark} data-selected={selected}>
			<figure
				className="main-grid-item-figure"
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
				<Icon className="main-grid-item-figure-svg" />
			</figure>
			<figcaption className="main-grid-item-figcaption">{toNameCase(name)}</figcaption>
			<feather.Star className="main-grid-item-bookmark" fill="currentColor" strokeWidth={4} />
		</li>
	)
}
