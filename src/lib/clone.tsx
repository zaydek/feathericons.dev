import { cloneElement } from "react"

export function Clone<Tag extends keyof JSX.IntrinsicElements>({ children, ...props }: JSX.IntrinsicElements[Tag]) {
	// @ts-expect-error
	return <>{cloneElement(children, props)}</>
}
