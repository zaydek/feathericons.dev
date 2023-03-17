import React from "react"

import { clamp, getKeys, IconComponent, toCanonCase, toKebabCase, toTitleCase, useParam, useParamBoolean } from "@/lib"
import { formatSvg, transformJsx, transformSvg, transformTsx } from "@scripts/utils"
import { cache, queryCache as queryIconset } from "./cache"
import {
	FormatValue,
	IconsetValue,
	ICONSET_VALUE_DEFAULT,
	MONOCHROME_DEFAULT,
	SIZE_DEFAULT,
	SIZE_MAX,
	SIZE_MIN,
	STROKE_DEFAULT,
	STROKE_MAX,
	STROKE_MIN,
} from "./constants"

////////////////////////////////////////////////////////////////////////////////

// prettier-ignore
export const SearchContext = React.createContext<{
	search:         string
	setSearch:      React.Dispatch<React.SetStateAction<string>>
	iconset:        IconsetValue
	setIconset:     React.Dispatch<React.SetStateAction<IconsetValue>>
	monochrome:     boolean
	setMonochrome:  React.Dispatch<React.SetStateAction<boolean>>
	loading:        boolean
	searchResults:  [string, IconComponent][] | null
} | null>(null)

// prettier-ignore
export const RangeContext = React.createContext<{
	size:           number
	setSize:        React.Dispatch<React.SetStateAction<number>>
	strokeWidth:    number
	setStrokeWidth: React.Dispatch<React.SetStateAction<number>>
} | null>(null)

// prettier-ignore
export const ClipboardContext = React.createContext<{
	format:         FormatValue
	setFormatAs:    React.Dispatch<React.SetStateAction<FormatValue>>
	names:          Set<string>
	namesStart:     number | null
	setNamesStart:  React.Dispatch<React.SetStateAction<number | null>>
	namesEnd:       number | null
	setNamesEnd:    React.Dispatch<React.SetStateAction<number | null>>
	addNames:       (...names: string[]) => void
	removeNames:    (...names: string[]) => void
	removeAllNames: () => void
	clipboard:      string
} | null>(null)

////////////////////////////////////////////////////////////////////////////////

// TODO
//// export function canonicalize(str: string) {
//// 	return str
//// 		.replace(/[^\w\s-]/g, "") // Remove bad characters
//// 		.replace(/\s+/g, " ")     // Remove excess spaces
//// 		.trim()                   // Trim start and end spaces
//// }

