import { createElement } from "react"

export type Svg = (_: JSX.IntrinsicElements["svg"]) => JSX.Element

export type DynamicIconProps = { icon: Svg } & JSX.IntrinsicElements["svg"]

export function DynamicIcon({ icon, ...props }: DynamicIconProps) {
	return createElement(icon, props)
}
