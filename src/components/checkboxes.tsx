import "./checkboxes.sass"

import { Icon } from "@/lib"
import { Dispatch, PropsWithChildren, SetStateAction } from "react"

export function Checkboxes({ children }: PropsWithChildren) {
	return <ul className="checkboxes">{children}</ul>
}

export function Checkbox({
	name,
	icon: Icon,
	showCheckbox = true, // TODO
	checked,
	setChecked,
}: {
	name: string
	icon: Icon
	showCheckbox?: boolean // TODO
	checked: boolean
	setChecked: Dispatch<SetStateAction<boolean>>
}) {
	return (
		<li className="checkbox">
			<label
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
				{showCheckbox && <input type="checkbox" checked={checked} onChange={e => setChecked(curr => !curr)} tabIndex={-1} />}
			</label>
		</li>
	)
}
