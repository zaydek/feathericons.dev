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
//// | "circle"
//// | "square"

// prettier-ignore
export type PaymentsRadioValue =
	| "off"
	| "normal"
	| "filled"

const SHOW_FEATHER_DEFAULT      = !!1 // prettier-ignore
const SHOW_SOCIAL_DEFAULT       = !!1 // prettier-ignore
//// const SOCIAL_RADIO_DEFAULT      = "normal" // prettier-ignore
const SHOW_PAYMENTS_DEFAULT     = !!1 // prettier-ignore
const PAYMENTS_RADIO_DEFAULT    = "filled" // prettier-ignore
const PREFER_MONOCHROME_DEFAULT = !!0 // prettier-ignore
const SHOW_NAMES_DEFAULT        = !!1 // prettier-ignore

// prettier-ignore
export const SearchContext =
	createContext<{
		search:              string
		setSearch:           Dispatch<SetStateAction<string>>
		showFeather:         boolean
		setShowFeather:      Dispatch<SetStateAction<boolean>>
		showSocial:          boolean
		setShowSocial:       Dispatch<SetStateAction<boolean>>
		//// socialRadio:         SocialRadio
		//// setSocialRadio:      Dispatch<SetStateAction<SocialRadio>>
		showPayments:        boolean
		setShowPayments:     Dispatch<SetStateAction<boolean>>
		paymentsRadio:       PaymentsRadioValue
		setPaymentsRadio:    Dispatch<SetStateAction<PaymentsRadioValue>>
		preferMonochrome:    boolean
		setPreferMonochrome: Dispatch<SetStateAction<boolean>>
		showNames:           boolean
		setShowNames:        Dispatch<SetStateAction<boolean>>
		resetIcons:          () => void
		resetDisplay:        () => void
		results:             (readonly [string[], LazyExoticComponent<any>])[]
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
	//// const [socialRadio, setSocialRadio] = useParam<SocialRadio>({
	//// 	key: "social-radio",
	//// 	initialValue: SOCIAL_RADIO_DEFAULT,
	//// 	parser: value => {
	//// 		switch (value) {
	//// 			case "normal":
	//// 			case "circle":
	//// 			case "square":
	//// 				return value
	//// 		}
	//// 		return SOCIAL_RADIO_DEFAULT
	//// 	},
	//// })

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

	const [preferMonochrome, setPreferMonochrome] = useParamBoolean({
		key: "prefer-monochrome",
		initialValue: PREFER_MONOCHROME_DEFAULT,
	})
	const [showNames, setShowNames] = useParamBoolean({
		key: "show-names",
		initialValue: SHOW_NAMES_DEFAULT,
	})

	//////////////////////////////////////////////////////////////////////////////

	const resetIcons = useCallback(() => {
		setShowFeather(SHOW_FEATHER_DEFAULT)
		setShowSocial(SHOW_SOCIAL_DEFAULT)
		//// setSocialRadio(SOCIAL_RADIO_DEFAULT)
		setShowPayments(SHOW_PAYMENTS_DEFAULT)
		setPaymentsRadio(PAYMENTS_RADIO_DEFAULT)
	}, [setPaymentsRadio, setShowFeather, setShowPayments, setShowSocial])

	const resetDisplay = useCallback(() => {
		setPreferMonochrome(PREFER_MONOCHROME_DEFAULT)
		setShowNames(SHOW_NAMES_DEFAULT)
	}, [setShowNames, setPreferMonochrome])

	const results = useMemo(() => {
		const results: (readonly [string[], LazyExoticComponent<any>])[] = []
		if (showFeather) results.push(cache.get("feather"))
		if (showSocial) {
			//// const rv = socialRadio
			const rv = "normal"
			if (preferMonochrome) {
				if (rv === "normal") results.push(cache.get("wolfkit-brands-mono"))
				//// if (rv === "circle") results.push(cache.get("wolfkit-brands-mono-circle"))
				//// if (rv === "square") results.push(cache.get("wolfkit-brands-mono-square"))
			} else {
				if (rv === "normal") results.push(cache.get("wolfkit-brands-original"))
				//// if (rv === "circle") results.push(cache.get("wolfkit-brands-original-circle"))
				//// if (rv === "square") results.push(cache.get("wolfkit-brands-original-square"))
			}
		}
		if (showPayments) {
			const rv = paymentsRadio
			if (preferMonochrome) {
				if (rv === "normal") results.push(cache.get("wolfkit-payments-mono"))
				if (rv === "filled") results.push(cache.get("wolfkit-payments-mono-filled"))
			} else {
				if (rv === "normal") results.push(cache.get("wolfkit-payments-original"))
				if (rv === "filled") results.push(cache.get("wolfkit-payments-original-filled"))
			}
		}
		return results
	}, [showFeather, showSocial, showPayments, preferMonochrome, paymentsRadio])

	return (
		<SearchContext.Provider
			value={{
				search,
				setSearch,
				showFeather,
				setShowFeather,
				showSocial,
				setShowSocial,
				//// socialRadio,
				//// setSocialRadio,
				showPayments,
				setShowPayments,
				paymentsRadio,
				setPaymentsRadio,
				preferMonochrome,
				setPreferMonochrome,
				showNames,
				setShowNames,
				resetIcons,
				resetDisplay,
				results,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
