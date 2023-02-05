import * as feather from "../data/react-feather"

import { useContext, useRef } from "react"
import { DynamicIcon, SvgComponent } from "../components/dynamic-icon"
import { Hoverable } from "../components/hoverable"
import { SearchContext } from "../providers/state"

function NavButton({ icon, ...props }: { icon: SvgComponent } & JSX.IntrinsicElements["button"] & { "aria-label": string }) {
	return (
		<button className="flex h-64 w-64 items-center justify-center" {...props}>
			<DynamicIcon className="h-24 w-24 text-gray-700" icon={icon} />
		</button>
	)
}

export function Nav() {
	const { setCompactMode, search, setSearch } = useContext(SearchContext)!

	const ref = useRef<HTMLInputElement | null>(null)

	return (
		<div className="flex h-64 rounded-1e3 bg-white shadow-[var(--shadow-2)]">
			<Hoverable pos="start" content="SEARCH FEATHER">
				<NavButton
					icon={feather.Search}
					onClick={e => {
						ref.current?.focus()
					}}
					// prettier-ignore
					aria-label="Search Feather"
				/>
			</Hoverable>
			{/* eslint-disable-next-line jsx-a11y/no-autofocus */}
			<input ref={ref} className="grow focus-visible:outline-none" type="text" value={search} onChange={e => setSearch(e.currentTarget.value)} autoFocus />
			<Hoverable pos="end" content="NO-NAME MODE">
				<NavButton
					icon={feather.MoreHorizontal}
					onClick={e => {
						setCompactMode(curr => !curr)
					}}
					// prettier-ignore
					aria-label="Toggle compact mode"
				/>
			</Hoverable>
		</div>
	)
}
