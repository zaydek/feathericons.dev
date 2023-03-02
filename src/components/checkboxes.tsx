import "./checkboxes.sass"

import { Icon } from "@/lib"
import { Dispatch, PropsWithChildren, SetStateAction } from "react"

// Don't bother using <ul> because of <label> and <button>
export function Checkboxes({ children }: PropsWithChildren) {
	return <div className="checkboxes">{children}</div>
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
					// @ts-expect-error
					e.currentTarget.querySelector("input[type=checkbox]")?.click()
				}
			}}
			tabIndex={0}
		>
			<Icon className="checkbox-icon" />
			<span className="checkbox-name">{name}</span>
			{/* NOTE: Use tabindex={-1} because of <label tabIndex={1}> */}
			<input type="checkbox" checked={checked} onChange={e => setChecked(curr => !curr)} tabIndex={-1} />
		</label>
	)
}

export function CheckboxAsButton({
	name,
	icon: Icon,
	...props
}: {
	name: string
	icon: Icon
} & JSX.IntrinsicElements["button"]) {
	return (
		<button className="checkbox" {...props}>
			<Icon className="checkbox-icon" />
			<span className="checkbox-name">{name}</span>
		</button>
	)
}
