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
import { useParam } from "./use-param"

const FEATHER_DEFAULT                  = !!1 // prettier-ignore
const BRANDS_ORIGINAL_DEFAULT          = !!1 // prettier-ignore
const BRANDS_ORIGINAL_CIRCLE_DEFAULT   = !!0 // prettier-ignore
const BRANDS_ORIGINAL_SQUARE_DEFAULT   = !!0 // prettier-ignore
//// const BRANDS_MONO_DEFAULT              = !!1 // prettier-ignore
//// const BRANDS_MONO_CIRCLE_DEFAULT       = !!0 // prettier-ignore
//// const BRANDS_MONO_SQUARE_DEFAULT       = !!0 // prettier-ignore
const PAYMENTS_ORIGINAL_DEFAULT        = !!0 // prettier-ignore
const PAYMENTS_ORIGINAL_FILLED_DEFAULT = !!1 // prettier-ignore
//// const PAYMENTS_MONO_DEFAULT            = !!0 // prettier-ignore
//// const PAYMENTS_MONO_FILLED_DEFAULT     = !!1 // prettier-ignore

// prettier-ignore
export const SearchContext =
	createContext<{
		search:                        string
		setSearch:                     Dispatch<SetStateAction<string>>
		showFeather:                   boolean
		setShowFeather:                Dispatch<SetStateAction<boolean>>
		showBrandsOriginal:            boolean
		setShowBrandsOriginal:         Dispatch<SetStateAction<boolean>>
		showBrandsOriginalCircle:      boolean
		setShowBrandsOriginalCircle:   Dispatch<SetStateAction<boolean>>
		showBrandsOriginalSquare:      boolean
		setShowBrandsOriginalSquare:   Dispatch<SetStateAction<boolean>>
		//// showBrandsMono:                boolean
		//// setShowBrandsMono:             Dispatch<SetStateAction<boolean>>
		//// showBrandsMonoCircle:          boolean
		//// setShowBrandsMonoCircle:       Dispatch<SetStateAction<boolean>>
		//// showBrandsMonoSquare:          boolean
		//// setShowBrandsMonoSquare:       Dispatch<SetStateAction<boolean>>
		showPaymentsOriginal:          boolean
		setShowPaymentsOriginal:       Dispatch<SetStateAction<boolean>>
		showPaymentsOriginalFilled:    boolean
		setShowPaymentsOriginalFilled: Dispatch<SetStateAction<boolean>>
		//// showPaymentsMono:              boolean
		//// setShowPaymentsMono:           Dispatch<SetStateAction<boolean>>
		//// showPaymentsMonoFilled:        boolean
		//// setShowPaymentsMonoFilled:     Dispatch<SetStateAction<boolean>>
		resetAll:                      () => void
		toggleAllBrandsOriginal:       () => void
		//// toggleAllBrandsMono:           () => void
		toggleAllPaymentsOriginal:     () => void
		//// toggleAllPaymentsMono:         () => void
		results:                       (readonly [string[], LazyExoticComponent<any>])[]
	} | null>(null)

const cache = createCache()

