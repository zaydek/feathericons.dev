import "./checkboxes.sass"

import { Icon } from "@/lib"
import { Dispatch, PropsWithChildren, SetStateAction } from "react"

export function Checkboxes({ children }: PropsWithChildren) {
	return <ul className="checkboxes">{children}</ul>
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
		<li>
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
				<Icon />
				<span>{name}</span>
				{/* Defer focus to <label> */}
				<input type="checkbox" checked={checked} onChange={e => setChecked(curr => !curr)} tabIndex={-1} />
			</label>
		</li>
	)
}

export function CheckboxButton({
	name,
	icon: Icon,
	...props
}: {
	name: string
	icon: Icon
} & JSX.IntrinsicElements["button"]) {
	return (
		<li>
			<button className="checkbox" {...props}>
				<Icon />
				<span>{name}</span>
			</button>
		</li>
	)
}
