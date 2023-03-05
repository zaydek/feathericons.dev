import * as feather from "@icons/feather/tsx"
import * as wkBrandsOriginal from "@icons/wolfkit/brands/original/tsx"
import * as wkPaymentsMonoFilled from "@icons/wolfkit/payments/mono-filled/tsx"
import * as wkPaymentsMono from "@icons/wolfkit/payments/mono/tsx"
import * as wkPaymentsOriginalFilled from "@icons/wolfkit/payments/original-filled/tsx"
import * as wkPaymentsOriginal from "@icons/wolfkit/payments/original/tsx"

import {
	Anchor,
	ColorPicker,
	DEV_DebugCss,
	ExportAs,
	Grid,
	Main,
	ProgressRange,
	SearchBar,
	Sidebar1,
	Sidebar2,
	SyntaxHighlighting,
} from "@/components"
import { DynamicIcon, useScrollProps, useVisibleDocumentTitle } from "@/lib"
import {
	ClipboardContext,
	ProgressBarContext,
	RangeContext,
	SearchContext,
	SIZE_MAX,
	SIZE_MIN,
	SIZE_STEP,
	STROKE_MAX,
	STROKE_MIN,
	STROKE_STEP,
} from "@/state"
import { useContext, useEffect, useState, useTransition } from "react"
import { Lang } from "shiki-es"

export function App() {
	const { setStarted } = useContext(ProgressBarContext)!

	useEffect(() => {
		setStarted(true)
		const d = window.setTimeout(() => setStarted(false), 100)
		return () => window.clearTimeout(d)
	}, [setStarted])

	return (
		<DEV_DebugCss>
			<AppSidebar1 />
			<AppSidebar2 />
			<AppMain />
		</DEV_DebugCss>
	)
}

