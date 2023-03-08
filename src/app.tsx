import * as Feather from "@icons/feather/tsx"
import * as WkPaymentsMonoFilled from "@icons/wk/payments/mono-filled/tsx"
import * as WkPaymentsMono from "@icons/wk/payments/mono/tsx"
import * as WkPaymentsOriginalFilled from "@icons/wk/payments/original-filled/tsx"
import * as WkPaymentsOriginal from "@icons/wk/payments/original/tsx"
import * as WkSocialMono from "@icons/wk/social/mono/tsx"
import * as WkSocialOriginal from "@icons/wk/social/original/tsx"

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
import { cx, DynamicIcon, Icon, isMac, toKebabCase, useScrollProps } from "@/lib"
import {
	ExportAsContext,
	IconPreferencesContext,
	IconsContext,
	ProgressBarContext,
	RangeContext,
	ReadOnlyClipboardContext,
	SelectionContext,
	SIZE_MAX,
	SIZE_MIN,
	SIZE_STEP,
	STROKE_MAX,
	STROKE_MIN,
	STROKE_STEP,
} from "@/state"
import { Fragment, memo, useContext, useEffect, useRef, useTransition } from "react"
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
	const scrollProps = useScrollProps()

	// TODO
	const { setStarted } = useContext(ProgressBarContext)!
	const {
		feather,
		setFeather,
		wkSocial,
		setWkSocial,
		wkPayments,
		setWkPayments,
		wkPaymentsValue,
		setWkPaymentsValue,
		resetIcons,
	} = useContext(IconsContext)!
	const { preferColor, setPreferColor, preferNames, setPreferNames, resetIconPrefs } =
		useContext(IconPreferencesContext)!

	// TODO
	const [pending, startTransition] = useTransition()
	//
	// TODO
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
								<Feather.Package className="section-icon" />
							</div>
							<h6 className="section-name u-flex-1">Icons</h6>
							<div className="sidebar-align-icon-frame">
								<Feather.RotateCcw
									className="section-reset-icon"
									strokeWidth={4}
									onClick={() => startTransition(resetIcons)}
								/>
							</div>
						</header>
						<div>
							<ul className="checkboxes">
								<label className="checkbox">
									<div className="sidebar-align-icon-frame">
										<Feather.Feather className="checkbox-icon" />
									</div>
									<span className="checkbox-name u-flex-1">Feather icons</span>
									<div className="sidebar-align-icon-frame">
										<input
											type="checkbox"
											checked={feather}
											onChange={e => startTransition(() => setFeather(e.currentTarget.checked))}
										/>
									</div>
								</label>
							</ul>
							<ul className="checkboxes">
								<label className="checkbox">
									<div className="sidebar-align-icon-frame">
										<DynamicIcon
											className="checkbox-icon"
											icon={preferColor ? WkSocialOriginal.Twitter : WkSocialMono.Twitter}
										/>
									</div>
									<span className="checkbox-name u-flex-1">Social logos</span>
									<div className="sidebar-align-icon-frame">
										<input
											type="checkbox"
											checked={wkSocial}
											onChange={e => startTransition(() => setWkSocial(e.currentTarget.checked))}
										/>
									</div>
								</label>
							</ul>
							<ul className="checkboxes">
								<label className="checkbox">
									<div className="sidebar-align-icon-frame">
										<DynamicIcon
											className="checkbox-icon payments"
											icon={
												// prettier-ignore
												preferColor
												? wkPaymentsValue === "normal"
													? WkPaymentsOriginal.CardStripe
													: WkPaymentsOriginalFilled.CardStripe
												: wkPaymentsValue === "normal"
													? WkPaymentsMono.CardStripe
													: WkPaymentsMonoFilled.CardStripe
											}
										/>
									</div>
									<span className="checkbox-name u-flex-1">Payment logos</span>
									<div className="sidebar-align-icon-frame">
										<input
											type="checkbox"
											checked={wkPayments}
											onChange={e => startTransition(() => setWkPayments(e.currentTarget.checked))}
										/>
									</div>
								</label>
								<ul className="checkboxes">
									<label className="checkbox">
										<div className="sidebar-align-icon-frame">
											<DynamicIcon
												className="checkbox-icon payments"
												icon={preferColor ? WkPaymentsOriginal.CardStripe : WkPaymentsMono.CardStripe}
											/>
										</div>
										<span className="checkbox-name u-flex-1">Original</span>
										<div className="sidebar-align-icon-frame">
											<input
												name="payments"
												type="radio"
												checked={wkPaymentsValue === "normal"}
												onChange={e =>
													startTransition(() => {
														setWkPayments(true)
														setWkPaymentsValue("normal")
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
												className="checkbox-icon payments"
												icon={preferColor ? WkPaymentsOriginalFilled.CardStripe : WkPaymentsMonoFilled.CardStripe}
											/>
										</div>
										<span className="checkbox-name u-flex-1">Filled</span>
										<div className="sidebar-align-icon-frame">
											<input
												name="payments"
												type="radio"
												checked={wkPaymentsValue === "filled"}
												onChange={e =>
													startTransition(() => {
														setWkPayments(true)
														setWkPaymentsValue("filled")
													})
												}
											/>
										</div>
									</label>
								</ul>
							</ul>
						</div>
					</section>
				</div>
			</header>
			<div className="sidebar-body">
				<hr className="hairline" />
				<section className="section">
					<header className="section-header">
						<div className="sidebar-align-icon-frame">
							<Feather.Settings className="section-icon" />
						</div>
						<h6 className="section-name u-flex-1">Settings</h6>
						<div className="sidebar-align-icon-frame">
							<Feather.RotateCcw
								className="section-reset-icon"
								strokeWidth={4}
								onClick={() => startTransition(resetIconPrefs)}
							/>
						</div>
					</header>
					<ul className="checkboxes">
						<label className="checkbox">
							<div className="sidebar-align-icon-frame">
								{/* Defer to CSS; no <svg> */}
								<div className={cx("checkbox-icon chroma", preferColor && "is-prefer-color")}></div>
							</div>
							<span className="checkbox-name u-flex-1">Colorize icons</span>
							<div className="sidebar-align-icon-frame">
								<input
									type="checkbox"
									checked={preferColor}
									onChange={e => startTransition(() => setPreferColor(e.currentTarget.checked))}
								/>
							</div>
						</label>
						<label className="checkbox">
							<div className="sidebar-align-icon-frame">
								<DynamicIcon className="checkbox-icon" icon={preferNames ? Feather.ToggleRight : Feather.ToggleLeft} />
							</div>
							<span className="checkbox-name u-flex-1">Show icon names</span>
							<div className="sidebar-align-icon-frame">
								<input type="checkbox" checked={preferNames} onChange={e => setPreferNames(e.currentTarget.checked)} />
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
							<Feather.Globe className="section-icon" />
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
									<Feather.ArrowUpRight className="resource-icon" strokeWidth={4} />
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

	const { size, setSize, strokeWidth, setStrokeWidth, resetSize, resetStrokeWidth } = useContext(RangeContext)!
	const { exportAs, setExportAs } = useContext(ExportAsContext)!
	const { readOnlyClipboard } = useContext(ReadOnlyClipboardContext)!

	const lang: Lang = exportAs === "svg" ? "html" : "tsx"

	return (
		<Sidebar2>
			<header className="sidebar-header">
				<section className="section is-start">
					<header className="section-header">
						<div className="sidebar-align-icon-frame">
							<Feather.Clipboard className="section-icon" />
						</div>
						<h6 className="section-name u-flex-1">Copy as</h6>
						<div className="sidebar-align-frame">
							<ExportAs value={exportAs} setValue={setExportAs} />
						</div>
					</header>
				</section>
				<div className="sidebar-header-scroll-area is-syntax-highlighting u-flex-1" {...scrollProps}>
					<SyntaxHighlighting lang={lang} code={readOnlyClipboard} />
				</div>
			</header>
			<div className="sidebar-body">
				<hr className="hairline" />
				<section className="section">
					<header className="section-header">
						<div className="sidebar-align-icon-frame">
							<Feather.PenTool className="section-icon" />
						</div>
						<h6 className="section-name u-flex-1">size</h6>
						<span className="section-range-desc">{size.toFixed(0)} PX</span>
						<div className="sidebar-align-icon-frame">
							<Feather.RotateCcw className="section-reset-icon" strokeWidth={4} onClick={resetSize} />
						</div>
					</header>
					<ProgressRange value={size} setValue={setSize} min={SIZE_MIN} max={SIZE_MAX} step={SIZE_STEP} />
				</section>
				<hr className="hairline" />
				<section className="section">
					<header className="section-header">
						<div className="sidebar-align-icon-frame">
							<Feather.PenTool className="section-icon" />
						</div>
						<h6 className="section-name u-flex-1">stroke width</h6>
						<span className="section-range-desc">{strokeWidth.toFixed(2)}</span>
						<div className="sidebar-align-icon-frame">
							<Feather.RotateCcw className="section-reset-icon" strokeWidth={4} onClick={resetStrokeWidth} />
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
							{/* <Feather.Shield className="section-icon" fill="currentColor" strokeWidth={4} /> */}
							<Feather.Shield className="section-icon" />
						</div>
						<h6 className="section-name u-flex-1">Sponsor</h6>
					</header>
				</section>
			</footer>
		</Sidebar2>
	)
}

////////////////////////////////////////////////////////////////////////////////

function useShortcutCtrlASelectAll() {
	const { icons } = useContext(IconsContext)!
	const { setStartIndex: setNamesIndex1, setEndIndex: setNamesIndex2 } = useContext(SelectionContext)!
	useEffect(() => {
		if (icons === undefined) return
		function handleKeyDown(e: KeyboardEvent) {
			if (document.activeElement?.tagName !== "BODY") return
			if ((isMac() && e.metaKey && e.key === "a") || (!isMac() && e.ctrlKey && e.key === "a")) {
				e.preventDefault()
				setNamesIndex1(0)
				setNamesIndex2(Number.MAX_SAFE_INTEGER)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [icons, setNamesIndex1, setNamesIndex2])
	return void 0
}

function useShortcutEscapeClearAll() {
	const { setStartIndex: setNamesIndex1, setEndIndex: setNamesIndex2, clearNames } = useContext(SelectionContext)!
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				clearNames()
				setNamesIndex1(null)
				setNamesIndex2(null)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [clearNames, setNamesIndex1, setNamesIndex2])
	return void 0
}

function useShortcutCtrlCCopy() {
	const { readOnlyClipboard } = useContext(ReadOnlyClipboardContext)!
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.shiftKey) return // Chrome shortcut
			if ((isMac() && e.metaKey && e.key === "c") || (!isMac() && e.ctrlKey && e.key === "c")) {
				e.preventDefault()
				navigator.clipboard.writeText(readOnlyClipboard)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [readOnlyClipboard])
	return void 0
}

//// function useEffectClearNamesOnToggle() {
//// 	const { feather, wkSocial, wkPayments } = useContext(SearchContext)!
//// 	const { clearNames } = useContext(ClipboardContext)!
//// 	const onceRef = useRef(false)
//// 	useEffect(() => {
//// 		if (!onceRef.current) {
//// 			onceRef.current = true
//// 			return
//// 		}
//// 		clearNames()
//// 	}, [clearNames, feather, wkPayments, wkSocial])
//// 	return void 0
//// }

// TODO
function useSelectNamesFromIndexes() {
	const { icons } = useContext(IconsContext)!
	const { startIndex, endIndex, addNames } = useContext(SelectionContext)!
	useEffect(() => {
		if (icons === undefined) return
		if (startIndex === null || endIndex === null) return
		const minIndex = Math.min(startIndex, endIndex)
		const maxIndex = Math.max(startIndex, endIndex)
		addNames(...icons!.slice(minIndex, maxIndex + 1).map(([name]) => name))
	}, [addNames, icons, startIndex, endIndex])
	return void 0
}

////////////////////////////////////////////////////////////////////////////////

function GridItemName({ children: name }: { children: string }) {
	const { exportAs } = useContext(ExportAsContext)!

	if (exportAs === "svg") {
		return <>{toKebabCase(name).toLowerCase()}</>
	} else {
		const parts = name.split(/(?=[A-Z])/)
		return (
			<>
				{parts.map((p, index) => (
					<Fragment key={index}>
						{index > 0 && <wbr />}
						{p}
					</Fragment>
				))}
			</>
		)
	}
}

const MemoizedGridItem = memo(({ index, name, icon: Icon }: { index: number; name: string; icon: Icon }) => {
	const { preferNames } = useContext(IconPreferencesContext)!
	const { names, startIndex, setStartIndex, setEndIndex, addNames, removeNames, clearNames } =
		useContext(SelectionContext)!

	console.log("test")

	return (
		<article
			id={name}
			className="grid-item"
			onClick={e => {
				if (e.shiftKey) {
					if (startIndex === null) {
						setStartIndex(index)
						setEndIndex(index)
					} else {
						setEndIndex(index)
					}
				} else {
					if ((isMac() && e.metaKey) || (!isMac() && e.ctrlKey)) {
						if (names.has(name)) {
							removeNames(name)
						} else {
							addNames(name)
						}
					} else {
						clearNames()
						addNames(name)
					}
					setStartIndex(index)
					setEndIndex(null)
				}
			}}
			data-selected={names.has(name)}
		>
			<figure className="grid-item-icon-frame">
				<Icon className="grid-item-icon" />
			</figure>
			{preferNames && (
				<figcaption className="grid-item-name">
					<GridItemName>{name}</GridItemName>
				</figcaption>
			)}
		</article>
	)
})

function AppMain() {
	const { feather, wkSocial, wkPayments, icons } = useContext(IconsContext)!
	const { preferNames } = useContext(IconPreferencesContext)!
	const { setStartIndex, setEndIndex, clearNames } = useContext(SelectionContext)!

	const onceRef = useRef(false)
	useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		clearNames()
	}, [clearNames, feather, wkPayments, wkSocial])

	// Shortcuts
	useShortcutCtrlASelectAll()
	useShortcutEscapeClearAll()
	useShortcutCtrlCCopy()

	// Etc.
	//// useEffectClearNamesOnToggle()
	useSelectNamesFromIndexes()

	return (
		<Main
			onClick={e => {
				if (e.target instanceof HTMLElement && e.target.closest(".grid-item") === null) {
					clearNames()
					setStartIndex(null)
					setEndIndex(null)
				}
			}}
		>
			<div className={cx("grid", preferNames && "is-prefer-names")}>
				{icons?.map(([name, icon], index) => (
					<MemoizedGridItem key={name} index={index} name={name} icon={icon} />
				))}
			</div>
		</Main>
	)
}
