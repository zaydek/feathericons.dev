import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useEffect, useMemo } from "react"
import { useParameterState } from "./use-parameter-state"

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
		toggleAllBrands:         () => void
		toggleAllPayments:       () => void
	} | null>(null)

export function SearchProvider({ children }: PropsWithChildren) {
	const [search, setSearch] = useParameterState({ key: "search", initialValue: "", parser: value => value })

	const [showFeather, setShowFeather] = useParameterState({
		key: "feather",
		initialValue: true,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})
	const [showBrandsOriginal, setShowBrandsOriginal] = useParameterState({
		key: "brands-original",
		initialValue: true,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})
	const [showBrandsCircle, setShowBrandsCircle] = useParameterState({
		key: "brands-circle",
		initialValue: false,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})
	const [showBrandsSquare, setShowBrandsSquare] = useParameterState({
		key: "brands-square",
		initialValue: false,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})
	const [showPaymentsOriginal, setShowPaymentsOriginal] = useParameterState({
		key: "payments-original",
		initialValue: true,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})
	const [showPaymentsFilled, setShowPaymentsFilled] = useParameterState({
		key: "payments-filled",
		initialValue: false,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})

	const toggleAllBrands = useCallback(() => {
		const every = showBrandsOriginal && showBrandsCircle && showBrandsSquare
		for (const set of [setShowBrandsOriginal, setShowBrandsCircle, setShowBrandsSquare]) {
			set(!every)
		}
	}, [setShowBrandsCircle, setShowBrandsOriginal, setShowBrandsSquare, showBrandsCircle, showBrandsOriginal, showBrandsSquare])

	const toggleAllPayments = useCallback(() => {
		const every = showPaymentsOriginal && showPaymentsFilled
		for (const set of [setShowPaymentsOriginal, setShowPaymentsFilled]) {
			set(!every)
		}
	}, [setShowPaymentsFilled, setShowPaymentsOriginal, showPaymentsFilled, showPaymentsOriginal])

	// Shorten title on mount
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
					toggleAllBrands,
					toggleAllPayments,
				}),
				// prettier-ignore
				[search, setSearch, setShowBrandsCircle, setShowBrandsOriginal, setShowBrandsSquare, setShowFeather, setShowPaymentsFilled, setShowPaymentsOriginal, showBrandsCircle, showBrandsOriginal, showBrandsSquare, showFeather, showPaymentsFilled, showPaymentsOriginal, toggleAllBrands, toggleAllPayments],
			)}
		>
			{children}
		</SearchContext.Provider>
	)
}
