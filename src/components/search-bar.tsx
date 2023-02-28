import "./search-bar.sass"

import * as feather from "@icons/feather"

import { isMac } from "@/lib"
import { SearchContext } from "@/state"
import { useContext, useEffect, useRef } from "react"

export function SearchBar() {
	const ref = useRef<HTMLInputElement | null>(null)
	const { search, setSearch } = useContext(SearchContext)!

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((isMac() ? e.metaKey : e.ctrlKey) && e.key === "p") {
				e.preventDefault() // Printers 💀
				ref.current!.focus()
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [])

	return (
		<div className="search-bar">
			<feather.Search strokeWidth={4} />
			<input
				ref={ref}
				type="text"
				placeholder={isMac() ? "Press ⌘P to Focus" : "Press Ctrl-P to Focus"}
				value={search}
				onChange={e => setSearch(e.currentTarget.value)}
			/>
		</div>
	)
}
