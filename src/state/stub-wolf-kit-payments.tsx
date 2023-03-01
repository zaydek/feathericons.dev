import * as icons from "@icons/wolf-kit/payments"

import { createElement } from "react"

export default function Icon({ name, ...props }: { name: keyof typeof icons } & JSX.IntrinsicElements["svg"]) {
	return <>{createElement(icons[name], props)}</>
}

Icon.names = Object.keys(icons) as (keyof typeof icons)[]
