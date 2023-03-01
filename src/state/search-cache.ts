import { lazy, LazyExoticComponent } from "react"

// TODO: We should only need three manifests
import featherManifest from "@icons/feather/manifest.json"
import wolfKitBrandsMonoCircleManifest from "@icons/wolfkit/brands/mono-circle/manifest.json"
import wolfKitBrandsMonoSquareManifest from "@icons/wolfkit/brands/mono-square/manifest.json"
import wolfKitBrandsMonoManifest from "@icons/wolfkit/brands/mono/manifest.json"
import wolfKitBrandsOriginalCircleManifest from "@icons/wolfkit/brands/original-circle/manifest.json"
import wolfKitBrandsOriginalSquareManifest from "@icons/wolfkit/brands/original-square/manifest.json"
import wolfKitBrandsOriginalManifest from "@icons/wolfkit/brands/original/manifest.json"
import wolfKitPaymentsMonoFilledManifest from "@icons/wolfkit/payments/mono-filled/manifest.json"
import wolfKitPaymentsMonoManifest from "@icons/wolfkit/payments/mono/manifest.json"
import wolfKitPaymentsOriginalFilledManifest from "@icons/wolfkit/payments/original-filled/manifest.json"
import wolfKitPaymentsOriginalManifest from "@icons/wolfkit/payments/original/manifest.json"

// prettier-ignore
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
				names = wolfKitBrandsOriginalManifest
				Icon = lazy(() => import("./stubs/wolfkit-brands-original"))
				break
			case "wolfkit-brands-original-circle":
				names = wolfKitBrandsOriginalCircleManifest
				Icon = lazy(() => import("./stubs/wolfkit-brands-original-circle"))
				break
			case "wolfkit-brands-original-square":
				names = wolfKitBrandsOriginalSquareManifest
				Icon = lazy(() => import("./stubs/wolfkit-brands-original-square"))
				break
			case "wolfkit-brands-mono":
				names = wolfKitBrandsMonoManifest
				Icon = lazy(() => import("./stubs/wolfkit-brands-mono"))
				break
			case "wolfkit-brands-mono-circle":
				names = wolfKitBrandsMonoCircleManifest
				Icon = lazy(() => import("./stubs/wolfkit-brands-mono-circle"))
				break
			case "wolfkit-brands-mono-square":
				names = wolfKitBrandsMonoSquareManifest
				Icon = lazy(() => import("./stubs/wolfkit-brands-mono-square"))
				break
			case "wolfkit-payments-original":
				names = wolfKitPaymentsOriginalManifest
				Icon = lazy(() => import("./stubs/wolfkit-payments-original"))
				break
			case "wolfkit-payments-original-filled":
				names = wolfKitPaymentsOriginalFilledManifest
				Icon = lazy(() => import("./stubs/wolfkit-payments-original-filled"))
				break
			case "wolfkit-payments-mono":
				names = wolfKitPaymentsMonoManifest
				Icon = lazy(() => import("./stubs/wolfkit-payments-mono"))
				break
			case "wolfkit-payments-mono-filled":
				names = wolfKitPaymentsMonoFilledManifest
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
