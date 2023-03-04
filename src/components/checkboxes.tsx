import "./checkboxes.sass"

import { Icon } from "@/lib"
import { Dispatch, PropsWithChildren, SetStateAction } from "react"

export function Checkboxes({ children }: PropsWithChildren) {
	return <div className="checkboxes">{children}</div>
}

export function MonochromeCheckboxFolder({
	name,
	icon: Icon,
	checked,
	setChecked,
}: {
	name: string
	icon: Icon
	checked: boolean
	setChecked: Dispatch<SetStateAction<boolean>>
}) {
	return (
		<label
			className="checkbox"
			// Overwrite native <label> click handler here...
			onClick={e => {
				e.preventDefault()
				e.stopPropagation()
				setChecked(curr => !curr)
			}}
			onKeyDown={e => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault()
					e.stopPropagation()
					setChecked(curr => !curr)
				}
			}}
			tabIndex={0}
			//// title="Toggle monochrome"
		>
			<Icon className="checkbox-icon" />
			<span className="checkbox-name">{name}</span>
			{/* This is supposed to be checkbox... */}
			<span
				className="checkbox-icon"
				//// style={{ opacity: 0.1875 }}
				//// fill={checked ? "none" : "currentColor"}
				//// stroke="dodgerblue"
				//// fill="currentColor"
				//// strokeWidth={4}
				data-type="checkbox"
				data-checked={checked}
			/>
		</label>
	)
}

export function Checkbox({
	name,
	icon: Icon,
	checked,
	setChecked,
}: {
	name: string
	icon: Icon
	checked: boolean
	setChecked: Dispatch<SetStateAction<boolean>>
}) {
	return (
		<label
			className="checkbox"
			// Don't overwrite native <label> click handler here...
			onKeyDown={e => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault()
					e.stopPropagation()
					e.currentTarget.querySelector<HTMLInputElement>("input[type=checkbox]")!.click()
				}
			}}
			tabIndex={0}
		>
			<Icon className="checkbox-icon" />
			<span className="checkbox-name">{name}</span>
			{/* NOTE: Use tabindex={-1} because of <label tabIndex={1}> */}
			<input
				// prettier-ignore
				type="checkbox"
				checked={checked}
				onChange={e => setChecked(curr => !curr)}
				tabIndex={-1}
			/>
		</label>
	)
}
