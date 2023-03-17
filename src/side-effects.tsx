import React from "react"

import { isMac, useVisibleDocumentTitle } from "@/lib"
import { ClipboardContext, RangeContext, SearchContext } from "@/providers"

function useShortcutCtrlAToSelectAll() {
	const { searchResults } = React.useContext(SearchContext)!
	const { setNamesStart, setNamesEnd } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
		if (searchResults === null) return
		function handleKeyDown(e: KeyboardEvent) {
			if (e.target instanceof Element && e.target.tagName === "INPUT") return
			if ((isMac() && e.metaKey && e.key === "a") || (!isMac() && e.ctrlKey && e.key === "a")) {
				e.preventDefault()
				setNamesStart(0)
				setNamesEnd(Number.MAX_SAFE_INTEGER)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [searchResults, setNamesEnd, setNamesStart])
	return void 0
}

function useShortcutEscToRemoveNamesStartAndEnd() {
	const { setNamesStart, setNamesEnd, removeAllNames } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (document.activeElement?.tagName !== "BODY") return
			if (e.key === "Escape") {
				removeAllNames()
				setNamesStart(null)
				setNamesEnd(null)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [removeAllNames, setNamesEnd, setNamesStart])
	return void 0
}

function useSideEffectRemoveAllNamesOnChange() {
	const { iconset } = React.useContext(SearchContext)!
	const { removeAllNames } = React.useContext(ClipboardContext)!
	const onceRef = React.useRef(false)
	React.useEffect(() => {
		void iconset
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		removeAllNames()
	}, [iconset, removeAllNames])
	return void 0
}

function useSideEffectSelectNamesFromIndexes() {
	const { searchResults } = React.useContext(SearchContext)!
	const { namesStart, namesEnd, addNames } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
		if (searchResults === null) return
		if (namesStart === null || namesEnd === null) return
		const min = Math.min(namesStart, namesEnd)
		const max = Math.max(namesStart, namesEnd)
		addNames(...searchResults.slice(min, max + 1).map(([name]) => name))
	}, [addNames, namesEnd, namesStart, searchResults])
	return void 0
}

function useSideEffectSetCssVars() {
	const { size, strokeWidth } = React.useContext(RangeContext)!
	React.useEffect(() => {
		document.body.style.setProperty("--size", "" + size)
	}, [size])
	React.useEffect(() => {
		document.body.style.setProperty("--stroke-width", "" + strokeWidth)
	}, [strokeWidth])
	return void 0
}

function useSideEffectVisibleDocumentTitle() {
	const { loading, searchResults } = React.useContext(SearchContext)!
	const count = (searchResults ?? []).length
	// prettier-ignore
	useVisibleDocumentTitle([
		loading ? "Loading…" : `${count} icon${count === 1 ? "" : "s"}`,
		"Feather icons",
	])
	return void 0
}

export function SideEffects() {
	useShortcutCtrlAToSelectAll()
	useShortcutEscToRemoveNamesStartAndEnd()
	useSideEffectRemoveAllNamesOnChange()
	useSideEffectSelectNamesFromIndexes()
	useSideEffectSetCssVars()
	useSideEffectVisibleDocumentTitle()
	return <></>
}
