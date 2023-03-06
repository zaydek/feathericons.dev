import * as feather from "@icons/feather/tsx"
import * as wkPaymentsMonoFilled from "@icons/wolfkit/payments/mono-filled/tsx"
import * as wkPaymentsMono from "@icons/wolfkit/payments/mono/tsx"
import * as wkPaymentsOriginalFilled from "@icons/wolfkit/payments/original-filled/tsx"
import * as wkPaymentsOriginal from "@icons/wolfkit/payments/original/tsx"

import {
	Anchor,
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
import { resources } from "@/data"
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
		showPayments,
		setShowPayments,
		paymentsRadio,
		setPaymentsRadio,
		preferMonochrome,
		showNames,
		setShowNames,
		resetIcons,
		resetDisplay,
	} = useContext(SearchContext)!

	const [pending, startTransition] = useTransition()

	// TODO: Extract to pattern
	useEffect(() => {
		setStarted(true)
		const d = window.setTimeout(() => setStarted(false), 100)
		return () => window.clearTimeout(d)
	}, [pending, setStarted])

	return (
		<Sidebar1>
			<header className="sidebar-header">
				<section className="section is-start">
					<SearchBar />
				</section>
				<div className="sidebar-header-scroll-area u-flex-1" {...scrollProps}>
					<section className="section">
						<header className="section-header">
							<div className="sidebar-align-frame u-flex-1">
								<h6 className="section-name">Icons</h6>
							</div>
							<div className="sidebar-align-icon-frame">
								<feather.RotateCcw className="section-reset-icon" strokeWidth={4} onClick={resetIcons} />
							</div>
						</header>
						<ul className="checkboxes">
							<label className="checkbox">
								<div className="sidebar-align-icon-frame">
									<feather.Feather className="checkbox-icon" />
								</div>
								<span className="checkbox-name u-flex-1">Feather</span>
								<div className="sidebar-align-icon-frame">
									<input
										type="checkbox"
										checked={showFeather}
										onChange={e => startTransition(() => setShowFeather(e.currentTarget.checked))}
									/>
								</div>
							</label>
						</ul>
						<ul className="checkboxes">
							<label className="checkbox">
								<div className="sidebar-align-icon-frame">
									<feather.Twitter className="checkbox-icon" />
								</div>
								<span className="checkbox-name u-flex-1">Social</span>
								<div className="sidebar-align-icon-frame">
									<input
										type="checkbox"
										checked={showSocial}
										onChange={e => startTransition(() => setShowSocial(e.currentTarget.checked))}
									/>
								</div>
							</label>
						</ul>
						<ul className="checkboxes">
							<label className="checkbox">
								<div className="sidebar-align-icon-frame">
									<feather.CreditCard className="checkbox-icon" />
								</div>
								<span className="checkbox-name u-flex-1">Payments</span>
								<div className="sidebar-align-icon-frame">
									<input
										type="checkbox"
										checked={showPayments}
										onChange={e => startTransition(() => setShowPayments(e.currentTarget.checked))}
									/>
								</div>
							</label>
							<ul className="checkboxes">
								<label className="checkbox">
									<div className="sidebar-align-icon-frame">
										<DynamicIcon
											className="checkbox-icon"
											icon={preferMonochrome ? wkPaymentsMono.Stripe : wkPaymentsOriginal.Stripe}
										/>
									</div>
									<span className="checkbox-name u-flex-1">Original</span>
									<div className="sidebar-align-icon-frame">
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
									</div>
								</label>
							</ul>
							<ul className="checkboxes">
								<label className="checkbox">
									<div className="sidebar-align-icon-frame">
										<DynamicIcon
											className="checkbox-icon"
											icon={preferMonochrome ? wkPaymentsMonoFilled.Stripe : wkPaymentsOriginalFilled.Stripe}
										/>
									</div>
									<span className="checkbox-name u-flex-1">Filled</span>
									<div className="sidebar-align-icon-frame">
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
									</div>
								</label>
							</ul>
						</ul>
					</section>
				</div>
			</header>
			<div className="sidebar-body">
				<hr className="hairline" />
				<section className="section">
					<header className="section-header">
						<div className="sidebar-align-frame u-flex-1">
							<h6 className="section-name">Display</h6>
						</div>
						<div className="sidebar-align-icon-frame">
							<feather.RotateCcw className="section-reset-icon" strokeWidth={4} onClick={resetDisplay} />
						</div>
					</header>
					<ul className="checkboxes">
						<label className="checkbox">
							<div className="sidebar-align-icon-frame">
								<feather.Grid className="checkbox-icon" />
							</div>
							<span className="checkbox-name u-flex-1">Show names</span>
							<div className="sidebar-align-icon-frame">
								<input type="checkbox" checked={showNames} onChange={e => setShowNames(e.currentTarget.checked)} />
							</div>
						</label>
					</ul>
				</section>
				<hr className="hairline" />
			</div>
			<div className="u-flex-1"></div>
			<footer className="sidebar-footer">
				<hr className="hairline is-collapsible" />
				<section className="section is-end">
					<header className="section-header">
						<div className="sidebar-align-frame">
							<feather.Globe className="section-icon" />
						</div>
						<h6 className="section-name u-flex-1">Resources</h6>
					</header>
					<nav className="resources">
						{resources.map((resource, index) => (
							<Anchor className="resource" href={resource.href} key={index}>
								<div className="sidebar-align-icon-frame">
									<resource.icon className="resource-icon" />
								</div>
								<span className="resource-name u-flex-1">{resource.name}</span>
								<div className="sidebar-align-icon-frame">
									<feather.ArrowUpRight className="resource-icon" strokeWidth={4} />
								</div>
							</Anchor>
						))}
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
	const [showReactColorful, setShowReactColorful] = useState(false)
	const [color, setColor] = useState<string | null>(null)

	// TODO: Extract to pattern
	useEffect(() => {
		setStarted(true)
		const d = window.setTimeout(() => setStarted(false), 100)
		return () => window.clearTimeout(d)
	}, [pending, setStarted])

	return (
		<Sidebar2>
			<header className="sidebar-header">
				<section className="section is-start">
					<header className="section-header">
						<div className="sidebar-align-frame u-flex-1">
							<h6 className="section-name">Copy as</h6>
						</div>
						<div className="sidebar-align-frame">
							<ExportAs value={exportAs} setValue={setExportAs} />
						</div>
					</header>
				</section>
				<div className="sidebar-header-scroll-area is-syntax-highlighting u-flex-1" {...scrollProps}>
					<SyntaxHighlighting lang={lang} code={clipboard} />
				</div>
			</header>
			<div className="sidebar-body">
				{false && (
					<>
						<hr className="hairline" />
						<section className="section">
							<header className="section-header">
								<div className="sidebar-align-frame u-flex-1">
									<h6 className="section-name">Variants</h6>
								</div>
								<div className="sidebar-align-icon-frame">
									<feather.RotateCcw className="section-reset-icon" strokeWidth={4} onClick={resetSize} />
								</div>
							</header>
							<ul className="checkboxes">
								<label className="checkbox">
									<div className="sidebar-align-frame u-flex-1">
										<span className="checkbox-name u-flex-1">Monochrome (social & payments)</span>
									</div>
									<div className="sidebar-align-icon-frame">
										<input
											type="checkbox"
											checked={preferMonochrome}
											onChange={e => startTransition(() => setPreferMonochrome(e.currentTarget.checked))}
										/>
									</div>
								</label>
							</ul>
						</section>
					</>
				)}
				<hr className="hairline" />
				<section className="section">
					<header className="section-header">
						<div className="sidebar-align-frame u-flex-1">
							<h6 className="section-name">Size</h6>
						</div>
						<span className="section-name">{size.toFixed(0)} PX</span>
						<div className="sidebar-align-icon-frame">
							<feather.RotateCcw className="section-reset-icon" strokeWidth={4} onClick={resetSize} />
						</div>
					</header>
					<ProgressRange value={size} setValue={setSize} min={SIZE_MIN} max={SIZE_MAX} step={SIZE_STEP} />
				</section>
				<hr className="hairline" />
				<section className="section">
					<header className="section-header">
						<div className="sidebar-align-frame u-flex-1">
							<h6 className="section-name">Stroke width</h6>
						</div>
						<span className="section-name">{strokeWidth.toFixed(2)}</span>
						<div className="sidebar-align-icon-frame">
							<feather.RotateCcw className="section-reset-icon" strokeWidth={4} onClick={resetStrokeWidth} />
						</div>
					</header>
					<ProgressRange
						value={strokeWidth}
						setValue={setStrokeWidth}
						min={STROKE_MIN}
						max={STROKE_MAX}
						step={STROKE_STEP}
					/>
				</section>
				<hr className="hairline" />
			</div>
			<div className="u-flex-1"></div>
			<footer className="sidebar-footer">
				<hr className="hairline is-collapsible" />
				<section className="section is-end">
					<header className="section-header">
						<div className="sidebar-align-frame u-flex-1">
							<h6 className="section-name u-flex-1">Sponsor</h6>
						</div>
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

	return (
		<Main>
			<Grid />
		</Main>
	)
}
