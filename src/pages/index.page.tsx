import * as t from "../components/star-type"
import * as feather from "../data/react-feather"

import Link from "next/link"
import { memo, useContext, useMemo } from "react"
import { Hoverable } from "../components/hoverable"
import { PageTransition } from "../components/page-transition"
import { ResizableIcon } from "../components/resizable-icon"
import { manifest } from "../data/manifest"
import { convertToKebabCase } from "../lib/cases"
import { SearchContext, SelectedContext } from "../providers/state"

//// function Wbr({ children }: { children: string }) {
//// 	const ws = children.split(/(?=[A-Z])/)
////
//// 	return (
//// 		<>
//// 			{ws.map((w, index) => (
//// 				<Fragment key={w}>
//// 					{index > 0 && <wbr />}
//// 					{w}
//// 				</Fragment>
//// 			))}
//// 		</>
//// 	)
//// }

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
			<Hoverable pos="center" content={convertToKebabCase(name).toUpperCase()}>
				<button
					className="flex h-[var(--grid-size)] items-center justify-center"
					onClick={e => {
						setSelectedName(name)
						setSelectedSvgElement(document.getElementById(name)! as Element as SVGSVGElement)
					}}
					aria-label={`Icon ${name}`}
				>
					<ResizableIcon id={name} className="h-32 w-32 text-gray-800" icon={feather[name]} />
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
				aria-label={`Icon ${name}`}
			>
				<ResizableIcon id={name} className="h-32 w-32 text-gray-800" icon={feather[name]} />
			</button>
			<Link
				href={`/${convertToKebabCase(name).toLowerCase()}`}
				onClick={e => {
					setSelectedName(name)
					setSelectedSvgElement(document.getElementById(name)! as Element as SVGSVGElement)
				}}
				scroll={false}
			>
				<div className="group/name flex h-32 items-center justify-center truncate px-4">
					<t.TypeSansSmall className="truncate text-gray-600 group-hover/name:underline group-hover/name:decoration-gray-400">
						<Highlight indexes={indexes}>{name}</Highlight>
					</t.TypeSansSmall>
				</div>
			</Link>
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
		<PageTransition>
			<div className="grid grid-cols-[repeat(auto-fill,_minmax(var(--grid-size),_1fr))] px-[var(--gutter-x-1)]">
				{Object.keys(searchResults).map(name => (
					<GridItem key={name} name={name as keyof typeof manifest} indexes={searchResults[name as keyof typeof manifest]!} />
				))}
			</div>
		</PageTransition>
	)
}
