import { Dispatch, SetStateAction } from "react"
import { Accessible } from "./a11y"

// prettier-ignore
export type AriaCheckboxProps = {
	checked:    boolean
	setChecked: Dispatch<SetStateAction<boolean>>
} & Accessible<JSX.IntrinsicElements["div"]>

export function AriaCheckbox({ checked, setChecked, children, ...props }: AriaCheckboxProps) {
	return (
		<div
			onClick={e => {
				e.preventDefault()
				setChecked(curr => !curr)
				// Preserve props events
				props.onClick?.(e)
			}}
			onKeyDown={e => {
				if (e.key === "ArrowRight") {
					e.preventDefault()
					setChecked(true)
				} else if (e.key === "ArrowLeft") {
					e.preventDefault()
					setChecked(false)
				} else if (e.key === " ") {
					e.preventDefault()
					e.currentTarget.click()
				}
				// Preserve props events
				props.onKeyDown?.(e)
			}}
			// A11y
			role="checkbox"
			aria-checked={checked}
			tabIndex={0}
			// /A11y
			{...props}
		>
			{children}
		</div>
	)
}
