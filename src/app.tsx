import * as feather from "@icons/feather/tsx"
import * as wkBrandsOriginal from "@icons/wolfkit/brands/original/tsx"

import {
	Anchor,
	Checkbox,
	Checkboxes,
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
import { useScrollProps, useVisibleDocumentTitle } from "@/lib"
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
import { useCallback, useContext, useEffect, useState, useTransition } from "react"
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
		setPreferMonochrome,
		showNames,
		setShowNames,
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
						{/* <div> */}
						{/* <Checkboxes>
							<Checkbox
								name="Feather"
								icon={feather.Feather}
								checked={showFeather}
								setChecked={createTransition(setShowFeather)}
							/>
						</Checkboxes> */}
						<ul className="checkboxes">
							<li>
								<label className="checkbox">
									<feather.Feather className="checkbox-icon" />
									<div className="checkbox-name">Feather</div>
									<input
										type="checkbox"
										checked={showFeather}
										onChange={createTransition(() => setShowFeather(curr => !curr))}
									/>
								</label>
							</li>
						</ul>
						<ul className="checkboxes">
							<li>
								<label className="checkbox">
									<feather.Feather className="checkbox-icon" />
									<div className="checkbox-name">Sociak</div>
									<input
										type="checkbox"
										checked={showFeather}
										onChange={createTransition(() => setShowFeather(curr => !curr))}
									/>
								</label>
							</li>
						</ul>
						<ul className="checkboxes">
							<li>
								<label className="checkbox">
									<feather.Feather className="checkbox-icon" />
									<div className="checkbox-name">Payments</div>
									<input
										type="checkbox"
										checked={showFeather}
										onChange={createTransition(() => setShowFeather(curr => !curr))}
									/>
								</label>
							</li>
						</ul>
						{/* <Checkboxes>
							<Checkbox
								name="Payments"
								icon={feather.CreditCard}
								//// icon={p => (
								//// 	<feather.Folder
								//// 		// TODO
								//// 		style={{ color: "dodgerblue", transform: "scale(0.875)", opacity: 0.75 }}
								//// 		fill="currentColor"
								//// 		strokeWidth={4}
								//// 		{...p}
								//// 	/>
								//// )}
								checked={showPayments}
								setChecked={createTransition(setShowPayments)}
							/>
							<Checkboxes>
								<Radio<PaymentsRadioValue>
									name="Original"
									icon={preferMonochrome ? wkPaymentsMono.Stripe : wkPaymentsOriginal.Stripe}
									radioName="payments"
									value="normal"
									setValue={createTransition(next => {
										setShowPayments(true)
										setPaymentsRadio(next)
									})}
									checked={paymentsRadio === "normal"}
								/>
								<Radio<PaymentsRadioValue>
									name="Filled"
									icon={preferMonochrome ? wkPaymentsMonoFilled.Stripe : wkPaymentsOriginalFilled.Stripe}
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
						{false && (
							<Checkboxes>
								<Checkbox
									name="Show icon names"
									icon={feather.Eye}
									//// icon={p => (
									//// 	<feather.Search
									//// 		// TODO
									//// 		style={{ transform: "scale(0.875)", opacity: 0.75 }}
									//// 		//// fill="currentColor"
									//// 		strokeWidth={4}
									//// 		{...p}
									//// 	/>
									//// )}
									checked={showNames}
									setChecked={setShowNames}
								/>
							</Checkboxes>
						)} */}
						{/* </div> */}
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
					<Checkboxes>
						{/* <Checkbox
							name="Prefer monochrome"
							icon={p => (
								<feather.Droplet
									// TODO
									style={{ transform: "scale(0.875)", opacity: 0.75 }}
									fill="currentColor"
									strokeWidth={4}
									{...p}
								/>
							)}
							checked={preferMonochrome}
							setChecked={createTransition(setPreferMonochrome)}
						/> */}
						<Checkbox
							name="Show names"
							icon={showNames ? feather.ToggleRight : feather.ToggleLeft}
							//// icon={p => (
							//// 	<feather.Search
							//// 		// TODO
							//// 		style={{ transform: "scale(0.875)", opacity: 0.75 }}
							//// 		//// fill="currentColor"
							//// 		strokeWidth={4}
							//// 		{...p}
							//// 	/>
							//// )}
							checked={showNames}
							setChecked={setShowNames}
						/>
					</Checkboxes>
				</section>
				<hr className="hr" />
				{false && (
					<>
						<section className="section">
							<header className="section-header-header">
								{/* <feather.Monitor className="section-icon" /> */}
								<h6 className="section-name">Display</h6>
								<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={resetDisplay} />
							</header>
							<Checkboxes>
								<Checkbox
									name="Show names"
									icon={p => (
										<feather.Search
											// TODO
											style={{ transform: "scale(0.875)", opacity: 0.75 }}
											//// fill="currentColor"
											strokeWidth={4}
											{...p}
										/>
									)}
									checked={showNames}
									setChecked={setShowNames}
								/>
							</Checkboxes>
						</section>
						<hr className="hr" />
					</>
				)}
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
	const { exportAs, setExportAs, clipboard } = useContext(ClipboardContext)!
	const { size, setSize, strokeWidth, setStrokeWidth, resetSize, resetStrokeWidth } = useContext(RangeContext)!

	const { scrollProps } = useScrollProps()

	const lang: Lang = exportAs === "svg" ? "html" : "tsx"

	// TODO: Extract to some provider
	const [color, setColor] = useState<string | null>(null)

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
					<header className="section-header-header">
						{/* <feather.Circle
							className="section-icon"
							fill="var(--app-color)"
							stroke="var(--app-color)"
							strokeWidth={4}
						/> */}
						<h6 className="section-name">Color</h6>
						<ColorPicker color={color} setColor={setColor} />
						{/* <ColorPicker /> */}
						<feather.RotateCcw className="section-undo" strokeWidth={4} onClick={e => setColor(null)} />
						{/* <div> */}
					</header>
					<Checkboxes>
						{/* TODO */}
						<Checkbox
							name="Toggle monochrome"
							//// icon={feather.Feather}
							//// checked={showFeather}
							//// setChecked={createTransition(setShowFeather)}
						/>
					</Checkboxes>
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
