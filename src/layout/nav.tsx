import * as feather from "../data/react-feather"

import { useContext, useRef } from "react"
import { Accessible } from "../aria/a11y"
import { DynamicIcon, Icon } from "../components/dynamic-icon"
import { Hoverable } from "../components/hoverable"
import { SearchContext } from "../providers/state"

function NavButton({ icon, ...props }: { icon: Icon } & Accessible<JSX.IntrinsicElements["button"]>) {
	return (
		<button className="flex h-64 w-64 items-center justify-center" {...props}>
			<DynamicIcon className="h-24 w-24 text-gray-800" icon={icon} />
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
					// prettier-ignore: aria-label
					aria-label="Search Feather"
				/>
			</Hoverable>
			<input
				ref={ref}
				className="grow focus-visible:outline-none"
				type="text"
				value={search}
				onChange={e => setSearch(e.currentTarget.value)}
				// eslint-disable-next-line jsx-a11y/no-autofocus
				autoFocus
				// prettier-ignore: aria-label
				aria-label="Search Feather"
			/>
			<Hoverable pos="end" content="NO-NAME MODE">
				<NavButton
					icon={feather.MoreHorizontal}
					onClick={e => {
						setCompactMode(curr => !curr)
					}}
					// prettier-ignore: aria-label
					aria-label="Toggle no-name mode"
				/>
			</Hoverable>
		</div>
	)
}
