import React from "react"

import { canonicalize, IconComponent, useMount, useParam, useParamBoolean } from "@/lib"
import { queryCache } from "./cache"

export type WkPaymentsValue = "normal" | "filled"

const FEATHER_DEFAULT           = !!1 // prettier-ignore
const WK_BRANDS_DEFAULT         = !!1 // prettier-ignore
const WK_PAYMENTS_DEFAULT       = !!1 // prettier-ignore
const WK_PAYMENTS_VALUE_DEFAULT = "filled" // prettier-ignore
const PREFER_COLOR_DEFAULT      = !!1 // prettier-ignore
//// const PREFER_NAMES_DEFAULT      = !!1 // prettier-ignore

// prettier-ignore
export const SearchContext = React.createContext<{
  search:             string
  setSearch:          React.Dispatch<React.SetStateAction<string>>
	//// iconsAreCached:     boolean
  //// icons:              ([string, IconComponent])[] | null
	searchResults:      ([string, IconComponent])[] | null
  feather:            boolean
  setFeather:         React.Dispatch<React.SetStateAction<boolean>>
  wkBrands:           boolean
  setWkBrands:        React.Dispatch<React.SetStateAction<boolean>>
  wkPayments:         boolean
  setWkPayments:      React.Dispatch<React.SetStateAction<boolean>>
  wkPaymentsValue:    WkPaymentsValue
  setWkPaymentsValue: React.Dispatch<React.SetStateAction<WkPaymentsValue>>
  resetIcons:         () => void
  preferColor:        boolean
  setPreferColor:     React.Dispatch<React.SetStateAction<boolean>>
  resetIconPrefs:     () => void
} | null>(null)

export function SearchProvider({ children }: React.PropsWithChildren) {
	const [search, setSearch] = useParam({
		key: "search",
		initialValue: "",
		parser: value => value,
		serializer: canonicalize,
	})

	//// // TODO: Move up? To search?
	//// const [iconsAreCached, setCached] = React.useState(false)
	const [_icons, _setIcons] = React.useState<[string, IconComponent][] | null>(null)

	const searchResults = React.useMemo(() => {
		if (_icons === null) return null
		const canon = canonicalize(search)
		if (canon === "") {
			return _icons
		} else {
			return _icons?.filter(([name]) => canonicalize(name).includes(canon))
		}
	}, [_icons, search])

	//////////////////////////////////////////////////////////////////////////////

	const [feather, setFeather] = useParamBoolean({ key: "feather", initialValue: FEATHER_DEFAULT })
	const [wkBrands, setWkBrands] = useParamBoolean({ key: "brands", initialValue: WK_BRANDS_DEFAULT })
	const [wkPayments, setWkPayments] = useParamBoolean({ key: "payments", initialValue: WK_PAYMENTS_DEFAULT })

	const [wkPaymentsValue, setWkPaymentsValue] = useParam<WkPaymentsValue>({
		key: "payments-value",
		initialValue: WK_PAYMENTS_VALUE_DEFAULT,
		parser: value => {
			switch (value) {
				case "normal":
				case "filled":
					return value
			}
			return WK_PAYMENTS_VALUE_DEFAULT
		},
	})

	const resetIcons = React.useCallback(() => {
		setFeather(FEATHER_DEFAULT)
		setWkBrands(WK_BRANDS_DEFAULT)
		setWkPayments(WK_PAYMENTS_DEFAULT)
		setWkPaymentsValue(WK_PAYMENTS_VALUE_DEFAULT)
	}, [setFeather, setWkBrands, setWkPayments, setWkPaymentsValue])

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

	const resetIconPrefs = React.useCallback(() => {
		setPreferColor(PREFER_COLOR_DEFAULT)
		//// setPreferNames(PREFER_NAMES_DEFAULT)
		//// }, [setPreferColor, setPreferNames])
	}, [setPreferColor])

	//////////////////////////////////////////////////////////////////////////////

	// Ensure feather OR wkBrands OR wkPayments is checked
	useMount(() => {
		if (!(!feather && !wkBrands && !wkPayments)) return
		resetIcons()
	})

	React.useEffect(() => {
		async function fn() {
			//// const [cached, icons] = await queryCache({
			const [, icons] = await queryCache({
				feather,
				wkBrands,
				wkPayments,
				wkPaymentsValue,
				monochrome: preferColor,
			})
			//// setCached(cached)
			_setIcons(icons)
		}
		fn()
	}, [feather, preferColor, wkBrands, wkPayments, wkPaymentsValue])

	return (
		<SearchContext.Provider
			value={{
				// Search
				search,
				setSearch,
				searchResults,

				// Icons
				feather,
				setFeather,
				wkBrands,
				setWkBrands,
				wkPayments,
				setWkPayments,
				wkPaymentsValue,
				setWkPaymentsValue,
				resetIcons,

				// Preferences
				preferColor,
				setPreferColor,
				resetIconPrefs,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