function AppSidebar1() {
	const { scrollProps } = useScrollProps()

	const { setStarted } = useContext(ProgressBarContext)!
	const {
		showFeather,
		setShowFeather,
		showSocial,
		setShowSocial,
		//// socialRadio,
		//// setSocialRadio,
		showPayments,
		setShowPayments,
		paymentsRadio,
		setPaymentsRadio,
		preferMonochrome,
		//// setPreferMonochrome,
		showNames,
		setShowNames,
		resetIcons,
		resetDisplay,
	} = useContext(SearchContext)!

	const [pending, startTransition] = useTransition()

	//// // Use function syntax because of <T>
	//// const createTransition = useCallback(function <T>(fn: (_: T) => void) {
	//// 	return (arg: T) => startTransition(() => fn(arg))
	//// }, [])

	// TODO: Extract to pattern
	useEffect(() => {
		setStarted(true)
		const d = window.setTimeout(() => setStarted(false), 100)
		return () => window.clearTimeout(d)
	}, [pending, setStarted])

	return (
		<Sidebar1>
			<header className="section-header">
				<section className="section is-start">
					<SearchBar />
				</section>
				<div className="section-header-body" {...scrollProps}>
					<section className="section">
						<header className="section-header-header">
							{/* <feather.Package className="section-icon" /> */}
							<h6 className="section-name">Icons</h6>
							<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={resetIcons} />
						</header>
						<ul className="checkboxes">
							<label className="checkbox">
								<feather.Feather className="checkbox-icon" />
								<span className="checkbox-name">Feather</span>
								<input
									type="checkbox"
									checked={showFeather}
									onChange={e => startTransition(() => setShowFeather(e.currentTarget.checked))}
								/>
							</label>
						</ul>
						<ul className="checkboxes">
							<label className="checkbox">
								<feather.Twitter className="checkbox-icon" />
								<span className="checkbox-name">Social</span>
								<input
									type="checkbox"
									checked={showSocial}
									onChange={e => startTransition(() => setShowSocial(e.currentTarget.checked))}
								/>
							</label>
						</ul>
						<ul className="checkboxes">
							<label className="checkbox">
								<feather.CreditCard className="checkbox-icon" />
								<span className="checkbox-name">Payments</span>
								<input
									type="checkbox"
									checked={showPayments}
									onChange={e => startTransition(() => setShowPayments(e.currentTarget.checked))}
								/>
							</label>
							<ul className="checkboxes">
								<label className="checkbox">
									<DynamicIcon
										className="checkbox-icon"
										icon={preferMonochrome ? wkPaymentsMono.Stripe : wkPaymentsOriginal.Stripe}
									/>
									<span className="checkbox-name">Original</span>
									<input
										name="payments"
										type="radio"
										checked={paymentsRadio === "normal"}
										onChange={e =>
											startTransition(() => {
												setShowPayments(true)
												setPaymentsRadio("normal")
											})
										}
									/>
								</label>
							</ul>
							<ul className="checkboxes">
								<label className="checkbox">
									<DynamicIcon
										className="checkbox-icon"
										icon={preferMonochrome ? wkPaymentsMonoFilled.Stripe : wkPaymentsOriginalFilled.Stripe}
									/>
									<span className="checkbox-name">Filled</span>
									<input
										name="payments"
										type="radio"
										checked={paymentsRadio === "filled"}
										onChange={e =>
											startTransition(() => {
												setShowPayments(true)
												setPaymentsRadio("filled")
											})
										}
									/>
								</label>
							</ul>
						</ul>
					</section>
				</div>
			</header>
			<div className="section-body">
				<hr className="hr" />
				<section className="section">
					<header className="section-header-header">
						{/* <feather.Monitor className="section-icon" /> */}
						<h6 className="section-name">Display</h6>
						<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={resetDisplay} />
					</header>
					<ul className="checkboxes">
						<label className="checkbox">
							<DynamicIcon className="checkbox-icon" icon={showNames ? feather.ToggleRight : feather.ToggleLeft} />
							<span className="checkbox-name">Show names</span>
							<input type="checkbox" checked={showNames} onChange={e => setShowNames(e.currentTarget.checked)} />
						</label>
					</ul>
				</section>
				<hr className="hr" />
			</div>
			<div className="section-spacer"></div>
			<footer className="section-footer">
				<hr className="hr is-collapsible" />
				<section className="section is-end">
					<header className="section-header-header">
						<feather.Globe className="section-icon" />
						<h6 className="section-name">Resources</h6>
					</header>
					<nav className="resources">
						<Anchor className="resource" href="TODO">
							<wkBrandsOriginal.Github className="resource-icon" />
							<span className="resource-name">Icons</span>
							<feather.ArrowUpRight className="resource-icon" strokeWidth={4} />
						</Anchor>
						<Anchor className="resource" href="TODO">
							<wkBrandsOriginal.Github className="resource-icon" />
							<span className="resource-name">Website</span>
							<feather.ArrowUpRight className="resource-icon" strokeWidth={4} />
						</Anchor>
						<Anchor className="resource" href="TODO">
							<wkBrandsOriginal.Figma className="resource-icon" />
							<span className="resource-name">Social & payments files</span>
							<feather.ArrowUpRight className="resource-icon" strokeWidth={4} />
						</Anchor>
						<Anchor className="resource" href="TODO">
							<wkBrandsOriginal.Twitter className="resource-icon" />
							<span className="resource-name">Share on Twitter</span>
							<feather.ArrowUpRight className="resource-icon" strokeWidth={4} />
						</Anchor>
					</nav>
				</section>
			</footer>
		</Sidebar1>
	)
}

