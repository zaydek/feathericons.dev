import * as feather from "@icons/feather/tsx"
import * as wkBrandsMonoCircle from "@icons/wolfkit/brands/mono-circle/tsx"
import * as wkBrandsMonoSquare from "@icons/wolfkit/brands/mono-square/tsx"
import * as wkBrandsMono from "@icons/wolfkit/brands/mono/tsx"
import * as wkBrandsOriginalCircle from "@icons/wolfkit/brands/original-circle/tsx"
import * as wkBrandsOriginalSquare from "@icons/wolfkit/brands/original-square/tsx"
import * as wkBrandsOriginal from "@icons/wolfkit/brands/original/tsx"
import * as wkPaymentsMonoFilled from "@icons/wolfkit/payments/mono-filled/tsx"
import * as wkPaymentsMono from "@icons/wolfkit/payments/mono/tsx"
import * as wkPaymentsOriginalFilled from "@icons/wolfkit/payments/original-filled/tsx"
import * as wkPaymentsOriginal from "@icons/wolfkit/payments/original/tsx"

import {
	Checkbox,
	Checkboxes,
	DebugCssEffect,
	Main,
	MemoGrid,
	MonochromeCheckboxFolder,
	Range,
	Resource,
	SearchBar,
	SelectExportAs,
	Sidebar1,
	Sidebar2,
	SyntaxHighlighting,
	TheWolfKit,
} from "@/components"
import { useScrollProps } from "@/hooks"
import { useVisibleDocumentTitle } from "@/hooks/document-title"
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
import { useCallback, useContext, useEffect, useMemo, useTransition } from "react"
import { Lang } from "shiki-es"

export function App() {
	const { setStarted } = useContext(ProgressBarContext)!

	useEffect(() => {
		setStarted(true)
		const d = window.setTimeout(() => setStarted(false), 100)
		return () => window.clearTimeout(d)
	}, [setStarted])

	return (
		<DebugCssEffect>
			<AppSidebar1 />
			<AppSidebar2 />
			<AppMain />
		</DebugCssEffect>
	)
}

function AppSidebar1() {
	const {
		showFeather,
		setShowFeather,
		brandsMonochrome,
		setBrandsMonochrome,
		showBrandsOriginal,
		setShowBrandsOriginal,
		showBrandsOriginalCircle,
		setShowBrandsOriginalCircle,
		showBrandsOriginalSquare,
		setShowBrandsOriginalSquare,
		paymentsMonochrome,
		setPaymentsMonochrome,
		showPaymentsOriginal,
		setShowPaymentsOriginal,
		showPaymentsOriginalFilled,
		setShowPaymentsOriginalFilled,
		resetAll,
	} = useContext(SearchContext)!

	const { scrollProps } = useScrollProps()

	const { setStarted } = useContext(ProgressBarContext)!
	const [pending, startTransition] = useTransition()

	const setAllMonochrome = useCallback(() => {
		const every = brandsMonochrome || paymentsMonochrome
		setBrandsMonochrome(!every)
		setPaymentsMonochrome(!every)
	}, [brandsMonochrome, paymentsMonochrome, setBrandsMonochrome, setPaymentsMonochrome])

	const createVoidTransition = useCallback(function (fn: () => void) {
		return () => startTransition(fn)
	}, [])

	const createTransition = useCallback(function <T>(fn: (_: T) => void) {
		return (arg: T) => startTransition(() => fn(arg))
	}, [])

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
							<feather.Package className="section-icon" />
							<h6 className="section-name">Icons</h6>
							<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={resetAll} />
						</header>
						<Checkboxes>
							<Checkbox
								name="Feather"
								icon={feather.Feather}
								checked={showFeather}
								setChecked={createTransition(setShowFeather)}
							/>
						</Checkboxes>
						<Checkboxes>
							<MonochromeCheckboxFolder
								//// name="Brands"
								name={brandsMonochrome ? "Brands (mono)" : "Brands"}
								icon={feather.Shield}
								checked={brandsMonochrome}
								setChecked={createVoidTransition(setAllMonochrome)}
							/>
							<Checkboxes>
								<Checkbox
									name="Original"
									icon={brandsMonochrome ? wkBrandsMono.Twitter : wkBrandsOriginal.Twitter}
									checked={showBrandsOriginal}
									setChecked={createTransition(setShowBrandsOriginal)}
								/>
								<Checkbox
									name="Circle"
									icon={brandsMonochrome ? wkBrandsMonoCircle.Twitter : wkBrandsOriginalCircle.Twitter}
									checked={showBrandsOriginalCircle}
									setChecked={createTransition(setShowBrandsOriginalCircle)}
								/>
								<Checkbox
									name="Square"
									icon={brandsMonochrome ? wkBrandsMonoSquare.Twitter : wkBrandsOriginalSquare.Twitter}
									checked={showBrandsOriginalSquare}
									setChecked={createTransition(setShowBrandsOriginalSquare)}
								/>
							</Checkboxes>
						</Checkboxes>
						<Checkboxes>
							<MonochromeCheckboxFolder
								//// name="Payments"
								name={paymentsMonochrome ? "Payments (mono)" : "Payments"}
								icon={feather.CreditCard}
								checked={paymentsMonochrome}
								setChecked={createVoidTransition(setAllMonochrome)}
							/>
							<Checkboxes>
								<Checkbox
									name="Original"
									icon={paymentsMonochrome ? wkPaymentsMono.Stripe : wkPaymentsOriginal.Stripe}
									checked={showPaymentsOriginal}
									setChecked={createTransition(setShowPaymentsOriginal)}
								/>
								<Checkbox
									name="Filled"
									icon={paymentsMonochrome ? wkPaymentsMonoFilled.Stripe : wkPaymentsOriginalFilled.Stripe}
									checked={showPaymentsOriginalFilled}
									setChecked={createTransition(setShowPaymentsOriginalFilled)}
								/>
							</Checkboxes>
						</Checkboxes>
					</section>
					<hr className="hr" />
				</div>
			</header>
			<div className="section-spacer"></div>
			<footer className="section-footer">
				<hr className="hr is-collapsible" />
				<section className="section is-end">
					<header className="section-header-header">
						<feather.Globe className="section-icon" />
						<h6 className="section-name">Resources</h6>
					</header>
					<nav className="resources">
						{/* <Resource name="Star icons on GitHub" icon={wkBrandsOriginal.Github} />
						<Resource name="Star site on GitHub" icon={wkBrandsOriginal.Github} /> */}
						<Resource
							name="Star icons on GitHub"
							icon={p => <feather.Star style={{ color: "orange" }} fill="currentColor" strokeWidth={4} {...p} />}
						/>
						<Resource
							name="Star app on GitHub"
							icon={p => <feather.Star style={{ color: "orange" }} fill="currentColor" strokeWidth={4} {...p} />}
						/>
						{/* <Resource name="Feather Figma Plugin" icon={wkBrandsOriginal.Figma} /> */}
						<Resource name="The Wolf Kit" icon={TheWolfKit} />
						<Resource name="Share on Twitter" icon={wkBrandsOriginal.Twitter} />
					</nav>
				</section>
			</footer>
		</Sidebar1>
	)
}

