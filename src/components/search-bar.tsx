import "./search-bar.sass"

import * as feather from "@icons/feather"

import { isMac } from "@/lib"
import { SearchContext } from "@/state"
import { Dispatch, RefObject, SetStateAction, useContext, useEffect, useRef, useState } from "react"

////////////////////////////////////////////////////////////////////////////////

function useFocusOnMount({ ref }: { ref: RefObject<HTMLInputElement | null> }) {
	useEffect(() => {
		ref.current!.focus()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
	return void 0
}

function useResetScrollOnSearch({ search }: { search: string }) {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [search])
	return void 0
}

function useFocusShortcut({ ref, setSearch }: { ref: RefObject<HTMLInputElement | null>; setSearch: Dispatch<SetStateAction<string>> }) {
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((isMac() ? e.metaKey : e.ctrlKey) && e.key === "p") {
				e.preventDefault() // Printers 💀
				ref.current!.focus()
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [setSearch]) // eslint-disable-line react-hooks/exhaustive-deps
	return void 0
}

function useClearShortcut({ setSearch }: { setSearch: Dispatch<SetStateAction<string>> }) {
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setSearch("")
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [setSearch])
	return void 0
}

////////////////////////////////////////////////////////////////////////////////

export function SearchBar() {
	const ref = useRef<HTMLInputElement | null>(null)
	const { search, setSearch } = useContext(SearchContext)!

	const [focus, setFocus] = useState(false)

	useFocusOnMount({ ref })
	useResetScrollOnSearch({ search })
	useFocusShortcut({ ref, setSearch })
	useClearShortcut({ setSearch })

	return (
		<div className="search-bar" onClick={e => ref.current!.focus()}>
			<feather.Search strokeWidth={4} />
			<input
				ref={ref}
				type="text"
				// prettier-ignore
				placeholder={focus
					// TODO
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
