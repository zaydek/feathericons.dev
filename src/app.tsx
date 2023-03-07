import * as Feather from "@icons/feather/tsx"
import * as WkPaymentsMonoFilled from "@icons/wolfkit/payments/mono-filled/tsx"
import * as WkPaymentsMono from "@icons/wolfkit/payments/mono/tsx"
import * as WkPaymentsOriginalFilled from "@icons/wolfkit/payments/original-filled/tsx"
import * as WkPaymentsOriginal from "@icons/wolfkit/payments/original/tsx"
import * as WkSocialMono from "@icons/wolfkit/social/mono/tsx"
import * as WkSocialOriginal from "@icons/wolfkit/social/original/tsx"

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
import { cx, DynamicIcon, isMac, useScrollProps } from "@/lib"
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
import { useContext, useEffect, useTransition } from "react"
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
		preferColor,
		setPreferColor,
		preferNames,
		setPreferNames,
		resetIcons,
		resetIconSettings,
	} = useContext(SearchContext)!

	// TODO: Extract
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
						{/* <div> */}
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
										icon={preferColor ? WkPaymentsOriginal.Stripe : WkPaymentsMono.Stripe}
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
											icon={preferColor ? WkPaymentsOriginal.Stripe : WkPaymentsMono.Stripe}
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
											icon={preferColor ? WkPaymentsOriginalFilled.Stripe : WkPaymentsMonoFilled.Stripe}
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
						{/* </div> */}
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
						<h6 className="section-name u-flex-1">Icon settings</h6>
						<div className="sidebar-align-icon-frame">
							<Feather.RotateCcw
								className="section-reset-icon"
								strokeWidth={4}
								onClick={() => startTransition(resetIconSettings)}
							/>
						</div>
					</header>
					<ul className="checkboxes">
						<label className="checkbox">
							<div className="sidebar-align-icon-frame">
								{/* Defer to CSS; no <svg> */}
								<div className={cx("checkbox-icon chroma", preferColor && "is-prefer-color")}></div>
							</div>
							<span className="checkbox-name u-flex-1">Color icons</span>
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

	const { exportAs, setExportAs, clipboard } = useContext(ClipboardContext)!
	const { size, setSize, strokeWidth, setStrokeWidth, resetSize, resetStrokeWidth } = useContext(RangeContext)!

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
					<SyntaxHighlighting lang={lang} code={clipboard} />
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

// This function adds a keyboard shortcut for selecting all items in the search context.
// It listens for the "ctrl/cmd + a" key combination and sets the start and end indices to select all items.
function useShortcutCtrlASelectAll() {
	// Context variables
	const { data } = useContext(SearchContext)!
	const { setStartIndex, setEndIndex } = useContext(ClipboardContext)!

	// Event listener
	useEffect(() => {
		if (data === undefined) return
		function handleKeyDown(e: KeyboardEvent) {
			if ((isMac() && e.metaKey && e.key === "a") || (!isMac() && e.ctrlKey && e.key === "a")) {
				e.preventDefault()
				setStartIndex(0)
				setEndIndex(Number.MAX_SAFE_INTEGER)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [data, setEndIndex, setStartIndex])

	// Return nothing
	return void 0
}

// This function adds a keyboard shortcut for clearing the selection and clipboard.
// It listens for the "Escape" key and clears the selection and clipboard.
function useShortcutEscapeClearAll() {
	const { setStartIndex, setEndIndex, clearNames } = useContext(ClipboardContext)!
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				clearNames()
				setStartIndex(null)
				setEndIndex(null)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [clearNames, setEndIndex, setStartIndex])
	return void 0
}

// This function adds a keyboard shortcut for copying the clipboard.
// It listens for the "ctrl/cmd + c" key combination and copies the clipboard to the system clipboard.
function useShortcutCtrlCCopy() {
	const { clipboard } = useContext(ClipboardContext)!
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (!e.shiftKey && ((isMac() && e.metaKey && e.key === "c") || (!isMac() && e.ctrlKey && e.key === "c"))) {
				e.preventDefault()
				navigator.clipboard.writeText(clipboard)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [clipboard])
	return void 0
}

// This function selects names from the search context based on start and end indices.
// It listens for changes to the start and end indices and adds the selected names to the clipboard.
function useSelectNamesByIndex() {
	const { data } = useContext(SearchContext)!
	const { startIndex, endIndex, addNames } = useContext(ClipboardContext)!
	useEffect(() => {
		if (data === undefined) return
		if (startIndex === null || endIndex === null) return
		const minIndex = Math.min(startIndex, endIndex)
		const maxIndex = Math.max(startIndex, endIndex)
		addNames(...data!.slice(minIndex, maxIndex + 1).map(([name]) => name))
	}, [addNames, data, endIndex, startIndex])
	return void 0
}

////////////////////////////////////////////////////////////////////////////////

function AppMain() {
	const { preferNames, data } = useContext(SearchContext)!
	const { startIndex, setStartIndex, setEndIndex, names, addNames, removeNames, clearNames } =
		useContext(ClipboardContext)!

	useShortcutCtrlASelectAll()
	useShortcutEscapeClearAll()
	useShortcutCtrlCCopy()
	useSelectNamesByIndex()

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
				{data?.map(([name, Icon], index) => (
					<article
						key={index}
						// FIXME
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
						{preferNames && <figcaption className="grid-item-name">{name}</figcaption>}
					</article>
				))}
			</div>
		</Main>
	)
}
