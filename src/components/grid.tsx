import { cx, Icon, toKebabCase } from "@/lib"
import { ClipboardContext, LayoutContext, SearchContext } from "@/state"
import { Suspense, useContext } from "react"

export function Grid() {
	const { showNames, results } = useContext(SearchContext)!

	return (
		<div className={cx("grid", showNames && "is-show-names")}>
			<Suspense>
				{results.map(([names, Icon]) =>
					names.map(name => <GridItem key={name} name={name} icon={p => <Icon name={name} {...p} />} />),
				)}
			</Suspense>
		</div>
	)
}

// TODO: Add caching? Or use text-transform?
function toNameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

export function GridItem({ name, icon: Icon }: { name: string; icon: Icon }) {
	const { sidebar, setSidebar } = useContext(LayoutContext)!
	const { showNames } = useContext(SearchContext)!
	const { selected, addToSelected, clearSelected } = useContext(ClipboardContext)!

	const id = toNameCase(name)

	return (
		<article
			id={id}
			className="grid-item"
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
			tabIndex={0}
			data-selected={selected.has(id)}
		>
			<figure className="grid-item-frame">
				<Icon className="grid-item-icon" />
			</figure>
			{showNames && <figcaption className="grid-item-name">{id}</figcaption>}
		</article>
	)
}
