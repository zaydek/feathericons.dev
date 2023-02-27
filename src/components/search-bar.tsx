import "./search-bar.sass"

import * as feather from "@icons/feather"

import { isMac } from "@/lib"
import { useEffect, useRef, useState } from "react"

export function SearchBar() {
	const ref = useRef<HTMLInputElement | null>(null)

	const [value, setValue] = useState("")
	const [focusVisible, setFocusVisible] = useState(false)

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((isMac() ? e.metaKey : e.ctrlKey) && e.key === "p") {
				e.preventDefault() // Printers 💀
				ref.current!.focus()
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [])

	return (
		<div className="search-bar" data-focus-visible={focusVisible}>
			<feather.Search strokeWidth={4} />
			<input
				ref={ref}
				type="text"
				placeholder={isMac() ? "Press ⌘P to Focus" : "Press Ctrl-P to Focus"}
				value={value}
				onFocus={e => {
					setFocusVisible(true)
				}}
				onBlur={e => {
					setFocusVisible(false)
				}}
				onChange={e => setValue(e.currentTarget.value)}
			/>
		</div>
	)
}
