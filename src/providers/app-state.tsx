import React from "react"

import { clamp, Icon, toCanonCase, toKebabCase, useParam, useParamBoolean } from "../lib"
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
	search:               string
	setSearch:            React.Dispatch<React.SetStateAction<string>>
	iconset:              IconsetValue
	setIconset:           React.Dispatch<React.SetStateAction<IconsetValue>>
	monochrome:           boolean
	setMonochrome:        React.Dispatch<React.SetStateAction<boolean>>
	searchResultsLoading: boolean
	searchResults:        [string, Icon][] | null
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
	clipboard:      Map<string, string>
	setClipboard:   React.Dispatch<React.SetStateAction<Map<string, string>>>
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

	const [searchResultsLoading, setSearchResultsLoading] = React.useState(true)
	const [_results, _setResults] = React.useState<[string, Icon][] | null>(null)

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
				setSearchResultsLoading(false)
			} else {
				setSearchResultsLoading(true)
			}
			const [, data] = await queryIconset(iconset, { monochrome })
			setSearchResultsLoading(false)
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
		key: "format",
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

	const [clipboard, setClipboard] = React.useState<Map<string, string>>(() => new Map())

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
					searchResultsLoading,
					searchResults,
				}),
				[search, setSearch, iconset, setIconset, monochrome, setMonochrome, searchResultsLoading, searchResults],
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
							setClipboard,
						}),
						// prettier-ignore
						[format, setFormatAs, names, namesStart, setNamesStart, namesEnd, setNamesEnd, addNames, removeNames, removeAllNames, clipboard, setClipboard],
					)}
				>
					{children}
				</ClipboardContext.Provider>
			</RangeContext.Provider>
		</SearchContext.Provider>
	)
}
