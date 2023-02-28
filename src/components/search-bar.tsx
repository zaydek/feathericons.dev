import "./search-bar.sass"

import * as feather from "@icons/feather"

import { isMac } from "@/lib"
import { SearchContext } from "@/providers"
import { useContext, useEffect, useRef, useState } from "react"

export function SearchBar() {
	const ref = useRef<HTMLInputElement | null>(null)
	const { search, setSearch } = useContext(SearchContext)!

	const [focus, setFocus] = useState(false)

	useEffect(() => {
		window.scrollTo(0, 0)
		ref.current!.focus()
	}, [])

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((isMac() ? e.metaKey : e.ctrlKey) && e.key === "p") {
				e.preventDefault() // Printers 💀
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
				placeholder={focus
					? "Press esc to clear"
					: (isMac() ? "Press ⌘P to focus" : "Press Ctrl-P to focus")
				}
				value={search}
				onFocus={e => setFocus(true)}
				onBlur={e => setFocus(false)}
				onChange={e => setSearch(e.currentTarget.value)}
			/>
		</div>
	)
}
