import React from "react"

import * as feather from "@icons/feather/tsx"
import * as wkBrandsMono from "@icons/wk/brands/mono/tsx"
import * as wkBrandsOriginal from "@icons/wk/brands/original/tsx"
import * as wkPaymentsMonoFilled from "@icons/wk/payments/mono-filled/tsx"
import * as wkPaymentsMono from "@icons/wk/payments/mono/tsx"
import * as wkPaymentsOriginalFilled from "@icons/wk/payments/original-filled/tsx"
import * as wkPaymentsOriginal from "@icons/wk/payments/original/tsx"

import {
	Checkbox,
	DEV_DebugCss,
	Main,
	MemoSyntaxHighlighting,
	ProgressSlider,
	Radio,
	SearchBar,
	Select,
	Sidebar,
	SidebarOverlay,
} from "@/components"
import { resources } from "@/data"
import { IconComponent, iota, isMac, safeAnchorAttrs, toKebabCase, useVisibleDocumentTitle } from "@/lib"
import {
	ClipboardContext,
	IconValue,
	MONOCHROME_DEFAULT,
	RADIO_VALUE_DEFAULT,
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
	const { results } = React.useContext(SearchContext)!
	const { setNamesStart, setNamesEnd } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
		if (results === null) return
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
	}, [results, setNamesEnd, setNamesStart])
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
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [removeAllNames, setNamesEnd, setNamesStart])
	return void 0
}

function useSideEffectRemoveAllNamesOnChange() {
	const { radioValue } = React.useContext(SearchContext)!
	const { removeAllNames } = React.useContext(ClipboardContext)!
	const onceRef = React.useRef(false)
	React.useEffect(() => {
		void radioValue
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		removeAllNames()
	}, [radioValue, removeAllNames])
	return void 0
}

function useSideEffectSelectNamesFromIndexes() {
	const { results } = React.useContext(SearchContext)!
	const { namesStart, namesEnd, addNames } = React.useContext(ClipboardContext)!
	React.useEffect(() => {
		if (results === null) return
		if (namesStart === null || namesEnd === null) return
		const min = Math.min(namesStart, namesEnd)
		const max = Math.max(namesStart, namesEnd)
		addNames(...results.slice(min, max + 1).map(([name]) => name))
	}, [addNames, namesEnd, namesStart, results])
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
	const { results } = React.useContext(SearchContext)!
	const count = (results ?? []).length
	// TODO
	// prettier-ignore
	useVisibleDocumentTitle([
		`${count} icon${count === 1 ? "" : "s"}`,
		"Feather icons",
	])
	return void 0
}

////////////////////////////////////////////////////////////////////////////////

