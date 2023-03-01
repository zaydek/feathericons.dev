import "./grid.sass"

import * as feather from "@icons/feather"

import { Icon } from "@/lib"
import { memo, Suspense } from "react"

// Memoize <Grid> to suppress useless rerenders
export const MemoGrid = memo(function Grid({ results }: { results: (readonly [string[], React.LazyExoticComponent<any>])[] }) {
	return (
		<div className="grid">
			<Suspense fallback={<div>Loading…</div>}>
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
		</div>
	)
})

//// // TODO: Add caching? Or use text-transform?
//// function toNameCase(str: string) {
//// 	return toKebabCase(str).toLowerCase()
//// }

export function GridItem({ name, icon: Icon, selected, bookmark }: { name: string; icon: Icon; bookmark?: boolean; selected?: boolean }) {
	return (
		<article className="grid-item" data-bookmark={bookmark} data-selected={selected}>
			<figure
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
				<Icon />
			</figure>
			<figcaption>{name}</figcaption>
			<feather.Star className="bookmark" fill="currentColor" strokeWidth={4} />
		</article>
	)
}
