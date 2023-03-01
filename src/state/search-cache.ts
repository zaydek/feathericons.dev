import { lazy, LazyExoticComponent } from "react"

type Iconset = "@icons/feather" | "@icons/wolf-kit/brands" | "@icons/wolf-kit/payments"

//// export type CacheEntry = readonly [names: string[], Icon: LazyExoticComponent<(_: any) => JSX.Element>]

export function createCache() {
	const cache = new Map<Iconset, LazyExoticComponent<any>>()

	function has(key: Iconset) {
		return cache.has(key)
	}

	// TODO: This can be more granular
	function get(key: Iconset) {
		if (cache.has(key)) return cache.get(key)
		let Icon: LazyExoticComponent<any>
		switch (key) {
			case "@icons/feather":
				Icon = lazy(() => import("./stub-feather"))
				break
			case "@icons/wolf-kit/brands":
				Icon = lazy(() => import("./stub-wolf-kit-brands"))
				break
			case "@icons/wolf-kit/payments":
				Icon = lazy(() => import("./stub-wolf-kit-payments"))
				break
		}
		cache.set(key, Icon)
		return Icon
	}

	return { has, get }
}
