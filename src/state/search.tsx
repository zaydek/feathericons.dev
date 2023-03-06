import { useParam, useParamBoolean } from "@/lib"
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
export type SocialRadioValue =
	| "off"
	| "normal"

// prettier-ignore
export type PaymentsRadioValue =
	| "off"
	| "normal"
	| "filled"

const SHOW_FEATHER_DEFAULT       = !!1 // prettier-ignore
const SHOW_SOCIAL_DEFAULT        = !!1 // prettier-ignore
const SHOW_PAYMENTS_DEFAULT      = !!1 // prettier-ignore
const PAYMENTS_RADIO_DEFAULT     = "filled" // prettier-ignore
const MONOCHROMATIC_MODE_DEFAULT = !!0 // prettier-ignore
const COMPACT_MODE_DEFAULT       = !!0 // prettier-ignore

// prettier-ignore
export const SearchContext =
	createContext<{
		search:               string
		setSearch:            Dispatch<SetStateAction<string>>
		showFeather:          boolean
		setShowFeather:       Dispatch<SetStateAction<boolean>>
		showSocial:           boolean
		setShowSocial:        Dispatch<SetStateAction<boolean>>
		showPayments:         boolean
		setShowPayments:      Dispatch<SetStateAction<boolean>>
		paymentsRadio:        PaymentsRadioValue
		setPaymentsRadio:     Dispatch<SetStateAction<PaymentsRadioValue>>
		monochromaticMode:    boolean
		setMonochromaticMode: Dispatch<SetStateAction<boolean>>
		compactMode:          boolean
		setCompactMode:       Dispatch<SetStateAction<boolean>>
		resetIcons:           () => void
		resetIconSettings:    () => void
		results:              (readonly [string[], LazyExoticComponent<any>])[]
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

	//////////////////////////////////////////////////////////////////////////////

	const [showFeather, setShowFeather] = useParamBoolean({
		key: "show-feather",
		initialValue: SHOW_FEATHER_DEFAULT,
	})

	//////////////////////////////////////////////////////////////////////////////

	const [showSocial, setShowSocial] = useParamBoolean({
		key: "show-social",
		initialValue: SHOW_SOCIAL_DEFAULT,
	})

	//////////////////////////////////////////////////////////////////////////////

	const [showPayments, setShowPayments] = useParamBoolean({
		key: "show-payments",
		initialValue: SHOW_PAYMENTS_DEFAULT,
	})
	const [paymentsRadio, setPaymentsRadio] = useParam<PaymentsRadioValue>({
		key: "payments-radio",
		initialValue: PAYMENTS_RADIO_DEFAULT,
		parser: value => {
			switch (value) {
				case "normal":
				case "filled":
					return value
			}
			return PAYMENTS_RADIO_DEFAULT
		},
	})

	//////////////////////////////////////////////////////////////////////////////

	const [monochromaticMode, setMonochromaticMode] = useParamBoolean({
		key: "monochromatic-mode",
		initialValue: MONOCHROMATIC_MODE_DEFAULT,
	})
	const [compactMode, setCompactMode] = useParamBoolean({
		key: "compact-mode",
		initialValue: COMPACT_MODE_DEFAULT,
	})

	//////////////////////////////////////////////////////////////////////////////

	const resetIcons = useCallback(() => {
		setShowFeather(SHOW_FEATHER_DEFAULT)
		setShowSocial(SHOW_SOCIAL_DEFAULT)
		setShowPayments(SHOW_PAYMENTS_DEFAULT)
		setPaymentsRadio(PAYMENTS_RADIO_DEFAULT)
	}, [setPaymentsRadio, setShowFeather, setShowPayments, setShowSocial])

	const resetIconSettings = useCallback(() => {
		setMonochromaticMode(MONOCHROMATIC_MODE_DEFAULT)
		setCompactMode(COMPACT_MODE_DEFAULT)
	}, [setCompactMode, setMonochromaticMode])

	const results = useMemo(() => {
		const arr = []
		if (showFeather) {
			arr.push(cache.get("feather"))
		}
		if (showSocial) {
			if (monochromaticMode) {
				arr.push(cache.get("wolfkit-social-mono"))
			} else {
				arr.push(cache.get("wolfkit-social-original"))
			}
		}
		if (showPayments) {
			if (monochromaticMode) {
				if (paymentsRadio === "normal") {
					arr.push(cache.get("wolfkit-payments-mono"))
				} else if (paymentsRadio === "filled") {
					arr.push(cache.get("wolfkit-payments-mono-filled"))
				}
			} else {
				if (paymentsRadio === "normal") {
					arr.push(cache.get("wolfkit-payments-original"))
				} else if (paymentsRadio === "filled") {
					arr.push(cache.get("wolfkit-payments-original-filled"))
				}
			}
		}
		return arr
	}, [showFeather, showSocial, showPayments, monochromaticMode, paymentsRadio])

	return (
		<SearchContext.Provider
			value={{
				search,
				setSearch,
				showFeather,
				setShowFeather,
				showSocial,
				setShowSocial,
				showPayments,
				setShowPayments,
				paymentsRadio,
				setPaymentsRadio,
				monochromaticMode,
				setMonochromaticMode,
				compactMode,
				setCompactMode,
				resetIcons,
				resetIconSettings,
				results,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
