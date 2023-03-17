import React from "react"

import * as feather from "@icons/feather/tsx"

import { isMac, useStrictlyMount } from "@/lib"
import { ClipboardContext, SearchContext } from "@/providers"

////////////////////////////////////////////////////////////////////////////////

function useEffectFocusAndSelectOnMount(ref: React.RefObject<HTMLInputElement | null>) {
	const { search } = React.useContext(SearchContext)!
	useStrictlyMount(() => {
		ref.current!.focus()
		if (search !== "") {
			ref.current!.select()
		}
	})
	return void 0
}

function useShortcutCtrlPOrKToToggleSearch(ref: React.RefObject<HTMLInputElement | null>) {
	useStrictlyMount(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((isMac() ? e.metaKey : e.ctrlKey) && (e.key === "p" || e.key === "k")) {
				e.preventDefault() // 🖨️
				if (document.activeElement === ref.current) {
					ref.current!.blur()
				} else {
					ref.current!.focus()
				}
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	})
	return void 0
}

export function SearchBar() {
	const { search, setSearch } = React.useContext(SearchContext)!
	const { removeAllNames } = React.useContext(ClipboardContext)!

	const ref = React.useRef<HTMLInputElement | null>(null)

	useShortcutCtrlPOrKToToggleSearch(ref)
	useEffectFocusAndSelectOnMount(ref)

	return (
		<div className="search-bar" onClick={e => ref.current!.focus()}>
			<div className="widget-align-icon-frame">
				<feather.Search className="search-bar-icon" strokeWidth={3} />
			</div>
			<input
				ref={ref}
				type="text"
				//// placeholder={isMac() ? "⌘P to focus" : "Ctrl-P to focus"}
				//// placeholder="Search"
				value={search}
				onKeyDown={e => {
					if (e.key === "Escape") {
						setSearch("")
					}
				}}
				// prettier-ignore
				onChange={e => {
					window.scrollTo(0, 0) // Reset scroll
					removeAllNames()               // Clear selection
					setSearch(e.currentTarget.value)
				}}
			/>
		</div>
	)
}
