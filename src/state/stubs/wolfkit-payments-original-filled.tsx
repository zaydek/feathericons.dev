import * as icons from "@icons/wolfkit/payments/original-filled/tsx"

import { createElement } from "react"

export default function Icon({ name, ...props }: { name: keyof typeof icons } & JSX.IntrinsicElements["svg"]) {
	return <>{createElement(icons[name], props)}</>
}