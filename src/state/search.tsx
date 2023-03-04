import { useParam, useParamBoolean } from "@/hooks"
import {
	createContext,
	Dispatch,
	LazyExoticComponent,
	PropsWithChildren,
	SetStateAction,
	useCallback,
	useMemo,
} from "react"
import { createCache } from "./search-cache"

// prettier-ignore
export type BrandsRadioValue =
	| "off"
	| "normal"
	| "circle"
	| "square"

// prettier-ignore
export type PaymentsRadioValue =
	| "off"
	| "normal"
	| "filled"

const FEATHER_DEFAULT              = !!1 // prettier-ignore
const BRANDS_RADIO_VALUE_DEFAULT   = "normal" // prettier-ignore
const PAYMENTS_RADIO_VALUE_DEFAULT = "filled" // prettier-ignore
const DISPLAY_NAMES_DEFAULT        = !!1 // prettier-ignore
const DISPLAY_MONOCHROME_DEFAULT   = !!0 // prettier-ignore

// prettier-ignore
export const SearchContext =
	createContext<{
		search:                string
		setSearch:             Dispatch<SetStateAction<string>>
		showFeather:           boolean
		setShowFeather:        Dispatch<SetStateAction<boolean>>
		brandsRadioValue:      BrandsRadioValue
		setBrandsRadioValue:   Dispatch<SetStateAction<BrandsRadioValue>>
		paymentsRadioValue:    PaymentsRadioValue
		setPaymentsRadioValue: Dispatch<SetStateAction<PaymentsRadioValue>>
		displayNames:          boolean
		setDisplayNames:       Dispatch<SetStateAction<boolean>>
		displayMonochrome:     boolean
		setDisplayMonochrome:  Dispatch<SetStateAction<boolean>>
		resetIcons:            () => void
		resetDisplay:          () => void
		results:               (readonly [string[], LazyExoticComponent<any>])[]
	} | null>(null)

const cache = createCache()

// prettier-ignore
const serializeSearch = (value: string) => value
	.replace(/[^\w\s-]/g, "") // Remove bad characters
	.replace(/\s+/g, " ")     // Remove excess spaces
	.trim() // Trim start and end spaces

export function SearchProvider({ children }: PropsWithChildren) {
	const [search, setSearch] = useParam({
		key: "search",
		initialValue: "",
		parser: value => value,
		serializer: serializeSearch,
	})
	const [showFeather, setShowFeather] = useParamBoolean({
		key: "feather",
		initialValue: FEATHER_DEFAULT,
	})
	const [brandsRadioValue, setBrandsRadioValue] = useParam<BrandsRadioValue>({
		key: "brands-radio",
		initialValue: BRANDS_RADIO_VALUE_DEFAULT,
		parser: value => {
			switch (value) {
				case "normal":
				case "circle":
				case "square":
					return value
			}
			return BRANDS_RADIO_VALUE_DEFAULT
		},
	})
	const [paymentsRadioValue, setPaymentsRadioValue] = useParam<PaymentsRadioValue>({
		key: "payments-monochrome",
		initialValue: PAYMENTS_RADIO_VALUE_DEFAULT,
		parser: value => {
			switch (value) {
				case "normal":
				case "filled":
					return value
			}
			return PAYMENTS_RADIO_VALUE_DEFAULT
		},
	})
	const [displayNames, setDisplayNames] = useParamBoolean({
		key: "display-names",
		initialValue: DISPLAY_NAMES_DEFAULT,
	})
	const [displayMonochrome, setDisplayMonochrome] = useParamBoolean({
		key: "display-monochrome",
		initialValue: DISPLAY_MONOCHROME_DEFAULT,
	})

	const resetIcons = useCallback(() => {
		setShowFeather(FEATHER_DEFAULT)
		setBrandsRadioValue(BRANDS_RADIO_VALUE_DEFAULT)
		setPaymentsRadioValue(PAYMENTS_RADIO_VALUE_DEFAULT)
	}, [setBrandsRadioValue, setPaymentsRadioValue, setShowFeather])

	const resetDisplay = useCallback(() => {
		setDisplayNames(DISPLAY_NAMES_DEFAULT)
		setDisplayMonochrome(DISPLAY_MONOCHROME_DEFAULT)
	}, [setDisplayMonochrome, setDisplayNames])

	const results = useMemo(() => {
		const results: (readonly [string[], LazyExoticComponent<any>])[] = []
		if (showFeather) results.push(cache.get("feather"))
		if (displayMonochrome) {
			const rv = brandsRadioValue
			if (rv === "normal") results.push(cache.get("wolfkit-brands-mono"))
			if (rv === "circle") results.push(cache.get("wolfkit-brands-mono-circle"))
			if (rv === "square") results.push(cache.get("wolfkit-brands-mono-square"))
			if (rv === "normal") results.push(cache.get("wolfkit-brands-original"))
			if (rv === "circle") results.push(cache.get("wolfkit-brands-original-circle"))
			if (rv === "square") results.push(cache.get("wolfkit-brands-original-square"))
		}
		if (displayMonochrome) {
			const rv = paymentsRadioValue
			if (rv === "normal") results.push(cache.get("wolfkit-payments-mono"))
			if (rv === "filled") results.push(cache.get("wolfkit-payments-mono-filled"))
			if (rv === "normal") results.push(cache.get("wolfkit-payments-original"))
			if (rv === "filled") results.push(cache.get("wolfkit-payments-original-filled"))
		}
		return results
	}, [displayMonochrome, brandsRadioValue, paymentsRadioValue, showFeather])

	return (
		<SearchContext.Provider
			value={{
				search,
				setSearch,
				showFeather,
				setShowFeather,
				brandsRadioValue,
				setBrandsRadioValue,
				paymentsRadioValue,
				setPaymentsRadioValue,
				displayNames,
				setDisplayNames,
				displayMonochrome,
				setDisplayMonochrome,
				resetIcons,
				resetDisplay,
				results,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
