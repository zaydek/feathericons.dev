import { lazy, LazyExoticComponent } from "react"

import featherManifest from "@icons/feather/manifest.json"
import wkPaymentsManifest from "@icons/wolfkit/payments/original/manifest.json"
import wkSocialManifest from "@icons/wolfkit/social/original/manifest.json"

type Iconset =
	| "feather"
	| "wolfkit-social-original"
	//// | "wolfkit-social-original-circle"
	//// | "wolfkit-social-original-square"
	| "wolfkit-social-mono"
	//// | "wolfkit-social-mono-circle"
	//// | "wolfkit-social-mono-square"
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
		//// if (cache.has(key)) {
		//// 	return [
		//// 		true, // Cached
		//// 		cache.get(key)!,
		//// 	] as const
		//// }
		if (cache.has(key)) return cache.get(key)!
		let names: string[]
		let Icon: LazyExoticComponent<any>
		switch (key) {
			case "feather":
				names = featherManifest
				Icon = lazy(() => import("./stubs/feather"))
				break
			case "wolfkit-social-original":
				names = wkSocialManifest
				Icon = lazy(() => import("./stubs/wolfkit-social-original"))
				break
			//// case "wolfkit-social-original-circle":
			//// 	names = wkSocialManifest
			//// 	Icon = lazy(() => import("./stubs/wolfkit-social-original-circle"))
			//// 	break
			//// case "wolfkit-social-original-square":
			//// 	names = wkSocialManifest
			//// 	Icon = lazy(() => import("./stubs/wolfkit-social-original-square"))
			//// 	break
			case "wolfkit-social-mono":
				names = wkSocialManifest
				Icon = lazy(() => import("./stubs/wolfkit-social-mono"))
				break
			//// case "wolfkit-social-mono-circle":
			//// 	names = wkSocialManifest
			//// 	Icon = lazy(() => import("./stubs/wolfkit-social-mono-circle"))
			//// 	break
			//// case "wolfkit-social-mono-square":
			//// 	names = wkSocialManifest
			//// 	Icon = lazy(() => import("./stubs/wolfkit-social-mono-square"))
			//// 	break
			case "wolfkit-payments-original":
				names = wkPaymentsManifest
				Icon = lazy(() => import("./stubs/wolfkit-payments-original"))
				break
			case "wolfkit-payments-original-filled":
				names = wkPaymentsManifest
				Icon = lazy(() => import("./stubs/wolfkit-payments-original-filled"))
				break
			case "wolfkit-payments-mono":
				names = wkPaymentsManifest
				Icon = lazy(() => import("./stubs/wolfkit-payments-mono"))
				break
			case "wolfkit-payments-mono-filled":
				names = wkPaymentsManifest
				Icon = lazy(() => import("./stubs/wolfkit-payments-mono-filled"))
				break
		}
		cache.set(key, [names, Icon] as const)
		//// return [
		//// 	false, // No cache
		//// 	[names, Icon],
		//// ] as const
		return [names, Icon] as const
	}

	return { has, get }
}
