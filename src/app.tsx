import React from "react"

import * as feather from "@icons/feather/tsx"
import * as wkBrandsMono from "@icons/wk/brands/mono/tsx"
import * as wkBrandsOriginal from "@icons/wk/brands/original/tsx"
import * as wkPaymentsMonoFilled from "@icons/wk/payments/mono-filled/tsx"
import * as wkPaymentsMono from "@icons/wk/payments/mono/tsx"
import * as wkPaymentsOriginalFilled from "@icons/wk/payments/original-filled/tsx"
import * as wkPaymentsOriginal from "@icons/wk/payments/original/tsx"

import {
	DEV_DebugCss,
	Main,
	MemoSyntaxHighlighting,
	ProgressSlider,
	SearchBar,
	Select,
	Sidebar,
	SidebarOverlay,
} from "@/components"
import { resources } from "@/data"
import { DynamicIcon, IconComponent, iota, isMac, safeAnchorAttrs, toKebabCase, useVisibleDocumentTitle } from "@/lib"
import {
	ClipboardContext,
	RangeContext,
	READONLY_CLIPBOARD_DEFAULT,
	SearchContext,
	SIZE_DEFAULT,
	SIZE_MAX,
	SIZE_MIN,
	SIZE_STEP,
	STROKE_DEFAULT,
	STROKE_MAX,
	STROKE_MIN,
	STROKE_STEP,
} from "@/providers"
import { useScrollProps } from "./use-scroll-props"

////////////////////////////////////////////////////////////////////////////////

function useShortcutCtrlAToSelectAll() {
	const { searchResults } = React.useContext(SearchContext)!
	const { setNamesStart, setNamesEnd } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
		if (searchResults === null) return
		function handleKeyDown(e: KeyboardEvent) {
			if (e.target instanceof Element && e.target.tagName === "INPUT") return
			if ((isMac() && e.metaKey && e.key === "a") || (!isMac() && e.ctrlKey && e.key === "a")) {
				// Call e.preventDefault() to prevent the browser from selecting all text
				e.preventDefault()
				setNamesStart(0)
				setNamesEnd(Number.MAX_SAFE_INTEGER)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [searchResults, setNamesEnd, setNamesStart])
	return void 0
}

function useShortcutEscToRemoveNamesStartAndEnd() {
	const { setNamesStart, setNamesEnd, removeAllNames } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (document.activeElement?.tagName !== "BODY") return
			if (e.key === "Escape") {
				removeAllNames()
				setNamesStart(null)
				setNamesEnd(null)
				//// if (document.activeElement instanceof HTMLElement) {
				//// 	document.activeElement.blur()
				//// }
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [removeAllNames, setNamesEnd, setNamesStart])
	return void 0
}

function useSideEffectClearSelectionOnChange() {
	const { feather, wkBrands, wkPayments } = React.useContext(SearchContext)!
	const { removeAllNames } = React.useContext(ClipboardContext)!
	const onceRef = React.useRef(false)
	React.useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		removeAllNames()
	}, [removeAllNames, feather, wkBrands, wkPayments])
	return void 0
}

function useSideEffectSelectNamesFromIndexes() {
	const { searchResults } = React.useContext(SearchContext)!
	const { namesStart, namesEnd, addNames } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
		if (searchResults === null) return
		if (namesStart === null || namesEnd === null) return
		const min = Math.min(namesStart, namesEnd)
		const max = Math.max(namesStart, namesEnd)
		addNames(...searchResults.slice(min, max + 1).map(([name]) => name))
	}, [addNames, searchResults, namesEnd, namesStart])
	return void 0
}

function useSideEffectSetCssVars() {
	const { size, strokeWidth } = React.useContext(RangeContext)!
	React.useEffect(() => {
		document.body.style.setProperty("--size", "" + size)
	}, [size])
	React.useEffect(() => {
		document.body.style.setProperty("--stroke-width", "" + strokeWidth)
	}, [strokeWidth])
	return void 0
}

function useSideEffectVisibleDocumentTitle() {
	const { searchResults } = React.useContext(SearchContext)!
	const count = (searchResults ?? []).length
	// prettier-ignore
	useVisibleDocumentTitle([
		`${count} icon${count === 1 ? "" : "s"}`,
		"Feather icons",
	])
	return void 0
}

