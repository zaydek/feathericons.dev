import "./resources.sass"

import * as feather from "@icons/feather/tsx"

import { Icon } from "@/lib"

//// export function Resources({ children }: PropsWithChildren) {
//// 	return <nav className="resources">{children}</nav>
//// }

export function Resource({ name, icon: Icon }: { name: string; icon: Icon }) {
	return (
		<a className="resource" href="TODO" target="_blank">
			<Icon className="resource-icon" />
			<span className="resource-name u-flex-1">{name}</span>
			<feather.ArrowUpRight className="resource-icon" strokeWidth={4} />
		</a>
	)
}
