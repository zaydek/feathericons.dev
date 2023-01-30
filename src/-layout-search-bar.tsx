import * as feather from "./data/react-feather"

import { useContext, useRef } from "react"
import { MouseTooltip } from "./components/mouse-tooltip"
import { Icon, IconComponent } from "./lib/react/icon"
import { SearchContext } from "./providers/state"

function SearchBarButton({ icon, ...props }: { icon: IconComponent } & JSX.IntrinsicElements["button"]) {
	return (
		<button className="flex h-64 w-64 items-center justify-center" {...props}>
			<Icon className="h-24 w-24 text-gray-400" icon={icon} />
		</button>
	)
}

export function SearchBar() {
	const { setCompactMode, search, setSearch } = useContext(SearchContext)!

	const ref = useRef<HTMLInputElement | null>(null)

	return (
		<div className="flex h-64 rounded-1e3 bg-[#fff] shadow-[var(--shadow-2)] [&_>_:nth-child(2)]:grow">
			<MouseTooltip pos="start" content={<>SEARCH FEATHER</>}>
				<SearchBarButton
					icon={feather.Search}
					onClick={e => {
						ref.current?.focus()
					}}
					aria-label="Search Feather"
				/>
			</MouseTooltip>
			<input ref={ref} type="text" value={search} onChange={e => setSearch(e.currentTarget.value)} autoFocus />
			<MouseTooltip pos="end" content={<>COMPACT MODE</>}>
				<SearchBarButton
					icon={feather.MoreHorizontal}
					onClick={e => {
						setCompactMode(curr => !curr)
					}}
					aria-label="Toggle compact mode"
				/>
			</MouseTooltip>
		</div>
	)
}
