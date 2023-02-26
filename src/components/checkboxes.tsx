import "./checkboxes.sass"

import { Icon } from "@/lib/icon"
import { PropsWithChildren, useState } from "react"

export function CheckboxList({ children }: PropsWithChildren) {
	return <ul className="checkboxes">{children}</ul>
}

export function CheckboxItem({ name, icon: Icon, showCheckbox = true }: { name: string; icon: Icon; showCheckbox?: boolean }) {
	const [checked, setChecked] = useState(false)

	return (
		<li>
			<label>
				<Icon />
				<span>{name}</span>
				{showCheckbox && <input type="checkbox" checked={checked} onChange={e => setChecked(curr => !curr)} />}
			</label>
		</li>
	)
}
