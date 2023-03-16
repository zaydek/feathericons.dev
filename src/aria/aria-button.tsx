import React from "react"

// prettier-ignore
export type AriaButtonProps = React.PropsWithChildren<{
	onPress: (
		event:
			| React.MouseEvent<HTMLDivElement>
			| React.KeyboardEvent<HTMLDivElement>
		) => void
	label:     string
	disabled?: boolean
}>

export function AriaButton({
	// prettier-ignore
	onPress,
	label,
	disabled = false,
	children,
}: AriaButtonProps) {
	const [keyboardActive, setKeyboardActive] = React.useState(false)

	return (
		<div
			// A11y
			role="button"
			aria-label={label}
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : 0}
			// /A11y
			onClick={(e: React.MouseEvent<HTMLDivElement>) => {
				if (disabled) return
				onPress(e)
			}}
			onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
				if (disabled) return
				if (e.key === " " || e.key === "Enter") {
					e.preventDefault()
					onPress(e)
					setKeyboardActive(true)
				}
			}}
			onKeyUp={(e: React.KeyboardEvent<HTMLDivElement>) => {
				if (disabled) return
				if (e.key === " " || e.key === "Enter") {
					e.preventDefault()
					setKeyboardActive(false)
				}
			}}
			// Adds support for keyboard :hover:focus
			data-keyboard-active={keyboardActive}
		>
			{children}
		</div>
	)
}