function AppSidebar2() {
	const { exportAs, setExportAs, clipboard } = useContext(ClipboardContext)!
	const { size, setSize, strokeWidth, setStrokeWidth, resetSize, resetStrokeWidth } = useContext(RangeContext)!

	const { scrollProps } = useScrollProps()

	const lang: Lang = exportAs === "svg" ? "html" : "tsx"

	return (
		<Sidebar2>
			<header className="section-header">
				<section className="section is-start">
					<header className="section-header-header">
						<feather.MousePointer className="section-icon" />
						<h6 className="section-name">Selected</h6>
						<SelectExportAs value={exportAs} setValue={setExportAs} />
					</header>
				</section>
				<div className="section-header-body is-padding-bottom" {...scrollProps}>
					<SyntaxHighlighting lang={lang} code={clipboard} />
				</div>
			</header>
			<div className="section-body">
				<hr className="hr" />
				<section className="section">
					<header className="section-header-header">
						<feather.Circle className="section-icon" />
						<h6 className="section-name">Color</h6>
					</header>
				</section>
				<hr className="hr" />
				<section className="section">
					<header className="section-header-header">
						<feather.PenTool className="section-icon" />
						<h6 className="section-name">Size</h6>
						<span className="section-range-desc">{size.toFixed(0)} PX</span>
						<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={resetSize} />
					</header>
					<Range value={size} setValue={setSize} min={SIZE_MIN} max={SIZE_MAX} step={SIZE_STEP} />
				</section>
				<hr className="hr" />
				<section className="section">
					<header className="section-header-header">
						<feather.PenTool className="section-icon" />
						<h6 className="section-name">Stroke width</h6>
						<span className="section-range-desc">{strokeWidth.toFixed(3)}</span>
						<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={resetStrokeWidth} />
					</header>
					<Range value={strokeWidth} setValue={setStrokeWidth} min={STROKE_MIN} max={STROKE_MAX} step={STROKE_STEP} />
				</section>
				<hr className="hr" />
			</div>
			<div className="section-spacer"></div>
			<footer className="section-footer">
				<hr className="hr is-collapsible" />
				<section className="section is-end">
					<header className="section-header-header">
						<feather.Shield className="section-icon" />
						<h6 className="section-name">Sponsor</h6>
					</header>
				</section>
			</footer>
		</Sidebar2>
	)
}

function AppMain() {
	const { results } = useContext(SearchContext)!

	const count = useMemo(() => {
		return results.reduce((sum, [names]) => sum + names.length, 0)
	}, [results])

	// prettier-ignore
	useVisibleDocumentTitle({
		active:   `Feather\u2002·\u2002${count} icons`,
		inactive: "Feather",
	})

	return (
		<Main>
			<MemoGrid results={results} />
		</Main>
	)
}
