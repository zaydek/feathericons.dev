import React from "react"

import { IconComponent, toCanonCase, toKebabCase, useParam, useParamBoolean } from "@/lib"
import { queryCache2 } from "./cache"

export type WkPaymentsValue = "normal" | "filled"

//// const FEATHER_DEFAULT           = !!1 // prettier-ignore
//// const WK_BRANDS_DEFAULT         = !!1 // prettier-ignore
//// const WK_PAYMENTS_DEFAULT       = !!1 // prettier-ignore
//// const WK_PAYMENTS_VALUE_DEFAULT = "filled" // prettier-ignore
export const PREFER_COLOR_DEFAULT      = !!1 // prettier-ignore
//// const PREFER_NAMES_DEFAULT      = !!1 // prettier-ignore

// prettier-ignore
export type IconValue =
	| "feather"
	| "wk-brands"
	| "wk-payments"
	| "wk-payments-filled"

export const ICON_VALUE_DEFAULT: IconValue = "feather"

// prettier-ignore
export const SearchContext = React.createContext<{
	// Search
  search:             string
  setSearch:          React.Dispatch<React.SetStateAction<string>>
	//// iconsAreCached:     boolean
  //// icons:              ([string, IconComponent])[] | null
	searchResults:      ([string, IconComponent])[] | null

	// Icons
	iconValue:          IconValue
	setIconValue:       React.Dispatch<React.SetStateAction<IconValue>>

  //// feather:            boolean
  //// setFeather:         React.Dispatch<React.SetStateAction<boolean>>
  //// wkBrands:           boolean
  //// setWkBrands:        React.Dispatch<React.SetStateAction<boolean>>
  //// wkPayments:         boolean
  //// setWkPayments:      React.Dispatch<React.SetStateAction<boolean>>
  //// wkPaymentsValue:    WkPaymentsValue
  //// setWkPaymentsValue: React.Dispatch<React.SetStateAction<WkPaymentsValue>>
  //// resetIcons:         () => void

	// Preferences
  preferColor:        boolean
  setPreferColor:     React.Dispatch<React.SetStateAction<boolean>>
  //// resetIconPrefs:     () => void
} | null>(null)

