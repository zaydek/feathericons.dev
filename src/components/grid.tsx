import { cx, Icon, toKebabCase } from "@/lib"
import { ClipboardContext, LayoutContext, SearchContext } from "@/state"
import { Suspense, useContext } from "react"

export function Grid() {
	const { compactMode, results } = useContext(SearchContext)!

	return (
		<div className={cx("grid", compactMode && "is-compact-mode")}>
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
	const { compactMode } = useContext(SearchContext)!
	const { names, addOneOrMoreNames, removeOneOrMoreNames, removeAllNames } = useContext(ClipboardContext)!

	// TODO
	const id = toNameCase(name)

	return (
		<article
			id={id}
			className="grid-item"
			onClick={e => {
				if (e.metaKey) {
					// TODO
					if (sidebar === "minimized") setSidebar("open")
					//// e.stopPropagation()
					//// e.preventDefault()
					if (names.has(id)) {
						removeOneOrMoreNames(id)
					} else {
						addOneOrMoreNames(id)
					}
				} else {
					if (sidebar === "minimized") setSidebar("open")
					//// e.stopPropagation()
					//// e.preventDefault()
					removeAllNames()
					addOneOrMoreNames(id)
				}
			}}
			tabIndex={0}
			data-selected={names.has(id)}
		>
			<figure className="grid-item-frame">
				<Icon className="grid-item-icon" />
			</figure>
			{!compactMode && <figcaption className="grid-item-name">{id}</figcaption>}
		</article>
	)
}
