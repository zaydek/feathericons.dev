import React from "react"

import { IconComponent } from "@/lib"
import { WkPaymentsValue } from "@/providers"
import { useQuery } from "@tanstack/react-query"

//// type ImportPath =
//// 	| "@icons/feather/tsx"
//// 	| "@icons/wolfkit/brands/mono/tsx"
//// 	| "@icons/wolfkit/brands/original/tsx"
//// 	| "@icons/wolfkit/payments/mono/tsx"
//// 	| "@icons/wolfkit/payments/mono-filled/tsx"
//// 	| "@icons/wolfkit/payments/original/tsx"
//// 	| "@icons/wolfkit/payments/original-filled/tsx"
////
//// export function createCache() {
//// 	const cache = new Map<ImportPath, Record<string, Icon>>()
//// 	async function read(path: ImportPath): Promise<Record<string, Icon>> {
//// 		if (cache.has(path)) {
//// 			return new Promise(resolve => resolve(cache.get(path)!))
//// 		}
//// 		switch (path) {
//// 			case "@icons/feather/tsx":
//// 				return import("@icons/feather/tsx").then(mod => {
//// 					cache.set(path, mod)
//// 					return mod
//// 				})
//// 			case "@icons/wolfkit/brands/mono/tsx":
//// 				return import("@icons/wolfkit/brands/mono/tsx").then(mod => {
//// 					cache.set(path, mod)
//// 					return mod
//// 				})
//// 			case "@icons/wolfkit/brands/original/tsx":
//// 				return import("@icons/wolfkit/brands/original/tsx").then(mod => {
//// 					cache.set(path, mod)
//// 					return mod
//// 				})
//// 			case "@icons/wolfkit/payments/mono/tsx":
//// 				return import("@icons/wolfkit/payments/mono/tsx").then(mod => {
//// 					cache.set(path, mod)
//// 					return mod
//// 				})
//// 			case "@icons/wolfkit/payments/mono-filled/tsx":
//// 				return import("@icons/wolfkit/payments/mono-filled/tsx").then(mod => {
//// 					cache.set(path, mod)
//// 					return mod
//// 				})
//// 			case "@icons/wolfkit/payments/original/tsx":
//// 				return import("@icons/wolfkit/payments/original/tsx").then(mod => {
//// 					cache.set(path, mod)
//// 					return mod
//// 				})
//// 			case "@icons/wolfkit/payments/original-filled/tsx":
//// 				return import("@icons/wolfkit/payments/original-filled/tsx").then(mod => {
//// 					cache.set(path, mod)
//// 					return mod
//// 				})
//// 		}
//// 	}
//// 	return read
//// }
////
//// const read = createCache()

export async function fetchIconsets(
	iconsets: {
		feather: boolean
		wkBrands: boolean
		wkPayments: boolean
		wkPaymentsValue: WkPaymentsValue
	},
	preferColor: boolean,
) {
	const chain: Promise<Record<string, IconComponent>>[] = []
	if (iconsets.feather) {
		chain.push(import("@icons/feather/tsx"))
	}
	if (iconsets.wkBrands) {
		if (preferColor) {
			chain.push(import("@icons/wk/brands/original/tsx"))
		} else {
			chain.push(import("@icons/wk/brands/mono/tsx"))
		}
	}
	if (iconsets.wkPayments) {
		if (preferColor) {
			if (iconsets.wkPaymentsValue === "normal") {
				chain.push(import("@icons/wk/payments/original/tsx"))
			} else {
				chain.push(import("@icons/wk/payments/original-filled/tsx"))
			}
		} else {
			if (iconsets.wkPaymentsValue === "normal") {
				chain.push(import("@icons/wk/payments/mono/tsx"))
			} else {
				chain.push(import("@icons/wk/payments/mono-filled/tsx"))
			}
		}
	}
	const resolved = await Promise.all(chain)
	return resolved.map(mod => Object.entries(mod)).flat()
}

export function useQueryIcons({
	feather,
	wkBrands,
	wkPayments,
	wkPaymentsValue,
	preferColor,
}: {
	feather: boolean
	wkBrands: boolean
	wkPayments: boolean
	wkPaymentsValue: WkPaymentsValue
	preferColor: boolean
}) {
	const { data, refetch } = useQuery(["iconsets"], () =>
		fetchIconsets({ feather, wkBrands: wkBrands, wkPayments, wkPaymentsValue }, preferColor),
	)
	// When dependencies change...
	const refretchDeps = React.useMemo(
		() => [feather, wkBrands, wkPayments, wkPaymentsValue, preferColor],
		[feather, preferColor, wkBrands, wkPayments, wkPaymentsValue],
	)
	// ...refetch
	React.useEffect(() => {
		refetch()
	}, [refetch, refretchDeps])
	return data
}
