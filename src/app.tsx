import React from "react"

import * as feather from "@icons/feather/tsx"
import * as wkBrandsMono from "@icons/wk/brands/mono/tsx"
import * as wkBrandsOriginal from "@icons/wk/brands/original/tsx"
import * as wkPaymentsMonoFilled from "@icons/wk/payments/mono-filled/tsx"
import * as wkPaymentsMono from "@icons/wk/payments/mono/tsx"
import * as wkPaymentsOriginalFilled from "@icons/wk/payments/original-filled/tsx"
import * as wkPaymentsOriginal from "@icons/wk/payments/original/tsx"

import {
	Anchor,
	DEV_DebugCss,
	ExportAs,
	Main,
	MemoSyntaxHighlighting,
	ProgressRange,
	Sidebar,
	SidebarOverlay,
} from "@/components"
import { resources } from "@/data"
import { attr, cx, DynamicIcon, IconComponent, isMac, toKebabCase, useVisibleDocumentTitle } from "@/lib"
import {
	ClipboardContext,
	IconPreferencesContext,
	IconsContext,
	ProgressBarContext,
	RangeSizeContext,
	RangeStrokeWidthContext,
	READONLY_CLIPBOARD_DEFAULT,
	SIZE_MAX,
	SIZE_MIN,
	SIZE_STEP,
	STROKE_MAX,
	STROKE_MIN,
	STROKE_STEP,
} from "@/providers"
import { useTrackScrollProps } from "./use-track-scroll-props"

////////////////////////////////////////////////////////////////////////////////

function useProgressBar() {
	const { setStarted } = React.useContext(ProgressBarContext)!
	const [pending, startTransition] = React.useTransition()
	React.useEffect(() => {
		setStarted(true)
		const d = window.setTimeout(() => setStarted(false), 100)
		return () => window.clearTimeout(d)
	}, [pending, setStarted])
	return startTransition
}

function AppSidebar1() {
	const startTransition = useProgressBar()

	const {
		// eslint-disable-next-line destructuring/no-rename
		feather: $feather,
		setFeather,
		wkBrands,
		setWkBrands,
		wkPayments,
		setWkPayments,
		wkPaymentsValue,
		setWkPaymentsValue,
		resetIcons,
	} = React.useContext(IconsContext)!
	const { preferColor, setPreferColor, preferNames, setPreferNames, resetIconPrefs } =
		React.useContext(IconPreferencesContext)!
	const { clearSelectedNames } = React.useContext(ClipboardContext)!

	const trackScrollProps = useTrackScrollProps()

	return (
		<Sidebar
			// prettier-ignore
			pos="start"
			minWidth={320}
			maxWidth={320 * 1.5}
		>
			<header className="sidebar-header">
				{/* <section className="section is-start">
					<div className="sidebar-align-frame">
						<SearchBar />
					</div>
				</section> */}
				<div className="sidebar-header-scroll-area u-flex-1" {...trackScrollProps}>
					<section className="section is-start">
						<header className="section-header">
							<div className="sidebar-align-icon-frame">
								<feather.Package className="section-icon" />
							</div>
							<h6 className="section-name u-flex-1">Icons</h6>
							<div className="sidebar-align-icon-frame">
								{/* TODO: Change to <button> */}
								<feather.RotateCcw
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
										<feather.Feather className="checkbox-icon" />
									</div>
									<span className="checkbox-name u-flex-1">Feather</span>
									<div className="sidebar-align-icon-frame">
										<input
											type="checkbox"
											checked={$feather}
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
											Icon={preferColor ? wkBrandsOriginal.BrandTwitter : wkBrandsMono.BrandTwitter}
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
													? wkPaymentsOriginal.CardMastercard
													: wkPaymentsOriginalFilled.CardMastercard
												: wkPaymentsValue === "normal"
													? wkPaymentsMono.CardMastercard
													: wkPaymentsMonoFilled.CardMastercard
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
												Icon={preferColor ? wkPaymentsOriginal.CardMastercard : wkPaymentsMono.CardMastercard}
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
													preferColor ? wkPaymentsOriginalFilled.CardMastercard : wkPaymentsMonoFilled.CardMastercard
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
							<feather.Settings className="section-icon" />
						</div>
						<h6 className="section-name u-flex-1">Settings</h6>
						<div className="sidebar-align-icon-frame">
							{/* TODO: Change to <button> */}
							<feather.RotateCcw
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
								<DynamicIcon className="checkbox-icon" Icon={preferNames ? feather.ToggleRight : feather.ToggleLeft} />
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
		</Sidebar>
	)
}

////////////////////////////////////////////////////////////////////////////////

function useSideEffectSetCssVars() {
	const { size } = React.useContext(RangeSizeContext)!
	const { strokeWidth } = React.useContext(RangeStrokeWidthContext)!
	React.useEffect(() => {
		document.body.style.setProperty("--size", "" + size)
	}, [size])
	React.useEffect(() => {
		document.body.style.setProperty("--stroke-width", "" + strokeWidth)
	}, [strokeWidth])
	return void 0
}

