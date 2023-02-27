import "./resources.sass"

import * as feather from "@icons/feather"

import { Icon } from "@/lib"
import { PropsWithChildren } from "react"

export function Resources({ children }: PropsWithChildren) {
	return <nav className="resources">{children}</nav>
}

export function Resource({ name, icon: Icon }: { name: string; icon: Icon }) {
	return (
		<a href="TODO" target="_blank">
			<Icon />
			<span>{name}</span>
			<feather.ArrowUpRight strokeWidth={4} />
		</a>
	)
}
