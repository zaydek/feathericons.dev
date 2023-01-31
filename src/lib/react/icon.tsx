import { createElement } from "react"

export type SVG = (_: JSX.IntrinsicElements["svg"]) => JSX.Element

export type IconProps = { icon: SVG } & JSX.IntrinsicElements["svg"]

export function Icon({ icon, ...props }: IconProps) {
	return createElement(icon, props)
}
