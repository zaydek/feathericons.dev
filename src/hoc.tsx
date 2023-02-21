import { cloneElement, createElement } from "react"
import { cx } from "./lib"

export function Clone<Tag extends keyof JSX.IntrinsicElements>({ children, ...props }: JSX.IntrinsicElements[Tag]) {
	// @ts-expect-error
	return <>{cloneElement(children, props)}</>
}

export function createStyled(argClassName: string) {
	// Use tag ?? "div" because TypeScript errs: Type '"div"' is not assignable to type 'Tag'.
	function Styled<Tag extends keyof JSX.IntrinsicElements = "div">({ tag, className, children, ...props }: { tag?: Tag } & JSX.IntrinsicElements[Tag]) {
		return <>{createElement(tag ?? "div", { className: cx(argClassName, className), ...props }, children)}</>
	}
	Styled.className = argClassName
	return Styled
}
