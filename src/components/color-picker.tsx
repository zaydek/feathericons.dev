import "./color-picker.sass"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { HexAlphaColorPicker } from "react-colorful"

////////////////////////////////////////////////////////////////////////////////

function useClickAway({ show, setShow }: { show: boolean; setShow: Dispatch<SetStateAction<boolean>> }) {
	useEffect(() => {
		if (!show) return
		function handleClick(e: MouseEvent) {
			setShow(false)
		}
		window.addEventListener("click", handleClick, false)
		return () => window.removeEventListener("click", handleClick, false)
	}, [show, setShow])
	return void 0
}

function useEscapeShortcut({ setShow }: { setShow: Dispatch<SetStateAction<boolean>> }) {
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

////////////////////////////////////////////////////////////////////////////////

export function ColorPicker({
	color,
	setColor,
}: {
	color: string | null
	setColor: Dispatch<SetStateAction<string | null>>
}) {
	const [show, setShow] = useState(false)

	useEffect(() => {
		if (color === null) {
			document.documentElement.style.removeProperty("--app-color")
			if (document.documentElement.style.length === 0) {
				document.documentElement.removeAttribute("style")
			}
		} else {
			document.documentElement.style.setProperty("--app-color", color)
		}
	}, [color])

	useClickAway({ show: show, setShow: setShow })
	useEscapeShortcut({ setShow: setShow })

	return (
		<div
			className="color-picker"
			onClick={e => {
				// TODO
				e.preventDefault()
				e.stopPropagation()
				setShow(true)
			}}
		>
			{show && (
				<div className="react-colorful-container">
					<HexAlphaColorPicker color={color ?? "#000"} onChange={setColor} />
				</div>
			)}
		</div>
	)
}