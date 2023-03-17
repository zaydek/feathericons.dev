import React from "react"

import { IconComponent, toCanonCase, toKebabCase, useParam, useParamBoolean } from "@/lib"
import { cache, queryCache as queryIconset } from "./cache"

// prettier-ignore
export type IconValue =
	| "feather"
	| "wk-brands"
	| "wk-payments"
	| "wk-payments-filled"

export const RADIO_VALUE_DEFAULT: IconValue = "feather"
export const MONOCHROME_DEFAULT = false

// prettier-ignore
export const SearchContext = React.createContext<{
	// Search
  search:          string
  setSearch:       React.Dispatch<React.SetStateAction<string>>
	fetchingResults: boolean
	results:         ([string, IconComponent])[] | null

	// Icons
	radioValue:      IconValue
	setRadioValue:   React.Dispatch<React.SetStateAction<IconValue>>

	// Preferences
  monochrome:      boolean
  setMonochrome:   React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

//// export function canonicalize(str: string) {
//// 	return str
//// 		.replace(/[^\w\s-]/g, "") // Remove bad characters
//// 		.replace(/\s+/g, " ")     // Remove excess spaces
//// 		.trim()                   // Trim start and end spaces
//// }

export function SearchProvider({ children }: React.PropsWithChildren) {
	const [search, setSearch] = useParam({
		key: "search",
		initialValue: "",
		parser: value => value,
		serializer: toCanonCase,
	})

	const [fetchingResults, _setFetchingResults] = React.useState(false)
	const [_iconset, _setIconset] = React.useState<[string, IconComponent][] | null>(null)

	// TODO: Search tags
	const results = React.useMemo(() => {
		if (_iconset === null) return null
		const canon = toCanonCase(search)
		if (canon === "") {
			return _iconset
		} else {
			return _iconset?.filter(([name]) => toKebabCase(name).toLowerCase().includes(canon))
		}
	}, [_iconset, search])

	//////////////////////////////////////////////////////////////////////////////

	const [radioValue, setRadioValue] = useParam<IconValue>({
		key: "radio-value",
		initialValue: RADIO_VALUE_DEFAULT,
		parser: value => {
			switch (value) {
				case "feather":
				case "wk-brands":
				case "wk-payments":
				case "wk-payments-filled":
					return value
			}
			return RADIO_VALUE_DEFAULT
		},
	})

	//////////////////////////////////////////////////////////////////////////////

	const [monochrome, setMonochrome] = useParamBoolean({ key: "prefer-color", initialValue: MONOCHROME_DEFAULT })

	//////////////////////////////////////////////////////////////////////////////

	React.useEffect(() => {
		async function fn() {
			if (cache.has(radioValue, { monochrome })) {
				_setFetchingResults(false)
			} else {
				_setFetchingResults(true)
			}
			const [, iconset] = await queryIconset(radioValue, { monochrome })
			_setFetchingResults(false)
			_setIconset(iconset)
		}
		fn()
	}, [monochrome, radioValue])

	return (
		<SearchContext.Provider
			value={{
				// Search
				search,
				setSearch,
				fetchingResults,
				results,

				// Icons
				radioValue,
				setRadioValue,

				// Preferences
				monochrome,
				setMonochrome,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