////////////////////////////////////////////////////////////////////////////////

function AppSidebar1() {
	const scrollProps = useScrollProps()

	const [, startTransition] = React.useTransition()

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
		preferColor,
		setPreferColor,
		resetIcons,
		resetIconPrefs,
	} = React.useContext(SearchContext)!

	return (
		<Sidebar pos="start">
			<header className="sidebar-head">
				<div className="widget-head" data-pos="start">
					<div className="widget-align-frame">
						<SearchBar />
					</div>
				</div>
				<div className="widget-body" {...scrollProps}>
					<div className="widget-name">
						<div className="widget-align-icon-frame">
							<feather.Package className="widget-name-start-icon" />
						</div>
						<h6 className="widget-name-type">Icons</h6>
						<button className="widget-align-icon-frame" onClick={e => startTransition(resetIcons)}>
							<feather.RotateCcw className="widget-name-end-icon" strokeWidth={3} />
						</button>
					</div>
					<div>
						<div className="checkboxes">
							<label
								className="checkbox"
								onClick={e =>
									e.currentTarget.querySelector<HTMLInputElement>("input:is([type=checkbox], [type=radio])")!.click()
								}
								onKeyDown={e => {
									if (e.key === " ") {
										e.preventDefault()
										e.currentTarget.querySelector<HTMLInputElement>("input:is([type=checkbox], [type=radio])")!.click()
									}
								}}
								tabIndex={0}
							>
								<div className="widget-align-icon-frame">
									<feather.Feather className="checkbox-icon" />
								</div>
								<span className="checkbox-type">Feather</span>
								<div className="widget-align-icon-frame">
									<input
										type="checkbox"
										checked={$feather}
										onChange={e => startTransition(() => setFeather(e.currentTarget.checked))}
										tabIndex={-1}
									/>
								</div>
							</label>
						</div>
						<div className="checkboxes">
							<label
								className="checkbox"
								onClick={e =>
									e.currentTarget.querySelector<HTMLInputElement>("input:is([type=checkbox], [type=radio])")!.click()
								}
								onKeyDown={e => {
									if (e.key === " ") {
										e.preventDefault()
										e.currentTarget.querySelector<HTMLInputElement>("input:is([type=checkbox], [type=radio])")!.click()
									}
								}}
								tabIndex={0}
							>
								<div className="widget-align-icon-frame">
									<DynamicIcon
										className="checkbox-icon"
										Icon={preferColor ? wkBrandsOriginal.BrandTwitter : wkBrandsMono.BrandTwitter}
									/>
								</div>
								<span className="checkbox-type">Brands</span>
								<div className="widget-align-icon-frame">
									<input
										type="checkbox"
										checked={wkBrands}
										onChange={e => startTransition(() => setWkBrands(e.currentTarget.checked))}
										tabIndex={-1}
									/>
								</div>
							</label>
						</div>
						<div className="checkboxes">
							<label
								className="checkbox"
								onClick={e =>
									e.currentTarget.querySelector<HTMLInputElement>("input:is([type=checkbox], [type=radio])")!.click()
								}
								onKeyDown={e => {
									if (e.key === " ") {
										e.preventDefault()
										e.currentTarget.querySelector<HTMLInputElement>("input:is([type=checkbox], [type=radio])")!.click()
									}
								}}
								tabIndex={0}
							>
								<div className="widget-align-icon-frame">
									<DynamicIcon
										className="checkbox-icon"
										data-type="card"
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
								<span className="checkbox-type">Cards</span>
								<div className="widget-align-icon-frame">
									<input
										type="checkbox"
										checked={wkPayments}
										onChange={e => startTransition(() => setWkPayments(e.currentTarget.checked))}
										tabIndex={-1}
									/>
								</div>
							</label>
							<div className="checkboxes">
								<label
									className="checkbox"
									onClick={e =>
										e.currentTarget.querySelector<HTMLInputElement>("input:is([type=checkbox], [type=radio])")!.click()
									}
									onKeyDown={e => {
										if (e.key === " ") {
											e.preventDefault()
											e.currentTarget
												.querySelector<HTMLInputElement>("input:is([type=checkbox], [type=radio])")!
												.click()
										}
									}}
									tabIndex={0}
								>
									<div className="widget-align-icon-frame">
										<DynamicIcon
											className="checkbox-icon"
											data-type="card"
											Icon={preferColor ? wkPaymentsOriginal.CardMastercard : wkPaymentsMono.CardMastercard}
										/>
									</div>
									<span className="checkbox-type">Original</span>
									<div className="widget-align-icon-frame">
										<input
											name="payments"
											type="radio"
											checked={wkPaymentsValue === "normal"}
											onClick={e =>
												startTransition(() => {
													setWkPayments(true)
												})
											}
											onChange={e =>
												startTransition(() => {
													setWkPayments(true)
													setWkPaymentsValue("normal")
												})
											}
											tabIndex={-1}
										/>
									</div>
								</label>
							</div>
							<div className="checkboxes">
								<label
									className="checkbox"
									onClick={e =>
										e.currentTarget.querySelector<HTMLInputElement>("input:is([type=checkbox], [type=radio])")!.click()
									}
									onKeyDown={e => {
										if (e.key === " ") {
											e.preventDefault()
											e.currentTarget
												.querySelector<HTMLInputElement>("input:is([type=checkbox], [type=radio])")!
												.click()
										}
									}}
									tabIndex={0}
								>
									<div className="widget-align-icon-frame">
										<DynamicIcon
											className="checkbox-icon"
											data-type="card"
											Icon={preferColor ? wkPaymentsOriginalFilled.CardMastercard : wkPaymentsMonoFilled.CardMastercard}
										/>
									</div>
									<span className="checkbox-type">Filled</span>
									<div className="widget-align-icon-frame">
										<input
											name="payments"
											type="radio"
											checked={wkPaymentsValue === "filled"}
											onClick={e =>
												startTransition(() => {
													setWkPayments(true)
												})
											}
											onChange={e =>
												startTransition(() => {
													setWkPayments(true)
													setWkPaymentsValue("filled")
												})
											}
											tabIndex={-1}
										/>
									</div>
								</label>
							</div>
						</div>
					</div>
				</div>
			</header>
			<div className="sidebar-body">
				<hr />
				<div className="widget-head">
					<div className="widget-name">
						<div className="widget-align-icon-frame">
							<feather.Settings className="widget-name-start-icon" />
						</div>
						<span className="widget-name-type">Settings</span>
						<button className="widget-align-icon-frame" onClick={e => startTransition(resetIconPrefs)}>
							<feather.RotateCcw className="widget-name-end-icon" strokeWidth={3} />
						</button>
					</div>
				</div>
				<div className="widget-body">
					<div className="checkboxes">
						<label
							className="checkbox"
							onClick={e =>
								e.currentTarget.querySelector<HTMLInputElement>("input:is([type=checkbox], [type=radio])")!.click()
							}
							onKeyDown={e => {
								if (e.key === " ") {
									e.preventDefault()
									e.currentTarget.querySelector<HTMLInputElement>("input:is([type=checkbox], [type=radio])")!.click()
								}
							}}
							tabIndex={0}
						>
							<div className="widget-align-icon-frame">
								<div className="checkbox-icon" data-type="chroma" data-prefer-color={preferColor}></div>
							</div>
							<span className="checkbox-type">Colorize icons</span>
							<div className="widget-align-icon-frame">
								<input
									type="checkbox"
									checked={preferColor}
									onChange={e => startTransition(() => setPreferColor(e.currentTarget.checked))}
									tabIndex={-1}
								/>
							</div>
						</label>
					</div>
				</div>
				<hr />
			</div>
			<footer className="sidebar-foot">
				<hr data-collapse />
				<div className="widget-head">
					<div className="widget-name">
						<div className="widget-align-icon-frame">
							<feather.Globe className="widget-name-start-icon" />
						</div>
						<h6 className="widget-name-type">Resources</h6>
					</div>
				</div>
				<div className="widget-body" data-pos="end">
					<nav className="resources">
						{resources.map(resource => (
							<a key={resource.href} className="resource" href={resource.href} {...safeAnchorAttrs}>
								<div className="widget-align-icon-frame">
									<resource.Icon className="resource-start-icon" />
								</div>
								<span className="resource-type">{resource.name}</span>
								<div className="widget-align-icon-frame">
									<feather.ArrowUpRight className="resource-end-icon" strokeWidth={3} />
								</div>
							</a>
						))}
					</nav>
				</div>
			</footer>
		</Sidebar>
	)
}

