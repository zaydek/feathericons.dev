import { Icon } from "@/lib"
import { WkPaymentsValue } from "@/state"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"

//// type ImportPath =
//// 	| "@icons/feather/tsx"
//// 	| "@icons/wolfkit/social/mono/tsx"
//// 	| "@icons/wolfkit/social/original/tsx"
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
//// 			case "@icons/wolfkit/social/mono/tsx":
//// 				return import("@icons/wolfkit/social/mono/tsx").then(mod => {
//// 					cache.set(path, mod)
//// 					return mod
//// 				})
//// 			case "@icons/wolfkit/social/original/tsx":
//// 				return import("@icons/wolfkit/social/original/tsx").then(mod => {
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
		wkSocial: boolean
		wkPayments: boolean
		wkPaymentsValue: WkPaymentsValue
	},
	preferColor: boolean,
) {
	const promises: Promise<Record<string, Icon>>[] = []
	if (iconsets.feather) {
		promises.push(import("@icons/feather/tsx"))
	}
	if (iconsets.wkSocial) {
		if (preferColor) {
			promises.push(import("@icons/wolfkit/social/original/tsx"))
		} else {
			promises.push(import("@icons/wolfkit/social/mono/tsx"))
		}
	}
	if (iconsets.wkPayments) {
		if (preferColor) {
			if (iconsets.wkPaymentsValue === "normal") {
				promises.push(import("@icons/wolfkit/payments/original-filled/tsx"))
			} else {
				promises.push(import("@icons/wolfkit/payments/original/tsx"))
			}
		} else {
			if (iconsets.wkPaymentsValue === "normal") {
				promises.push(import("@icons/wolfkit/payments/mono-filled/tsx"))
			} else {
				promises.push(import("@icons/wolfkit/payments/mono/tsx"))
			}
		}
	}
	const resolved = await Promise.all(promises)
	return resolved.map(mod => Object.entries(mod)).flat()
}

export function useQueryIcons({
	feather,
	wkSocial,
	wkPayments,
	wkPaymentsValue,
	preferColor,
}: {
	feather: boolean
	wkSocial: boolean
	wkPayments: boolean
	wkPaymentsValue: WkPaymentsValue
	preferColor: boolean
}) {
	const { data, refetch } = useQuery(["iconsets"], () =>
		fetchIconsets({ feather, wkSocial, wkPayments, wkPaymentsValue }, preferColor),
	)
	// When dependencies change...
	const refretchDeps = useMemo(
		() => [feather, wkSocial, wkPayments, wkPaymentsValue, preferColor],
		[feather, preferColor, wkPayments, wkPaymentsValue, wkSocial],
	)
	// ...refetch
	useEffect(() => {
		refetch()
	}, [refetch, refretchDeps])
	return data
}
