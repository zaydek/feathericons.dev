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
	CopyButton,
	DEV_DebugCss,
	FormatButton,
	Main,
	MemoSyntaxHighlighting,
	ProgressSlider,
	Radio,
	SaveButton,
	SearchBar,
	Sidebar,
	SidebarOverlay,
} from "./components"
import { resources } from "./data"
import { Effects } from "./effects"
import { DynamicIcon, Icon, iota, isMac, safeAnchorAttrs, toKebabCase } from "./lib"
import { ClipboardContext, ProgressBarContext, RangeContext, SearchContext } from "./providers"
import {
	CLIPBOARD_DEFAULT,
	IconsetValue,
	ICONSET_VALUE_DEFAULT,
	MONOCHROME_DEFAULT,
	SIZE_DEFAULT,
	SIZE_MAX,
	SIZE_MIN,
	SIZE_STEP,
	STROKE_DEFAULT,
	STROKE_MAX,
	STROKE_MIN,
	STROKE_STEP,
} from "./providers/constants"
import { useScrollProps } from "./use-scroll-props"

////////////////////////////////////////////////////////////////////////////////

function AppSidebar1() {
	const [, start] = React.useTransition()

	const { setStarted } = React.useContext(ProgressBarContext)!
	const { loading, iconset, setIconset, monochrome, setMonochrome } = React.useContext(SearchContext)!

	const scrollProps = useScrollProps()

	React.useEffect(() => {
		setStarted(loading)
	}, [loading, setStarted])

	return (
		<Sidebar pos="start">
			<header className="sidebar-head">
				<div className="widget-head" data-pos="search-bar">
					<div className="widget-alignment-frame" data-dir="column">
						<SearchBar />
					</div>
				</div>
				<div className="widget-body" {...scrollProps}>
					<div className="widget-name">
						<div className="widget-alignment-icon-frame">
							<DynamicIcon className="widget-name-icon" icon={feather.Package} />
						</div>
						<h6 className="widget-name-type u-flex-1">Icons</h6>
						{/* <div className="widget-alignment-icon-frame"> */}
						<button className="widget-reset-button" onClick={e => start(() => setIconset(ICONSET_VALUE_DEFAULT))}>
							<DynamicIcon className="widget-reset-button-icon" icon={feather.RotateCcw} />
						</button>
						{/* </div> */}
					</div>
					<div>
						<Radio<IconsetValue>
							icon={feather.Feather}
							type="radio"
							name="icon-value"
							value="feather"
							checked={iconset === "feather"}
							onChange={e => start(() => setIconset("feather"))}
						>
							Feather
						</Radio>
						<Radio<IconsetValue>
							icon={monochrome ? wkBrandsMono.Twitter : wkBrandsOriginal.Twitter}
							type="radio"
							name="icon-value"
							value="brands"
							checked={iconset === "brands"}
							onChange={e => start(() => setIconset("brands"))}
						>
							Brands
						</Radio>
						<Radio<IconsetValue>
							// prettier-ignore
							icon={p => monochrome
								? <wkPaymentsMono.Mastercard {...p} data-type="payments" />
								: <wkPaymentsOriginal.Mastercard {...p} data-type="payments" />
							}
							type="radio"
							name="icon-value"
							value="payments"
							checked={iconset === "payments"}
							onChange={e => start(() => setIconset("payments"))}
						>
							Payments
						</Radio>
						<Radio<IconsetValue>
							// prettier-ignore
							icon={p => monochrome
								? <wkPaymentsMonoFilled.Mastercard {...p} data-type="payments" />
								: <wkPaymentsOriginalFilled.Mastercard {...p} data-type="payments" />
							}
							type="radio"
							name="icon-value"
							value="payments-filled"
							checked={iconset === "payments-filled"}
							onChange={e => start(() => setIconset("payments-filled"))}
						>
							Payments (filled)
						</Radio>
					</div>
				</div>
			</header>
			<div className="sidebar-body">
				<hr />
				{/* WIDGET */}
				<div className="widget-head">
					<div className="widget-name">
						<div className="widget-alignment-icon-frame">
							<DynamicIcon className="widget-name-icon" icon={feather.Settings} />
						</div>
						<span className="widget-name-type u-flex-1">Settings</span>
						<button className="widget-reset-button" onClick={e => setMonochrome(MONOCHROME_DEFAULT)}>
							<DynamicIcon className="widget-reset-button-icon" icon={feather.RotateCcw} />
						</button>
					</div>
				</div>
				<div className="widget-body">
					<div>
						<Checkbox
							icon={p => <div {...p} data-type="monochrome" data-monochrome={monochrome}></div>}
							checked={!monochrome}
							onChange={e => start(() => setMonochrome(!e.currentTarget.checked))}
						>
							Colorize
						</Checkbox>
					</div>
				</div>
				<hr />
			</div>
			<footer className="sidebar-foot">
				<hr data-collapse />
				{/* WIDGET */}
				<div className="widget-head" data-pos="start">
					<div className="widget-name">
						<div className="widget-alignment-icon-frame">
							<DynamicIcon className="widget-name-icon" icon={feather.Globe} />
						</div>
						<h6 className="widget-name-type u-flex-1">Resources</h6>
					</div>
				</div>
				<div className="widget-body" data-pos="end">
					<nav className="resources">
						{resources.map(resource => (
							<a key={resource.href} className="resource" href={resource.href} {...safeAnchorAttrs}>
								<div className="widget-alignment-icon-frame">
									<DynamicIcon className="resource-start-icon" icon={resource.icon} />
								</div>
								<span className="resource-type u-flex-1">{resource.name}</span>
								<div className="widget-alignment-icon-frame">
									<DynamicIcon className="resource-end-icon" icon={feather.ArrowUpRight} />
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
	const { format, setFormatAs, clipboard } = React.useContext(ClipboardContext)!

	const scrollProps = useScrollProps()

	React.useEffect(() => {
		if (clipboard === "") return
		navigator.clipboard.writeText(clipboard)
	}, [clipboard])

	return (
		<Sidebar pos="end">
			<header className="sidebar-head">
				<div className="widget-head" data-pos="start">
					<div className="widget-name">
						{/* Use u-flex-1 here because there's no <h6> */}
						<div className="widget-alignment-frame u-flex-1">
							<FormatButton value={format} setValue={setFormatAs} />
						</div>
						<div className="widget-alignment-frame">
							<CopyButton />
							<SaveButton />
						</div>
					</div>
				</div>
				<div className="widget-body" data-pos="syntax-highlighting" {...scrollProps}>
					<div className="widget-syntax-highlighting-container">
						<MemoSyntaxHighlighting lang={format === "svg" ? "html" : "tsx"} code={clipboard || CLIPBOARD_DEFAULT} />
					</div>
				</div>
			</header>
			<div className="sidebar-body">
				<hr />
				{/* WIDGET */}
				<div className="widget-head">
					<div className="widget-name">
						<div className="widget-alignment-icon-frame">
							<DynamicIcon className="widget-name-icon" icon={feather.PenTool} />
						</div>
						<h6 className="widget-name-type u-flex-1">Size</h6>
						<div className="widget-alignment-frame" data-clip="end">
							<span className="widget-range-type">{size.toFixed(0)} PX</span>
							<button className="widget-reset-button" onClick={e => setSize(SIZE_DEFAULT)}>
								<DynamicIcon className="widget-reset-button-icon" icon={feather.RotateCcw} />
							</button>
						</div>
					</div>
				</div>
				<div className="widget-body">
					<div className="widget-alignment-frame" data-dir="column">
						{/* prettier-ignore */}
						<ProgressSlider value={size} setValue={setSize} min={SIZE_MIN} max={SIZE_MAX} step={SIZE_STEP} />
					</div>
				</div>
				<hr />
				{/* WIDGET */}
				<div className="widget-head">
					<div className="widget-name">
						<div className="widget-alignment-icon-frame">
							<DynamicIcon className="widget-name-icon" icon={feather.PenTool} />
						</div>
						<h6 className="widget-name-type u-flex-1">Stroke width</h6>
						<div className="widget-alignment-frame" data-clip="end">
							<span className="widget-range-type">{strokeWidth.toFixed(2)}</span>
							<button className="widget-reset-button" onClick={e => setStrokeWidth(STROKE_DEFAULT)}>
								<DynamicIcon className="widget-reset-button-icon" icon={feather.RotateCcw} />
							</button>
						</div>
					</div>
				</div>
				<div className="widget-body">
					<div className="widget-alignment-frame" data-dir="column">
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
function MainGridItem({ index, name, icon: Icon }: { index: number; name: string; icon: Icon }) {
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
	const { iconset, searchResults } = React.useContext(SearchContext)!
	const { setNamesStart, setNamesEnd, removeAllNames } = React.useContext(ClipboardContext)!

	let count: number
	switch (iconset) {
		case "feather":
			count = 287
			break
		case "brands":
			count = 30
			break
		case "payments":
		case "payments-filled":
			count = 40
			break
	}

	return (
		<Main
			onClick={e => {
				removeAllNames()
				setNamesStart(null)
				setNamesEnd(null)
			}}
		>
			<div className="main-grid">
				{searchResults === null
					? iota(count).map(index => (
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
					  searchResults.map(([name, icon], index) => (
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
			<Effects />
			<SidebarOverlay />
			<AppSidebar1 />
			<AppSidebar2 />
			<AppMain />
		</DEV_DebugCss>
	)
}
