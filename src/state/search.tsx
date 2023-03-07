import { useParam, useParamBoolean } from "@/lib"
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback } from "react"

//// // prettier-ignore
//// export type WkSocialValue =
//// 	| "normal"

export type WkPaymentsValue = "normal" | "filled"

const FEATHER_DEFAULT            = !!1 // prettier-ignore
const WK_SOCIAL_DEFAULT          = !!1 // prettier-ignore
const WK_PAYMENTS_DEFAULT        = !!1 // prettier-ignore
const WK_PAYMENTS_VALUE_DEFAULT  = "filled" // prettier-ignore
const MONOCHROMATIC_MODE_DEFAULT = !!0 // prettier-ignore
const COMPACT_MODE_DEFAULT       = !!0 // prettier-ignore

// prettier-ignore
export const SearchContext =
	createContext<{
		search:               string
		setSearch:            Dispatch<SetStateAction<string>>
		feather:              boolean
		setFeather:           Dispatch<SetStateAction<boolean>>
		wkSocial:             boolean
		setWkSocial:          Dispatch<SetStateAction<boolean>>
		wkPayments:           boolean
		setWkPayments:        Dispatch<SetStateAction<boolean>>
		wkPaymentsValue:      WkPaymentsValue
		setWkPaymentsValue:   Dispatch<SetStateAction<WkPaymentsValue>>
		monochromaticMode:    boolean
		setMonochromaticMode: Dispatch<SetStateAction<boolean>>
		compactMode:          boolean
		setCompactMode:       Dispatch<SetStateAction<boolean>>
		resetIcons:           () => void
		resetIconSettings:    () => void
	} | null>(null)

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

	const [feather, setFeather] = useParamBoolean({
		key: "feather",
		initialValue: FEATHER_DEFAULT,
	})

	//////////////////////////////////////////////////////////////////////////////

	const [wkSocial, setWkSocial] = useParamBoolean({
		key: "wk-social",
		initialValue: WK_SOCIAL_DEFAULT,
	})

	//////////////////////////////////////////////////////////////////////////////

	const [wkPayments, setWkPayments] = useParamBoolean({
		key: "wk-payments",
		initialValue: WK_PAYMENTS_DEFAULT,
	})
	const [wkPaymentsValue, setWkPaymentsValue] = useParam<WkPaymentsValue>({
		key: "wk-payments-value",
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

	//////////////////////////////////////////////////////////////////////////////

	const [monochromaticMode, setMonochromaticMode] = useParamBoolean({
		key: "mono-mode",
		initialValue: MONOCHROMATIC_MODE_DEFAULT,
	})
	const [compactMode, setCompactMode] = useParamBoolean({
		key: "grid-mode",
		initialValue: COMPACT_MODE_DEFAULT,
	})

	//////////////////////////////////////////////////////////////////////////////

	const resetIcons = useCallback(() => {
		setFeather(FEATHER_DEFAULT)
		setWkSocial(WK_SOCIAL_DEFAULT)
		setWkPayments(WK_PAYMENTS_DEFAULT)
		setWkPaymentsValue(WK_PAYMENTS_VALUE_DEFAULT)
	}, [setWkPaymentsValue, setFeather, setWkPayments, setWkSocial])

	const resetIconSettings = useCallback(() => {
		setMonochromaticMode(MONOCHROMATIC_MODE_DEFAULT)
		setCompactMode(COMPACT_MODE_DEFAULT)
	}, [setCompactMode, setMonochromaticMode])

	//////////////////////////////////////////////////////////////////////////////

	return (
		<SearchContext.Provider
			value={{
				search,
				setSearch,
				feather,
				setFeather,
				wkSocial,
				setWkSocial,
				wkPayments,
				setWkPayments,
				wkPaymentsValue,
				setWkPaymentsValue,
				monochromaticMode,
				setMonochromaticMode,
				compactMode,
				setCompactMode,
				resetIcons,
				resetIconSettings,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
