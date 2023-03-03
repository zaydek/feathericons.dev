import { lazy, LazyExoticComponent } from "react"

import featherManifest from "@icons/feather/manifest.json"
import wolfKitBrandsManifest from "@icons/wolfkit/brands/original/manifest.json"
import wolfKitPaymentsManifest from "@icons/wolfkit/payments/original/manifest.json"

type Iconset =
	| "feather"
	| "wolfkit-brands-original"
	| "wolfkit-brands-original-circle"
	| "wolfkit-brands-original-square"
	| "wolfkit-brands-mono"
	| "wolfkit-brands-mono-circle"
	| "wolfkit-brands-mono-square"
	| "wolfkit-payments-original"
	| "wolfkit-payments-original-filled"
	| "wolfkit-payments-mono"
	| "wolfkit-payments-mono-filled"

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
			case "feather":
				names = featherManifest
				Icon = lazy(() => import("./stubs/feather"))
				break
			case "wolfkit-brands-original":
				names = wolfKitBrandsManifest
				Icon = lazy(() => import("./stubs/wolfkit-brands-original"))
				break
			case "wolfkit-brands-original-circle":
				names = wolfKitBrandsManifest
				Icon = lazy(() => import("./stubs/wolfkit-brands-original-circle"))
				break
			case "wolfkit-brands-original-square":
				names = wolfKitBrandsManifest
				Icon = lazy(() => import("./stubs/wolfkit-brands-original-square"))
				break
			case "wolfkit-brands-mono":
				names = wolfKitBrandsManifest
				Icon = lazy(() => import("./stubs/wolfkit-brands-mono"))
				break
			case "wolfkit-brands-mono-circle":
				names = wolfKitBrandsManifest
				Icon = lazy(() => import("./stubs/wolfkit-brands-mono-circle"))
				break
			case "wolfkit-brands-mono-square":
				names = wolfKitBrandsManifest
				Icon = lazy(() => import("./stubs/wolfkit-brands-mono-square"))
				break
			case "wolfkit-payments-original":
				names = wolfKitPaymentsManifest
				Icon = lazy(() => import("./stubs/wolfkit-payments-original"))
				break
			case "wolfkit-payments-original-filled":
				names = wolfKitPaymentsManifest
				Icon = lazy(() => import("./stubs/wolfkit-payments-original-filled"))
				break
			case "wolfkit-payments-mono":
				names = wolfKitPaymentsManifest
				Icon = lazy(() => import("./stubs/wolfkit-payments-mono"))
				break
			case "wolfkit-payments-mono-filled":
				names = wolfKitPaymentsManifest
				Icon = lazy(() => import("./stubs/wolfkit-payments-mono-filled"))
				break
		}
		cache.set(key, [names, Icon] as const)
		return [
			false, // No cache
			[names, Icon],
		] as const
	}

	return { has, get }
}