//// // prettier-ignore
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

	//// // TODO: Move up? To search?
	//// const [iconsAreCached, setCached] = React.useState(false)
	const [_icons, _setIcons] = React.useState<[string, IconComponent][] | null>(null)

	// TODO: Search tags
	const searchResults = React.useMemo(() => {
		if (_icons === null) return null
		const canon = toCanonCase(search)
		if (canon === "") {
			return _icons
		} else {
			return _icons?.filter(([name]) => toKebabCase(name).toLowerCase().includes(canon))
		}
	}, [_icons, search])

	//////////////////////////////////////////////////////////////////////////////

	//// const [feather, setFeather] = useParamBoolean({ key: "feather", initialValue: FEATHER_DEFAULT })
	//// const [wkBrands, setWkBrands] = useParamBoolean({ key: "brands", initialValue: WK_BRANDS_DEFAULT })
	//// const [wkPayments, setWkPayments] = useParamBoolean({ key: "payments", initialValue: WK_PAYMENTS_DEFAULT })
	////
	//// const [wkPaymentsValue, setWkPaymentsValue] = useParam<WkPaymentsValue>({
	//// 	key: "payments-value",
	//// 	initialValue: WK_PAYMENTS_VALUE_DEFAULT,
	//// 	parser: value => {
	//// 		switch (value) {
	//// 			case "normal":
	//// 			case "filled":
	//// 				return value
	//// 		}
	//// 		return WK_PAYMENTS_VALUE_DEFAULT
	//// 	},
	//// })
	////
	//// const resetIcons = React.useCallback(() => {
	//// 	setFeather(FEATHER_DEFAULT)
	//// 	setWkBrands(WK_BRANDS_DEFAULT)
	//// 	setWkPayments(WK_PAYMENTS_DEFAULT)
	//// 	setWkPaymentsValue(WK_PAYMENTS_VALUE_DEFAULT)
	//// }, [setFeather, setWkBrands, setWkPayments, setWkPaymentsValue])

	const [iconValue, setIconValue] = useParam<IconValue>({
		key: "icon-value",
		initialValue: ICON_VALUE_DEFAULT,
		parser: value => {
			switch (value) {
				case "feather":
				case "wk-brands":
				case "wk-payments":
				case "wk-payments-filled":
					return value
			}
			return ICON_VALUE_DEFAULT
		},
	})

	//// const [iconValue, setIconValue] = useParam<IconValue>({
	//// 	key: "icon-value",
	//// 	initialValue: ICON_VALUE_DEFAULT,
	//// 	parser: value => {
	//// 		switch (value) {
	//// 			case "feather":
	//// 			case "wk-brands":
	//// 			case "wk-payments":
	//// 			case "wk-payments-filled":
	//// 				return value
	//// 		}
	//// 		return WK_PAYMENTS_VALUE_DEFAULT
	//// 	},
	//// })

	//////////////////////////////////////////////////////////////////////////////

	const [preferColor, setPreferColor] = useParamBoolean({ key: "prefer-color", initialValue: PREFER_COLOR_DEFAULT })
	//// const [preferNames, setPreferNames] = useParamBoolean({ key: "prefer-names", initialValue: PREFER_NAMES_DEFAULT })

	//// const $$search = useMemo(() => {
	//// 	return search.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
	//// }, [search])
	////
	//// const searchResultsFallback = useMemo(() => {
	//// 	const ref: Partial<Record<keyof typeof manifest, readonly [number, number] | null>> = {}
	//// 	for (const name of Object.keys(manifest)) {
	//// 		ref[name as keyof typeof manifest] = null
	//// 	}
	//// 	return ref
	//// }, [])
	////
	//// const searchResults = useMemo(() => {
	//// 	if ($$search === "") {
	//// 		return searchResultsFallback
	//// 	}
	//// 	const refA: Partial<Record<keyof typeof manifest, readonly [number, number] | null>> = {}
	//// 	const refB: Partial<Record<keyof typeof manifest, readonly [number, number] | null>> = {}
	//// 	for (const [name, info] of Object.entries(manifest)) {
	//// 		const indexes = getSubstringIndexes(name.toLowerCase(), $$search)
	//// 		if (indexes !== null) {
	//// 			refA[name as keyof typeof manifest] = indexes
	//// 		} else {
	//// 			for (const tag of info.tags) {
	//// 				if (tag.startsWith($$search)) {
	//// 					refB[name as keyof typeof manifest] = null
	//// 				}
	//// 			}
	//// 		}
	//// 	}
	//// 	return { ...refA, ...refB }

	//// const resetIconPrefs = React.useCallback(() => {
	//// 	setPreferColor(PREFER_COLOR_DEFAULT)
	//// 	//// setPreferNames(PREFER_NAMES_DEFAULT)
	//// 	//// }, [setPreferColor, setPreferNames])
	//// }, [setPreferColor])

	//////////////////////////////////////////////////////////////////////////////

	//// // Ensure feather OR wkBrands OR wkPayments is checked
	//// useMount(() => {
	//// 	if (!(!feather && !wkBrands && !wkPayments)) return
	//// 	resetIcons()
	//// })

	React.useEffect(() => {
		async function fn() {
			//// const [cached, icons] = await queryCache({
			const [, icons] = await queryCache2(iconValue, { monochrome: preferColor })
			//// setCached(cached)
			_setIcons(icons)
		}
		fn()
	}, [iconValue, preferColor])

	return (
		<SearchContext.Provider
			value={{
				// Search
				search,
				setSearch,
				searchResults,

				// Icons
				iconValue,
				setIconValue,

				//// // Icons
				//// feather,
				//// setFeather,
				//// wkBrands,
				//// setWkBrands,
				//// wkPayments,
				//// setWkPayments,
				//// wkPaymentsValue,
				//// setWkPaymentsValue,
				//// resetIcons,

				// Preferences
				preferColor,
				setPreferColor,
				//// resetIconPrefs,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