export function AppStateProvider({ children }: React.PropsWithChildren) {
	const [search, setSearch] = useParam({
		key: "search",
		initialValue: "",
		parser: value => value,
		serializer: toCanonCase,
	})

	const [iconset, setIconset] = useParam<IconsetValue>({
		key: "iconset",
		initialValue: ICONSET_VALUE_DEFAULT,
		parser: value => {
			switch (value) {
				case "feather":
				case "brands":
				case "payments":
				case "payments-filled":
					return value
			}
			return ICONSET_VALUE_DEFAULT
		},
	})

	const [monochrome, setMonochrome] = useParamBoolean({ key: "monochrome", initialValue: MONOCHROME_DEFAULT })

	const [loading, setLoading] = React.useState(false)
	const [_results, _setResults] = React.useState<[string, IconComponent][] | null>(null)

	// TODO: Search tags
	const searchResults = React.useMemo(() => {
		if (_results === null) return null
		const canon = toCanonCase(search)
		if (canon === "") {
			return _results
		} else {
			return _results?.filter(([name]) => toKebabCase(name).toLowerCase().includes(canon))
		}
	}, [_results, search])

	React.useEffect(() => {
		async function fn() {
			if (cache.has(iconset, { monochrome })) {
				setLoading(false)
			} else {
				setLoading(true)
			}
			const [, data] = await queryIconset(iconset, { monochrome })
			setLoading(false)
			_setResults(data)
		}
		fn()
	}, [iconset, monochrome])

	//////////////////////////////////////////////////////////////////////////////

	const [size, setSize] = useParam({
		key: "size",
		initialValue: SIZE_DEFAULT,
		parser: value => {
			const parsed = +value
			return clamp(parsed, { min: SIZE_MIN, max: SIZE_MAX })
		},
	})

	const [strokeWidth, setStrokeWidth] = useParam({
		key: "stroke-width",
		initialValue: STROKE_DEFAULT,
		parser: value => {
			const parsed = +value
			return clamp(parsed, { min: STROKE_MIN, max: STROKE_MAX })
		},
	})

	//////////////////////////////////////////////////////////////////////////////

	const [format, setFormatAs] = useParam<FormatValue>({
		key: "export-as",
		initialValue: "svg",
		parser: value => {
			switch (value) {
				case "svg":
				case "jsx":
				case "tsx":
				case "strict-jsx":
				case "strict-tsx":
					return value
			}
			return "svg"
		},
	})

	const [names, _setNames] = React.useState(() => new Set<string>())

	const [namesStart, setNamesStart] = React.useState<number | null>(null)
	const [namesEnd, setNamesEnd] = React.useState<number | null>(null)

	const addNames = React.useCallback((...names: string[]) => {
		_setNames(prev => {
			const next = new Set(prev)
			for (const name of names) {
				next.add(name)
			}
			return next
		})
	}, [])

	const removeNames = React.useCallback((...names: string[]) => {
		_setNames(prev => {
			const next = new Set(prev)
			for (const name of names) {
				next.delete(name)
			}
			return next
		})
	}, [])

	const removeAllNames = React.useCallback(() => {
		setNamesStart(null)
		setNamesEnd(null)
		_setNames(new Set<string>())
	}, [])

	// TODO: Change to a click event?
	const [clipboard, _setClipboard] = React.useState("")

	React.useEffect(() => {
		if (names.size === 0) {
			_setClipboard("")
			return
		}
		let clipboard = ""
		const [keys, hasMore] = getKeys(names, { limit: 10 })
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
					banner: `// https://feathericons.dev/?search=${search}&iconset=${iconset}&export-as=jsx`,
				})
			} else if (format === "tsx") {
				if (index === 0) clipboard += 'import { JSX } from "solid-js";\n\n'
				clipboard += transformTsx(toTitleCase(name), formatSvg(svg, { strictJsx: false }), {
					banner: `// https://feathericons.dev/?search=${search}&iconset=${iconset}&export-as=tsx`,
				})
			} else if (format === "strict-jsx") {
				clipboard += transformJsx(toTitleCase(name), formatSvg(svg, { strictJsx: true }), {
					banner: `// https://feathericons.dev/?search=${search}&iconset=${iconset}&export-as=strict-jsx`,
				})
			} else if (format === "strict-tsx") {
				clipboard += transformTsx(toTitleCase(name), formatSvg(svg, { strictJsx: true }), {
					banner: `// https://feathericons.dev/?search=${search}&iconset=${iconset}&export-as=strict-tsx`,
				})
			}
		}
		if (hasMore) {
			if (format === "svg") {
				clipboard += `\n\n<!-- ... -->`
			} else {
				clipboard += `\n\n// ...`
			}
		}
		_setClipboard(clipboard)
	}, [format, iconset, names])

	//////////////////////////////////////////////////////////////////////////////

	return (
		<SearchContext.Provider
			value={React.useMemo(
				() => ({
					search,
					setSearch,
					iconset,
					setIconset,
					monochrome,
					setMonochrome,
					loading,
					searchResults,
				}),
				[search, setSearch, iconset, setIconset, monochrome, setMonochrome, loading, searchResults],
			)}
		>
			<RangeContext.Provider
				value={React.useMemo(
					() => ({
						size,
						setSize,
						strokeWidth,
						setStrokeWidth,
					}),
					[size, setSize, strokeWidth, setStrokeWidth],
				)}
			>
				<ClipboardContext.Provider
					value={React.useMemo(
						() => ({
							format,
							setFormatAs,
							names,
							namesStart,
							setNamesStart,
							namesEnd,
							setNamesEnd,
							addNames,
							removeNames,
							removeAllNames,
							clipboard,
						}),
						// prettier-ignore
						[format, setFormatAs, names, namesStart, setNamesStart, namesEnd, setNamesEnd, addNames, removeNames, removeAllNames, clipboard],
					)}
				>
					{children}
				</ClipboardContext.Provider>
			</RangeContext.Provider>
		</SearchContext.Provider>
	)
}
