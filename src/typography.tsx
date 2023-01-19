import { cx } from "./lib/cx"

// FIXME: font-feature-settings--'tnum' doesn't work as expected
export function TypeCaps({
	children,
	...props
}: JSX.IntrinsicElements["div"]) {
	return <>
		<div
			className={cx(`
				white-space--pre
				font--600_11px_/_normal_$sans
				font-feature-settings--'tnum'
				letter-spacing--0.0625em
				color--#333
			`)}
			{...props}
		>
			{children}
		</div>
	</>
}

// FIXME: font-feature-settings--'tnum' doesn't work as expected
export function TypeInvertedCaps({
	children,
	...props
}: JSX.IntrinsicElements["div"]) {
	return <>
		<div
			className={cx(`
				white-space--pre
				font--600_11px_/_normal_$sans
				font-feature-settings--'tnum'
				letter-spacing--0.0625em
				color--#fff
			`)}
			{...props}
		>
			{children}
		</div>
	</>
}

//// // TODO: Abstract search results typography here?
//// function TypeSans({
//// 	className,
//// 	children,
//// 	...props
//// }: HTMLAttributes<HTMLDivElement>) {
//// 	return <>
//// 		<div className={cx("white-space--pre font--400_15px_/_normal_$sans font-feature-settings--'tnum' color--#333", className)} {...props}>
//// 			{children}
//// 		</div>
//// 	</>
//// }
////
//// function TypeInvertedSans({
//// 	className,
//// 	children,
//// 	...props
//// }: HTMLAttributes<HTMLDivElement>) {
//// 	return <>
//// 		<div className={cx("white-space--pre font--400_15px_/_normal_$sans font-feature-settings--'tnum' color--#fff", className)} {...props}>
//// 			{children}
//// 		</div>
//// 	</>
//// }
