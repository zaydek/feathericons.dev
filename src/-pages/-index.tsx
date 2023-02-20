import * as feather from "../data/react-feather"

import { memo, useContext, useMemo } from "react"
import { Anchor } from "../components/anchor"
import { TypographySmallSans } from "../components/bindings"
import { Hoverable } from "../components/hoverable"
import { ResizableIcon } from "../components/resizable-icon"
import { manifest } from "../data/manifest"
import { toKebabCase } from "../lib/cases"
import { SearchContext, SelectedContext } from "../state/state"

// TODO: Colors are off
function Highlight({ indexes, children }: { indexes: readonly [number, number] | null; children: string }) {
	if (indexes === null) {
		return <>{children}</>
	} else {
		return (
			<>
				{children.slice(0, indexes[0])}
				<span className="bg-opacity-60 bg-amber-200 text-amber-900">{children.slice(indexes[0], indexes[1])}</span>
				{children.slice(indexes[1])}
			</>
		)
	}
}

// TODO: It's not clear these need to be memoized, maybe if we add
// highlighting...
const MemoTextlessGridItem = memo(function TextlessGridItem({ name }: { name: keyof typeof manifest }) {
	const { setSelectedName, setSelectedSvgElement } = useContext(SelectedContext)!

	return (
		<div className="flex flex-col">
			<Hoverable pos="center" content={toKebabCase(name).toUpperCase()}>
				<button
					className="flex h-[var(--grid-size)] items-center justify-center"
					onClick={e => {
						setSelectedName(name)
						setSelectedSvgElement(document.getElementById(name)! as Element as SVGSVGElement)
					}}
					// prettier-ignore: aria-label
					aria-label={`Icon ${name}`}
				>
					<ResizableIcon id={name} className="h-32 w-32 text-gray-800" component={feather[name]} />
				</button>
			</Hoverable>
		</div>
	)
})

// TODO: It's not clear these need to be memoized, maybe if we add
// highlighting...
const MemoGridItem = memo(function GridItem({
	name,
	indexes,
}: /* prettier-ignore */ {
	name:    keyof typeof manifest
	indexes: readonly [number, number] | null
}) {
	const { setSelectedName, setSelectedSvgElement } = useContext(SelectedContext)!

	return (
		<div className="flex flex-col">
			<button
				className="flex h-[var(--grid-size)] items-center justify-center"
				onClick={e => {
					setSelectedName(name)
					setSelectedSvgElement(document.getElementById(name)! as Element as SVGSVGElement)
				}}
				// prettier-ignore: aria-label
				aria-label={`Icon ${name}`}
			>
				<ResizableIcon id={name} className="h-32 w-32 text-gray-800" component={feather[name]} />
			</button>
			<Anchor
				className="group/name flex h-32 items-center justify-center truncate"
				href={`/${toKebabCase(name).toLowerCase()}`}
				onClick={e => {
					setSelectedName(name)
					setSelectedSvgElement(document.getElementById(name)! as Element as SVGSVGElement)
				}}
			>
				<TypographySmallSans className="truncate text-gray-800 group-hover/name:underline group-hover/name:decoration-gray-400">
					<Highlight indexes={indexes}>{name}</Highlight>
				</TypographySmallSans>
			</Anchor>
		</div>
	)
})

export default function Component() {
	const { compactMode, searchResults } = useContext(SearchContext)!

	const GridItem = useMemo(() => {
		if (compactMode) {
			return MemoTextlessGridItem
		} else {
			return MemoGridItem
		}
	}, [compactMode])

	return (
		<div className="grid grid-cols-[repeat(auto-fill,_minmax(var(--grid-size),_1fr))] px-16 pb-64 lg:px-32 2xl:px-48">
			{Object.keys(searchResults).map(name => (
				<GridItem key={name} name={name as keyof typeof manifest} indexes={searchResults[name as keyof typeof manifest]!} />
			))}
		</div>
	)
}
