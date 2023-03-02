import "./interwebs.sass"

import * as feather from "@icons/feather/tsx"

import { Icon } from "@/lib"
import { PropsWithChildren } from "react"

export function Resources({ children }: PropsWithChildren) {
	return <nav className="interwebs">{children}</nav>
}

export function Resource({ name, icon: Icon }: { name: string; icon: Icon }) {
	return (
		<a className="resource" href="TODO" target="_blank">
			<Icon className="resource-icon" />
			<span className="resource-name">{name}</span>
			<feather.ArrowUpRight className="resource-icon" strokeWidth={4} />
		</a>
	)
}
