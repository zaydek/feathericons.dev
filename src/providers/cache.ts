import { IconComponent } from "@/lib"
import { IconValue as RadioValue } from "@/providers"

////////////////////////////////////////////////////////////////////////////////

export type Iconset =
	| "@icons/feather/tsx"
	| "@icons/wk/brands/mono/tsx"
	| "@icons/wk/brands/original/tsx"
	| "@icons/wk/payments/mono/tsx"
	| "@icons/wk/payments/mono-filled/tsx"
	| "@icons/wk/payments/original/tsx"
	| "@icons/wk/payments/original-filled/tsx"

function createCache() {
	const cache = new Map<Iconset, Record<string, IconComponent>>()

	function has(radioValue: RadioValue, { monochrome }: { monochrome: boolean }) {
		switch (radioValue) {
			case "feather":
				return cache.has("@icons/feather/tsx")
			case "wk-brands":
				if (monochrome) {
					return cache.has("@icons/wk/brands/mono/tsx")
				} else {
					return cache.has("@icons/wk/brands/original/tsx")
				}
			case "wk-payments":
				if (monochrome) {
					return cache.has("@icons/wk/payments/mono/tsx")
				} else {
					return cache.has("@icons/wk/payments/original/tsx")
				}
			case "wk-payments-filled":
				if (monochrome) {
					return cache.has("@icons/wk/payments/mono-filled/tsx")
				} else {
					return cache.has("@icons/wk/payments/original-filled/tsx")
				}
		}
	}

	async function fetch(...args: Iconset[]) {
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

	return { has, fetch }
}

////////////////////////////////////////////////////////////////////////////////

export const cache = createCache()

export async function queryCache(radioValue: RadioValue, { monochrome }: { monochrome: boolean }) {
	const args: Iconset[] = []
	switch (radioValue) {
		case "feather":
			args.push("@icons/feather/tsx")
			break
		case "wk-brands":
			if (monochrome) {
				args.push("@icons/wk/brands/mono/tsx")
			} else {
				args.push("@icons/wk/brands/original/tsx")
			}
			break
		case "wk-payments":
			if (monochrome) {
				args.push("@icons/wk/payments/mono/tsx")
			} else {
				args.push("@icons/wk/payments/original/tsx")
			}
			break
		case "wk-payments-filled":
			if (monochrome) {
				args.push("@icons/wk/payments/mono-filled/tsx")
			} else {
				args.push("@icons/wk/payments/original-filled/tsx")
			}
			break
	}
	return await cache.fetch(...args)
}
