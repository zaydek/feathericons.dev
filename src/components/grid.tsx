import "./grid.sass"

import { Icon, toKebabCase } from "@/lib"
import { ClipboardContext } from "@/state"
import { memo, Suspense, useContext } from "react"

export const MemoGrid = memo(function Grid({
	results,
}: {
	results: (readonly [string[], React.LazyExoticComponent<any>])[]
}) {
	const { clearSelected } = useContext(ClipboardContext)!

	return (
		<ul
			className="grid"
			onClick={e => {
				e.stopPropagation()
				e.preventDefault()
				clearSelected()
			}}
		>
			<Suspense>
				{results.map(([names, Icon]) =>
					names.map((name, index) => (
						<GridItem
							key={name}
							name={name}
							icon={p => <Icon name={name} {...p} />}
							//// bookmark={index % 15 === 0}
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
	//// selected,
	bookmark,
}: {
	name: string
	icon: Icon
	bookmark?: boolean
	selected?: boolean
}) {
	const { selected, addToSelected, clearSelected } = useContext(ClipboardContext)!

	const id = toNameCase(name)

	return (
		//// <li id={id} className="grid-item" data-bookmark={bookmark} data-selected={selected.has(id)}>
		<li id={id} className="grid-item" data-selected={selected.has(id)}>
			<figure
				className="grid-item-frame"
				onFocus={e => {
					const selection = window.getSelection()
					selection?.removeAllRanges()
				}}
				//// // Enabling drag-paste
				//// onDragStart={e => {
				//// 	e.dataTransfer.setData("text/plain", "Hello, world!")
				//// 	// TODO
				//// }}
				onClick={e => {
					if (e.metaKey) {
						e.stopPropagation()
						e.preventDefault()
						addToSelected(id)
					} else {
						e.stopPropagation()
						e.preventDefault()
						clearSelected()
						addToSelected(id)
					}
				}}
				//// draggable
				tabIndex={0}
			>
				<Icon className="grid-item-frame-icon" />
			</figure>
			<figcaption className="grid-item-name">{id}</figcaption>
			{/* <feather.Star className="grid-item-bookmark" fill="currentColor" strokeWidth={4} /> */}
		</li>
	)
}
