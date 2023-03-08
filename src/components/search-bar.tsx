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

function useSideEffectResetScrollAndClearSelectionOnSearch() {
	const { search } = useContext(SearchContext)!
	const { clear } = useContext(SelectionContext)!
	useEffect(() => {
		clear()
		window.scrollTo(0, 0)
	}, [clear, search])
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

function useShortcutEscResetSearch() {
	const { setSearch } = useContext(SearchContext)!
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (document.activeElement?.tagName !== "BODY") return
			if (e.key === "Escape") {
				setSearch("")
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [setSearch])
	return void 0
}

export function SearchBar() {
	const ref = useRef<HTMLInputElement | null>(null)
	const { search, setSearch } = useContext(SearchContext)!

	useShortcutEscResetSearch()
	useShortcutCtrlPFocus(ref)

	useSideEffectFocusOnMount(ref)
	useSideEffectResetScrollAndClearSelectionOnSearch()

	//// // Clear on search
	//// const onceRef = useRef(false)
	//// useEffect(() => {
	//// 	if (!onceRef.current) {
	//// 		onceRef.current = true
	//// 		return
	//// 	}
	//// 	removeAllNames()
	//// }, [removeAllNames, search])

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
				onChange={e => setSearch(e.currentTarget.value)}
			/>
		</div>
	)
}
