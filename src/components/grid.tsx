import { cx, Icon, toKebabCase } from "@/lib"
import { ClipboardContext, LayoutContext, SearchContext } from "@/state"
import { Suspense, useContext } from "react"

export function Grid() {
	const { compactMode, results } = useContext(SearchContext)!
	//// const { startIndex, endIndex, addOneOrMoreNames } = useContext(ClipboardContext)!

	//// useEffect(() => {
	//// 	if (startIndex === null || endIndex === null) return
	//// 	const start = Math.min(startIndex, endIndex)
	//// 	const end = Math.max(endIndex, startIndex) + 1
	//// 	//// console.log(results.slice(start, end).map(([names]) => names[0]))
	//// 	//// addOneOrMoreNames(...results.slice(start, end).map(([names]) => names[0]))
	//// }, [addOneOrMoreNames, endIndex, results, startIndex])

	return (
		<div className={cx("grid", compactMode && "is-compact-mode")}>
			<Suspense>
				{results.map(([names, Icon]) =>
					names.map((name, nameIndex) => (
						<GridItem key={name} nameIndex={nameIndex} name={name} icon={p => <Icon name={name} {...p} />} />
					)),
				)}
			</Suspense>
		</div>
	)
}

// TODO: Add caching? Or use text-transform?
function toNameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

export function GridItem({ nameIndex, name, icon: Icon }: { nameIndex: number; name: string; icon: Icon }) {
	const { sidebar, setSidebar } = useContext(LayoutContext)!
	const { compactMode } = useContext(SearchContext)!
	const {
		//// startIndex,
		//// setStartIndex,
		//// endIndex,
		//// setEndIndex,
		names,
		addOneOrMoreNames,
		removeOneOrMoreNames,
		removeAllNames,
	} = useContext(ClipboardContext)!

	// TODO
	const id = toNameCase(name)

	return (
		<article
			id={id}
			className="grid-item"
			// TODO: Change to onClickCapture?
			onClick={e => {
				if (e.metaKey) {
					if (sidebar === "minimized") setSidebar("open")
					if (names.has(id)) {
						removeOneOrMoreNames(id)
					} else {
						addOneOrMoreNames(id)
					}
				} else {
					if (sidebar === "minimized") setSidebar("open")
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
