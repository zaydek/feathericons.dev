import { ReactElement } from "react"
import { Arrayable } from "../lib/types"

export function getStringFromReactElements(children: Arrayable<string> | Arrayable<ReactElement<{ children?: string }>> | undefined) {
	if (children === undefined) { return "" } // prettier-ignore

	let str = ""
	const flatChildren = [children].flat()
	for (const child of flatChildren) {
		if (typeof child === "string") {
			str += child
		} else {
			// TODO: Add defensive statement here?
			str += getStringFromReactElements(child.props.children)
		}
	}
	return str
}
