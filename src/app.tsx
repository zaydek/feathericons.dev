import * as Feather from "@icons/feather/tsx"
import * as WkBrandsMono from "@icons/wk/brands/mono/tsx"
import * as WkBrandsOriginal from "@icons/wk/brands/original/tsx"
import * as WkPaymentsMonoFilled from "@icons/wk/payments/mono-filled/tsx"
import * as WkPaymentsMono from "@icons/wk/payments/mono/tsx"
import * as WkPaymentsOriginalFilled from "@icons/wk/payments/original-filled/tsx"
import * as WkPaymentsOriginal from "@icons/wk/payments/original/tsx"

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
import { cx, DynamicIcon, Icon, isMac, toKebabCase, useVisibleDocumentTitle } from "@/lib"
import {
	ExportAsContext,
	IconPreferencesContext,
	IconsContext,
	ProgressBarContext,
	ReadOnlyClipboardContext,
	READONLY_CLIPBOARD_DEFAULT,
	SelectionContext,
	SizeContext,
	SIZE_MAX,
	SIZE_MIN,
	SIZE_STEP,
	StrokeWidthContext,
	STROKE_MAX,
	STROKE_MIN,
	STROKE_STEP,
} from "@/state"
import { Fragment, memo, useContext, useEffect, useRef, useTransition } from "react"
import { useTrackScrollProps } from "./use-track-scroll-props"

////////////////////////////////////////////////////////////////////////////////

function useProgressBar() {
	const { setStarted } = useContext(ProgressBarContext)!
	const [pending, startTransition] = useTransition()
	useEffect(() => {
		setStarted(true)
		const d = window.setTimeout(() => setStarted(false), 100)
		return () => window.clearTimeout(d)
	}, [pending, setStarted])
	return startTransition
}

