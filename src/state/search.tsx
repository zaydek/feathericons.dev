import { useParam } from "@/hooks"
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
const BRANDS_MONOCHROME_DEFAULT    = !!0 // prettier-ignore
const BRANDS_RADIO_VALUE_DEFAULT   = "normal" // prettier-ignore
const PAYMENTS_MONOCHROME_DEFAULT  = !!0 // prettier-ignore
const PAYMENTS_RADIO_VALUE_DEFAULT = "filled" // prettier-ignore

// prettier-ignore
export const SearchContext =
	createContext<{
		search:                string
		setSearch:             Dispatch<SetStateAction<string>>
		showFeather:           boolean
		setShowFeather:        Dispatch<SetStateAction<boolean>>
		brandsMonochrome:      boolean
		setBrandsMonochrome:   Dispatch<SetStateAction<boolean>>
		brandsRadioValue:      BrandsRadioValue
		setBrandsRadioValue:   Dispatch<SetStateAction<BrandsRadioValue>>
		paymentsMonochrome:    boolean
		setPaymentsMonochrome: Dispatch<SetStateAction<boolean>>
		paymentsRadioValue:    PaymentsRadioValue
		setPaymentsRadioValue: Dispatch<SetStateAction<PaymentsRadioValue>>
		resetAll:              () => void
		results:               (readonly [string[], LazyExoticComponent<any>])[]
	} | null>(null)

const cache = createCache()

const parser_boolean = (value: string) => value === "1"
const serializer_boolean = (value: boolean) => (value ? "1" : "0")

export function SearchProvider({ children }: PropsWithChildren) {
	const [search, setSearch] = useParam({
		key: "search",
		initialValue: "",
		parser: value => value,
		// prettier-ignore
		serializer: value => {
			return value
				.replace(/[^\w\s-]/g, "") // Remove bad characters
				.replace(/\s+/g, " ")     // Remove excess spaces
				.trim()                   // Trim start and end spaces
		},
	})

	const [showFeather, setShowFeather] = useParam({
		key: "feather",
		initialValue: FEATHER_DEFAULT,
		parser: parser_boolean,
		serializer: serializer_boolean,
	})
	const [brandsMonochrome, setBrandsMonochrome] = useParam({
		key: "brands-monochrome",
		initialValue: BRANDS_MONOCHROME_DEFAULT,
		parser: parser_boolean,
		serializer: serializer_boolean,
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
	const [paymentsMonochrome, setPaymentsMonochrome] = useParam({
		key: "payments-monochrome",
		initialValue: PAYMENTS_MONOCHROME_DEFAULT,
		parser: parser_boolean,
		serializer: serializer_boolean,
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

	const resetAll = useCallback(() => {
		setShowFeather(FEATHER_DEFAULT)
		setBrandsMonochrome(BRANDS_MONOCHROME_DEFAULT)
		setBrandsRadioValue(BRANDS_RADIO_VALUE_DEFAULT)
		setPaymentsMonochrome(PAYMENTS_MONOCHROME_DEFAULT)
		setPaymentsRadioValue(PAYMENTS_RADIO_VALUE_DEFAULT)
	}, [setBrandsMonochrome, setBrandsRadioValue, setPaymentsMonochrome, setPaymentsRadioValue, setShowFeather])

	const results = useMemo(() => {
		const results: (readonly [string[], LazyExoticComponent<any>])[] = []
		if (showFeather) results.push(cache.get("feather"))
		if (brandsMonochrome) {
			const rv = brandsRadioValue
			if (rv === "normal") results.push(cache.get("wolfkit-brands-mono"))
			if (rv === "circle") results.push(cache.get("wolfkit-brands-mono-circle"))
			if (rv === "square") results.push(cache.get("wolfkit-brands-mono-square"))
		} else {
			const rv = brandsRadioValue
			if (rv === "normal") results.push(cache.get("wolfkit-brands-original"))
			if (rv === "circle") results.push(cache.get("wolfkit-brands-original-circle"))
			if (rv === "square") results.push(cache.get("wolfkit-brands-original-square"))
		}
		if (paymentsMonochrome) {
			const rv = paymentsRadioValue
			if (rv === "normal") results.push(cache.get("wolfkit-payments-mono"))
			if (rv === "filled") results.push(cache.get("wolfkit-payments-mono-filled"))
		} else {
			const rv = paymentsRadioValue
			if (rv === "normal") results.push(cache.get("wolfkit-payments-original"))
			if (rv === "filled") results.push(cache.get("wolfkit-payments-original-filled"))
		}
		return results
	}, [brandsMonochrome, brandsRadioValue, paymentsMonochrome, paymentsRadioValue, showFeather])

	return (
		<SearchContext.Provider
			value={{
				search,
				setSearch,
				showFeather,
				setShowFeather,
				brandsMonochrome,
				setBrandsMonochrome,
				brandsRadioValue,
				setBrandsRadioValue,
				paymentsMonochrome,
				setPaymentsMonochrome,
				paymentsRadioValue,
				setPaymentsRadioValue,
				resetAll,
				results,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
