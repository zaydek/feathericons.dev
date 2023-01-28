import * as feather from "./data/react-feather"

import Link from "next/link"
import { memo, useContext, useMemo } from "react"
import { manifest } from "./data/react-feather-manifest"
import { HoverTip } from "./hover-tooltip"
import { toKebabCase } from "./lib/cases"
import { Icon } from "./lib/react/icon"
import { RouteTransition } from "./route-transition"
import { SearchContext, SelectedContext } from "./state"
import { TypographySmallSans } from "./typography"

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
				<span className="bg-amber-200 bg-opacity-60 text-amber-900">{children.slice(indexes[0], indexes[1])}</span>
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
			<HoverTip pos="center" content={<>{toKebabCase(name).toUpperCase()}</>}>
				<button
					className="flex h-[var(--grid-size)] items-center justify-center"
					onClick={e => {
						setSelectedName(name)
						setSelectedSvgElement(document.getElementById(name)! as Element as SVGSVGElement)
					}}
					aria-label={`Icon ${name}`}
				>
					<Icon
						id={name}
						className="h-32 w-32 text-gray-800
							[stroke-width:_var(--stroke-width)] [transform:_scale(var(--scale))]"
						icon={feather[name]}
					/>
				</button>
			</HoverTip>
		</div>
	)
})

// TODO: It's not clear these need to be memoized, maybe if we add
// highlighting...
const MemoGridItem = memo(function GridItem({ name, indexes }: { name: keyof typeof manifest; indexes: readonly [number, number] | null }) {
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
				<Icon
					id={name}
					className="h-32 w-32 text-gray-800
						[stroke-width:_var(--stroke-width)] [transform:_scale(var(--scale))]"
					icon={feather[name]}
				/>
			</button>
			<Link
				href={`/${toKebabCase(name)}`}
				onClick={e => {
					setSelectedName(name)
					setSelectedSvgElement(document.getElementById(name)! as Element as SVGSVGElement)
				}}
			>
				<div className="group/name flex h-16 items-center justify-center truncate px-4">
					<TypographySmallSans className="truncate text-gray-800 group-hover/name:underline group-hover/name:decoration-gray-400">
						<Highlight indexes={indexes}>{name}</Highlight>
					</TypographySmallSans>
				</div>
			</Link>
		</div>
	)
})

export function SearchResultsContents() {
	const { compactMode, searchResults } = useContext(SearchContext)!

	const GridItem = useMemo(() => {
		if (compactMode) {
			return MemoTextlessGridItem
		} else {
			return MemoGridItem
		}
	}, [compactMode])

	return (
		<RouteTransition>
			<div className="grid grid-cols-[repeat(auto-fill,_minmax(var(--grid-size),_1fr))]">
				{Object.keys(searchResults).map(name => (
					<GridItem key={name} name={name as keyof typeof manifest} indexes={searchResults[name as keyof typeof manifest]!} />
				))}
			</div>
		</RouteTransition>
	)
}
