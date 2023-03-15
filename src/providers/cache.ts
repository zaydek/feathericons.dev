import { IconComponent } from "@/lib"
import { WkPaymentsValue } from "@/providers"

export type IconAliasPath =
	| "@icons/feather/tsx"
	| "@icons/wk/brands/mono/tsx"
	| "@icons/wk/brands/original/tsx"
	| "@icons/wk/payments/mono/tsx"
	| "@icons/wk/payments/mono-filled/tsx"
	| "@icons/wk/payments/original/tsx"
	| "@icons/wk/payments/original-filled/tsx"

function createCache() {
	const cache = new Map<IconAliasPath, Record<string, IconComponent>>()
	function has(arg: IconAliasPath) {
		return cache.has(arg)
	}
	async function read(...args: IconAliasPath[]) {
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
		//// return normalized
		return [cached, normalized] as const
	}
	return { has, read }
}

export const cache = createCache()

export async function queryCache({
	feather,
	wkBrands,
	wkPayments,
	wkPaymentsValue,
	monochrome,
}: {
	feather: boolean
	wkBrands: boolean
	wkPayments: boolean
	wkPaymentsValue: WkPaymentsValue
	monochrome: boolean
}) {
	const args: IconAliasPath[] = []
	if (feather) {
		args.push("@icons/feather/tsx")
	}
	if (wkBrands) {
		if (monochrome) {
			args.push("@icons/wk/brands/original/tsx")
		} else {
			args.push("@icons/wk/brands/mono/tsx")
		}
	}
	if (wkPayments) {
		if (monochrome) {
			if (wkPaymentsValue === "normal") {
				args.push("@icons/wk/payments/original/tsx")
			} else {
				args.push("@icons/wk/payments/original-filled/tsx")
			}
		} else {
			if (wkPaymentsValue === "normal") {
				args.push("@icons/wk/payments/mono/tsx")
			} else {
				args.push("@icons/wk/payments/mono-filled/tsx")
			}
		}
	}
	return await cache.read(...args)
}
