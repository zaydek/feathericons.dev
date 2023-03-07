import { Icon } from "@/lib"
import { WkPaymentsValue } from "@/state"

export async function fetchIconsets(
	iconsets: {
		feather: boolean
		wkSocial: boolean
		wkPayments: boolean
		wkPaymentsValue: WkPaymentsValue
	},
	monochromatic: boolean,
) {
	const promises: Promise<Record<string, Icon>>[] = []
	if (iconsets.feather) {
		promises.push(import("@icons/feather/tsx"))
	}
	if (iconsets.wkSocial) {
		if (monochromatic) {
			promises.push(import("@icons/wolfkit/social/mono/tsx"))
		} else {
			promises.push(import("@icons/wolfkit/social/original/tsx"))
		}
	}
	if (iconsets.wkPayments) {
		if (monochromatic) {
			if (iconsets.wkPaymentsValue === "normal") {
				promises.push(import("@icons/wolfkit/payments/mono/tsx"))
			} else {
				promises.push(import("@icons/wolfkit/payments/mono-filled/tsx"))
			}
		} else {
			if (iconsets.wkPaymentsValue === "normal") {
				promises.push(import("@icons/wolfkit/payments/original/tsx"))
			} else {
				promises.push(import("@icons/wolfkit/payments/original-filled/tsx"))
			}
		}
	}
	const resolved = await Promise.all(promises)
	return resolved.map(module => Object.entries(module)).flat()
}
