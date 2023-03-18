import React from "react"
import { formatSvg, transformJsx, transformSvg, transformTsx } from "scripts/utils"

import { getKeys, isMac, toKebabCase, toTitleCase, useVisibleDocumentTitle } from "./lib"
import { ClipboardContext, RangeContext, SearchContext } from "./providers"

////////////////////////////////////////////////////////////////////////////////

function useResetSearchAndSelectionOnIconset() {
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

function useSetClipboardOnIconset() {
	const { iconset, loading } = React.useContext(SearchContext)!
	const { format, names, setClipboard } = React.useContext(ClipboardContext)!
	// TODO: Move to app.tsx or effetcs.tsx
	React.useEffect(() => {
		if (loading) return
		//// if (names.size === 0) {
		//// 	setClipboard("")
		//// 	return
		//// }
		let clipboard = ""
		const { keys, more } = getKeys(names, { limit: 20 })
		for (const [index, name] of keys.entries()) {
			if (index > 0) {
				clipboard += "\n\n"
			}
			const search = toKebabCase(name).toLowerCase()
			const svg = document.getElementById(name)!.querySelector("svg")!
			if (format === "svg") {
				clipboard += transformSvg(formatSvg(svg, { strictJsx: false }), {
					banner: `<!-- https://feathericons.dev/?search=${search}&iconset=${iconset} -->`,
				})
			} else if (format === "jsx") {
				clipboard += transformJsx(toTitleCase(name), formatSvg(svg, { strictJsx: false }), {
					banner: `// https://feathericons.dev/?search=${search}&iconset=${iconset}&format=jsx`,
				})
			} else if (format === "tsx") {
				if (index === 0) clipboard += 'import { JSX } from "solid-js";\n\n'
				clipboard += transformTsx(toTitleCase(name), formatSvg(svg, { strictJsx: false }), {
					banner: `// https://feathericons.dev/?search=${search}&iconset=${iconset}&format=tsx`,
				})
			} else if (format === "strict-jsx") {
				clipboard += transformJsx(toTitleCase(name), formatSvg(svg, { strictJsx: true }), {
					banner: `// https://feathericons.dev/?search=${search}&iconset=${iconset}&format=strict-jsx`,
				})
			} else if (format === "strict-tsx") {
				clipboard += transformTsx(toTitleCase(name), formatSvg(svg, { strictJsx: true }), {
					banner: `// https://feathericons.dev/?search=${search}&iconset=${iconset}&format=strict-tsx`,
				})
			}
		}
		if (more) {
			if (format === "svg") {
				clipboard += `\n\n<!-- ... -->`
			} else {
				clipboard += `\n\n// ...`
			}
		}
		setClipboard(clipboard)
	}, [format, iconset, names])
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

function useVisibleDocumentTitle() {
	const { loading, searchResults } = React.useContext(SearchContext)!
	const count = (searchResults ?? []).length
	// prettier-ignore
	useVisibleDocumentTitle([
		loading ? "Loading…" : `${count} icon${count === 1 ? "" : "s"}`,
		"Feather icons",
	])
	return void 0
}

////////////////////////////////////////////////////////////////////////////////

function useShortcutCtrlAToSelectAll() {
	const { searchResults } = React.useContext(SearchContext)!
	const { setNamesStart, setNamesEnd } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
		if (searchResults === null) return
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
	}, [searchResults, setNamesEnd, setNamesStart])
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
	useResetSearchAndSelectionOnIconset()
	useSelectNamesFromIndexes()
	useSetClipboardOnIconset()
	useSetCssVars()
	useSetIconsetAttribute()
	useVisibleDocumentTitle()

	useShortcutCtrlAToSelectAll()
	useShortcutEscToRemoveNamesStartAndEnd()

	return <></>
}
