import * as feather from "@icons/feather/tsx"

import { IconComponent } from "./lib"

////////////////////////////////////////////////////////////////////////////////

// prettier-ignore
export type Pos =
	| "start"
	| "checkboxes"
	| "syntax-highlighting"
	| "end"

export function Section({ pos, children }: React.PropsWithChildren<{ pos: Pos }>) {
	return (
		<section className="section" data-pos={pos}>
			{children}
		</section>
	)
}

export function Hairline({ collapse = undefined }: { collapse?: boolean }) {
	return <hr className="hairline" data-collapse={collapse} />
}

////////////////////////////////////////////////////////////////////////////////

export function SectionHeading({
	Icon,
	text,
	canReset,
	onClick,
}: {
	text: string
	Icon: IconComponent
	canReset?: boolean
	onClick?: JSX.IntrinsicElements["button"]["onClick"]
}) {
	return (
		<div className="section-heading">
			<Icon />
			<span className="section-heading-type">{text}</span>
			{canReset && (
				<button className="align-icon-frame" onClick={onClick}>
					<feather.RotateCcw className="section-heading-icon" />
				</button>
			)}
		</div>
	)
}

export function SectionHeadingRangeValue({
	Icon,
	text,
	value,
	canReset,
	onClick,
}: {
	Icon: IconComponent
	text: string
	value: string
	canReset?: boolean
	onClick?: JSX.IntrinsicElements["button"]["onClick"]
}) {
	return (
		<div className="section-heading">
			<Icon />
			<span className="section-heading-type">{text}</span>
			<span className="section-heading-number-type">{value}</span>
			{canReset && (
				<button className="align-icon-frame" onClick={onClick}>
					<feather.RotateCcw className="section-heading-icon" />
				</button>
			)}
		</div>
	)
}