function AppSidebar1() {
	const [, startTransition] = React.useTransition()

	const { radioValue, setRadioValue, monochrome, setMonochrome } = React.useContext(SearchContext)!

	const scrollProps = useScrollProps()

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
						<button
							className="widget-align-icon-frame"
							onClick={e => startTransition(() => setRadioValue(RADIO_VALUE_DEFAULT))}
						>
							<feather.RotateCcw className="widget-name-end-icon" strokeWidth={3} />
						</button>
					</div>
					<div>
						<Radio<IconValue>
							icon={feather.Feather}
							type="radio"
							name="icon-value"
							value="feather"
							checked={radioValue === "feather"}
							onChange={e => startTransition(() => setRadioValue("feather"))}
						>
							Feather
						</Radio>
						<Radio<IconValue>
							icon={monochrome ? wkBrandsMono.BrandTwitter : wkBrandsOriginal.BrandTwitter}
							type="radio"
							name="icon-value"
							value="wk-brands"
							checked={radioValue === "wk-brands"}
							onChange={e => startTransition(() => setRadioValue("wk-brands"))}
						>
							Brands
						</Radio>
						<Radio<IconValue>
							// prettier-ignore
							icon={p => monochrome
								? <wkPaymentsMono.CardMastercard {...p} data-type="payments" />
								: <wkPaymentsOriginal.CardMastercard {...p} data-type="payments" />
							}
							type="radio"
							name="icon-value"
							value="wk-payments"
							checked={radioValue === "wk-payments"}
							onChange={e => startTransition(() => setRadioValue("wk-payments"))}
						>
							Payments
						</Radio>
						<Radio<IconValue>
							// prettier-ignore
							icon={p => monochrome
								? <wkPaymentsMonoFilled.CardMastercard {...p} data-type="payments" />
								: <wkPaymentsOriginalFilled.CardMastercard {...p} data-type="payments" />
							}
							type="radio"
							name="icon-value"
							value="wk-payments-filled"
							checked={radioValue === "wk-payments-filled"}
							onChange={e => startTransition(() => setRadioValue("wk-payments-filled"))}
						>
							Payments (filled)
						</Radio>
					</div>
				</div>
			</header>
			<div className="sidebar-body">
				<hr />
				{/* Widget */}
				<div className="widget-head">
					<div className="widget-name">
						<div className="widget-align-icon-frame">
							<feather.Settings className="widget-name-start-icon" />
						</div>
						<span className="widget-name-type">Settings</span>
						<button
							className="widget-align-icon-frame"
							onClick={e => startTransition(() => setMonochrome(MONOCHROME_DEFAULT))}
						>
							<feather.RotateCcw className="widget-name-end-icon" strokeWidth={3} />
						</button>
					</div>
				</div>
				<div className="widget-body">
					<div>
						<Checkbox
							icon={p => <div {...p} data-type="monochrome" data-monochrome={monochrome}></div>}
							checked={monochrome}
							onChange={e => startTransition(() => setMonochrome(e.currentTarget.checked))}
						>
							Monochrome
						</Checkbox>
					</div>
				</div>
				<hr />
			</div>
			<footer className="sidebar-foot">
				<hr data-collapse />
				{/* Widget */}
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
									<resource.icon className="resource-start-icon" />
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
	const { size, setSize, strokeWidth, setStrokeWidth } = React.useContext(RangeContext)!
	const { format, setFormatAs, readOnlyClipboard } = React.useContext(ClipboardContext)!

	const scrollProps = useScrollProps()

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
				{/* Widget */}
				<div className="widget-head">
					<div className="widget-name">
						<div className="widget-align-icon-frame">
							<feather.PenTool className="widget-name-start-icon" />
						</div>
						<h6 className="widget-name-type">Size</h6>
						<span className="widget-name-range-type">{size.toFixed(0)} PX</span>
						<button className="widget-align-icon-frame" onClick={() => setSize(SIZE_DEFAULT)}>
							<feather.RotateCcw className="widget-name-end-icon" strokeWidth={3} />
						</button>
					</div>
				</div>
				<div className="widget-body">
					<div className="widget-align-frame">
						{/* prettier-ignore */}
						<ProgressSlider value={size} setValue={setSize} min={SIZE_MIN} max={SIZE_MAX} step={SIZE_STEP} />
					</div>
				</div>
				<hr />
				{/* Widget */}
				<div className="widget-head">
					<div className="widget-name">
						<div className="widget-align-icon-frame">
							<feather.PenTool className="widget-name-start-icon" />
						</div>
						<h6 className="widget-name-type">Stroke width</h6>
						<span className="widget-name-range-type">{strokeWidth.toFixed(2)}</span>
						<button className="widget-align-icon-frame" onClick={e => setStrokeWidth(STROKE_DEFAULT)}>
							<feather.RotateCcw className="widget-name-end-icon" strokeWidth={3} />
						</button>
					</div>
				</div>
				<div className="widget-body">
					<div className="widget-align-frame">
						{/* prettier-ignore */}
						<ProgressSlider value={strokeWidth} setValue={setStrokeWidth} min={STROKE_MIN} max={STROKE_MAX} step={STROKE_STEP} />
					</div>
				</div>
				<hr />
			</div>
		</Sidebar>
	)
}

////////////////////////////////////////////////////////////////////////////////

// eslint-disable-next-line destructuring/no-rename
function MainGridItem({ index, name, icon: Icon }: { index: number; name: string; icon: IconComponent }) {
	const { names, namesStart, setNamesStart, setNamesEnd, addNames, removeNames, removeAllNames } =
		React.useContext(ClipboardContext)!

	return (
		<article id={name} className="main-grid-item" data-selected={names.has(name)}>
			<button
				className="main-grid-item-icon-frame"
				onClick={e => {
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
				}}
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
			<span className="main-grid-item-type">{toKebabCase(name).toLowerCase()}</span>
		</article>
	)
}

const MemoMainGridItem = React.memo(MainGridItem)

function AppMain() {
	const { results } = React.useContext(SearchContext)!
	const { setNamesStart, setNamesEnd, removeAllNames } = React.useContext(ClipboardContext)!

	useShortcutCtrlAToSelectAll()
	useShortcutEscToRemoveNamesStartAndEnd()

	useSideEffectRemoveAllNamesOnChange()
	useSideEffectSelectNamesFromIndexes()
	useSideEffectVisibleDocumentTitle()

	return (
		<Main
			onClick={e => {
				removeAllNames()
				setNamesStart(null)
				setNamesEnd(null)
			}}
		>
			<div className="main-grid">
				{results === null
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
					  results.map(([name, icon], index) => (
							<MemoMainGridItem key={name} index={index} name={name} icon={icon} />
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