function AppSidebar1() {
	const startTransition = useProgressBar()

	const {
		feather,
		setFeather,
		wkBrands,
		setWkBrands,
		wkPayments,
		setWkPayments,
		wkPaymentsValue,
		setWkPaymentsValue,
		resetIcons,
	} = useContext(IconsContext)!
	const { preferColor, setPreferColor, preferNames, setPreferNames, resetIconPrefs } =
		useContext(IconPreferencesContext)!

	const trackScrollProps = useTrackScrollProps()

	return (
		<Sidebar1>
			<header className="sidebar-header">
				<section className="section is-start">
					<div className="sidebar-align-frame">
						<SearchBar />
					</div>
				</section>
				<div className="sidebar-header-scroll-area u-flex-1" {...trackScrollProps}>
					<section className="section">
						<header className="section-header">
							<div className="sidebar-align-icon-frame">
								<Feather.Package className="section-icon" />
							</div>
							<h6 className="section-name u-flex-1">Icons</h6>
							<div className="sidebar-align-icon-frame">
								{/* TODO: Change to <button> */}
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
											icon={preferColor ? WkBrandsOriginal.BrandTwitter : WkBrandsMono.BrandTwitter}
										/>
									</div>
									<span className="checkbox-name u-flex-1">Brands</span>
									<div className="sidebar-align-icon-frame">
										<input
											type="checkbox"
											checked={wkBrands}
											onChange={e => startTransition(() => setWkBrands(e.currentTarget.checked))}
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
													? WkPaymentsOriginal.CardMastercard
													: WkPaymentsOriginalFilled.CardMastercard
												: wkPaymentsValue === "normal"
													? WkPaymentsMono.CardMastercard
													: WkPaymentsMonoFilled.CardMastercard
											}
										/>
									</div>
									<span className="checkbox-name u-flex-1">Cards</span>
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
												icon={preferColor ? WkPaymentsOriginal.CardMastercard : WkPaymentsMono.CardMastercard}
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
												icon={
													preferColor ? WkPaymentsOriginalFilled.CardMastercard : WkPaymentsMonoFilled.CardMastercard
												}
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
							{/* TODO: Change to <button> */}
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

////////////////////////////////////////////////////////////////////////////////

function useSideEffectSetCssVars() {
	const { size } = useContext(SizeContext)!
	const { strokeWidth } = useContext(StrokeWidthContext)!
	useEffect(() => {
		document.body.style.setProperty("--size", "" + size)
	}, [size])
	useEffect(() => {
		document.body.style.setProperty("--stroke-width", "" + strokeWidth)
	}, [strokeWidth])
	return void 0
}

function AppSidebar2() {
	const { size, setSize, resetSize } = useContext(SizeContext)!
	const { strokeWidth, setStrokeWidth, resetStrokeWidth } = useContext(StrokeWidthContext)!
	const { exportAs, setExportAs } = useContext(ExportAsContext)!
	const { readOnlyClipboard } = useContext(ReadOnlyClipboardContext)!

	const trackScrollProps = useTrackScrollProps()

	useSideEffectSetCssVars()

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
				<div className="sidebar-header-scroll-area u-flex-1" {...trackScrollProps}>
					<section className="section syntax-highlighting">
						<SyntaxHighlighting
							lang={exportAs === "svg" ? "html" : "tsx"}
							code={readOnlyClipboard || READONLY_CLIPBOARD_DEFAULT}
						/>
						{readOnlyClipboard !== "" && (
							<div className="action-buttons">
								<button className="copy-button">
									<Feather.Copy className="copy-button-icon" />
									Copy
								</button>
								<button className="save-button">
									<Feather.Save className="save-button-icon" />
									Download
								</button>
							</div>
						)}
					</section>
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
							{/* TODO: Change to <button> */}
							<Feather.RotateCcw className="section-reset-icon" strokeWidth={4} onClick={resetSize} />
						</div>
					</header>
					<div className="sidebar-align-frame">
						<ProgressRange value={size} setValue={setSize} min={SIZE_MIN} max={SIZE_MAX} step={SIZE_STEP} />
					</div>
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
							{/* TODO: Change to <button> */}
							<Feather.RotateCcw className="section-reset-icon" strokeWidth={4} onClick={resetStrokeWidth} />
						</div>
					</header>
					<div className="sidebar-align-frame">
						<ProgressRange
							value={strokeWidth}
							setValue={setStrokeWidth}
							min={STROKE_MIN}
							max={STROKE_MAX}
							step={STROKE_STEP}
						/>
					</div>
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
	const { setStartIndex, setEndIndex } = useContext(SelectionContext)!
	useEffect(() => {
		if (icons === undefined) return
		function handleKeyDown(e: KeyboardEvent) {
			if (document.activeElement?.tagName !== "BODY") return
			if ((isMac() && e.metaKey && e.key === "a") || (!isMac() && e.ctrlKey && e.key === "a")) {
				e.preventDefault()
				setStartIndex(0)
				setEndIndex(Number.MAX_SAFE_INTEGER)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [icons, setEndIndex, setStartIndex])
	return void 0
}

function useShortcutEscClearAll() {
	const { setStartIndex, setEndIndex, clear } = useContext(SelectionContext)!
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (document.activeElement?.tagName !== "BODY") return
			if (e.key === "Escape") {
				clear()
				setStartIndex(null)
				setEndIndex(null)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [clear, setEndIndex, setStartIndex])
	return void 0
}

function useShortcutCtrlCCopy() {
	const { readOnlyClipboard } = useContext(ReadOnlyClipboardContext)!
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.shiftKey) return // No-op because of Chrome shortcut
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

function useSideEffectClearSelectionOnChange() {
	const { feather, wkBrands, wkPayments } = useContext(IconsContext)!
	const { clear } = useContext(SelectionContext)!
	const onceRef = useRef(false)
	useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		clear()
	}, [clear, feather, wkBrands, wkPayments])
	return void 0
}

function useSideEffectSelectNamesFromIndexes() {
	const { icons } = useContext(IconsContext)!
	const { startIndex, endIndex, add } = useContext(SelectionContext)!
	useEffect(() => {
		if (icons === undefined) return
		if (startIndex === null || endIndex === null) return
		const min = Math.min(startIndex, endIndex)
		const max = Math.max(startIndex, endIndex)
		add(...icons.slice(min, max + 1).map(([name]) => name))
	}, [add, endIndex, icons, startIndex])
	return void 0
}

function useSideEffectVisibleDocumentTitle() {
	const { icons } = useContext(IconsContext)!
	const count = (icons ?? []).length
	// prettier-ignore
	useVisibleDocumentTitle([
		`${count} icon${count === 1 ? "" : "s"}`,
		"Feather icons",
	])
	return void 0
}

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
	const { names, startIndex, setStartIndex, setEndIndex, add, remove, clear } = useContext(SelectionContext)!

	return (
		<article
			id={name}
			className={cx("grid-item", names.has(name) && "is-selected")}
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
							remove(name)
						} else {
							add(name)
						}
					} else {
						clear()
						add(name)
					}
					setStartIndex(index)
					setEndIndex(null)
				}
			}}
		>
			<button className="grid-item-icon-frame">
				<Icon className="grid-item-icon" />
			</button>
			{preferNames && (
				<span className="grid-item-name">
					<GridItemName>{name}</GridItemName>
				</span>
			)}
		</article>
	)
})

function AppMain() {
	const { feather, wkBrands, wkPayments, icons } = useContext(IconsContext)!
	const { preferNames } = useContext(IconPreferencesContext)!
	const { setStartIndex, setEndIndex, clear } = useContext(SelectionContext)!

	const onceRef = useRef(false)
	useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		clear()
	}, [clear, feather, wkBrands, wkPayments])

	useShortcutCtrlASelectAll()
	useShortcutCtrlCCopy()
	useShortcutEscClearAll()

	useSideEffectClearSelectionOnChange()
	useSideEffectSelectNamesFromIndexes()
	useSideEffectVisibleDocumentTitle()

	return (
		<Main
			onClick={e => {
				if (e.target instanceof HTMLElement && e.target.closest(".grid-item") === null) {
					clear()
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

////////////////////////////////////////////////////////////////////////////////

export function App() {
	return (
		<DEV_DebugCss>
			<AppSidebar1 />
			<AppSidebar2 />
			<AppMain />
		</DEV_DebugCss>
	)
}