////////////////////////////////////////////////////////////////////////////////

function AppSidebar2() {
	const scrollProps = useScrollProps()

	const { size, setSize, strokeWidth, setStrokeWidth } = React.useContext(RangeContext)!
	const { format, setFormatAs, readOnlyClipboard } = React.useContext(ClipboardContext)!

	useSideEffectSetCssVars()

	const onceRef = React.useRef(false)
	React.useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		if (document.visibilityState === "hidden") return // DEV
		navigator.clipboard.writeText(readOnlyClipboard)
	}, [readOnlyClipboard])

	return (
		<Sidebar pos="end">
			<header className="sidebar-head">
				<div className="widget-head" data-pos="start">
					<div className="widget-name">
						<div className="widget-align-icon-frame">
							<feather.Clipboard className="widget-name-start-icon" />
						</div>
						<h6 className="widget-name-type">Clipboard</h6>
						<div className="widget-align-frame">
							<Select value={format} setValue={setFormatAs} />
						</div>
					</div>
				</div>
				<div className="widget-body" data-pos="syntax-highlighting" {...scrollProps}>
					<div className="widget-syntax-highlighting-container">
						<MemoSyntaxHighlighting
							lang={format === "svg" ? "html" : "tsx"}
							code={readOnlyClipboard || READONLY_CLIPBOARD_DEFAULT}
						/>
					</div>
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
					{/* </section> */}
				</div>
			</header>
			<div className="sidebar-body">
				<hr />
				<div className="widget-head">
					<div className="widget-name">
						<div className="widget-align-icon-frame">
							<feather.PenTool className="widget-name-start-icon" />
						</div>
						<h6 className="widget-name-type">Size</h6>
						<span className="widget-name-number-type">{size.toFixed(0)} PX</span>
						<button className="widget-align-icon-frame" onClick={() => setSize(SIZE_DEFAULT)}>
							<feather.RotateCcw className="widget-name-end-icon" strokeWidth={3} />
						</button>
					</div>
				</div>
				<div className="widget-body">
					<div className="widget-align-frame">
						{/* prettier-ignore */}
						<ProgressSlider
							value={size}
							setValue={setSize}
							min={SIZE_MIN}
							max={SIZE_MAX}
							step={SIZE_STEP}
						/>
					</div>
				</div>
				<hr />
				<div className="widget-head">
					<div className="widget-name">
						<div className="widget-align-icon-frame">
							<feather.PenTool className="widget-name-start-icon" />
						</div>
						<h6 className="widget-name-type">Stroke width</h6>
						<span className="widget-name-number-type">{strokeWidth.toFixed(2)}</span>
						<button className="widget-align-icon-frame" onClick={e => setStrokeWidth(STROKE_DEFAULT)}>
							<feather.RotateCcw className="widget-name-end-icon" strokeWidth={3} />
						</button>
					</div>
				</div>
				<div className="widget-body">
					<div className="widget-align-frame">
						{/* prettier-ignore */}
						<ProgressSlider
							value={strokeWidth}
							setValue={setStrokeWidth}
							min={STROKE_MIN}
							max={STROKE_MAX}
							step={STROKE_STEP}
						/>
					</div>
				</div>
				<hr />
			</div>
		</Sidebar>
	)
}

