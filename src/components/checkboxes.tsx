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
		>
			<Icon className="checkbox-icon" />
			<span className="checkbox-name">{name}</span>
			{/* This is supposed to be checkbox... */}
			<span
				// prettier-ignore
				className="checkbox-icon"
				data-type="checkbox"
				data-checked={checked}
				tabIndex={-1}
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
			onKeyDown={e => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault()
					e.stopPropagation()
					setChecked(curr => !curr)
				}
			}}
			tabIndex={0}
		>
			<Icon className="checkbox-icon" />
			<span className="checkbox-name">{name}</span>
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

export function Radio<RadioValue extends string>({
	name,
	icon: Icon,
	radioName,
	value,
	setValue,
	checked,
}: {
	name: string
	icon: Icon
	radioName: string
	value: RadioValue
	setValue: Dispatch<SetStateAction<RadioValue>>
	checked?: boolean
}) {
	return (
		<label
			className="checkbox"
			onKeyDown={e => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault()
					e.stopPropagation()
					setValue(value)
				}
			}}
			tabIndex={0}
		>
			<Icon className="checkbox-icon" />
			<span className="checkbox-name">{name}</span>
			<input
				// prettier-ignore
				type="radio"
				name={radioName}
				value={value}
				onChange={e => setValue(value)}
				checked={checked}
				tabIndex={-1}
			/>
		</label>
	)
}
