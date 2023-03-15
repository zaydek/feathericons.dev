////////////////////////////////////////////////////////////////////////////////

// prettier-ignore
export type Pos =
	| "start"
	| "checkboxes" // TODO
	| "syntax-highlighting" // TODO
	| "end"

export function Section({ pos, children }: React.PropsWithChildren<{ pos: Pos }>) {
	return (
		<section className="section" data-pos={pos}>
			{children}
		</section>
	)
}

//// export function Hairline({ collapse = undefined }: { collapse?: boolean }) {
//// 	return <hr className="hairline" data-collapse={collapse} />
//// }

////////////////////////////////////////////////////////////////////////////////

//// // prettier-ignore
//// export type SectionHeadPos =
//// 	| "start"
//// 	| "checkboxes" // TODO
//// 	| "syntax-highlighting" // TODO
//// 	| "end"
////
//// export function SectionHead({ pos, children }: React.PropsWithChildren<{ pos?: SectionHeadPos }>) {
//// 	return (
//// 		<header className="TEST_section-head" data-pos={pos}>
//// 			{children}
//// 		</header>
//// 	)
//// }
////
//// export function SectionBody({ children }: React.PropsWithChildren) {
//// 	return <div className="TEST_section-body">{children}</div>
//// }
////
//// export function SectionFoot({ children }: React.PropsWithChildren) {
//// 	return <footer className="TEST_section-foot">{children}</footer>
//// }

////////////////////////////////////////////////////////////////////////////////

//// export function SectionHeading({
//// 	Icon,
//// 	name,
//// 	canReset,
//// 	onClick,
//// }: {
//// 	name: string
//// 	Icon: IconComponent
//// 	canReset?: boolean
//// 	onClick?: JSX.IntrinsicElements["button"]["onClick"]
//// }) {
//// 	return (
//// 		<div className="section-heading">
//// 			<Icon />
//// 			<span className="section-heading-type">{name}</span>
//// 			{canReset && onClick !== undefined && (
//// 				<button className="align-icon-frame" onClick={onClick}>
//// 					{/* <feather.RotateCcw className="section-heading-icon" /> */}
//// 					<feather.RotateCcw className="section-heading-icon" strokeWidth={4} />
//// 				</button>
//// 			)}
//// 		</div>
//// 	)
//// }
////
//// export function SectionHeadingRangeValue({
//// 	Icon,
//// 	name,
//// 	rangeValue,
//// 	canReset,
//// 	onClick,
//// }: {
//// 	Icon: IconComponent
//// 	name: string
//// 	rangeValue: string
//// 	canReset?: boolean
//// 	onClick?: JSX.IntrinsicElements["button"]["onClick"]
//// }) {
//// 	return (
//// 		<div className="section-heading">
//// 			<Icon />
//// 			<span className="section-heading-type">{name}</span>
//// 			<span className="section-heading-number-type">{rangeValue}</span>
//// 			{canReset && (
//// 				<button className="align-icon-frame" onClick={onClick}>
//// 					<feather.RotateCcw className="section-heading-icon" />
//// 				</button>
//// 			)}
//// 		</div>
//// 	)
//// }