////////////////////////////////////////////////////////////////////////////////

//// function GridItemName({ name }: { name: string }) {
//// 	const { format } = React.useContext(ClipboardContext)!
////
//// 	if (format === "svg") {
//// 		return <>{toKebabCase(name).toLowerCase()}</>
//// 	} else {
//// 		const parts = name.split(/(?=[A-Z])/)
//// 		return (
//// 			<>
//// 				{parts.map((p, index) => (
//// 					<React.Fragment key={index}>
//// 						{index > 0 && <wbr />}
//// 						{p}
//// 					</React.Fragment>
//// 				))}
//// 			</>
//// 		)
//// 	}
//// }

function MainGridItem({ index, name, Icon }: { index: number; name: string; Icon: IconComponent }) {
	const { names, namesStart, setNamesStart, setNamesEnd, addNames, removeNames, removeAllNames } =
		React.useContext(ClipboardContext)!

	const handleClick = React.useCallback(
		// Use HTMLElement because of <figure> and <span>
		(e: React.MouseEvent<HTMLElement>) => {
			e.stopPropagation() // Call e.stopPropagation() because of <main>
			if (e.shiftKey) {
				if (namesStart === null) {
					setNamesStart(index)
					setNamesEnd(index)
				} else {
					setNamesEnd(index)
				}
			} else {
				if ((isMac() && e.metaKey) || (!isMac() && e.ctrlKey)) {
					if (names.has(name)) {
						removeNames(name)
					} else {
						addNames(name)
					}
				} else {
					removeAllNames()
					addNames(name)
				}
				setNamesStart(index)
				setNamesEnd(null)
			}
		},
		[addNames, removeAllNames, index, name, removeNames, names, namesStart, setNamesEnd, setNamesStart],
	)

	return (
		<article id={name} className="main-grid-item" data-selected={names.has(name)}>
			<button
				className="main-grid-item-icon-frame"
				onClick={handleClick}
				onKeyDown={e => {
					if (e.shiftKey) {
						if (document.activeElement instanceof HTMLElement) {
							document.activeElement.blur() // Remove focus styles
						}
					}
				}}
			>
				<Icon className="main-grid-item-icon" />
			</button>
			<span className="main-grid-item-type">
				<span
					//// onPointerDown={e => {
					//// 	e.preventDefault()
					//// }}
					//// onClick={e => {
					//// 	e.preventDefault() // Call e.preventDefault() because of text
					//// 	handleClick(e)
					//// }}
					onClick={handleClick}
				>
					{/* <GridItemName name={name} /> */}
					{toKebabCase(name).toLowerCase()}
				</span>
			</span>
		</article>
	)
}

