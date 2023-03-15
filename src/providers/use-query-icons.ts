import React from "react"

import { IconComponent } from "@/lib"
import { WkPaymentsValue } from "@/providers"
import { useQuery } from "@tanstack/react-query"

type ImportPath =
	| "@icons/feather/tsx"
	| "@icons/wk/brands/mono/tsx"
	| "@icons/wk/brands/original/tsx"
	| "@icons/wk/payments/mono/tsx"
	| "@icons/wk/payments/mono-filled/tsx"
	| "@icons/wk/payments/original/tsx"
	| "@icons/wk/payments/original-filled/tsx"

export function createCache() {
	const cache = new Map<ImportPath, Record<string, IconComponent>>()
	async function read(...args: ImportPath[]) {
		let cached = true
		const chain: Promise<Record<string, IconComponent>>[] = []
		for (const arg of args) {
			if (cache.has(arg)) {
				chain.push(new Promise(resolve => resolve(cache.get(arg)!)))
				continue
			}
			cached = false
			switch (arg) {
				case "@icons/feather/tsx":
					chain.push(import("@icons/feather/tsx"))
					break
				case "@icons/wk/brands/mono/tsx":
					chain.push(import("@icons/wk/brands/mono/tsx"))
					break
				case "@icons/wk/brands/original/tsx":
					chain.push(import("@icons/wk/brands/original/tsx"))
					break
				case "@icons/wk/payments/mono/tsx":
					chain.push(import("@icons/wk/payments/mono/tsx"))
					break
				case "@icons/wk/payments/mono-filled/tsx":
					chain.push(import("@icons/wk/payments/mono-filled/tsx"))
					break
				case "@icons/wk/payments/original/tsx":
					chain.push(import("@icons/wk/payments/original/tsx"))
					break
				case "@icons/wk/payments/original-filled/tsx":
					chain.push(import("@icons/wk/payments/original-filled/tsx"))
					break
			}
		}
		const done = await Promise.all(chain)
		for (const [index, path] of args.entries()) {
			cache.set(path, done[index])
		}
		const normalized = done.reduce<[string, IconComponent][]>((acc, sum) => {
			for (const entry of Object.entries(sum)) {
				acc.push(entry)
			}
			return acc
		}, [])
		return [cached, normalized] as const
	}
	return { read }
}

//// async function run() {
//// 	const { read } = createCache()
//// 	console.log(await read("@icons/feather/tsx"))
//// }
//// run()

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
