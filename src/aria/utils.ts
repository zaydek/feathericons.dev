import { ReactElement } from "react"
import { Arrayable } from "../lib/types"

export function getStringFromChildren(children: Arrayable<string> | Arrayable<ReactElement<{ children?: string }>> | undefined) {
	if (children === undefined) { return "" } // prettier-ignore
	let str = ""
	const flatChildren = [children].flat()
	for (const child of flatChildren) {
		if (typeof child === "string") {
			str += child
		} else {
			// TODO: Add defensive statement here?
			str += getStringFromChildren(child.props.children)
		}
	}
	return str
}

// 1x setTimeout doesn't always work and Safari doesn't support
// requestIdleCallback so YOLO
export function queue(fn: () => void) {
	window.setTimeout(() => {
		window.setTimeout(() => {
			fn()
		}, 0)
	}, 0)
}
