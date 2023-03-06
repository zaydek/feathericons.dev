import { cx, Icon, toKebabCase } from "@/lib"
import { ClipboardContext, LayoutContext, SearchContext } from "@/state"
import { Suspense, useContext } from "react"

// TODO: Add memo?
export function Grid() {
	const { showNames, results } = useContext(SearchContext)!

	return (
		<div className={cx("grid", showNames && "is-show-names")}>
			<Suspense>
				{results.map(([names, Icon]) =>
					names.map(name => (
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
		</div>
	)
}

// TODO: Add caching? Or use text-transform?
// TODO
function toNameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

export function GridItem({
	name,
	icon: Icon,
}: //// bookmark,
{
	name: string
	icon: Icon
	//// bookmark?: boolean
}) {
	const { sidebar, setSidebar } = useContext(LayoutContext)!
	const { showNames } = useContext(SearchContext)!
	const { selected, addToSelected, clearSelected } = useContext(ClipboardContext)!

	const id = toNameCase(name)

	return (
		//// <li id={id} className="grid-item" data-bookmark={bookmark} data-selected={selected.has(id)}>
		<article
			id={id}
			className="grid-item"
			//// onFocus={e => {
			//// 	const selection = window.getSelection()
			//// 	selection?.removeAllRanges()
			//// }}
			//// // Enabling drag-paste
			//// onDragStart={e => {
			//// 	e.dataTransfer.setData("text/plain", "Hello, world!")
			//// 	// TODO
			//// }}
			onClick={e => {
				if (e.metaKey) {
					if (sidebar === "minimized") setSidebar("open")
					e.stopPropagation()
					e.preventDefault()
					addToSelected(id)
				} else {
					if (sidebar === "minimized") setSidebar("open")
					e.stopPropagation()
					e.preventDefault()
					clearSelected()
					addToSelected(id)
				}
			}}
			//// draggable
			tabIndex={0}
			data-selected={selected.has(id)}
		>
			<figure className="grid-item-frame">
				<Icon className="grid-item-frame-icon" />
			</figure>
			{showNames && <figcaption className="grid-item-name">{id}</figcaption>}
		</article>
	)
}
