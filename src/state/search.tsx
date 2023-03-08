import { canonicalize, Icon, useParam, useParamBoolean } from "@/lib"
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useMemo } from "react"
import { useQueryIcons } from "./use-query-icons"

export type WkPaymentsValue = "normal" | "filled"

const FEATHER_DEFAULT           = !!1 // prettier-ignore
const WK_SOCIAL_DEFAULT         = !!1 // prettier-ignore
const WK_PAYMENTS_DEFAULT       = !!1 // prettier-ignore
const WK_PAYMENTS_VALUE_DEFAULT = "filled" // prettier-ignore
const PREFER_COLOR_DEFAULT      = !!1 // prettier-ignore
const PREFER_NAMES_DEFAULT      = !!1 // prettier-ignore

// prettier-ignore
export const SearchContext = createContext<{
  search:    string
  setSearch: Dispatch<SetStateAction<string>>
} | null>(null)

// prettier-ignore
export const IconsContext = createContext<{
  feather:            boolean
  setFeather:         Dispatch<SetStateAction<boolean>>
  wkSocial:           boolean
  setWkSocial:        Dispatch<SetStateAction<boolean>>
  wkPayments:         boolean
  setWkPayments:      Dispatch<SetStateAction<boolean>>
  wkPaymentsValue:    WkPaymentsValue
  setWkPaymentsValue: Dispatch<SetStateAction<WkPaymentsValue>>
  icons:              (readonly [string, Icon])[] | undefined
  resetIcons: () => void
} | null>(null)

// prettier-ignore
export const IconPreferencesContext = createContext<{
  preferColor:    boolean
  setPreferColor: Dispatch<SetStateAction<boolean>>
  preferNames:    boolean
  setPreferNames: Dispatch<SetStateAction<boolean>>
  resetIconPrefs: () => void
} | null>(null)

export function SearchProvider({ children }: PropsWithChildren) {
	const [search, setSearch] = useParam({
		key: "search",
		initialValue: "",
		parser: value => value,
		serializer: canonicalize,
	})

	const [feather, setFeather] = useParamBoolean({ key: "feather", initialValue: FEATHER_DEFAULT })
	const [wkSocial, setWkSocial] = useParamBoolean({ key: "social", initialValue: WK_SOCIAL_DEFAULT })
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

	const [preferColor, setPreferColor] = useParamBoolean({ key: "prefer-color", initialValue: PREFER_COLOR_DEFAULT })
	const [preferNames, setPreferNames] = useParamBoolean({ key: "prefer-names", initialValue: PREFER_NAMES_DEFAULT })

	const icons = useQueryIcons({
		feather,
		wkSocial,
		wkPayments,
		wkPaymentsValue,
		preferColor,
	})

	const resetIcons = useCallback(() => {
		setFeather(FEATHER_DEFAULT)
		setWkSocial(WK_SOCIAL_DEFAULT)
		setWkPayments(WK_PAYMENTS_DEFAULT)
		setWkPaymentsValue(WK_PAYMENTS_VALUE_DEFAULT)
	}, [setFeather, setWkPayments, setWkPaymentsValue, setWkSocial])

	const resetIconPrefs = useCallback(() => {
		setPreferColor(PREFER_COLOR_DEFAULT)
		setPreferNames(PREFER_NAMES_DEFAULT)
	}, [setPreferColor, setPreferNames])

	return (
		<SearchContext.Provider
			value={useMemo(
				() => ({
					search,
					setSearch,
				}),
				[search, setSearch],
			)}
		>
			<IconsContext.Provider
				value={useMemo(
					() => ({
						feather,
						setFeather,
						wkSocial,
						setWkSocial,
						wkPayments,
						setWkPayments,
						wkPaymentsValue,
						setWkPaymentsValue,
						icons,
						resetIcons,
					}),
					// prettier-ignore
					[feather, icons, resetIcons, setFeather, setWkPayments, setWkPaymentsValue, setWkSocial, wkPayments, wkPaymentsValue, wkSocial],
				)}
			>
				<IconPreferencesContext.Provider
					value={useMemo(
						() => ({
							preferColor,
							setPreferColor,
							preferNames,
							setPreferNames,
							resetIconPrefs,
						}),
						[preferColor, preferNames, resetIconPrefs, setPreferColor, setPreferNames],
					)}
				>
					{children}
				</IconPreferencesContext.Provider>
			</IconsContext.Provider>
		</SearchContext.Provider>
	)
}
