import { createElement } from "react"

export type IconComponent = (_: JSX.IntrinsicElements["svg"]) => JSX.Element

export function Icon({ icon, ...props }: { icon: IconComponent } & JSX.IntrinsicElements["svg"]) {
	return createElement(icon, props)
}
