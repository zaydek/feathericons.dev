import "./search-bar.sass"

import * as feather from "@icons/feather"

import { isMac } from "@/lib"
import { SearchContext } from "@/state"
import { useContext, useEffect, useRef, useState } from "react"

export function SearchBar() {
	const ref = useRef<HTMLInputElement | null>(null)
	const { search, setSearch } = useContext(SearchContext)!

	const [hasFocus, setHasFocus] = useState(false)

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((isMac() ? e.metaKey : e.ctrlKey) && e.key === "p") {
				e.preventDefault() // Printers 💀
				//// if (document.activeElement === ref.current) {
				//// 	ref.current!.blur()
				//// } else {
				//// 	ref.current!.focus()
				//// }
				ref.current!.focus()
			} else if (e.key === "Escape") {
				setSearch("")
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [setSearch])

	return (
		<div className="search-bar">
			<feather.Search strokeWidth={4} />
			<input
				ref={ref}
				type="text"
				// prettier-ignore
				placeholder={hasFocus
					? "Press esc to clear"
					: (isMac() ? "Press ⌘P to focus" : "Press Ctrl-P to focus")
				}
				value={search}
				onFocus={e => setHasFocus(true)}
				onBlur={e => setHasFocus(false)}
				onChange={e => setSearch(e.currentTarget.value)}
			/>
		</div>
	)
}
