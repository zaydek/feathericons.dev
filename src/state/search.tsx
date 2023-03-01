import { createContext, Dispatch, LazyExoticComponent, PropsWithChildren, SetStateAction, useCallback, useContext, useMemo } from "react"
import { ProgressBarContext } from "./progress-bar"
import { createCache } from "./search-cache"
import { useParam } from "./use-param"

const FEATHER_DEFAULT           = true // prettier-ignore
const BRANDS_ORIGINAL_DEFAULT   = true // prettier-ignore
const BRANDS_CIRCLE_DEFAULT     = false // prettier-ignore
const BRANDS_SQUARE_DEFAULT     = false // prettier-ignore
const PAYMENTS_ORIGINAL_DEFAULT = true // prettier-ignore
const PAYMENTS_FILLED_DEFAULT   = false // prettier-ignore

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
		resetAll:                () => void
		toggleAllBrands:         () => void
		toggleAllPayments:       () => void
		results:                 (readonly [string[], LazyExoticComponent<any>])[]
	} | null>(null)

const cache = createCache()

export function SearchProvider({ children }: PropsWithChildren) {
	const { setStarted } = useContext(ProgressBarContext)!

	const [search, setSearch] = useParam({ key: "search", initialValue: "", parser: value => value })

	const [showFeather, setShowFeather] = useParam({
		key: "feather",
		initialValue: FEATHER_DEFAULT,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})
	const [showBrandsOriginal, setShowBrandsOriginal] = useParam({
		key: "brands-original",
		initialValue: BRANDS_ORIGINAL_DEFAULT,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})
	const [showBrandsCircle, setShowBrandsCircle] = useParam({
		key: "brands-circle",
		initialValue: BRANDS_CIRCLE_DEFAULT,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})
	const [showBrandsSquare, setShowBrandsSquare] = useParam({
		key: "brands-square",
		initialValue: BRANDS_SQUARE_DEFAULT,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})
	const [showPaymentsOriginal, setShowPaymentsOriginal] = useParam({
		key: "payments-original",
		initialValue: PAYMENTS_ORIGINAL_DEFAULT,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})
	const [showPaymentsFilled, setShowPaymentsFilled] = useParam({
		key: "payments-filled",
		initialValue: PAYMENTS_FILLED_DEFAULT,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})

	const resetAll = useCallback(() => {
		setShowFeather(FEATHER_DEFAULT)
		setShowBrandsOriginal(BRANDS_ORIGINAL_DEFAULT)
		setShowBrandsCircle(BRANDS_CIRCLE_DEFAULT)
		setShowBrandsSquare(BRANDS_SQUARE_DEFAULT)
		setShowPaymentsOriginal(PAYMENTS_ORIGINAL_DEFAULT)
		setShowPaymentsFilled(PAYMENTS_FILLED_DEFAULT)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const toggleAllBrands = useCallback(() => {
		const every = showBrandsOriginal && showBrandsCircle && showBrandsSquare
		for (const setState of [setShowBrandsOriginal, setShowBrandsCircle, setShowBrandsSquare]) {
			setState(!every)
		}
	}, [setShowBrandsCircle, setShowBrandsOriginal, setShowBrandsSquare, showBrandsCircle, showBrandsOriginal, showBrandsSquare])

	const toggleAllPayments = useCallback(() => {
		const every = showPaymentsOriginal && showPaymentsFilled
		for (const setState of [setShowPaymentsOriginal, setShowPaymentsFilled]) {
			setState(!every)
		}
	}, [setShowPaymentsFilled, setShowPaymentsOriginal, showPaymentsFilled, showPaymentsOriginal])

	const results = useMemo(() => {
		const results: (readonly [string[], LazyExoticComponent<any>])[] = []
		if (showFeather) {
			results.push(cache.get("@icons/feather"))
		}
		// TODO: Make more granular
		const someBrands = showBrandsOriginal || showBrandsCircle || showBrandsSquare
		if (someBrands) {
			results.push(cache.get("@icons/wolf-kit/brands"))
		}
		// TODO: Make more granular
		const somePayments = showPaymentsOriginal || showPaymentsFilled
		if (somePayments) {
			results.push(cache.get("@icons/wolf-kit/payments"))
		}
		return results
	}, [showBrandsCircle, showBrandsOriginal, showBrandsSquare, showFeather, showPaymentsFilled, showPaymentsOriginal])

	//// const [pending, startTransition] = useTransition()
	////
	//// useEffect(() => {
	//// 	startTransition(() => {
	//// 		setStarted(pending)
	//// 		window.setTimeout(() => {
	//// 			setStarted(false)
	//// 		}, 1e3)
	//// 	})
	//// }, [results])

	//// useEffect(() => {
	//// 	window.addEventListener("keydown", e => {
	//// 		if (e.key === "d") {
	//// 			setStarted(true)
	//// 			const d = window.setTimeout(() => {
	//// 				setStarted(false)
	//// 			}, 1e3)
	//// 			return () => window.clearTimeout(d)
	//// 		}
	//// 	})
	//// }, [setStarted])

	////
	//// const setIconset = useCallback((iconset: IconsetValue) => {
	//// 	const transition = cache.has(iconset)
	//// 		? (fn: () => void) => fn()
	//// 		: startTransition
	//// 	transition(() => {
	//// 		_setIconset(iconset)
	//// 	})
	//// }, [_setIconset])

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
					resetAll,
					toggleAllBrands,
					toggleAllPayments,
					results,
				}),
				// prettier-ignore
				[resetAll, results, search, setSearch, setShowBrandsCircle, setShowBrandsOriginal, setShowBrandsSquare, setShowFeather, setShowPaymentsFilled, setShowPaymentsOriginal, showBrandsCircle, showBrandsOriginal, showBrandsSquare, showFeather, showPaymentsFilled, showPaymentsOriginal, toggleAllBrands, toggleAllPayments],
			)}
		>
			{children}
		</SearchContext.Provider>
	)
}
