import { createElement } from "react"

export type SVG = (_: JSX.IntrinsicElements["svg"]) => JSX.Element

export function Icon({ svg, ...props }: { svg: SVG } & JSX.IntrinsicElements["svg"]) {
	return createElement(svg, props)
}
