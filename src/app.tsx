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
	Memo_SyntaxHighlighting,
	ProgressRange,
	SearchBar,
	Sidebar1,
	Sidebar2,
} from "@/components"
import { resources } from "@/data"
import { cx, DynamicIcon, IconComponent, isMac, toKebabCase, useVisibleDocumentTitle } from "@/lib"
import {
	ClipboardContext,
	IconPreferencesContext,
	IconsContext,
	ProgressBarContext,
	READONLY_CLIPBOARD_DEFAULT,
	SizeContext,
	SIZE_MAX,
	SIZE_MIN,
	SIZE_STEP,
	StrokeWidthContext,
	STROKE_MAX,
	STROKE_MIN,
	STROKE_STEP,
} from "@/state"
import { Fragment, memo, useCallback, useContext, useEffect, useRef, useTransition } from "react"
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
	const { clearSelectedNames } = useContext(ClipboardContext)!

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
									<span className="checkbox-name u-flex-1">Feather</span>
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
											Icon={preferColor ? WkBrandsOriginal.BrandTwitter : WkBrandsMono.BrandTwitter}
										/>
									</div>
									<span className="checkbox-name u-flex-1">Logos</span>
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
											Icon={
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
									<span className="checkbox-name u-flex-1">Payment services</span>
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
												Icon={preferColor ? WkPaymentsOriginal.CardMastercard : WkPaymentsMono.CardMastercard}
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
												Icon={
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
								<DynamicIcon className="checkbox-icon" Icon={preferNames ? Feather.ToggleRight : Feather.ToggleLeft} />
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
			<div className="u-flex-1" onClick={clearSelectedNames}></div>
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
	const { exportAs, setExportAs, clearSelectedNames, readOnlyClipboard } = useContext(ClipboardContext)!

	const trackScrollProps = useTrackScrollProps()

	useSideEffectSetCssVars()

	// TODO
	const handleClickCopy = useCallback(() => {
		navigator.clipboard.writeText(readOnlyClipboard)
	}, [readOnlyClipboard])

	//// // TODO
	//// const handleClickSave = useCallback(() => {
	//// 	// ...
	//// }, [])

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
						<Memo_SyntaxHighlighting
							lang={exportAs === "svg" ? "html" : "tsx"}
							code={readOnlyClipboard || READONLY_CLIPBOARD_DEFAULT}
						/>
						{/* TODO */}
						{false && readOnlyClipboard !== "" && (
							<div className="action-buttons">
								<button className="action-button">
									<div className="action-button-icon-frame">
										{/* TODO: Change to <DynamicIcon> */}
										<Feather.Clipboard className="action-button-icon" onClick={handleClickCopy} />
									</div>
									<span className="action-button-name">Copy</span>
								</button>
								<button className="action-button">
									<div className="action-button-icon-frame">
										{/* TODO: Change to <DynamicIcon> */}
										<Feather.Download className="action-button-icon" />
									</div>
									<span className="action-button-name">Save</span>
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
			<div className="u-flex-1" onClick={clearSelectedNames}></div>
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

function useShortcutCtrlAToSelectAll() {
	const { icons } = useContext(IconsContext)!
	const { setSelectedNamesStart, setSelectedNamesEnd } = useContext(ClipboardContext)!
	useEffect(() => {
		if (icons === undefined) return
		function handleKeyDown(e: KeyboardEvent) {
			if ((isMac() && e.metaKey && e.key === "a") || (!isMac() && e.ctrlKey && e.key === "a")) {
				// Call e.preventDefault() to prevent the browser from selecting all text
				e.preventDefault()
				setSelectedNamesStart(0)
				setSelectedNamesEnd(Number.MAX_SAFE_INTEGER)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [icons, setSelectedNamesEnd, setSelectedNamesStart])
	return void 0
}

function useShortcutEscToClearAll() {
	const { setSelectedNamesStart, setSelectedNamesEnd, clearSelectedNames } = useContext(ClipboardContext)!
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (document.activeElement?.tagName !== "BODY") return
			if (e.key === "Escape") {
				clearSelectedNames()
				setSelectedNamesStart(null)
				setSelectedNamesEnd(null)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [clearSelectedNames, setSelectedNamesEnd, setSelectedNamesStart])
	return void 0
}

function useShortcutCtrlCToCopy() {
	const { readOnlyClipboard } = useContext(ClipboardContext)!
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.shiftKey) return // No-op because of Chrome shortcut
			if ((isMac() && e.metaKey && e.key === "c") || (!isMac() && e.ctrlKey && e.key === "c")) {
				// Call e.preventDefault() to prevent the browser from copying selected text
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
	const { clearSelectedNames } = useContext(ClipboardContext)!
	const onceRef = useRef(false)
	useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		clearSelectedNames()
	}, [clearSelectedNames, feather, wkBrands, wkPayments])
	return void 0
}

function useSideEffectSelectNamesFromIndexes() {
	const { icons } = useContext(IconsContext)!
	const { selectedNamesStart, selectedNamesEnd, addToSelectedNames } = useContext(ClipboardContext)!
	useEffect(() => {
		if (icons === undefined) return
		if (selectedNamesStart === null || selectedNamesEnd === null) return
		const min = Math.min(selectedNamesStart, selectedNamesEnd)
		const max = Math.max(selectedNamesStart, selectedNamesEnd)
		addToSelectedNames(...icons.slice(min, max + 1).map(([name]) => name))
	}, [addToSelectedNames, selectedNamesEnd, icons, selectedNamesStart])
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

function GridItemName({ name }: { name: string }) {
	const { exportAs } = useContext(ClipboardContext)!

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

const MemoizedGridItem = memo(({ index, name, Icon }: { index: number; name: string; Icon: IconComponent }) => {
	const { preferNames } = useContext(IconPreferencesContext)!
	const {
		selectedNames,
		selectedNamesStart,
		setSelectedNamesStart,
		setSelectedNamesEnd,
		addToSelectedNames,
		removeFromSelectedNames,
		clearSelectedNames,
	} = useContext(ClipboardContext)!

	return (
		<article
			id={name}
			className={cx("main-grid-item", selectedNames.has(name) && "is-selected")}
			onClick={e => {
				if (e.shiftKey) {
					if (selectedNamesStart === null) {
						setSelectedNamesStart(index)
						setSelectedNamesEnd(index)
					} else {
						setSelectedNamesEnd(index)
					}
				} else {
					if ((isMac() && e.metaKey) || (!isMac() && e.ctrlKey)) {
						if (selectedNames.has(name)) {
							removeFromSelectedNames(name)
						} else {
							addToSelectedNames(name)
						}
					} else {
						clearSelectedNames()
						addToSelectedNames(name)
					}
					setSelectedNamesStart(index)
					setSelectedNamesEnd(null)
				}
			}}
		>
			<button className="main-grid-item-icon-frame">
				<Icon className="main-grid-item-icon" />
			</button>
			{preferNames && (
				<span className="main-grid-item-name">
					<GridItemName name={name} />
				</span>
			)}
		</article>
	)
})

function AppMain() {
	const { feather, wkBrands, wkPayments, icons } = useContext(IconsContext)!
	const { preferNames } = useContext(IconPreferencesContext)!
	const { setSelectedNamesStart, setSelectedNamesEnd, clearSelectedNames } = useContext(ClipboardContext)!

	const onceRef = useRef(false)
	useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		clearSelectedNames()
	}, [clearSelectedNames, feather, wkBrands, wkPayments])

	useShortcutCtrlAToSelectAll()
	useShortcutCtrlCToCopy()
	useShortcutEscToClearAll()

	useSideEffectClearSelectionOnChange()
	useSideEffectSelectNamesFromIndexes()
	useSideEffectVisibleDocumentTitle()

	return (
		<Main
			onClick={e => {
				if (e.target instanceof HTMLElement && e.target.closest(".main-grid-item") === null) {
					clearSelectedNames()
					setSelectedNamesStart(null)
					setSelectedNamesEnd(null)
				}
			}}
		>
			<div className={cx("main-grid", preferNames && "is-prefer-names")}>
				{icons?.map(([name, Icon], index) => (
					<MemoizedGridItem key={name} index={index} name={name} Icon={Icon} />
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
