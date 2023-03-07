import { cx, Icon, toKebabCase } from "@/lib"
import { ClipboardContext, LayoutContext, SearchContext } from "@/state"
import { Suspense, useContext } from "react"

const BITS = 16
const MAX_INDEX = (1 << BITS) - 1

function encodeIndexes([a, b]: readonly [number, number]): number {
	const encoded = (a << BITS) | (b & MAX_INDEX)
	return encoded
}

function decodeIndexes(encoded: number): readonly [number, number] {
	const a = encoded >> BITS
	const b = encoded & MAX_INDEX
	return [a, b] as const
}

export function Grid() {
	const { preferNames: compactMode, results } = useContext(SearchContext)!
	const { startIndexes, endIndexes, addNames: addOneOrMoreNames } = useContext(ClipboardContext)!

	//// useEffect(() => {
	//// 	if (startIndexes === null || endIndexes === null) return
	//// 	const start = encodeIndexes(startIndexes)
	//// 	const end = encodeIndexes(endIndexes)
	//// 	let minIndexes: readonly [number, number]
	//// 	let maxIndexes: readonly [number, number]
	//// 	if (start < end) {
	//// 		minIndexes = startIndexes
	//// 		maxIndexes = endIndexes
	//// 	} else {
	//// 		minIndexes = endIndexes
	//// 		maxIndexes = startIndexes
	//// 	}
	//// 	console.log(JSON.stringify({ minIndexes, maxIndexes }))
	//// 	//// console.log(results.slice(start, end).map(([names]) => names[0]))
	//// 	//// addOneOrMoreNames(...results.slice(start, end).map(([names]) => names[0]))
	//// }, [addOneOrMoreNames, endIndexes, results, startIndexes])

	return (
		<div className={cx("grid", compactMode && "is-compact-mode")}>
			<Suspense>
				{results.map(([names, Icon], indexA) =>
					names.map((name, indexB) => (
						<GridItem key={name} indexes={[indexA, indexB]} name={name} icon={p => <Icon name={name} {...p} />} />
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

export function GridItem({
	indexes,
	name,
	icon: Icon,
}: {
	indexes: readonly [number, number]
	name: string
	icon: Icon
}) {
	const { sidebar, setSidebar } = useContext(LayoutContext)!
	const { preferNames: compactMode } = useContext(SearchContext)!
	const {
		startIndexes,
		setStartIndexes,
		endIndexes,
		setEndIndexes,
		names,
		addNames: addOneOrMoreNames,
		removeNames: removeOneOrMoreNames,
		clearNames: removeAllNames,
	} = useContext(ClipboardContext)!

	// TODO
	const id = toNameCase(name)

	return (
		<article
			id={id}
			className="grid-item"
			// TODO: Change to onClickCapture?
			onClick={e => {
				if (e.shiftKey) {
					setStartIndexes(indexes)
				} else {
					setEndIndexes(indexes)
				}

				//// if (e.metaKey) {
				//// 	if (sidebar === "minimized") setSidebar("open")
				//// 	if (names.has(id)) {
				//// 		removeOneOrMoreNames(id)
				//// 	} else {
				//// 		addOneOrMoreNames(id)
				//// 	}
				//// } else {
				//// 	if (sidebar === "minimized") setSidebar("open")
				//// 	removeAllNames()
				//// 	addOneOrMoreNames(id)
				//// }
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
