import * as Feather from "@icons/feather/tsx"

import { isMac } from "@/lib"
import { ClipboardContext, SearchContext } from "@/state"
import { RefObject, useContext, useEffect, useRef } from "react"

////////////////////////////////////////////////////////////////////////////////

function useSideEffectFocusOnMount(ref: RefObject<HTMLInputElement | null>) {
	useEffect(() => {
		ref.current!.focus()
	}, [ref])
	return void 0
}

function useShortcutCtrlPToFocusSearchBar(ref: RefObject<HTMLInputElement | null>) {
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((isMac() ? e.metaKey : e.ctrlKey) && e.key === "p") {
				// Call preventDefault() to prevent the browser from opening the print dialog
				e.preventDefault()
				ref.current!.focus()
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [ref])
	return void 0
}

export function SearchBar() {
	const { search, setSearch } = useContext(SearchContext)!
	const { clearSelectedNames } = useContext(ClipboardContext)!

	const ref = useRef<HTMLInputElement | null>(null)

	useShortcutCtrlPToFocusSearchBar(ref)
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
						setSearch("")
					}
				}}
				// prettier-ignore
				onChange={e => {
					window.scrollTo(0, 0) // Reset scroll
					clearSelectedNames()               // Clear selection
					setSearch(e.currentTarget.value)
				}}
			/>
		</div>
	)
}
