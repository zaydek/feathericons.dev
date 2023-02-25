import { Clone } from "@/lib/clone"
import { Icon } from "@/lib/icon"
import { PropsWithChildren, useRef, useState } from "react"

export function CheckboxList({ children }: PropsWithChildren) {
	return <ul className="checkbox-list">{children}</ul>
}

export function CheckboxItem({ name, icon: Icon, showCheckbox = true }: { name: string; icon: Icon; showCheckbox?: boolean }) {
	const ref = useRef<HTMLDivElement | null>(null)

	const [checked, setChecked] = useState(false)

	return (
		<Clone<"li">
			onClick={e => {
				setChecked(curr => !curr)
			}}
			onKeyDown={e => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault()
					setChecked(curr => !curr)
				}
			}}
			aria-checked={checked}
		>
			<li className="checkbox-item">
				<Icon className="icon" />
				<div className="type u-flex-1">{name}</div>
				{showCheckbox && <div ref={ref} className="interactive-checkbox" tabIndex={0} aria-checked={checked}></div>}
			</li>
		</Clone>
	)
}