const MemoMainGridItem = React.memo(MainGridItem)

function AppMain() {
	//// const { feather, wkBrands, wkPayments, iconsAreCached, icons } = React.useContext(SearchContext)!
	const { searchResults, feather, wkBrands, wkPayments } = React.useContext(SearchContext)!
	const { setNamesStart, setNamesEnd, removeAllNames } = React.useContext(ClipboardContext)!

	//// const { setStarted } = React.useContext(ProgressBarContext)!
	//// React.useEffect(() => {
	//// 	if (iconsAreCached) return
	//// 	setStarted(true)
	//// 	const d = window.setTimeout(() => setStarted(false), 100)
	//// 	return () => window.clearTimeout(d)
	//// }, [iconsAreCached, setStarted])

	// TODO: Extract to a named hook
	const onceRef = React.useRef(false)
	React.useEffect(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		removeAllNames()
	}, [removeAllNames, feather, wkBrands, wkPayments])

	useShortcutCtrlAToSelectAll()
	useShortcutEscToRemoveNamesStartAndEnd()

	useSideEffectClearSelectionOnChange()
	useSideEffectSelectNamesFromIndexes()
	useSideEffectVisibleDocumentTitle()

	return (
		<Main
			onClick={e => {
				//// if (e.target instanceof HTMLElement && e.target.closest(".main-grid-item-icon-frame") === null) {
				//// if (e.target instanceof HTMLElement && e.target.closest(".main-grid-item-icon-frame") === null) {
				removeAllNames()
				setNamesStart(null)
				setNamesEnd(null)
				//// }
			}}
		>
			<div className="main-grid">
				{searchResults === null
					? iota(64).map(index => (
							<div key={index} className="sk-main-grid-item">
								<div className="sk-main-grid-item-frame">
									<div className="sk-main-grid-item-icon"></div>
								</div>
								<div className="sk-main-grid-item-type-container">
									<div className="sk-main-grid-item-type"></div>
								</div>
							</div>
					  ))
					: // prettier-ignore
					  searchResults.map(([name, Icon], index) => (
							<MemoMainGridItem key={name} index={index} name={name} Icon={Icon} />
						))}
				{/* {iota(96).map(index => (
					<div key={index} className="sk-main-grid-item">
						<div className="sk-main-grid-item-frame">
							<div className="sk-main-grid-item-icon"></div>
						</div>
						<div className="sk-main-grid-item-type-container">
							<div className="sk-main-grid-item-type"></div>
						</div>
					</div>
				))} */}
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