function AppSidebar2() {
	const { scrollProps } = useScrollProps()

	const { setStarted } = useContext(ProgressBarContext)!
	const { preferMonochrome, setPreferMonochrome } = useContext(SearchContext)!
	const { exportAs, setExportAs, clipboard } = useContext(ClipboardContext)!
	const { size, setSize, strokeWidth, setStrokeWidth, resetSize, resetStrokeWidth } = useContext(RangeContext)!

	const [pending, startTransition] = useTransition()

	const lang: Lang = exportAs === "svg" ? "html" : "tsx"

	// TODO: Extract to some provider
	const [color, setColor] = useState<string | null>(null)

	// TODO: Extract to pattern
	useEffect(() => {
		setStarted(true)
		const d = window.setTimeout(() => setStarted(false), 100)
		return () => window.clearTimeout(d)
	}, [pending, setStarted])

	return (
		<Sidebar2>
			<header className="section-header">
				<section className="section is-start">
					<header className="section-header-header">
						{/* <feather.MousePointer className="section-icon" /> */}
						<h6 className="section-name">Selected</h6>
						<ExportAs value={exportAs} setValue={setExportAs} />
					</header>
				</section>
				<div className="section-header-body is-padding-bottom" {...scrollProps}>
					<SyntaxHighlighting lang={lang} code={clipboard} />
				</div>
			</header>
			<div className="section-body">
				<hr className="hr" />
				<section className="section">
					{/* <header className="section-header-header">
						<h6 className="section-name">Color</h6>
						<ColorPicker color={color} setColor={setColor} />
						<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={e => setColor(null)} />
					</header> */}
					<header className="section-header-header">
						{/* <feather.PenTool className="section-icon" /> */}
						<h6 className="section-name">Color</h6>
						<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={resetSize} />
					</header>
					<ul className="checkboxes">
						<label className="checkbox">
							<span className="checkbox-name">Color</span>
							<ColorPicker color={color} setColor={setColor} />
						</label>
						<label className="checkbox">
							<span className="checkbox-name">Monochrome (social & payments)</span>
							<input
								type="checkbox"
								checked={preferMonochrome}
								onChange={e => startTransition(() => setPreferMonochrome(e.currentTarget.checked))}
							/>
						</label>
					</ul>
				</section>
				<hr className="hr" />
				<section className="section">
					<header className="section-header-header">
						{/* <feather.PenTool className="section-icon" /> */}
						<h6 className="section-name">Size</h6>
						<span className="section-range-desc">{size.toFixed(0)} PX</span>
						<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={resetSize} />
					</header>
					<ProgressRange value={size} setValue={setSize} min={SIZE_MIN} max={SIZE_MAX} step={SIZE_STEP} />
				</section>
				<hr className="hr" />
				<section className="section">
					<header className="section-header-header">
						{/* <feather.PenTool className="section-icon" /> */}
						<h6 className="section-name">Stroke width</h6>
						<span className="section-range-desc">{strokeWidth.toFixed(2)}</span>
						<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={resetStrokeWidth} />
					</header>
					<ProgressRange
						value={strokeWidth}
						setValue={setStrokeWidth}
						min={STROKE_MIN}
						max={STROKE_MAX}
						step={STROKE_STEP}
					/>
				</section>
				<hr className="hr" />
			</div>
			<div className="section-spacer"></div>
			<footer className="section-footer">
				<hr className="hr is-collapsible" />
				<section className="section is-end">
					<header className="section-header-header">
						{/* <feather.Shield className="section-icon" fill="currentColor" strokeWidth={4} /> */}
						<h6 className="section-name">Sponsor</h6>
					</header>
				</section>
			</footer>
		</Sidebar2>
	)
}

function useClearSelectedShortcut({ clearSelected }: { clearSelected: () => void }) {
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				clearSelected()
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [clearSelected])
	return void 0
}

function AppMain() {
	const { results } = useContext(SearchContext)!
	const { clearSelected } = useContext(ClipboardContext)!

	const count = results.reduce((sum, [names]) => sum + names.length, 0)

	// prettier-ignore
	useVisibleDocumentTitle({
		active:   `Feather\u2002·\u2002${count} icons`,
		inactive: "Feather",
	})

	useClearSelectedShortcut({ clearSelected })

	//// useEffect(() => {
	//// 	function handleClick(e: MouseEvent) {
	//// 		//// clearSelected()
	//// 		console.log(e.target)
	//// 	}
	//// 	window.addEventListener("click", handleClick, false)
	//// 	return () => window.removeEventListener("click", handleClick, false)
	//// }, [clearSelected])

	return (
		<Main>
			<Grid />
		</Main>
	)
}
