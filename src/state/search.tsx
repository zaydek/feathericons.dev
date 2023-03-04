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
export type SocialRadio =
	| "off"
	| "normal"
	| "circle"
	| "square"

// prettier-ignore
export type PaymentsRadio =
	| "off"
	| "normal"
	| "filled"

const SHOW_FEATHER_DEFAULT    = !!1 // prettier-ignore
const SHOW_SOCIAL_DEFAULT     = !!1 // prettier-ignore
const SOCIAL_RADIO_DEFAULT    = "normal" // prettier-ignore
const SHOW_PAYMENTS_DEFAULT   = !!1 // prettier-ignore
const PAYMENTS_RADIO_DEFAULT  = "filled" // prettier-ignore
const MONOCHROME_MODE_DEFAULT = !!0 // prettier-ignore
const COMPACT_MODE_DEFAULT    = !!0 // prettier-ignore

// prettier-ignore
export const SearchContext =
	createContext<{
		search:            string
		setSearch:         Dispatch<SetStateAction<string>>
		showFeather:       boolean
		setShowFeather:    Dispatch<SetStateAction<boolean>>
		showSocial:        boolean
		setShowSocial:     Dispatch<SetStateAction<boolean>>
		socialRadio:       SocialRadio
		setSocialRadio:    Dispatch<SetStateAction<SocialRadio>>
		showPayments:      boolean
		setShowPayments:   Dispatch<SetStateAction<boolean>>
		paymentsRadio:     PaymentsRadio
		setPaymentsRadio:  Dispatch<SetStateAction<PaymentsRadio>>
		monochromeMode:    boolean
		setMonochromeMode: Dispatch<SetStateAction<boolean>>
		compactMode:       boolean
		setCompactMode:    Dispatch<SetStateAction<boolean>>
		resetIcons:        () => void
		resetDisplay:      () => void
		results:           (readonly [string[], LazyExoticComponent<any>])[]
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
	const [socialRadio, setSocialRadio] = useParam<SocialRadio>({
		key: "social-radio",
		initialValue: SOCIAL_RADIO_DEFAULT,
		parser: value => {
			switch (value) {
				case "normal":
				case "circle":
				case "square":
					return value
			}
			return SOCIAL_RADIO_DEFAULT
		},
	})

	//////////////////////////////////////////////////////////////////////////////

	const [showPayments, setShowPayments] = useParamBoolean({
		key: "show-payments",
		initialValue: SHOW_PAYMENTS_DEFAULT,
	})
	const [paymentsRadio, setPaymentsRadio] = useParam<PaymentsRadio>({
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

	const [monochromeMode, setMonochromeMode] = useParamBoolean({
		key: "monochrome-mode",
		initialValue: MONOCHROME_MODE_DEFAULT,
	})
	const [compactMode, setCompactMode] = useParamBoolean({
		key: "compact-mode",
		initialValue: COMPACT_MODE_DEFAULT,
	})

	//////////////////////////////////////////////////////////////////////////////

	const resetIcons = useCallback(() => {
		setShowFeather(SHOW_FEATHER_DEFAULT)
		setShowSocial(SHOW_SOCIAL_DEFAULT)
		setSocialRadio(SOCIAL_RADIO_DEFAULT)
		setShowPayments(SHOW_PAYMENTS_DEFAULT)
		setPaymentsRadio(PAYMENTS_RADIO_DEFAULT)
	}, [setPaymentsRadio, setShowFeather, setShowPayments, setShowSocial, setSocialRadio])

	const resetDisplay = useCallback(() => {
		setMonochromeMode(MONOCHROME_MODE_DEFAULT)
		setCompactMode(COMPACT_MODE_DEFAULT)
	}, [setCompactMode, setMonochromeMode])

	const results = useMemo(() => {
		const results: (readonly [string[], LazyExoticComponent<any>])[] = []
		if (showFeather) results.push(cache.get("feather"))
		if (showSocial) {
			const rv = socialRadio
			if (monochromeMode) {
				if (rv === "normal") results.push(cache.get("wolfkit-brands-mono"))
				if (rv === "circle") results.push(cache.get("wolfkit-brands-mono-circle"))
				if (rv === "square") results.push(cache.get("wolfkit-brands-mono-square"))
			} else {
				if (rv === "normal") results.push(cache.get("wolfkit-brands-original"))
				if (rv === "circle") results.push(cache.get("wolfkit-brands-original-circle"))
				if (rv === "square") results.push(cache.get("wolfkit-brands-original-square"))
			}
		}
		if (showPayments) {
			const rv = paymentsRadio
			if (monochromeMode) {
				if (rv === "normal") results.push(cache.get("wolfkit-payments-mono"))
				if (rv === "filled") results.push(cache.get("wolfkit-payments-mono-filled"))
			} else {
				if (rv === "normal") results.push(cache.get("wolfkit-payments-original"))
				if (rv === "filled") results.push(cache.get("wolfkit-payments-original-filled"))
			}
		}
		return results
	}, [showFeather, showSocial, showPayments, socialRadio, monochromeMode, paymentsRadio])

	return (
		<SearchContext.Provider
			value={{
				search,
				setSearch,
				showFeather,
				setShowFeather,
				showSocial,
				setShowSocial,
				socialRadio,
				setSocialRadio,
				showPayments,
				setShowPayments,
				paymentsRadio,
				setPaymentsRadio,
				monochromeMode,
				setMonochromeMode,
				compactMode,
				setCompactMode,
				resetIcons,
				resetDisplay,
				results,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
