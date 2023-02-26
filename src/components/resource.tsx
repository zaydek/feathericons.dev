import "./resource.sass"

import * as feather from "@icons/feather"

import { Icon } from "@/lib/icon"

export function Resource({ name, icon: Icon }: { name: string; icon: Icon }) {
	return (
		<a className="resource" href="TODO" target="_blank">
			<Icon />
			<span>{name}</span>
			<feather.ArrowUpRight strokeWidth={4} />
		</a>
	)
}
