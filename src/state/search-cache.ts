import { lazy, LazyExoticComponent } from "react"

import featherManifest from "@icons/feather/manifest.json"
import wkBrandsManifest from "@icons/wolf-kit/brands/manifest.json"
import wkPaymentsManifest from "@icons/wolf-kit/payments/manifest.json"

type Iconset = "@icons/feather" | "@icons/wolf-kit/brands" | "@icons/wolf-kit/payments"

export function createCache() {
	const cache = new Map<Iconset, readonly [string[], LazyExoticComponent<any>]>()

	function has(key: Iconset) {
		return cache.has(key)
	}

	// TODO: This can be more granular
	function get(key: Iconset) {
		if (cache.has(key)) return cache.get(key)!

		let names: string[]
		let Icon: LazyExoticComponent<any>
		switch (key) {
			case "@icons/feather":
				names = featherManifest
				Icon = lazy(() => import("./stub-feather"))
				break
			case "@icons/wolf-kit/brands":
				names = wkBrandsManifest
				Icon = lazy(() => import("./stub-wolf-kit-brands"))
				break
			case "@icons/wolf-kit/payments":
				names = wkPaymentsManifest
				Icon = lazy(() => import("./stub-wolf-kit-payments"))
				break
		}
		cache.set(key, [names, Icon] as const)
		return [names, Icon] as const
	}

	return { has, get }
}
