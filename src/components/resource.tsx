import "./resource.sass"

import * as feather from "@icons/feather"

import { Icon } from "@/lib"
import { PropsWithChildren } from "react"

export function ResourceList({ children }: PropsWithChildren) {
	return <ul className="resource-list">{children}</ul>
}

export function ResourceItem({ name, icon: Icon }: { name: string; icon: Icon }) {
	return (
		<li>
			<a className="resource-item" href="TODO" target="_blank">
				<Icon />
				<span>{name}</span>
				<feather.ArrowUpRight strokeWidth={4} />
			</a>
		</li>
	)
}
