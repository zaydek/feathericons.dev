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

const FEATHER_DEFAULT                  = !!1 // prettier-ignore
const BRANDS_MONOCHROME_DEFAULT        = !!0 // prettier-ignore
const BRANDS_ORIGINAL_DEFAULT          = !!1 // prettier-ignore
const BRANDS_ORIGINAL_CIRCLE_DEFAULT   = !!0 // prettier-ignore
const BRANDS_ORIGINAL_SQUARE_DEFAULT   = !!0 // prettier-ignore
const PAYMENTS_MONOCHROME_DEFAULT      = !!0 // prettier-ignore
const PAYMENTS_ORIGINAL_DEFAULT        = !!0 // prettier-ignore
const PAYMENTS_ORIGINAL_FILLED_DEFAULT = !!1 // prettier-ignore

// prettier-ignore
export const SearchContext =
	createContext<{
		search:                        string
		setSearch:                     Dispatch<SetStateAction<string>>
		showFeather:                   boolean
		setShowFeather:                Dispatch<SetStateAction<boolean>>
		brandsMonochrome:              boolean
		setBrandsMonochrome:           Dispatch<SetStateAction<boolean>>
		showBrandsOriginal:            boolean
		setShowBrandsOriginal:         Dispatch<SetStateAction<boolean>>
		showBrandsOriginalCircle:      boolean
		setShowBrandsOriginalCircle:   Dispatch<SetStateAction<boolean>>
		showBrandsOriginalSquare:      boolean
		setShowBrandsOriginalSquare:   Dispatch<SetStateAction<boolean>>
		paymentsMonochrome:            boolean
		setPaymentsMonochrome:         Dispatch<SetStateAction<boolean>>
		showPaymentsOriginal:          boolean
		setShowPaymentsOriginal:       Dispatch<SetStateAction<boolean>>
		showPaymentsOriginalFilled:    boolean
		setShowPaymentsOriginalFilled: Dispatch<SetStateAction<boolean>>
		resetAll:                      () => void
		results:                       (readonly [string[], LazyExoticComponent<any>])[]
	} | null>(null)

//// const svgPlaceholder = detab(`
//// 	<!-- https://feathericons.dev/feather -->
//// 	<svg class="feather feather-feather" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
//// 		<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
//// 		<line x1="16" x2="2" y1="8" y2="22"></line>
//// 		<line x1="17.5" x2="9" y1="15" y2="15"></line>
//// 	</svg>
//// `)
////
//// const jsxPlaceholder = detab(`
//// 	// https://feathericons.dev/feather
//// 	export function Feather(props) {
//// 		return (
//// 			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" {...props}>
//// 				<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
//// 				<line x1="16" x2="2" y1="8" y2="22" />
//// 				<line x1="17.5" x2="9" y1="15" y2="15" />
//// 			</svg>
//// 		);
//// 	}
//// `)
////
//// const tsxPlaceholder = detab(`
//// 	// https://feathericons.dev/feather
//// 	export function Feather(props: JSX.IntrinsicElements["svg"]) {
//// 		return (
//// 			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" {...props}>
//// 				<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
//// 				<line x1="16" x2="2" y1="8" y2="22" />
//// 				<line x1="17.5" x2="9" y1="15" y2="15" />
//// 			</svg>
//// 		);
//// 	}
//// `)

const cache = createCache()

const parser = (value: string) => value === "1"
const serializer = (value: boolean) => (value ? "1" : "0")

