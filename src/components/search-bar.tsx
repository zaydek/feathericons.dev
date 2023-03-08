import * as Feather from "@icons/feather/tsx"

import { isMac } from "@/lib"
import { SearchContext, SelectionContext } from "@/state"
import { RefObject, useContext, useEffect, useRef } from "react"

////////////////////////////////////////////////////////////////////////////////

function useSideEffectFocusOnMount(ref: RefObject<HTMLInputElement | null>) {
	useEffect(() => {
		ref.current!.focus()
	}, [ref])
	return void 0
}

function useShortcutCtrlPFocus(ref: RefObject<HTMLInputElement | null>) {
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((isMac() ? e.metaKey : e.ctrlKey) && e.key === "p") {
				e.preventDefault() // Printers 💀
				ref.current!.focus()
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [ref])
	return void 0
}

export function SearchBar() {
	const ref = useRef<HTMLInputElement | null>(null)
	const { search, setSearch } = useContext(SearchContext)!
	const { clear } = useContext(SelectionContext)!

	useShortcutCtrlPFocus(ref)
	useSideEffectFocusOnMount(ref)

	return (
		<div className="search-bar" onClick={e => ref.current!.focus()}>
			<div className="sidebar-align-icon-frame">
				<Feather.Search className="search-bar-icon" strokeWidth={4} />
			</div>
			<input
				ref={ref}
				className="u-flex-1"
				type="text"
				placeholder={isMac() ? "⌘P to focus" : "Ctrl-P to focus"}
				value={search}
				onKeyDown={e => {
					if (e.key === "Escape") {
						e.preventDefault()
						setSearch("")
					}
				}}
				// prettier-ignore
				onChange={e => {
					window.scrollTo(0, 0) // Reset scroll
					clear()               // Clear selection
					setSearch(e.currentTarget.value)
				}}
			/>
		</div>
	)
}
