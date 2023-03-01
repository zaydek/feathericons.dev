import { lazy, LazyExoticComponent } from "react"

import featherManifest from "@icons/feather/manifest.json"
import wolfKitBrandsManifest from "@icons/wolf-kit/brands/original/manifest.json"
import wolfKitPaymentsManifest from "@icons/wolf-kit/payments/original/manifest.json"

type Iconset = "@icons/feather" | "@icons/wolf-kit/brands" | "@icons/wolf-kit/payments"

export function createCache() {
	const cache = new Map<Iconset, readonly [string[], LazyExoticComponent<any>]>()

	function has(key: Iconset) {
		return cache.has(key)
	}

	function get(key: Iconset) {
		if (cache.has(key)) {
			return [
				true, // Cached
				cache.get(key)!,
			] as const
		}
		let names: string[]
		let Icon: LazyExoticComponent<any>
		switch (key) {
			case "@icons/feather":
				names = featherManifest
				Icon = lazy(() => import("./stub-feather"))
				break
			case "@icons/wolf-kit/brands":
				names = wolfKitBrandsManifest
				Icon = lazy(() => import("./stub-wolf-kit-brands"))
				break
			case "@icons/wolf-kit/payments":
				names = wolfKitPaymentsManifest
				Icon = lazy(() => import("./stub-wolf-kit-payments"))
				break
		}
		cache.set(key, [names, Icon] as const)
		return [
			false, // Uncached
			[names, Icon],
		] as const
	}

	return { has, get }
}
