import { Dispatch, HTMLAttributes, SetStateAction } from "react"

// prettier-ignore
export type AriaCheckboxProps = {
	checked:    boolean
	setChecked: Dispatch<SetStateAction<boolean>>
} & HTMLAttributes<HTMLDivElement>

export function AriaCheckbox({ checked, setChecked, children, ...props }: AriaCheckboxProps) {
	return (
		<div
			onClick={e => {
				e.preventDefault()
				setChecked(curr => !curr)
			}}
			onKeyDown={e => {
				if (e.key === " ") {
					e.preventDefault()
					e.currentTarget.click()
				}
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
