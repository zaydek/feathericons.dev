import React from "react"

import { formatSvg, transformJsx, transformSvg, transformTsx } from "../scripts/utils"
import { getKeys, isMac, toKebabCase, toTitleCase, useVisibleDocumentTitle } from "./lib"
import { ClipboardContext, RangeContext, SearchContext } from "./providers"

////////////////////////////////////////////////////////////////////////////////

function useResetSearchAndNamesOnIconsetChanges() {
	const { setSearch, iconset } = React.useContext(SearchContext)!
	const { removeAllNames } = React.useContext(ClipboardContext)!
	const onceRef = React.useRef(false)
	React.useEffect(() => {
		void iconset
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		setSearch("")
		removeAllNames()
	}, [iconset, removeAllNames, setSearch])
	return void 0
}

function useSelectNamesFromIndexes() {
	const { searchResultsLoading, searchResults } = React.useContext(SearchContext)!
	const { namesStart, namesEnd, addNames } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
		if (searchResultsLoading) return
		if (searchResults === null || searchResults.length === 0) return
		if (namesStart === null || namesEnd === null) return
		const min = Math.min(namesStart, namesEnd)
		const max = Math.max(namesStart, namesEnd)
		addNames(...searchResults.slice(min, max + 1).map(([name]) => name))
	}, [addNames, namesEnd, namesStart, searchResults, searchResultsLoading])
	return void 0
}

function useSearchResultsCountVisibleTitle() {
	const { searchResultsLoading, searchResults } = React.useContext(SearchContext)!
	const count = (searchResults ?? []).length
	// prettier-ignore
	useVisibleDocumentTitle([
		searchResultsLoading ? "Loading…" : `${count} icon${count === 1 ? "" : "s"}`,
		"Feather icons",
	])
	return void 0
}

function useSetClipboardOnIconsetChanges() {
	const { iconset, searchResultsLoading, searchResults } = React.useContext(SearchContext)!
	const { format, names, setClipboard } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
		if (searchResultsLoading) return
		if (searchResults === null || searchResults.length === 0) return
		//// let clipboard = ""
		const clipboard = new Map<string, string>()
		const { keys, more } = getKeys(names, { limit: 20 })
		for (const [index, name] of keys.entries()) {
			//// if (index > 0) {
			//// 	clipboard += "\n\n"
			//// }
			const search = toKebabCase(name).toLowerCase()
			const svg = document.getElementById(name)?.querySelector("svg")!
			if (format === "svg") {
				clipboard.set(
					name,
					transformSvg(formatSvg(svg, { strictJsx: false }), {
						banner: `<!-- https://feathericons.dev/?search=${search}&iconset=${iconset} -->`,
					}),
				)
			} else if (format === "jsx") {
				clipboard.set(
					name,
					transformJsx(toTitleCase(name), formatSvg(svg, { strictJsx: false }), {
						banner: `// https://feathericons.dev/?search=${search}&iconset=${iconset}&format=jsx`,
					}),
				)
			} else if (format === "tsx") {
				let str = ""
				if (index === 0) str = 'import { JSX } from "solid-js";\n\n'
				str += transformTsx(toTitleCase(name), formatSvg(svg, { strictJsx: false }), {
					banner: `// https://feathericons.dev/?search=${search}&iconset=${iconset}&format=tsx`,
				})
				clipboard.set(name, str)
			} else if (format === "strict-jsx") {
				clipboard.set(
					name,
					transformJsx(toTitleCase(name), formatSvg(svg, { strictJsx: true }), {
						banner: `// https://feathericons.dev/?search=${search}&iconset=${iconset}&format=strict-jsx`,
					}),
				)
			} else if (format === "strict-tsx") {
				clipboard.set(
					name,
					transformTsx(toTitleCase(name), formatSvg(svg, { strictJsx: true }), {
						banner: `// https://feathericons.dev/?search=${search}&iconset=${iconset}&format=strict-tsx`,
					}),
				)
			}
		}
		// TODO
		//// if (more) {
		//// 	if (format === "svg") {
		//// 		clipboard += `\n\n<!-- ... -->`
		//// 	} else {
		//// 		clipboard += `\n\n// ...`
		//// 	}
		//// }
		setClipboard(clipboard)
	}, [format, iconset, names, searchResults, searchResultsLoading, setClipboard])
	return void 0
}

function useSetCssVars() {
	const { size, strokeWidth } = React.useContext(RangeContext)!
	React.useEffect(() => {
		document.body.style.setProperty("--size", "" + size)
	}, [size])
	React.useEffect(() => {
		document.body.style.setProperty("--stroke-width", "" + strokeWidth)
	}, [strokeWidth])
	return void 0
}

// See main-grid.sass
function useSetIconsetAttribute() {
	const { iconset } = React.useContext(SearchContext)!
	React.useEffect(() => {
		document.documentElement.setAttribute("data-iconset", iconset)
	}, [iconset])
	return void 0
}

////////////////////////////////////////////////////////////////////////////////

function useShortcutCtrlAToSelectAll() {
	const { searchResultsLoading, searchResults } = React.useContext(SearchContext)!
	const { setNamesStart, setNamesEnd } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
		if (searchResultsLoading === null) return
		if (searchResults === null || searchResults.length === 0) return
		function handleKeyDown(e: KeyboardEvent) {
			if (document.activeElement?.matches('.search-bar input[type="text"]')) return
			if ((isMac() && e.metaKey && e.key === "a") || (!isMac() && e.ctrlKey && e.key === "a")) {
				e.preventDefault()
				setNamesStart(0)
				setNamesEnd(Number.MAX_SAFE_INTEGER)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [searchResults, searchResultsLoading, setNamesEnd, setNamesStart])
	return void 0
}

function useShortcutEscToRemoveNamesStartAndEnd() {
	const { setNamesStart, setNamesEnd, removeAllNames } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (document.activeElement?.matches('.search-bar input[type="text"]')) return
			if (e.key === "Escape") {
				removeAllNames()
				setNamesStart(null)
				setNamesEnd(null)
				if (document.activeElement instanceof HTMLElement) {
					document.activeElement.blur()
				}
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [removeAllNames, setNamesEnd, setNamesStart])
	return void 0
}

////////////////////////////////////////////////////////////////////////////////

export function Effects() {
	useSearchResultsCountVisibleTitle()
	useResetSearchAndNamesOnIconsetChanges()
	useSelectNamesFromIndexes()
	useSetClipboardOnIconsetChanges()
	useSetCssVars()
	useSetIconsetAttribute()

	useShortcutCtrlAToSelectAll()
	useShortcutEscToRemoveNamesStartAndEnd()

	return <></>
}
