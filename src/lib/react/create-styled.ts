import { createElement } from "react"
import { cx } from "../cx"

//// export type StyledComponent = {
//// 	<Props extends {}, Tag extends keyof JSX.IntrinsicElements = "div">
//// 		(props:
//// 			| ({ tag?: Tag } & JSX.IntrinsicElements[Tag])
//// 			| ({ as?: (_: Props) => JSX.Element } & Props)
//// 		): JSX.Element
////
//// 	Forward: ForwardRefExoticComponent<any>
//// 	className: string
//// }
////
//// export function createStyled(argClassName: string) {
//// 	const styledComponent: StyledComponent = ({ tag, as, className, children, ...props }) => {
//// 		return createElement(as ?? tag ?? "div", {
//// 			className: cx(
//// 				argClassName,
//// 				className,
//// 			),
//// 			...props,
//// 		}, children)
//// 	}
//// 	styledComponent.Forward = forwardRef(({ tag, as, className, children, ...props }, ref) => {
//// 		return createElement(as ?? tag ?? "div", {
//// 			ref,
//// 			className: cx(
//// 				argClassName,
//// 				className,
//// 			),
//// 			...props,
//// 		}, children)
//// 	})
//// 	styledComponent.className = argClassName
//// 	return styledComponent
//// }

export function createStyled(argClassName: string) {
	function Styled({ as = "div", className, children, ...props }: { as?: keyof JSX.IntrinsicElements | (() => JSX.Element) } & JSX.IntrinsicElements["div"]) {
		return createElement(
			as,
			{
				className: cx(argClassName, className),
				...props,
			},
			children
		)
	}
	return Styled
}
