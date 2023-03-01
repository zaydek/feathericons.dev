import { Arrayable } from "@/lib"
import { Dispatch, ReactElement, RefObject, SetStateAction, useEffect } from "react"

export function getStringFromChildren(children: Arrayable<string> | Arrayable<ReactElement<{ children?: string }>> | undefined) {
	if (children === undefined) return ""
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

export function useCancelable(ref: RefObject<HTMLDivElement | null>, setShow: Dispatch<SetStateAction<boolean>>) {
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (ref.current === null) return
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
