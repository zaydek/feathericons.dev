import * as feather from "@icons/feather/tsx"
import * as wkPaymentsMonoFilled from "@icons/wolfkit/payments/mono-filled/tsx"
import * as wkPaymentsMono from "@icons/wolfkit/payments/mono/tsx"
import * as wkPaymentsOriginalFilled from "@icons/wolfkit/payments/original-filled/tsx"
import * as wkPaymentsOriginal from "@icons/wolfkit/payments/original/tsx"
import * as wkSocialMono from "@icons/wolfkit/social/mono/tsx"
import * as wkSocialOriginal from "@icons/wolfkit/social/original/tsx"

import {
	Anchor,
	DEV_DebugCss,
	ExportAs,
	Main,
	ProgressRange,
	SearchBar,
	Sidebar1,
	Sidebar2,
	SyntaxHighlighting,
} from "@/components"
import { resources } from "@/data"
import { cx, DynamicIcon, useScrollProps } from "@/lib"
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
import { useQuery } from "@tanstack/react-query"
import { useContext, useEffect, useMemo, useTransition } from "react"
import { Lang } from "shiki-es"
import { fetchIconsets } from "./fetch-iconsets"

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
	const scrollProps = useScrollProps()

	const { setStarted } = useContext(ProgressBarContext)!
	const {
		feather: showFeather,
		setFeather: setShowFeather,
		wkSocial: showSocial,
		setWkSocial: setShowSocial,
		wkPayments: showPayments,
		setWkPayments: setShowPayments,
		wkPaymentsValue: paymentsRadio,
		setWkPaymentsValue: setPaymentsRadio,
		monochromaticMode,
		setMonochromaticMode,
		compactMode,
		setCompactMode,
		resetIcons,
		resetIconSettings,
	} = useContext(SearchContext)!

	const [pending, startTransition] = useTransition()

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
							<div className="sidebar-align-icon-frame">
								<feather.Package className="section-icon" />
							</div>
							<h6 className="section-name u-flex-1">Icons</h6>
							<div className="sidebar-align-icon-frame">
								<feather.RotateCcw
									className="section-reset-icon"
									strokeWidth={4}
									onClick={() => startTransition(resetIcons)}
								/>
							</div>
						</header>
						{/* <div> */}
						<ul className="checkboxes">
							<label className="checkbox">
								<div className="sidebar-align-icon-frame">
									<feather.Feather className="checkbox-icon" />
								</div>
								<span className="checkbox-name u-flex-1">Feather icons</span>
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
									<DynamicIcon
										className="checkbox-icon"
										icon={monochromaticMode ? wkSocialMono.Twitter : wkSocialOriginal.Twitter}
									/>
								</div>
								<span className="checkbox-name u-flex-1">Social logos</span>
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
									<DynamicIcon
										className="checkbox-icon"
										icon={monochromaticMode ? wkPaymentsMono.Stripe : wkPaymentsOriginal.Stripe}
									/>
								</div>
								<span className="checkbox-name u-flex-1">Payment logos</span>
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
											icon={monochromaticMode ? wkPaymentsMono.Stripe : wkPaymentsOriginal.Stripe}
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
											icon={monochromaticMode ? wkPaymentsMonoFilled.Stripe : wkPaymentsOriginalFilled.Stripe}
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
						{/* </div> */}
					</section>
				</div>
			</header>
			<div className="sidebar-body">
				<hr className="hairline" />
				<section className="section">
					<header className="section-header">
						<div className="sidebar-align-icon-frame">
							<feather.Settings className="section-icon" />
						</div>
						<h6 className="section-name u-flex-1">Icon settings</h6>
						<div className="sidebar-align-icon-frame">
							<feather.RotateCcw
								className="section-reset-icon"
								strokeWidth={4}
								onClick={() => startTransition(resetIconSettings)}
							/>
						</div>
					</header>
					<ul className="checkboxes">
						<label className="checkbox">
							{/* <div className="sidebar-align-icon-frame">
								<feather.Grid className="checkbox-icon" />
							</div> */}
							<div className="sidebar-align-frame u-flex-1">
								<span className="checkbox-name u-flex-1">Monochromatic mode</span>
							</div>
							<div className="sidebar-align-icon-frame">
								<input
									type="checkbox"
									checked={monochromaticMode}
									onChange={e => startTransition(() => setMonochromaticMode(e.currentTarget.checked))}
								/>
							</div>
						</label>
						<label className="checkbox">
							{/* <div className="sidebar-align-icon-frame">
								<feather.Grid className="checkbox-icon" />
							</div> */}
							<div className="sidebar-align-frame u-flex-1">
								<span className="checkbox-name u-flex-1">Compact mode</span>
							</div>
							<div className="sidebar-align-icon-frame">
								<input type="checkbox" checked={compactMode} onChange={e => setCompactMode(e.currentTarget.checked)} />
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
	const scrollProps = useScrollProps()

	const { exportAs, setExportAs, clipboard } = useContext(ClipboardContext)!
	const { size, setSize, strokeWidth, setStrokeWidth, resetSize, resetStrokeWidth } = useContext(RangeContext)!

	const lang: Lang = exportAs === "svg" ? "html" : "tsx"

	return (
		<Sidebar2>
			<header className="sidebar-header">
				<section className="section is-start">
					<header className="section-header">
						<div className="sidebar-align-icon-frame">
							<feather.Clipboard className="section-icon" />
						</div>
						<h6 className="section-name u-flex-1">Copy as</h6>
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
				<hr className="hairline" />
				<section className="section">
					<header className="section-header">
						<div className="sidebar-align-icon-frame">
							<feather.PenTool className="section-icon" />
						</div>
						<h6 className="section-name u-flex-1">size</h6>
						<span className="section-range-desc">{size.toFixed(0)} PX</span>
						<div className="sidebar-align-icon-frame">
							<feather.RotateCcw className="section-reset-icon" strokeWidth={4} onClick={resetSize} />
						</div>
					</header>
					<ProgressRange value={size} setValue={setSize} min={SIZE_MIN} max={SIZE_MAX} step={SIZE_STEP} />
				</section>
				<hr className="hairline" />
				<section className="section">
					<header className="section-header">
						<div className="sidebar-align-icon-frame">
							<feather.PenTool className="section-icon" />
						</div>
						<h6 className="section-name u-flex-1">stroke width</h6>
						<span className="section-range-desc">{strokeWidth.toFixed(2)}</span>
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
						<div className="sidebar-align-icon-frame">
							{/* <feather.Shield className="section-icon" fill="currentColor" strokeWidth={4} /> */}
							<feather.Shield className="section-icon" />
						</div>
						<h6 className="section-name u-flex-1">Sponsor</h6>
					</header>
				</section>
			</footer>
		</Sidebar2>
	)
}

