import { cx } from "../lib/cx"

export function TypeCaps({ className, children, ...props }: JSX.IntrinsicElements["div"]) {
	return (
		<div className={cx("font-sans text-[11px] font-[500] slashed-zero tabular-nums leading-[normal] tracking-[0.05em]", className)} {...props}>
			{children}
		</div>
	)
}

function Thing() {
	return (
		<>
			<div
				className="
			font-sans
			text-[11px]
			font-[500]
			slashed-zero
			tabular-nums
			leading-[normal]
			tracking-[0.05em]
		"
			></div>
		</>
	)
}
