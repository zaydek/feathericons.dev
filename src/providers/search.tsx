import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useMemo } from "react"
import { useParamState } from "./use-param-state"

// prettier-ignore
export const SearchContext =
	createContext<{
		search:                  string
		setSearch:               Dispatch<SetStateAction<string>>
		showFeather:             boolean
		setShowFeather:          Dispatch<SetStateAction<boolean>>
		showBrandsOriginal:      boolean
		setShowBrandsOriginal:   Dispatch<SetStateAction<boolean>>
		showBrandsCircle:        boolean
		setShowBrandsCircle:     Dispatch<SetStateAction<boolean>>
		showBrandsSquare:        boolean
		setShowBrandsSquare:     Dispatch<SetStateAction<boolean>>
		showPaymentsOriginal:    boolean
		setShowPaymentsOriginal: Dispatch<SetStateAction<boolean>>
		showPaymentsFilled:      boolean
		setShowPaymentsFilled:   Dispatch<SetStateAction<boolean>>
	} | null>(null)

export function SearchProvider({ children }: PropsWithChildren) {
	const [search, setSearch] = useParamState({ key: "search", initialValue: "" })

	const [showFeather, setShowFeather] = useParamState({ key: "feather", initialValue: true })
	const [showBrandsOriginal, setShowBrandsOriginal] = useParamState({ key: "brands-original", initialValue: true })
	const [showBrandsCircle, setShowBrandsCircle] = useParamState({ key: "brands-circle", initialValue: false })
	const [showBrandsSquare, setShowBrandsSquare] = useParamState({ key: "brands-square", initialValue: false })
	const [showPaymentsOriginal, setShowPaymentsOriginal] = useParamState({ key: "payments-original", initialValue: true })
	const [showPaymentsFilled, setShowPaymentsFilled] = useParamState({ key: "payments-filled", initialValue: false })

	// TODO
	useEffect(() => {
		document.title = "Feather"
	}, [])

	return (
		<SearchContext.Provider
			value={useMemo(
				() => ({
					search,
					setSearch,
					showFeather,
					setShowFeather,
					showBrandsOriginal,
					setShowBrandsOriginal,
					showBrandsCircle,
					setShowBrandsCircle,
					showBrandsSquare,
					setShowBrandsSquare,
					showPaymentsOriginal,
					setShowPaymentsOriginal,
					showPaymentsFilled,
					setShowPaymentsFilled,
				}),
				[
					search,
					setSearch,
					setShowBrandsCircle,
					setShowBrandsOriginal,
					setShowBrandsSquare,
					setShowFeather,
					setShowPaymentsFilled,
					setShowPaymentsOriginal,
					showBrandsCircle,
					showBrandsOriginal,
					showBrandsSquare,
					showFeather,
					showPaymentsFilled,
					showPaymentsOriginal,
				],
			)}
		>
			{children}
		</SearchContext.Provider>
	)
}
