import "./checkboxes.sass"

import { Icon } from "@/lib"
import { PropsWithChildren, useState } from "react"

export function CheckboxList({ children }: PropsWithChildren) {
	return <ul className="checkbox-list">{children}</ul>
}

export function CheckboxItem({
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
		<li>
			<label className="checkbox-item">
				<Icon />
				<span>{name}</span>
				{showCheckbox && <input type="checkbox" checked={checked} onChange={e => setChecked(curr => !curr)} />}
			</label>
		</li>
	)
}
