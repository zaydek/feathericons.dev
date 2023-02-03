import { cx } from "../lib/cx"

function Type({ className, prepend, append, children, ...props }: { prepend?: string; append?: string } & JSX.IntrinsicElements["div"]) {
	return (
		<div className={cx(prepend, className, append)} {...props}>
			{children}
		</div>
	)
}

export function TypeCaps({ className, children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		<Type
			className="whitespace-pre
				font-sans text-[11px] font-[500] slashed-zero tabular-nums leading-[normal] tracking-[0.05em]"
			append={className}
			{...props}
		>
			{children}
		</Type>
	)
}

export function TypeIconName({ className, children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		<Type
			className="whitespace-normal
				font-sans text-[12px] font-[400] slashed-zero tabular-nums leading-[normal] tracking-[0.0125em]"
			append={className}
			{...props}
		>
			{children}
		</Type>
	)
}