export function SearchProvider({ children }: PropsWithChildren) {
	const [search, setSearch] = useParam({ key: "search", initialValue: "", parser: value => value })

	const [showFeather, setShowFeather] = useParam({
		key: "feather",
		initialValue: FEATHER_DEFAULT,
		parser,
		serializer,
	})
	const [brandsMonochrome, setBrandsMonochrome] = useParam({
		key: "brands-monochrome",
		initialValue: BRANDS_MONOCHROME_DEFAULT,
		parser,
		serializer,
	})
	const [showBrandsOriginal, setShowBrandsOriginal] = useParam({
		key: "brands-original",
		initialValue: BRANDS_ORIGINAL_DEFAULT,
		parser,
		serializer,
	})
	const [showBrandsOriginalCircle, setShowBrandsOriginalCircle] = useParam({
		key: "brands-original-circle",
		initialValue: BRANDS_ORIGINAL_CIRCLE_DEFAULT,
		parser,
		serializer,
	})
	const [showBrandsOriginalSquare, setShowBrandsOriginalSquare] = useParam({
		key: "brands-original-square",
		initialValue: BRANDS_ORIGINAL_SQUARE_DEFAULT,
		parser,
		serializer,
	})
	const [paymentsMonochrome, setPaymentsMonochrome] = useParam({
		key: "payments-monochrome",
		initialValue: PAYMENTS_MONOCHROME_DEFAULT,
		parser,
		serializer,
	})
	const [showPaymentsOriginal, setShowPaymentsOriginal] = useParam({
		key: "payments-original",
		initialValue: PAYMENTS_ORIGINAL_DEFAULT,
		parser,
		serializer,
	})
	const [showPaymentsOriginalFilled, setShowPaymentsOriginalFilled] = useParam({
		key: "payments-original-filled",
		initialValue: PAYMENTS_ORIGINAL_FILLED_DEFAULT,
		parser,
		serializer,
	})

	const resetAll = useCallback(() => {
		setShowFeather(FEATHER_DEFAULT)
		setShowBrandsOriginal(BRANDS_ORIGINAL_DEFAULT)
		setShowBrandsOriginalCircle(BRANDS_ORIGINAL_CIRCLE_DEFAULT)
		setShowBrandsOriginalSquare(BRANDS_ORIGINAL_SQUARE_DEFAULT)
		setShowPaymentsOriginal(PAYMENTS_ORIGINAL_DEFAULT)
		setShowPaymentsOriginalFilled(PAYMENTS_ORIGINAL_FILLED_DEFAULT)
	}, [
		setShowBrandsOriginal,
		setShowBrandsOriginalCircle,
		setShowBrandsOriginalSquare,
		setShowFeather,
		setShowPaymentsOriginal,
		setShowPaymentsOriginalFilled,
	])

	const results = useMemo(() => {
		const results: (readonly [string[], LazyExoticComponent<any>])[] = []
		if (showFeather) results.push(cache.get("feather")[1])
		if (brandsMonochrome) {
			if (showBrandsOriginal) {
				results.push(cache.get("wolfkit-brands-mono")[1])
			} else if (showBrandsOriginalCircle) {
				results.push(cache.get("wolfkit-brands-mono-circle")[1])
			} else if (showBrandsOriginalSquare) {
				results.push(cache.get("wolfkit-brands-mono-square")[1])
			}
		} else {
			if (showBrandsOriginal) {
				results.push(cache.get("wolfkit-brands-original")[1])
			} else if (showBrandsOriginalCircle) {
				results.push(cache.get("wolfkit-brands-original-circle")[1])
			} else if (showBrandsOriginalSquare) {
				results.push(cache.get("wolfkit-brands-original-square")[1])
			}
		}
		if (paymentsMonochrome) {
			if (showPaymentsOriginal) {
				results.push(cache.get("wolfkit-payments-mono")[1])
			} else if (showPaymentsOriginalFilled) {
				results.push(cache.get("wolfkit-payments-mono-filled")[1])
			}
		} else {
			if (showPaymentsOriginal) {
				results.push(cache.get("wolfkit-payments-original")[1])
			} else if (showPaymentsOriginalFilled) {
				results.push(cache.get("wolfkit-payments-original-filled")[1])
			}
		}
		return results
	}, [
		brandsMonochrome,
		paymentsMonochrome,
		showBrandsOriginal,
		showBrandsOriginalCircle,
		showBrandsOriginalSquare,
		showFeather,
		showPaymentsOriginal,
		showPaymentsOriginalFilled,
	])

	return (
		<SearchContext.Provider
			value={{
				search,
				setSearch,
				showFeather,
				setShowFeather,
				brandsMonochrome,
				setBrandsMonochrome,
				showBrandsOriginal,
				setShowBrandsOriginal,
				showBrandsOriginalCircle,
				setShowBrandsOriginalCircle,
				showBrandsOriginalSquare,
				setShowBrandsOriginalSquare,
				paymentsMonochrome,
				setPaymentsMonochrome,
				showPaymentsOriginal,
				setShowPaymentsOriginal,
				showPaymentsOriginalFilled,
				setShowPaymentsOriginalFilled,
				resetAll,
				results,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
