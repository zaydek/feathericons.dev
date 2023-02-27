import "./checkboxes.sass"

import { Icon } from "@/lib"
import { PropsWithChildren, useState } from "react"

export function CheckboxStack({ children }: PropsWithChildren) {
	return <div>{children}</div>
}

export function Checkboxes({ children }: PropsWithChildren) {
	return <ul className="checkboxes">{children}</ul>
}

export function Checkbox({
	name,
	icon: Icon,
	showCheckbox = true,
}: {
	name: string
	icon: Icon
	showCheckbox?: boolean
}) {
	const [checked, setChecked] = useState(false)

	return (
		<li className="checkbox">
			<label>
				<Icon />
				<span>{name}</span>
				{showCheckbox && <input type="checkbox" checked={checked} onChange={e => setChecked(curr => !curr)} />}
			</label>
		</li>
	)
}
