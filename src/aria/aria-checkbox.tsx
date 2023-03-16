import React from "react"

import { Accessible } from "./accessible"

// prettier-ignore
export type AriaCheckboxProps = Accessible<JSX.IntrinsicElements["div"]> & {
	checked:    boolean
	setChecked: React.Dispatch<React.SetStateAction<boolean>>
}

export function AriaCheckbox({ checked, setChecked, children, ...props }: AriaCheckboxProps) {
	return (
		<div
			{...props}
			onClick={e => {
				setChecked(curr => !curr)
				// Preserve
				props.onClick?.(e)
			}}
			onKeyDown={e => {
				if (e.key === "ArrowRight") {
					setChecked(true)
				} else if (e.key === "ArrowLeft") {
					setChecked(false)
				} else if (e.key === " ") {
					e.currentTarget.click()
				}
				// Preserve
				props.onKeyDown?.(e)
			}}
			// A11y
			role="checkbox"
			aria-checked={checked}
			tabIndex={0}
			// /A11y
		>
			{children}
		</div>
	)
}
