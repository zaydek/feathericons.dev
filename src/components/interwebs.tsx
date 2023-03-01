import "./interwebs.sass"

import * as feather from "@icons/feather"

import { Icon } from "@/lib"
import { PropsWithChildren } from "react"

export function Interwebs({ children }: PropsWithChildren) {
	return <nav className="interwebs">{children}</nav>
}

export function Interweb({ name, icon: Icon }: { name: string; icon: Icon }) {
	return (
		<a className="interweb" href="TODO" target="_blank">
			<Icon />
			<span>{name}</span>
			<feather.ArrowUpRight strokeWidth={4} />
		</a>
	)
}
