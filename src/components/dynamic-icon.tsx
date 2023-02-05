import { createElement } from "react"

export type Icon = (_: JSX.IntrinsicElements["svg"]) => JSX.Element

export type DynamicIconProps = { icon: Icon } & JSX.IntrinsicElements["svg"]

export function DynamicIcon({ icon, ...props }: DynamicIconProps) {
	return createElement(icon, props)
}
