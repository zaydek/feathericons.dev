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
	Grid,
	Main,
	Radio,
	Range,
	Resource,
	SearchBar,
	SelectExportAs,
	Sidebar1,
	Sidebar2,
	SyntaxHighlighting,
} from "@/components"
import { useScrollProps } from "@/hooks"
import { useVisibleDocumentTitle } from "@/hooks/document-title"
import {
	ClipboardContext,
	PaymentsRadio,
	ProgressBarContext,
	RangeContext,
	SearchContext,
	SIZE_MAX,
	SIZE_MIN,
	SIZE_STEP,
	SocialRadio,
	STROKE_MAX,
	STROKE_MIN,
	STROKE_STEP,
} from "@/state"
import { useCallback, useContext, useEffect, useTransition } from "react"
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
		showSocial,
		setShowSocial,
		socialRadio,
		setSocialRadio,
		showPayments,
		setShowPayments,
		paymentsRadio,
		setPaymentsRadio,
		monochromeMode,
		setMonochromeMode,
		compactMode,
		setCompactMode,
		resetIcons,
		resetDisplay,
	} = useContext(SearchContext)!

	const { scrollProps } = useScrollProps()

	const { setStarted } = useContext(ProgressBarContext)!
	const [pending, startTransition] = useTransition()

	// Use function syntax because of <T>
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
			<header className="sidebar-header">
				<section className="section is-start">
					<SearchBar />
				</section>
				<div className="section-body" {...scrollProps}>
					<section className="section">
						<header className="section-header">
							<feather.Package className="section-icon" />
							<h6 className="section-name">Icons</h6>
							<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={resetIcons} />
						</header>
						{/* <div> */}
						<Checkboxes>
							<Checkbox
								name="Feather"
								icon={feather.Feather}
								checked={showFeather}
								setChecked={createTransition(setShowFeather)}
							/>
						</Checkboxes>
						<Checkboxes>
							<Checkbox
								name="Social"
								icon={p => (
									<feather.Folder
										// TODO
										style={{ color: "dodgerblue", transform: "scale(0.875)", opacity: 0.75 }}
										fill="currentColor"
										strokeWidth={4}
										{...p}
									/>
								)}
								checked={showSocial}
								setChecked={createTransition(setShowSocial)}
							/>
							<Checkboxes>
								<Radio<SocialRadio>
									name="Original"
									icon={monochromeMode ? wkBrandsMono.Twitter : wkBrandsOriginal.Twitter}
									radioName="brands"
									value="normal"
									setValue={createTransition(next => {
										setShowSocial(true)
										setSocialRadio(next)
									})}
									checked={socialRadio === "normal"}
								/>
								<Radio<SocialRadio>
									name="Circle"
									icon={monochromeMode ? wkBrandsMonoCircle.Twitter : wkBrandsOriginalCircle.Twitter}
									radioName="brands"
									value="circle"
									setValue={createTransition(next => {
										setShowSocial(true)
										setSocialRadio(next)
									})}
									checked={socialRadio === "circle"}
								/>
								<Radio<SocialRadio>
									name="Square"
									icon={monochromeMode ? wkBrandsMonoSquare.Twitter : wkBrandsOriginalSquare.Twitter}
									radioName="brands"
									value="square"
									setValue={createTransition(next => {
										setShowSocial(true)
										setSocialRadio(next)
									})}
									checked={socialRadio === "square"}
								/>
							</Checkboxes>
						</Checkboxes>
						<Checkboxes>
							<Checkbox
								name="Payments"
								icon={p => (
									<feather.Folder
										// TODO
										style={{ color: "dodgerblue", transform: "scale(0.875)", opacity: 0.75 }}
										fill="currentColor"
										strokeWidth={4}
										{...p}
									/>
								)}
								checked={showPayments}
								setChecked={createTransition(setShowPayments)}
							/>
							<Checkboxes>
								<Radio<PaymentsRadio>
									name="Original"
									icon={monochromeMode ? wkPaymentsMono.Stripe : wkPaymentsOriginal.Stripe}
									radioName="payments"
									value="normal"
									setValue={createTransition(next => {
										setShowPayments(true)
										setPaymentsRadio(next)
									})}
									checked={paymentsRadio === "normal"}
								/>
								<Radio<PaymentsRadio>
									name="Filled"
									icon={monochromeMode ? wkPaymentsMonoFilled.Stripe : wkPaymentsOriginalFilled.Stripe}
									radioName="payments"
									value="filled"
									setValue={createTransition(next => {
										setShowPayments(true)
										setPaymentsRadio(next)
									})}
									checked={paymentsRadio === "filled"}
								/>
							</Checkboxes>
						</Checkboxes>
						{/* </div> */}
					</section>
				</div>
			</header>
			<div className="section-body">
				<hr className="hr" />
				<section className="section">
					<header className="section-header">
						<feather.Monitor className="section-icon" />
						<h6 className="section-name">Display</h6>
						<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={resetDisplay} />
					</header>
					<Checkboxes>
						<Checkbox
							name="Monochrome mode"
							icon={p => (
								<feather.Droplet
									// TODO
									style={{ color: "dodgerblue", transform: "scale(0.875)", opacity: 0.75 }}
									fill="currentColor"
									strokeWidth={4}
									{...p}
								/>
							)}
							checked={monochromeMode}
							setChecked={createTransition(setMonochromeMode)}
						/>
						<Checkbox
							name="Compact mode"
							icon={p => (
								<feather.Minimize2
									// TODO
									style={{ color: "dodgerblue", transform: "scale(0.875)", opacity: 0.75 }}
									fill="currentColor"
									strokeWidth={4}
									{...p}
								/>
							)}
							checked={compactMode}
							setChecked={setCompactMode}
						/>
					</Checkboxes>
				</section>
				<hr className="hr" />
			</div>
			<div className="sidebar-spacer"></div>
			<footer className="sidebar-footer">
				<hr className="hr is-collapsible" />
				<section className="section is-end">
					<header className="section-header">
						<feather.Globe className="section-icon" />
						<h6 className="section-name">Resources</h6>
					</header>
					<nav className="resources">
						<Resource name="Icons" icon={wkBrandsOriginal.Github} />
						<Resource name="Website" icon={wkBrandsOriginal.Github} />
						<Resource name="Plugin" icon={wkBrandsOriginal.Figma} />
						<Resource name="Social & payments file" icon={wkBrandsOriginal.Figma} />
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
			<header className="sidebar-header">
				<section className="section is-start">
					<header className="section-header">
						<feather.MousePointer className="section-icon" />
						<h6 className="section-name">Selected</h6>
						<SelectExportAs value={exportAs} setValue={setExportAs} />
					</header>
				</section>
				<div className="section-body is-padding-bottom" {...scrollProps}>
					<SyntaxHighlighting lang={lang} code={clipboard} />
				</div>
			</header>
			<div className="section-body">
				<hr className="hr" />
				<section className="section">
					<header className="section-header">
						<feather.Circle className="section-icon" />
						<h6 className="section-name">Color</h6>
					</header>
				</section>
				<hr className="hr" />
				<section className="section">
					<header className="section-header">
						<feather.PenTool className="section-icon" />
						<h6 className="section-name">Size</h6>
						<span className="section-range-desc">{size.toFixed(0)} PX</span>
						<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={resetSize} />
					</header>
					<Range value={size} setValue={setSize} min={SIZE_MIN} max={SIZE_MAX} step={SIZE_STEP} />
				</section>
				<hr className="hr" />
				<section className="section">
					<header className="section-header">
						<feather.PenTool className="section-icon" />
						<h6 className="section-name">Stroke width</h6>
						<span className="section-range-desc">{strokeWidth.toFixed(3)}</span>
						<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={resetStrokeWidth} />
					</header>
					<Range value={strokeWidth} setValue={setStrokeWidth} min={STROKE_MIN} max={STROKE_MAX} step={STROKE_STEP} />
				</section>
				<hr className="hr" />
			</div>
			<div className="sidebar-spacer"></div>
			<footer className="sidebar-footer">
				<hr className="hr is-collapsible" />
				<section className="section is-end">
					<header className="section-header">
						<feather.Shield className="section-icon" />
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
