import { createElement, SVGAttributes } from "react"

export type IconComponent = (_: SVGAttributes<SVGSVGElement>) => JSX.Element

export function Icon({ icon, ...props }: { icon: IconComponent } & SVGAttributes<SVGSVGElement>) {
  return createElement(icon, props)
}