export function SearchProvider({ children }: PropsWithChildren) {
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
	const [showBrandsOriginalCircle, setShowBrandsOriginalCircle] = useParam({
		key: "brands-original-circle",
		initialValue: BRANDS_ORIGINAL_CIRCLE_DEFAULT,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})
	const [showBrandsOriginalSquare, setShowBrandsOriginalSquare] = useParam({
		key: "brands-original-square",
		initialValue: BRANDS_ORIGINAL_SQUARE_DEFAULT,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})
	//// const [showBrandsMono, setShowBrandsMono] = useParam({
	//// 	key: "brands-mono",
	//// 	initialValue: BRANDS_MONO_DEFAULT,
	//// 	parser: value => value === "1",
	//// 	serializer: value => (value ? "1" : "0"),
	//// })
	//// const [showBrandsMonoCircle, setShowBrandsMonoCircle] = useParam({
	//// 	key: "brands-mono-circle",
	//// 	initialValue: BRANDS_MONO_CIRCLE_DEFAULT,
	//// 	parser: value => value === "1",
	//// 	serializer: value => (value ? "1" : "0"),
	//// })
	//// const [showBrandsMonoSquare, setShowBrandsMonoSquare] = useParam({
	//// 	key: "brands-mono-square",
	//// 	initialValue: BRANDS_MONO_SQUARE_DEFAULT,
	//// 	parser: value => value === "1",
	//// 	serializer: value => (value ? "1" : "0"),
	//// })
	const [showPaymentsOriginal, setShowPaymentsOriginal] = useParam({
		key: "payments-original",
		initialValue: PAYMENTS_ORIGINAL_DEFAULT,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})
	const [showPaymentsOriginalFilled, setShowPaymentsOriginalFilled] = useParam({
		key: "payments-original-filled",
		initialValue: PAYMENTS_ORIGINAL_FILLED_DEFAULT,
		parser: value => value === "1",
		serializer: value => (value ? "1" : "0"),
	})
	//// const [showPaymentsMono, setShowPaymentsMono] = useParam({
	//// 	key: "payments-mono",
	//// 	initialValue: PAYMENTS_MONO_DEFAULT,
	//// 	parser: value => value === "1",
	//// 	serializer: value => (value ? "1" : "0"),
	//// })
	//// const [showPaymentsMonoFilled, setShowPaymentsMonoFilled] = useParam({
	//// 	key: "payments-mono-filled",
	//// 	initialValue: PAYMENTS_MONO_FILLED_DEFAULT,
	//// 	parser: value => value === "1",
	//// 	serializer: value => (value ? "1" : "0"),
	//// })

	const resetAll = useCallback(() => {
		setShowFeather(FEATHER_DEFAULT)
		setShowBrandsOriginal(BRANDS_ORIGINAL_DEFAULT)
		setShowBrandsOriginalCircle(BRANDS_ORIGINAL_CIRCLE_DEFAULT)
		setShowBrandsOriginalSquare(BRANDS_ORIGINAL_SQUARE_DEFAULT)
		//// setShowBrandsMono(BRANDS_MONO_DEFAULT)
		//// setShowBrandsMonoCircle(BRANDS_MONO_CIRCLE_DEFAULT)
		//// setShowBrandsMonoSquare(BRANDS_MONO_SQUARE_DEFAULT)
		setShowPaymentsOriginal(PAYMENTS_ORIGINAL_DEFAULT)
		setShowPaymentsOriginalFilled(PAYMENTS_ORIGINAL_FILLED_DEFAULT)
		//// setShowPaymentsMono(PAYMENTS_MONO_DEFAULT)
		//// setShowPaymentsMonoFilled(PAYMENTS_MONO_FILLED_DEFAULT)
	}, [
		setShowBrandsOriginal,
		setShowBrandsOriginalCircle,
		setShowBrandsOriginalSquare,
		setShowFeather,
		setShowPaymentsOriginal,
		setShowPaymentsOriginalFilled,
	])

	const toggleAllBrandsOriginal = useCallback(() => {
		const every = showBrandsOriginal && showBrandsOriginalCircle && showBrandsOriginalSquare
		setShowBrandsOriginal(!every)
		setShowBrandsOriginalCircle(!every)
		setShowBrandsOriginalSquare(!every)
	}, [
		setShowBrandsOriginal,
		setShowBrandsOriginalCircle,
		setShowBrandsOriginalSquare,
		showBrandsOriginal,
		showBrandsOriginalCircle,
		showBrandsOriginalSquare,
	])

	//// const toggleAllBrandsMono = useCallback(() => {
	//// 	const every = showBrandsMono && showBrandsMonoCircle && showBrandsMonoSquare
	//// 	setShowBrandsMono(!every)
	//// 	setShowBrandsMonoCircle(!every)
	//// 	setShowBrandsMonoSquare(!every)
	//// }, [setShowBrandsMono, setShowBrandsMonoCircle, setShowBrandsMonoSquare, showBrandsMono, showBrandsMonoCircle, showBrandsMonoSquare])

	const toggleAllPaymentsOriginal = useCallback(() => {
		const every = showPaymentsOriginal && showPaymentsOriginalFilled
		setShowPaymentsOriginal(!every)
		setShowPaymentsOriginalFilled(!every)
	}, [setShowPaymentsOriginal, setShowPaymentsOriginalFilled, showPaymentsOriginal, showPaymentsOriginalFilled])

	//// const toggleAllPaymentsMono = useCallback(() => {
	//// 	const every = showPaymentsMono && showPaymentsMonoFilled
	//// 	setShowPaymentsMono(!every)
	//// 	setShowPaymentsMonoFilled(!every)
	//// }, [setShowPaymentsMono, setShowPaymentsMonoFilled, showPaymentsMono, showPaymentsMonoFilled])

	// prettier-ignore
	const results = useMemo(() => {
		const results: (readonly [string[], LazyExoticComponent<any>])[] = []
		if (showFeather)                results.push(cache.get("feather")[1])
		if (showBrandsOriginal)         results.push(cache.get("wolfkit-brands-original")[1])
		if (showBrandsOriginalCircle)   results.push(cache.get("wolfkit-brands-original-circle")[1])
		if (showBrandsOriginalSquare)   results.push(cache.get("wolfkit-brands-original-square")[1])
		//// if (showBrandsMono)             results.push(cache.get("wolfkit-brands-mono")[1])
		//// if (showBrandsMonoCircle)       results.push(cache.get("wolfkit-brands-mono-circle")[1])
		//// if (showBrandsMonoSquare)       results.push(cache.get("wolfkit-brands-mono-square")[1])
		if (showPaymentsOriginal)       results.push(cache.get("wolfkit-payments-original")[1])
		if (showPaymentsOriginalFilled) results.push(cache.get("wolfkit-payments-original-filled")[1])
		//// if (showPaymentsMono)           results.push(cache.get("wolfkit-payments-mono")[1])
		//// if (showPaymentsMonoFilled)     results.push(cache.get("wolfkit-payments-mono-filled")[1])
		return results
	}, [showBrandsOriginal, showBrandsOriginalCircle, showBrandsOriginalSquare, showFeather, showPaymentsOriginal, showPaymentsOriginalFilled])

	return (
		<SearchContext.Provider
			value={{
				search,
				setSearch,
				showFeather,
				setShowFeather,
				showBrandsOriginal,
				setShowBrandsOriginal,
				showBrandsOriginalCircle,
				setShowBrandsOriginalCircle,
				showBrandsOriginalSquare,
				setShowBrandsOriginalSquare,
				//// showBrandsMono,
				//// setShowBrandsMono,
				//// showBrandsMonoCircle,
				//// setShowBrandsMonoCircle,
				//// showBrandsMonoSquare,
				//// setShowBrandsMonoSquare,
				showPaymentsOriginal,
				setShowPaymentsOriginal,
				showPaymentsOriginalFilled,
				setShowPaymentsOriginalFilled,
				//// showPaymentsMono,
				//// setShowPaymentsMono,
				//// showPaymentsMonoFilled,
				//// setShowPaymentsMonoFilled,
				resetAll,
				toggleAllBrandsOriginal,
				//// toggleAllBrandsMono,
				toggleAllPaymentsOriginal,
				//// toggleAllPaymentsMono,
				results,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