function AppSidebar2() {
	const { size, setSize, resetSize } = React.useContext(RangeSizeContext)!
	const { strokeWidth, setStrokeWidth, resetStrokeWidth } = React.useContext(RangeStrokeWidthContext)!
	const { exportAs, setExportAs, clearSelectedNames, readOnlyClipboard } = React.useContext(ClipboardContext)!

	const trackScrollProps = useTrackScrollProps()

	useSideEffectSetCssVars()

	const onceRef = React.useRef(false)
	React.useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		navigator.clipboard.writeText(readOnlyClipboard)
	}, [readOnlyClipboard])

	//// const handleClickCopy = useCallback(() => {
	//// 	navigator.clipboard.writeText(readOnlyClipboard)
	//// }, [readOnlyClipboard])

	//// const handleClickSave = useCallback(() => {
	//// 	// ...
	//// }, [])

	return (
		<Sidebar
			// prettier-ignore
			pos="end"
			minWidth={320}
			maxWidth={320 * 1.5}
		>
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
				<div className="sidebar-header-scroll-area u-flex-1" {...trackScrollProps}>
					<section className="section syntax-highlighting">
						<MemoSyntaxHighlighting
							lang={exportAs === "svg" ? "html" : "tsx"}
							code={readOnlyClipboard || READONLY_CLIPBOARD_DEFAULT}
						/>
						{/* <div className="action-buttons">
							<button className="action-button">
								<div className="action-button-icon-frame">
									<Feather.Clipboard className="action-button-icon" onClick={handleClickCopy} />
								</div>
								<span className="action-button-name">Copy</span>
							</button>
							<button className="action-button">
								<div className="action-button-icon-frame">
									<Feather.Download className="action-button-icon" onClick={handleClickSave} />
								</div>
								<span className="action-button-name">Save</span>
							</button>
						</div> */}
					</section>
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
							{/* TODO: Change to <button> */}
							<feather.RotateCcw className="section-reset-icon" strokeWidth={4} onClick={resetSize} />
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
							<feather.PenTool className="section-icon" />
						</div>
						<h6 className="section-name u-flex-1">stroke width</h6>
						<span className="section-range-desc">{strokeWidth.toFixed(2)}</span>
						<div className="sidebar-align-icon-frame">
							{/* TODO: Change to <button> */}
							<feather.RotateCcw className="section-reset-icon" strokeWidth={4} onClick={resetStrokeWidth} />
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
			{/* <footer className="sidebar-footer">
				<hr className="hairline is-collapsible" />
				<section className="section is-end">
					<header className="section-header">
						<div className="sidebar-align-icon-frame">
							<Feather.Shield className="section-icon" />
						</div>
						<h6 className="section-name u-flex-1">Sponsor</h6>
					</header>
				</section>
			</footer> */}
		</Sidebar>
	)
}

////////////////////////////////////////////////////////////////////////////////

function useShortcutCtrlAToSelectAll() {
	const { icons } = React.useContext(IconsContext)!
	const { setSelectedNamesStart, setSelectedNamesEnd } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
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
	const { setSelectedNamesStart, setSelectedNamesEnd, clearSelectedNames } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
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
	const { readOnlyClipboard } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
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
	const { feather, wkBrands, wkPayments } = React.useContext(IconsContext)!
	const { clearSelectedNames } = React.useContext(ClipboardContext)!
	const onceRef = React.useRef(false)
	React.useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		clearSelectedNames()
	}, [clearSelectedNames, feather, wkBrands, wkPayments])
	return void 0
}

function useSideEffectSelectNamesFromIndexes() {
	const { icons } = React.useContext(IconsContext)!
	const { selectedNamesStart, selectedNamesEnd, addToSelectedNames } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
		if (icons === undefined) return
		if (selectedNamesStart === null || selectedNamesEnd === null) return
		const min = Math.min(selectedNamesStart, selectedNamesEnd)
		const max = Math.max(selectedNamesStart, selectedNamesEnd)
		addToSelectedNames(...icons.slice(min, max + 1).map(([name]) => name))
	}, [addToSelectedNames, selectedNamesEnd, icons, selectedNamesStart])
	return void 0
}

function useSideEffectVisibleDocumentTitle() {
	const { icons } = React.useContext(IconsContext)!
	const count = (icons ?? []).length
	// prettier-ignore
	useVisibleDocumentTitle([
		`${count} icon${count === 1 ? "" : "s"}`,
		"Feather icons",
	])
	return void 0
}

function GridItemName({ name }: { name: string }) {
	const { exportAs } = React.useContext(ClipboardContext)!

	if (exportAs === "svg") {
		return <>{toKebabCase(name).toLowerCase()}</>
	} else {
		const parts = name.split(/(?=[A-Z])/)
		return (
			<>
				{parts.map((p, index) => (
					<React.Fragment key={index}>
						{index > 0 && <wbr />}
						{p}
					</React.Fragment>
				))}
			</>
		)
	}
}

function GridItem({ index, name, Icon }: { index: number; name: string; Icon: IconComponent }) {
	const { preferNames } = React.useContext(IconPreferencesContext)!
	const {
		selectedNames,
		selectedNamesStart,
		setSelectedNamesStart,
		setSelectedNamesEnd,
		addToSelectedNames,
		removeFromSelectedNames,
		clearSelectedNames,
	} = React.useContext(ClipboardContext)!

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
}

const MemoGridItem = React.memo(GridItem)

function AppMain() {
	const { feather, wkBrands, wkPayments, icons } = React.useContext(IconsContext)!
	const { preferNames } = React.useContext(IconPreferencesContext)!
	const { setSelectedNamesStart, setSelectedNamesEnd, clearSelectedNames } = React.useContext(ClipboardContext)!

	const onceRef = React.useRef(false)
	React.useEffect(() => {
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
			<div className="main-grid" data-prefer-names={attr(preferNames)}>
				{icons?.map(([name, Icon], index) => (
					<MemoGridItem key={name} index={index} name={name} Icon={Icon} />
				))}
			</div>
		</Main>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function App() {
	return (
		<DEV_DebugCss>
			<SidebarOverlay />
			<AppSidebar1 />
			<AppSidebar2 />
			<AppMain />
		</DEV_DebugCss>
	)
}
