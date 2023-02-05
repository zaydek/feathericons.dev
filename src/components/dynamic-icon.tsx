import { createElement } from "react"

export type IconSvg = (_: JSX.IntrinsicElements["svg"]) => JSX.Element

export type DynamicIconProps = { icon: IconSvg } & JSX.IntrinsicElements["svg"]

export function DynamicIcon({ icon, ...props }: DynamicIconProps) {
	return createElement(icon, props)
}
