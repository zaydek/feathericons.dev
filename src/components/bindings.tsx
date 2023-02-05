import { createElement } from "react"
import { cx } from "../lib/cx"

function createStyled(argClassName: string) {
	// Use tag ?? "div" because TypeScript errs: Type '"div"' is not assignable to type 'Tag'.
	function Styled<Tag extends keyof JSX.IntrinsicElements = "div">({ tag, className, children, ...props }: { tag?: Tag } & JSX.IntrinsicElements[Tag]) {
		return <>{createElement(tag ?? "div", { className: cx(argClassName, className), ...props }, children)}</>
	}
	return Styled
}

export const TypographyHero = createStyled("typography-hero")
export const TypographySmallSans = createStyled("typography-small-sans")
export const TypographyCode = createStyled("typography-code")
export const TypographyCaps = createStyled("typography-caps")
