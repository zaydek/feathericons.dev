import React from "react"
import { Accessible } from "./accessible"

export type AriaButtonProps = Accessible<JSX.IntrinsicElements["div"]> & { disabled?: boolean }

export function AriaButton({
	// prettier-ignore
	disabled = false,
	onClick,
	onKeyDown,
	onKeyUp,
	children,
	...props
}: AriaButtonProps) {
	const [keyboardActive, setKeyboardActive] = React.useState(false)

	return (
		<div
			{...props}
			onClick={e => {
				if (disabled) return
				onClick?.(e)
			}}
			onKeyDown={e => {
				if (disabled) return
				if (e.key === " " || e.key === "Enter") {
					e.preventDefault() // Prevent scrolling
					e.currentTarget.click()
					setKeyboardActive(true)
				}
				onKeyDown?.(e)
			}}
			onKeyUp={e => {
				if (disabled) return
				if (e.key === " " || e.key === "Enter") {
					e.preventDefault() // Prevent scrolling
					setKeyboardActive(false)
				}
				onKeyUp?.(e)
			}}
			// A11y
			role="button"
			tabIndex={disabled ? -1 : 0}
			// /A11y
			data-keyboard-active={keyboardActive}
		>
			{children}
		</div>
	)
}