//// function useClearSelectedShortcut({ clearSelected }: { clearSelected: () => void }) {
//// 	useEffect(() => {
//// 		function handleKeyDown(e: KeyboardEvent) {
//// 			if (e.key === "Escape") {
//// 				clearSelected()
//// 			}
//// 		}
//// 		window.addEventListener("keydown", handleKeyDown, false)
//// 		return () => window.removeEventListener("keydown", handleKeyDown, false)
//// 	}, [clearSelected])
//// 	return void 0
//// }

//// type Iconset =
//// 	| "@icons/feather"
//// 	| "@icons/wolfkit/social/original"
//// 	| "@icons/wolfkit/social/mono"
//// 	| "@icons/wolfkit/payments/original"
//// 	| "@icons/wolfkit/payments/original-filled"
//// 	| "@icons/wolfkit/payments/mono"
//// 	| "@icons/wolfkit/payments/mono-filled"

function AppMain() {
	const { feather, wkSocial, wkPayments, wkPaymentsValue, monochromaticMode, compactMode } = useContext(SearchContext)!
	//// const { removeAllNames } = useContext(ClipboardContext)!

	//// const count = results.reduce((sum, [names]) => sum + names.length, 0)
	//// useVisibleDocumentTitle([`${count} icons`, "Feather"])
	////
	//// //// // TODO
	//// //// useClearSelectedShortcut({ clearSelected: removeAllNames })
	////
	//// useEffect(() => {
	//// 	function handleKeyDown(e: KeyboardEvent) {
	//// 		if (e.key === "Escape") {
	//// 			removeAllNames()
	//// 			if (document.activeElement instanceof HTMLElement) {
	//// 				document.activeElement.blur()
	//// 			}
	//// 		}
	//// 	}
	//// 	window.addEventListener("keydown", handleKeyDown, false)
	//// 	return () => window.removeEventListener("keydown", handleKeyDown, false)
	//// }, [removeAllNames])
	////
	//// const [monochrome, setMonochrome] = useState(false)
	////
	//// const { data, isSuccess, refetch } = useQuery(["iconsets"], () =>
	//// 	fetchIconsets(
	//// 		{
	//// 			feather: true,
	//// 			wkSocial: false,
	//// 			wkPayments: true,
	//// 			wkPaymentsRadio: "normal",
	//// 		},
	//// 		//// true,
	//// 		monochrome,
	//// 	),
	//// )
	////
	//// useEffect(() => {
	//// 	function handleKeydown(e: KeyboardEvent) {
	//// 		if (e.key === "a") {
	//// 			setMonochrome(
	//// 		}
	//// 		if (e.key === "d") {
	//// 			console.log("test")
	//// 			refetch()
	//// 		}
	//// 	}
	//// 	window.addEventListener("keydown", handleKeydown, false)
	//// 	return () => window.addEventListener("keydown", handleKeydown, false)
	//// }, [refetch])

	//// const [icons, setIcons] = useState<Icon[] | null>(null)
	////
	//// useEffect(() => {
	//// 	async function run() {
	//// 		const icons = await import("@icons/feather/tsx")
	//// 		setIcons(Object.values(icons))
	//// 	}
	//// 	run()
	//// }, [])
	////
	//// console.log(icons)

	const { isSuccess, data, refetch } = useQuery(["iconsets"], () =>
		fetchIconsets(
			{
				feather,
				wkSocial,
				wkPayments,
				wkPaymentsValue,
			},
			monochromaticMode,
		),
	)

	// Create a dependency array
	const refretchDeps = useMemo(
		() => [feather, wkSocial, wkPayments, wkPaymentsValue, monochromaticMode],
		[feather, monochromaticMode, wkPayments, wkPaymentsValue, wkSocial],
	)

	useEffect(() => {
		console.log("called refetch")
		refetch()
	}, [refetch, refretchDeps])

	return (
		<Main>
			<div className={cx("grid", compactMode && "is-compact-mode")}>
				{isSuccess &&
					data.map(([name, Icon], index) => (
						<article key={index} className="grid-item">
							<figure className="grid-item-icon-frame">
								<Icon className="grid-item-icon" />
							</figure>
							{!compactMode && <figcaption className="grid-item-name">{name}</figcaption>}
						</article>
					))}
			</div>
		</Main>
	)

	//// return (
	//// 	<Main
	//// 		// TODO: Change to onClickCapture?
	//// 		onClick={e => {
	//// 			if (e.target instanceof HTMLElement && e.target.closest(".grid-item") === null) {
	//// 				removeAllNames()
	//// 			}
	//// 		}}
	//// 	>
	//// 		<Grid />
	//// 	</Main>
	//// )
}
