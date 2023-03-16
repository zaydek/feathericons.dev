import { Dispatch, MutableRefObject, ReactElement, SetStateAction, useEffect } from "react"
import { Arrayable } from "../lib/types"

export function getStringFromChildren(
	children: Arrayable<string> | Arrayable<ReactElement<{ children?: string }>> | undefined,
) {
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

export function useCancelable(
	ref:     MutableRefObject<HTMLDivElement | null>, // prettier-ignore
	setShow: Dispatch<SetStateAction<boolean>>,
) {
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (ref.current === null) { return } // prettier-ignore
			if (!(e.target instanceof HTMLElement && ref.current.contains(e.target))) {
				setShow(false)
			}
		}
		window.addEventListener("click", handleClick, false)
		return () => window.removeEventListener("click", handleClick, false)
	}, [ref, setShow])

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setShow(false)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [setShow])

	return void 0
}
