import { createElement } from "react"

export type SvgComponent = (_: JSX.IntrinsicElements["svg"]) => JSX.Element

export type DynamicIconProps = { icon: SvgComponent } & JSX.IntrinsicElements["svg"]

export function DynamicIcon({ icon, ...props }: DynamicIconProps) {
	return createElement(icon, props)
}
