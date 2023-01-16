import "./search-app.scss"

import * as feather from "./data/react-feather@4.29.0"

//// import featherZip from "./data/feather@4.29.0.zip?url"

import { createContext, Dispatch, Fragment, HTMLAttributes, MouseEventHandler, PropsWithChildren, ReactNode, SetStateAction, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { AriaCheckbox } from "./aria/aria-checkbox"
import { AriaSlider } from "./aria/aria-slider"
import { densityInitial, densityMax, densityMin, densityStep, sizeInitial, sizeMax, sizeMin, sizeStep, strokeWidthInitial, strokeWidthMax, strokeWidthMin, strokeWidthStep } from "./constants"
import { manifest } from "./data/react-feather-manifest@4.29.0"
import { toKebabCase } from "./lib/cases"
import { detab } from "./lib/format"
import { Icon, IconComponent } from "./lib/react/icon"

// TODO: Add font-feature-settings: "tnum" here?
function TypographyCaps({ children }: PropsWithChildren) {
	return <>
		<div className="[white-space]-pre [font]-700_10px_/_normal_$sans [letter-spacing]-0.1em [color]-#333">
			{children}
		</div>
	</>
}

function useRestorableState<T>(initialValue: T, zeroValue: T) {
	const [state, setState] = useState(initialValue)
	const [history, setHistory] = useState([state])
	const [historyIndex, setHistoryIndex] = useState(history.length - 1)

	const restoreState = useCallback((increment: number) => {
		if (increment > 0) {
			if (historyIndex + increment < history.length) {
				setHistoryIndex(curr => curr + increment)
			}
		} else {
			if (historyIndex + increment >= 0) {
				setHistoryIndex(curr => curr + increment)
			}
		}
	}, [history.length, historyIndex])

	// Commits state to history and historyIndex
	const onceRef = useRef(false)
	const commitState = useCallback(() => {
		if (!onceRef.current) {
			onceRef.current = true
			return
		}
		const timeoutId = setTimeout(() => {
			if (state === zeroValue || state === history[historyIndex]) { return }
			if (historyIndex === 0) { // At start
				// Append state (preserve zeroValue)
				setHistory(curr => [
					zeroValue,
					state,
					...curr.slice(1)
				])
				setHistoryIndex(curr => curr + 1)
			} else if (historyIndex + 1 === history.length) { // At end
				// Append state
				setHistory(curr => [
					...curr,
					state,
				])
				setHistoryIndex(curr => curr + 1)
			} else {
				// Insert state
				setHistory(curr => [
					...curr.slice(0, historyIndex),
					state,
					...curr.slice(historyIndex + 1),
				])
			}
		}, 500)
		return () => clearTimeout(timeoutId)
	}, [history, historyIndex, state, zeroValue])

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(commitState, [state])

	// history[historyIndex] -> state
	useEffect(() => {
		setState(history[historyIndex])
	}, [history, historyIndex])

	return [state, setState, restoreState] as const
}

type Position = "start" | "center" | "end"

// TODO: Make icon required?
function Tooltip({ pos, icon, text, data, children, ...props }: { pos: Position, icon?: IconComponent, text: ReactNode, data?: any } & HTMLAttributes<HTMLDivElement>) {
	const [show, setShow] = useState(true)

	// This is a trick to hide the tooltip on data changes
	useLayoutEffect(() => {
		if (data === undefined) { return }
		setShow(false)
		setTimeout(() => {
			setShow(true)
		}, 0)
	}, [data])

	return <>
		<div className="relative" data-group {...props}>
			{children}
			{show && <>
				<div className={{
					"start":  "absolute t-100% l-0 z-10 [pointer-events]-none",
					"center": "absolute t-100% l-50% [transform]-translateX(-50%) z-10 [pointer-events]-none",
					"end":    "absolute t-100% r-0 z-10 [pointer-events]-none",
				}[pos]}>
					{/* [[data-group]:hover_&]:([transform]-translateY(0px) [opacity]-1 [transition-delay]-100ms) */}
					<div className={detab(`
						[transform]-translateY(8px)
						[opacity]-0
						[transition]-100ms_cubic-bezier(0,_1,_1,_1)
						[transition-property]-transform,_opacity
							[[data-group]:hover_&]:([transform]-translateY(0px) [opacity]-1 [transition-delay]-10ms)
					`)}>
						{/* <div className="relative"> */}
							<div className="px-12 flex align-center gap-10 h-32 rounded-12 [background-color]-hsl(0,_0%,_99%) [box-shadow]-$shadow-6,_$realistic-shadow-6">
								{/* TODO */}
								{/* <div className="h-16 w-16 rounded-1e3 [background-color]-#666"></div> */}
								{icon !== undefined && <>
									<Icon className="h-16 w-16 [color]-#333" icon={icon} />
								</>}
								<TypographyCaps>
									{text}
								</TypographyCaps>
							</div>
							{/* <div className="absolute -t-2 x-0 flex justify-center">
								<div className="h-8 w-8 rounded-2 [background-color]-#fff [transform]-rotate(45deg)"></div>
							</div> */}
						{/* </div> */}
					</div>
				</div>
			</>}
		</div>
	</>
}

// TODO: Use button props here?
//
// NOTE: We can't use :first-of-type and :last-of-type because of <Tooltip>
// wrappers
function SearchBarButton({ start, end, ...props }: { start?: boolean, end?: boolean } & HTMLAttributes<HTMLDivElement>) {
	[start, end] = [start ?? false, end ?? false]

	return <>
		{/* Use my-* for <Tooltip> */}
		<button className="my-8 px-8 flex align-center h-$search-bar-height" style={{ paddingLeft: start ? 16 : undefined, paddingRight: end ? 16 : undefined }}>
			<div className="flex flex-center h-32 w-32 rounded-1e3 [background-color]-pink" {...props}>
				<div className="h-16 w-16 rounded-1e3 [background-color]-red"></div>
			</div>
		</button>
	</>
}

function SearchBar() {
	const { search, setSearch, restoreSearch } = useContext(SearchContext)!

	const inputRef = useRef<HTMLInputElement | null>(null)

	return <>
		<div className="flex align-center h-64 rounded-1e3 [background-color]-#eee [&:is(:hover,_:focus-within)]:([background-color]-#fff [box-shadow]-$shadow-2) [&_>_:nth-child(2)]:grow-1">
			<Tooltip pos="start" text={<>SEARCH ICONS{" ".repeat(2)}<span className="[opacity]-0.75">CTRL+/</span></>}>
				<SearchBarButton start onClick={e => inputRef.current!.select()} />
			</Tooltip>
			<input
				ref={inputRef}
				className="px-8 h-64"
				type="text"
				value={search}
				onChange={e => setSearch(e.currentTarget.value)}
				onKeyDown={e => {
					if (e.key === "ArrowUp") {
						e.preventDefault()
						restoreSearch(-1)
					} else if (e.key === "ArrowDown") {
						e.preventDefault()
						restoreSearch(+1)
					}
				}}
				autoFocus
			/>
			<Tooltip pos="end" text={<>DARK MODE{" ".repeat(2)}<span className="[opacity]-0.75">CTRL+D</span></>}>
				<SearchBarButton end />
			</Tooltip>
		</div>
	</>
}

function Wbr({ children }: { children: string }) {
	const parts = children.split(/(?=[A-Z])/)
	return <>
		{parts.map((part, index) => <Fragment key={part}>
			{index > 0 && <wbr />}
			{part}
		</Fragment>)}
	</>
}

function Highlight({ indexes, children }: { indexes: readonly [number, number] | null, children: string }) {
	if (indexes === null) {
		return <Wbr>{children}</Wbr>
	} else {
		return <>
			<Wbr>{children.slice(0, indexes[0])}</Wbr>
			{/* <span className="[background-color]-hsl(200,_100%,_87.5%,_0.5) [box-shadow]-0_1px_0_0_hsl(200,_100%,_calc(87.5%_/_2),_0.5)"> */}
			<span className="[background-color]-hsl(200,_100%,_87.5%,_0.5)">
				{children.slice(indexes[0], indexes[1])}
			</span>
			<Wbr>{children.slice(indexes[1])}</Wbr>
		</>
	}
}

function SearchResultsContents() {
	const { searchResults } = useContext(SearchContext)!
	const { setSelectedName, setSelectedIcon } = useContext(FocusContext)!
	const { compact } = useContext(CompactContext)!

	return <>
		<div className="grid grid-cols-repeat(auto-fill,_minmax(calc(96px_+_8px_*_$density),_1fr))">
			{compact ? <>
				{Object.keys(searchResults).map(name => <Fragment key={name}>
					<button className="flex flex-col" onClick={e => {
						setSelectedName(name as keyof typeof manifest)
						setSelectedIcon(document.getElementById(name)! as unknown as SVGSVGElement)
					}}>
						<Tooltip pos="center" icon={feather[name as keyof typeof feather]} text={toKebabCase(name).toUpperCase()}>
							<div className="flex flex-center h-96">
								<Icon id={name} className="h-32 w-32 [transform]-scale($scale) [stroke-width]-$stroke-width [color]-#333" icon={feather[name as keyof typeof feather]} />
							</div>
						</Tooltip>
					</button>
				</Fragment>)}
			</> : <>
				{Object.keys(searchResults).map(name => <Fragment key={name}>
					<button className="flex flex-col" onClick={e => {
						setSelectedName(name as keyof typeof manifest)
						setSelectedIcon(document.getElementById(name)! as unknown as SVGSVGElement)
					}}>
						<div className="flex flex-center h-96">
							<Icon id={name} className="h-32 w-32 [transform]-scale($scale) [stroke-width]-$stroke-width [color]-#333" icon={feather[name as keyof typeof feather]} />
						</div>
						{/* TODO: Extract typography? */}
						<div className="flex flex-center wrap-wrap h-20 [text-align]-center [font]-12px_/_normal_$sans [-webkit-user-select]-all [user-select]-all">
							<Highlight indexes={searchResults[name as keyof typeof feather]!}>
								{name}
							</Highlight>
						</div>
					</button>
				</Fragment>)}
			</>}
		</div>
	</>
}

function Label({ handleReset, children }: PropsWithChildren<{ handleReset: MouseEventHandler<HTMLButtonElement> }>) {
	return <>
		<div className="flex justify-space-between align-center h-$sidebar-label-height">
			{/* LHS */}
			<div className="flex align-center gap-10">
				{children}
			</div>
			{/* RHS */}
			<button onClick={handleReset} className="flex flex-center h-32 w-32 rounded-1e3 [background-color]-#eee [&:hover]:([background-color]-#fff [box-shadow]-$shadow-2)">
				<div className="h-16 w-16 rounded-1e3 [background-color]-#aaa"></div>
			</button>
		</div>
	</>
}

function Hairline() {
	return <hr className="h-$hairline-height [background-color]-$hairline-color" />
}

function Checkbox({ checked, setChecked, children }: PropsWithChildren<{ checked: boolean, setChecked: Dispatch<SetStateAction<boolean>> }>) {
	return <>
		<div className="flex justify-space-between align-center h-$sidebar-label-height">
			{/* LHS */}
			{children}
			{/* RHS */}
			<AriaCheckbox checked={checked} setChecked={setChecked} onKeyDown={e => {
				if (e.key === "ArrowLeft") {
					setChecked(false)
				} else if (e.key === "ArrowRight") {
					setChecked(true)
				}
			}}>
				<div className="flex flex-col justify-center h-$sidebar-label-height">
					<div className={`flex ${checked ? "justify-end" : "justify-start"} align-center h-12 w-48 rounded-1e3 ${checked ? "[background-color]-$alt-trim-color" : "[background-color]-$hairline-color"}`}>
						<div className="flex flex-center h-$sidebar-input-height w-$sidebar-input-height rounded-1e3 [background-color]-$base-color [box-shadow]-$shadow-6">
							<div className="h-50% aspect-1 rounded-1e3 [background-color]-$placeholder-color"></div>
						</div>
					</div>
				</div>
			</AriaCheckbox>
		</div>
	</>
}

function Slider(props: {
	min:      number
	max:      number
	step:     number
	value:    number
	setValue: Dispatch<SetStateAction<number>>
}) {
	const [track, setTrack] = useState<HTMLDivElement | null>(null)
	const [thumb, setThumb] = useState<HTMLDivElement | null>(null)

	return <>
		<AriaSlider track={track} thumb={thumb} {...props}>
			<div ref={setTrack} className="flex flex-col justify-center h-$sidebar-label-height">
				<div className="flex align-center h-6 rounded-1e3 [background-color]-$alt-trim-color">
					<div ref={setThumb} className="flex flex-center h-calc($sidebar-input-height_+_4px) w-calc($sidebar-input-height_+_4px) rounded-1e3 [background-color]-$base-color [box-shadow]-$shadow-6">
						<div className="h-50% aspect-1 rounded-1e3 [background-color]-$placeholder-color"></div>
					</div>
				</div>
			</div>
		</AriaSlider>
	</>
}

function SidebarContents() {
	const { selectedName } = useContext(FocusContext)!
	const { inspect, setInspect } = useContext(InspectContext)!
	const { compact, setCompact } = useContext(CompactContext)!
	const { density, setDensity, size, setSize, strokeWidth, setStrokeWidth } = useContext(SliderContext)!

	return <>
		<div className="flex align-center h-64 [&_>_:nth-child(1)]:grow-1">
			<div className="flex align-center gap-10 h-20">
				<Icon className="h-16 w-16 [color]-#333" icon={feather[selectedName]} />
				<div>{selectedName}</div>
			</div>
			<Tooltip pos="end" text="OPEN DOCS">
				{/* Use my-* for <Tooltip> */}
				{/* TODO */}
				<button className="my-8 flex flex-center h-32 w-32 rounded-1e3 [background-color]-#eee [&:hover]:([background-color]-#fff [box-shadow]-$shadow-2)">
					<div className="h-16 w-16 rounded-1e3 [background-color]-#aaa"></div>
				</button>
			</Tooltip>
		</div>
		<div className="flex flex-center aspect-2">
			<Icon className="h-64 w-64 [transform]-scale($scale) [stroke-width]-$stroke-width [color]-#333" icon={feather[selectedName]} />
		</div>
		<Checkbox checked={inspect} setChecked={setInspect}>
			<div>
				Code
			</div>
		</Checkbox>
		<Hairline />
		<Checkbox checked={compact} setChecked={setCompact}>
			<div>
				Compact mode
			</div>
		</Checkbox>
		<Hairline />
		<Label handleReset={e => setDensity(densityInitial)}>
			<div>
				Density
			</div>
		</Label>
		<Slider min={densityMin} max={densityMax} step={densityStep} value={density} setValue={setDensity} />
		<Hairline />
		<Label handleReset={e => setSize(sizeInitial)}>
			<div>
				Size
			</div>
		</Label>
		<Slider min={sizeMin} max={sizeMax} step={sizeStep} value={size} setValue={setSize} />
		<Hairline />
		<Label handleReset={e => setStrokeWidth(strokeWidthInitial)}>
			<div>
				Stroke width
			</div>
		</Label>
		<Slider min={strokeWidthMin} max={strokeWidthMax} step={strokeWidthStep} value={strokeWidth} setValue={setStrokeWidth} />
	</>
}

// TODO
document.documentElement.style.backgroundColor = "#fff"

function App() {

	return <>
		{/* <a href={featherZip} download>
			Click me
		</a> */}
		<div className="p-32 flex justify-center">
			<div className="basis-2e3 flex gap-64 [&_>_:nth-child(1)]:grow-1">
				<div className="flex flex-col gap-32">
					<SearchBar />
					<SearchResultsContents />
				</div>
				<div className="flex flex-col gap-20 w-350">
					<SidebarContents />
				</div>
			</div>
		</div>
	</>
}

const SearchContext =
	createContext<{
		search:          string
		setSearch:       Dispatch<SetStateAction<string>>
		restoreSearch:   (_: number) => void
		searchResults:   Partial<Record<keyof typeof feather, readonly [number, number] | null>>
	} | null>(null)

const FocusContext =
	createContext<{
		selectedName:    keyof typeof manifest
		setSelectedName: Dispatch<SetStateAction<keyof typeof manifest>>
		selectedIcon:    SVGSVGElement | null
		setSelectedIcon: Dispatch<SetStateAction<SVGSVGElement | null>>
	} | null>(null)

const InspectContext =
	createContext<{
		inspect:         boolean
		setInspect:      Dispatch<SetStateAction<boolean>>
	} | null>(null)

const CompactContext =
	createContext<{
		compact:         boolean
		setCompact:      Dispatch<SetStateAction<boolean>>
	} | null>(null)

const SliderContext =
	createContext<{
		density:         number
		setDensity:      Dispatch<SetStateAction<number>>
		size:            number
		setSize:         Dispatch<SetStateAction<number>>
		strokeWidth:     number
		setStrokeWidth:  Dispatch<SetStateAction<number>>
	} | null>(null)

function getSubstringIndexes(str: string, substr: string) {
	const index = str.indexOf(substr)
	if (index === -1) { return null }
	return [index, index + substr.length] as const
}

function StateProvider({ children }: PropsWithChildren) {

	//////////////////////////////////////////////////////////////////////////////
	// Search

	const [search, setSearch, restoreSearch] = useRestorableState("", "")

	const $$search = useMemo(() => {
		return search
			.replace(/[^a-zA-Z0-9]/g, "")
			.toLowerCase()
	}, [search])

	const searchResultsFallback = useMemo(() => {
		const ref: Partial<Record<keyof typeof feather, readonly [number, number] | null>> = {}
		for (const name of Object.keys(manifest)) {
			ref[name as keyof typeof feather] = null
		}
		return ref
	}, [])

	const searchResults = useMemo(() => {
		if ($$search === "") { return searchResultsFallback }
		const refA: Partial<Record<keyof typeof feather, readonly [number, number] | null>> = {}
		const refB: Partial<Record<keyof typeof feather, readonly [number, number] | null>> = {}
		for (const [name, tags] of Object.entries(manifest)) {
			const indexes = getSubstringIndexes(name.toLowerCase(), $$search)
			if (indexes !== null) {
				refA[name as keyof typeof feather] = indexes
			} else {
				for (const tag of tags) {
					if (tag.startsWith($$search)) {
						refB[name as keyof typeof feather] = null
					}
				}
			}
		}
		return { ...refA, ...refB }
	}, [$$search, searchResultsFallback])

	//////////////////////////////////////////////////////////////////////////////
	// Sidebar

	const [selectedName, setSelectedName] = useState<keyof typeof manifest>("Feather")
	const [selectedIcon, setSelectedIcon] = useState<SVGSVGElement | null>(null)
	const [inspect, setInspect] = useState(false)
	const [compact, setCompact] = useState(false)
	const [density, setDensity] = useState(densityInitial)
	const [size, setSize] = useState(sizeInitial)
	const [strokeWidth, setStrokeWidth] = useState(strokeWidthInitial)

	//////////////////////////////////////////////////////////////////////////////

	return <>
		<SearchContext.Provider value={useMemo(() => ({
			search,
			setSearch,
			restoreSearch,
			searchResults,
		}), [restoreSearch, search, searchResults, setSearch])}>
			<FocusContext.Provider value={useMemo(() => ({
				selectedName,
				setSelectedName,
				selectedIcon,
				setSelectedIcon,
			}), [selectedIcon, selectedName])}>
				<InspectContext.Provider value={useMemo(() => ({
					inspect,
					setInspect
				}), [inspect])}>
					<CompactContext.Provider value={useMemo(() => ({
						compact,
						setCompact,
					}), [compact])}>
						<SliderContext.Provider value={useMemo(() => ({
							compact,
							setCompact,
							density,
							setDensity,
							size,
							setSize,
							strokeWidth,
							setStrokeWidth,
						}), [compact, density, size, strokeWidth])}>
							<CSSVariableEffect />
							{children}
						</SliderContext.Provider>
					</CompactContext.Provider>
				</InspectContext.Provider>
			</FocusContext.Provider>
		</SearchContext.Provider>
	</>
}

function CSSVariableEffect() {
	const { density, size, strokeWidth } = useContext(SliderContext)!

	useEffect(() => {
		document.body.style.setProperty("--density", `${density}`)
		document.body.style.setProperty("--scale", `${size / sizeInitial}`)
		document.body.style.setProperty("--stroke-width", `${strokeWidth}px`)
	}, [density, size, strokeWidth])

	return <></>
}

export function ProvidedApp() {
	return <>
		<StateProvider>
			<App />
		</StateProvider>
	</>
}
