import "./search-app.scss"

import * as feather from "./data/react-feather@4.29.0"

//// import featherZip from "./data/feather@4.29.0.zip?url"

import { createContext, Dispatch, Fragment, HTMLAttributes, MouseEventHandler, PropsWithChildren, ReactNode, SetStateAction, SVGAttributes, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { AriaCheckbox } from "./aria/aria-checkbox"
import { AriaSlider } from "./aria/aria-slider"
import { densityInitial, sizeInitial, sizeMax, sizeMin, sizeStep, strokeWidthInitial, strokeWidthMax, strokeWidthMin, strokeWidthStep } from "./constants"
import { manifest } from "./data/react-feather-manifest@4.29.0"
import { toKebabCase } from "./lib/cases"
import { cx } from "./lib/cx"
import { detab } from "./lib/format"
import { Icon, IconComponent } from "./lib/react/icon"

////////////////////////////////////////////////////////////////////////////////

function TypeTooltipCaps({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <>
		<div className={cx("[white-space]-pre [font]-700_10px_/_normal_$sans [font-feature-settings]-'tnum' [letter-spacing]-0.0625em [color]-#333", className)} {...props}>
			{children}
		</div>
	</>
}

function TypeCaps({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <>
		{/* Surprisingly, use +1px font-size here */}
		<div className={cx("[white-space]-pre [font]-600_11px_/_normal_$sans [font-feature-settings]-'tnum' [letter-spacing]-0.0625em [color]-#333", className)} {...props}>
			{children}
		</div>
	</>
}

function TypeInvertedCaps({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <>
		{/* Surprisingly, use +1px font-size here */}
		<div className={cx("[white-space]-pre [font]-600_11px_/_normal_$sans [font-feature-settings]-'tnum' [letter-spacing]-0.0625em [color]-#fff", className)} {...props}>
			{children}
		</div>
	</>
}

function TypeSans({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <>
		<div className={cx("[white-space]-pre [font]-400_15px_/_normal_$sans [font-feature-settings]-'tnum' [color]-#333", className)} {...props}>
			{children}
		</div>
	</>
}

function TypeInvertedSans({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <>
		<div className={cx("[white-space]-pre [font]-400_15px_/_normal_$sans [font-feature-settings]-'tnum' [color]-#fff", className)} {...props}>
			{children}
		</div>
	</>
}

////////////////////////////////////////////////////////////////////////////////

export function SVGIcon(props: SVGAttributes<SVGElement>) {
	return <>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
			<path d="M12 0c-1.497 0-2.749.965-3.248 2.17a3.45 3.45 0 00-.238 1.416 3.459 3.459 0 00-1.168-.834 3.508 3.508 0 00-1.463-.256 3.513 3.513 0 00-2.367 1.02c-1.06 1.058-1.263 2.625-.764 3.83.179.432.47.82.82 1.154a3.49 3.49 0 00-1.402.252C.965 9.251 0 10.502 0 12c0 1.497.965 2.749 2.17 3.248.437.181.924.25 1.414.236-.357.338-.65.732-.832 1.17-.499 1.205-.295 2.772.764 3.83 1.058 1.06 2.625 1.263 3.83.764.437-.181.83-.476 1.168-.832-.014.49.057.977.238 1.414C9.251 23.035 10.502 24 12 24c1.497 0 2.749-.965 3.248-2.17a3.45 3.45 0 00.238-1.416c.338.356.73.653 1.168.834 1.205.499 2.772.295 3.83-.764 1.06-1.058 1.263-2.625.764-3.83a3.459 3.459 0 00-.834-1.168 3.45 3.45 0 001.416-.238C23.035 14.749 24 13.498 24 12c0-1.497-.965-2.749-2.17-3.248a3.455 3.455 0 00-1.414-.236c.357-.338.65-.732.832-1.17.499-1.205.295-2.772-.764-3.83a3.513 3.513 0 00-2.367-1.02 3.508 3.508 0 00-1.463.256c-.437.181-.83.475-1.168.832a3.45 3.45 0 00-.238-1.414C14.749.965 13.498 0 12 0zm-.041 1.613a1.902 1.902 0 011.387 3.246v3.893L16.098 6A1.902 1.902 0 1118 7.902l-2.752 2.752h3.893a1.902 1.902 0 110 2.692h-3.893L18 16.098A1.902 1.902 0 1116.098 18l-2.752-2.752v3.893a1.902 1.902 0 11-2.692 0v-3.893L7.902 18A1.902 1.902 0 116 16.098l2.752-2.752H4.859a1.902 1.902 0 110-2.692h3.893L6 7.902A1.902 1.902 0 117.902 6l2.752 2.752V4.859a1.902 1.902 0 011.305-3.246z" />
		</svg>
	</>
}

export function JSXIcon(props: SVGAttributes<SVGElement>) {
	return <>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" {...props}>
			<circle cx="0" cy="0" r="2.05" />
			<g fill="none" stroke="currentColor" strokeWidth={1.5}>
				<ellipse rx="11" ry="4.2" />
				<ellipse rx="11" ry="4.2" transform="rotate(60)"  />
				<ellipse rx="11" ry="4.2" transform="rotate(120)" />
			</g>
		</svg>
	</>
}

export function TSXIcon(props: SVGAttributes<SVGElement>) {
	return <>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
			<path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
		</svg>
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
							<div className="px-12 flex align-center gap-8 h-32 rounded-12 [background-color]-hsl(0,_0%,_99%) [box-shadow]-$shadow-6,_$raw-shadow-6">
								{/* TODO */}
								{/* <div className="h-16 w-16 rounded-1e3 [background-color]-#666"></div> */}
								{icon !== undefined && <>
									<Icon className="h-16 w-16 [color]-#333" icon={icon} />
								</>}
								<TypeTooltipCaps>
									{text}
								</TypeTooltipCaps>
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

//// // TODO: Use button props here?
//// //
//// // NOTE: We can't use :first-of-type and :last-of-type because of <Tooltip>
//// // wrappers
//// function SearchBarButton({ start, end, ...props }: { start?: boolean, end?: boolean } & HTMLAttributes<HTMLDivElement>) {
//// 	[start, end] = [start ?? false, end ?? false]
////
//// 	return <>
//// 		{/* Use my-* for <Tooltip> */}
//// 		<button className="my-8 px-8 flex align-center h-$search-bar-height" style={{ paddingLeft: start ? 16 : undefined, paddingRight: end ? 16 : undefined }}>
//// 			<div className="flex flex-center h-32 w-32 rounded-1e3 [background-color]-pink" {...props}>
//// 				<div className="h-16 w-16 rounded-1e3 [background-color]-red"></div>
//// 			</div>
//// 		</button>
//// 	</>
//// }

// TODO: Use button props here?
//
// NOTE: We can't use :first-of-type and :last-of-type because of <Tooltip>
// wrappers
function SearchBarButton(props: HTMLAttributes<HTMLDivElement>) {
	return <>
		{/* Use my-* for <Tooltip> */}
		<button className="my-8 px-16 flex align-center h-$search-bar-height">
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
		{/* <div className="flex align-center h-64 rounded-1e3 [background-color]-#eee [&:is(:hover,_:focus-within)]:([background-color]-#fff [box-shadow]-$shadow-2) [&_>_:nth-child(2)]:grow-1"> */}
		<div className="flex align-center h-64 rounded-1e3 [background-color]-#fff [box-shadow]-$shadow-2 [&_>_:nth-child(2)]:grow-1">
			<Tooltip pos="start" text={<>SEARCH ICONS{" ".repeat(2)}<span className="[opacity]-0.75">CTRL+/</span></>}>
				<SearchBarButton onClick={e => inputRef.current!.select()} />
			</Tooltip>
			<input
				ref={inputRef}
				className="h-$search-bar-height"
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
			<Tooltip pos="end" text={<>TOGGLE THEME{" ".repeat(2)}<span className="[opacity]-0.75">CTRL+D</span></>}>
				<SearchBarButton />
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
			{/* <span className="[background-color]-hsl(52.5,_100%,_75%,_0.4) [box-shadow]-0_1px_0_0_hsl(52.5,_100%,_50%)"> */}
			{/* <span className="[background-color]-hsl(200,_100%,_87.5%,_0.5) [box-shadow]-0_1px_0_0_hsl(200,_100%,_calc(87.5%_/_2),_0.5)"> */}
			{/* <span className="[background-color]-hsl(200,_100%,_90%) [box-shadow]-0_1px_0_0_hsl(200,_100%,_75%)"> */}
			<span className="[background-color]-hsl(45,_100%,_90%) [box-shadow]-0_1px_0_0_hsl(45,_100%,_60%)">
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

						{/* <div className="flex justify-center align-baseline wrap-wrap h-32 [text-align]-center [font]-12px_/_normal_$sans [-webkit-user-select]-all [user-select]-all">
							<Highlight indexes={searchResults[name as keyof typeof feather]!}>
								{name}
							</Highlight>
						</div> */}

						{/* This is a trick so wrapped text is optically centered */}
						{/* TODO: Extract typography? */}
						<div className="flex flex-center wrap-wrap h-64 [-webkit-user-select]-all [user-select]-all">
							<div className="h-32 [text-align]-center [font]-12px_/_normal_$sans">
								<Highlight indexes={searchResults[name as keyof typeof feather]!}>
									{name}
								</Highlight>
							</div>
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
			{/* <div className="flex align-center gap-8"> */}
			{children}
			{/* </div> */}
			{/* RHS */}
			{/* <button className="flex flex-center h-32 w-32 rounded-1e3 [background-color]-#eee [&:hover]:([background-color]-#fff [box-shadow]-$shadow-2)" onClick={handleReset}> */}
			{/* <button className="flex flex-center h-24 w-24 rounded-1e3 [background-color]-#eee" onClick={handleReset}>
				<Icon className="h-12 w-12 [color]-#444" icon={feather.RotateCcw} strokeWidth={2.5} />
			</button> */}
			{/* Use my-* for <Tooltip> */}
			{/* TODO */}
			{/* <button className="my-8 flex flex-center h-32 w-32 rounded-1e3 [background-color]-#eee [&:hover]:([background-color]-#fff [box-shadow]-$shadow-2)">
				<div className="h-16 w-16 rounded-1e3 [background-color]-#aaa"></div>
			</button> */}
			{/* TODO */}
			<button className="flex flex-center h-24 w-24 rounded-1e3 [background-color]-#eee" onClick={handleReset}>
				<Icon className="h-12 w-12 [color]-#444" icon={feather.RotateCcw} strokeWidth={2.5} />
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
					<div className={`flex ${checked ? "justify-end" : "justify-start"} align-center h-12 w-48 rounded-1e3 ${checked ? "[background-color]-$trim-color" : "[background-color]-$hairline-color"}`}>
						<div className="flex flex-center h-$sidebar-input-height w-$sidebar-input-height rounded-1e3 [background-color]-$base-color [box-shadow]-$shadow-6">
							<div className="h-50% aspect-1 rounded-1e3 [background-color]-$hairline-color"></div>
						</div>
						{/* <div className="h-$sidebar-input-height w-$sidebar-input-height rounded-1e3 [background-color]-$base-color [box-shadow]-$shadow-2"></div> */}
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
			<div className="px-4">
				<div ref={setTrack} className="flex flex-col justify-center h-$sidebar-label-height">
					<div className="flex align-center h-6 rounded-1e3 [background-color]-$trim-color">
						<div ref={setThumb} className="flex flex-center h-calc($sidebar-input-height_+_4px) w-calc($sidebar-input-height_+_4px) rounded-1e3 [background-color]-$base-color [box-shadow]-$shadow-6">
							<div className="h-50% aspect-1 rounded-1e3 [background-color]-$hairline-color"></div>
						</div>
						{/* <div ref={setThumb} className="h-calc($sidebar-input-height_+_4px) w-calc($sidebar-input-height_+_4px) rounded-1e3 [background-color]-$base-color [box-shadow]-$shadow-2"></div> */}
					</div>
				</div>
			</div>
		</AriaSlider>
	</>
}

function SidebarContents() {
	const { selectedName } = useContext(FocusContext)!
	const { viewSource, setViewSource } = useContext(ViewSourceContext)!
	const { compact, setCompact } = useContext(CompactContext)!
	const { density, setDensity, size, setSize, strokeWidth, setStrokeWidth } = useContext(SliderContext)!

	//// const [hover, setHover] = useState(false)

	return <>
		{/* <div className="flex align-center h-64 [&_>_:nth-child(1)]:grow-1"> */}
		{false && <>
			<div className="flex align-center h-$search-bar-height">
				{false && <>
					<div className="flex align-center gap-8 h-20">
						{/* TODO: Change to <button> */}
						<Icon className="h-16 w-16 [color]-#333" icon={feather[selectedName]} />
						<TypeSans className="[&:hover]:[text-decoration]-underline">
							{selectedName}
						</TypeSans>
						{/* <Icon className="-ml-5 -mb-2 h-12 w-12 [color]-#333" icon={feather.ExternalLink} /> */}
					</div>
				</>}
				{/* <button className="px-16 flex flex-center gap-8 h-32 rounded-1e3 [background-color]-#333 [box-shadow]-$inset-shadow-2">
					<Icon className="h-16 w-16 [color]-#fff" icon={feather[selectedName]} strokeWidth={2.5} />
					<TypeInvertedCaps className="[overflow]-hidden [text-overflow]-ellipsis [white-space]-nowrap">
						{toKebabCase(selectedName).toUpperCase()}
					</TypeInvertedCaps>
				</button> */}
				{false && <>
					{/* Or put creation / updated date here? */}
					<Tooltip pos="end" text="RESET SETTINGS">
						{/* Use my-* for <Tooltip> */}
						{/* TODO */}
						{/* <button className="my-8 flex flex-center h-32 w-32 rounded-1e3 [background-color]-#eee [&:hover]:([background-color]-#fff [box-shadow]-$shadow-2)">
							<div className="h-16 w-16 rounded-1e3 [background-color]-#aaa"></div>
						</button> */}
						{/* TODO */}
						<div className="my-8">
							<button className="flex flex-center h-24 w-24 rounded-1e3 [background-color]-#eee">
								<Icon className="h-12 w-12 [color]-#444" icon={feather.RotateCcw} strokeWidth={2.5} />
							</button>
						</div>
					</Tooltip>
				</>}
			</div>
		</>}
		{/* <div className="flex">
			<button className="px-16 flex flex-center gap-8 h-32 rounded-1e3 [background-color]-#333 [box-shadow]-$inset-shadow-2">
				<Icon className="h-16 w-16 [color]-#fff" icon={feather[selectedName]} strokeWidth={2.5} />
				<TypeInvertedCaps className="[overflow]-hidden [text-overflow]-ellipsis [white-space]-nowrap">
					{toKebabCase(selectedName).toUpperCase()}
				</TypeInvertedCaps>
			</button>
		</div> */}
		<div className="relative">
			<div
				// Use -mt-* to invert gap-*
				className="flex flex-center aspect-1.25 rounded-32 [background-color]-#fff [box-shadow]-$shadow-2"
				style={/* hover ? */ {
					// https://30secondsofcode.org/css/s/polka-dot-pattern
					//// backgroundImage: "radial-gradient(hsl(0, 0%, 90%) 0%, transparent 10%), radial-gradient(hsl(0, 0%, 90%) 0%, transparent 10%)",
					backgroundImage: "radial-gradient(hsl(0, 0%, 90%) 8%, transparent 12%), radial-gradient(hsl(0, 0%, 90%) 8%, transparent 12%)",
					backgroundPosition: "center",
					backgroundRepeat: "repeat",
					backgroundSize: "16px 16px",
				} /* : undefined */}
				//// onMouseEnter={e => setHover(!!1)}
				//// onMouseLeave={e => setHover(!!0)}
			>
				<Icon className="h-64 w-64 [transform]-scale($scale) [stroke-width]-$stroke-width [color]-#333" icon={feather[selectedName]} />
			</div>
			{/* <div className="absolute tr-16 flex gap-10">
				<button className="px-16 flex flex-center gap-8 h-32 ~w-32 rounded-1e3 [background-color]-#fff [box-shadow]-$shadow-2">
					<Icon className="h-16 w-16 [color]-#fff" icon={feather.Star} fill="hsl(45, 100%, 60%)" stroke="hsl(45, 100%, 60%)" strokeWidth={2.5} />
					<TypeCaps>
						FAVORITE
					</TypeCaps>
				</button>
			</div> */}
			<div className="absolute b-16 x-16 grid grid-cols-2 gap-10">
				<button className="px-16 flex flex-center gap-8 h-32 rounded-1e3 [background-color]-$alt-trim-color [box-shadow]-$inset-shadow-2">
					<Icon className="h-16 w-16 [color]-#fff" icon={feather.Clipboard} strokeWidth={2.5} />
					{/* <div className="grow-1"></div> */}
					<div className="flex justify-center w-32">
						<TypeInvertedCaps>
							{/* COPY <span className="[font-family]-$code">{"<SVG>"}</span> */}
							COPY
						</TypeInvertedCaps>
					</div>
					{/* <div className="grow-1"></div> */}
				</button>
				<button className="px-16 flex flex-center gap-8 h-32 rounded-1e3 [background-color]-$trim-color [box-shadow]-$inset-shadow-2">
					<Icon className="h-16 w-16 [color]-#fff" icon={feather.DownloadCloud} strokeWidth={2.5} />
					{/* <div className="grow-1"></div> */}
					<div className="flex justify-center w-32">
						<TypeInvertedCaps>
							{/* COPY <span className="[font-family]-$code">{"<SVG>"}</span> */}
							SAVE
						</TypeInvertedCaps>
					</div>
					{/* <div className="grow-1"></div> */}
				</button>
			</div>
			<div className="absolute tl-16 flex gap-10">
				<button className="px-16 flex flex-center gap-8 h-32 rounded-1e3 [background-color]-#333 [box-shadow]-$inset-shadow-2">
					<Icon className="h-16 w-16 [color]-#fff" icon={feather[selectedName]} strokeWidth={2.5} />
					<TypeInvertedCaps className="[overflow]-hidden [text-overflow]-ellipsis [white-space]-nowrap">
						{toKebabCase(selectedName).toUpperCase()}
					</TypeInvertedCaps>
				</button>
			</div>
			{false && <>
				<div className="absolute b-16 x-16 grid grid-cols-2 gap-10">
					<button className="px-16 flex flex-center gap-8 h-32 rounded-1e3 [background-color]-$alt-trim-color [box-shadow]-$inset-shadow-2">
						<Icon className="h-16 w-16 [color]-#fff" icon={feather.Clipboard} strokeWidth={2.5} />
						<TypeInvertedCaps>
							{/* COPY <span className="[font-family]-$code">{"<SVG>"}</span> */}
							COPY
						</TypeInvertedCaps>
					</button>
					<button className="px-16 flex flex-center gap-8 h-32 rounded-1e3 [background-color]-$trim-color [box-shadow]-$inset-shadow-2">
						<Icon className="h-16 w-16 [color]-#fff" icon={feather.Save} strokeWidth={2.5} />
						<TypeInvertedCaps>
							{/* COPY <span className="[font-family]-$code">{"<SVG>"}</span> */}
							SAVE
						</TypeInvertedCaps>
					</button>
				{false && <>
					{/* Add w-32 */}
					<button className="px-16 flex flex-center gap-8 h-32 w-32 rounded-1e3 [background-color]-$trim-color [box-shadow]-$inset-shadow-2">
						<Icon className="h-16 w-16 [color]-#fff" icon={feather.ArrowDown} strokeWidth={2.5} />
						{/* <TypeInvertedCaps>
								DOWNLOAD
							</TypeInvertedCaps> */}
					</button>
				</>}
			</div>
			</>}
			{/* <div className="grid grid-cols-3 gap-10">
				<button className="px-12 flex flex-center gap-10 h-calc($sidebar-input-height_+_4px) rounded-1e3 [background-color]-#fff [box-shadow]-$shadow-2">
					<Icon className="h-18 w-18 [color]-#ffb13b" icon={SVGIcon} />
					<TypeCaps>
						SVG
					</TypeCaps>
				</button>
				<button className="px-12 flex flex-center gap-10 h-calc($sidebar-input-height_+_4px) rounded-1e3 [background-color]-#fff [box-shadow]-$shadow-2">
					<Icon className="h-18 w-18 [color]-#61dafb" icon={JSXIcon} />
					<TypeCaps>
						JSX
					</TypeCaps>
				</button>
				<button className="px-12 flex flex-center gap-10 h-calc($sidebar-input-height_+_4px) rounded-1e3 [background-color]-#fff [box-shadow]-$shadow-2">
					<Icon className="h-18 w-18 [color]-#3178c6" icon={TSXIcon} />
					<TypeCaps>
						TSX
					</TypeCaps>
				</button>
			</div> */}
			{/* <div className="flex gap-10">
				<button className="px-12 flex flex-center gap-10 h-32 rounded-1e3 [background-color]-$alt-trim-color [box-shadow]-$inset-shadow-2">
					<Icon className="h-16 w-16 [color]-#fff" icon={feather.Copy} strokeWidth={3} />
					<TypeInvertedCaps>
						COPY
					</TypeInvertedCaps>
				</button>
				<button className="px-12 flex flex-center gap-10 h-32 w-32 rounded-1e3 [background-color]-$trim-color [box-shadow]-$inset-shadow-2">
					<Icon className="h-16 w-16 [color]-#fff" icon={feather.DownloadCloud} strokeWidth={3} />
				</button>
			</div> */}
		</div>

		{/* <Checkbox checked={inspect} setChecked={setInspect}>
			<div>
				SVG
			</div>
		</Checkbox>
		<Checkbox checked={inspect} setChecked={setInspect}>
			<div>
				React
			</div>
		</Checkbox>
		<Checkbox checked={inspect} setChecked={setInspect}>
			<div>
				React TypeScript
			</div>
		</Checkbox>
		<Hairline /> */}

		{false && <>
			{/* <div className="grid grid-cols-2 gap-10"> */}
			<div className="flex flex-col gap-10">
				<button className="px-16 flex flex-center gap-8 h-32 rounded-1e3 [background-color]-$alt-trim-color [box-shadow]-$inset-shadow-2">
					<Icon className="h-16 w-16 [color]-#fff" icon={feather.Clipboard} strokeWidth={2.5} />
					{/* <div className="grow-1"></div> */}
					<div className="flex justify-center w-32">
						<TypeInvertedCaps>
							{/* COPY <span className="[font-family]-$code">{"<SVG>"}</span> */}
							COPY
						</TypeInvertedCaps>
					</div>
					{/* <div className="grow-1"></div> */}
				</button>
				<button className="px-16 flex flex-center gap-8 h-32 rounded-1e3 [background-color]-$trim-color [box-shadow]-$inset-shadow-2">
					<Icon className="h-16 w-16 [color]-#fff" icon={feather.DownloadCloud} strokeWidth={2.5} />
					{/* <div className="grow-1"></div> */}
					<div className="flex justify-center w-32">
						<TypeInvertedCaps>
							{/* COPY <span className="[font-family]-$code">{"<SVG>"}</span> */}
							SAVE
						</TypeInvertedCaps>
					</div>
					{/* <div className="grow-1"></div> */}
				</button>
			</div>
		</>}

		<Checkbox checked={viewSource} setChecked={setViewSource}>
			<TypeSans>
				View source
			</TypeSans>
		</Checkbox>
		<Hairline />
		<Checkbox checked={compact} setChecked={setCompact}>
			<TypeSans>
				Compact mode
			</TypeSans>
		</Checkbox>
		{/* <Hairline />
		<Label handleReset={e => setDensity(densityInitial)}>
			<TypeSans>
				Columns
			</TypeSans>
		</Label>
		<Slider min={densityMin} max={densityMax} step={densityStep} value={density} setValue={setDensity} /> */}
		<Hairline />
		<Label handleReset={e => setSize(sizeInitial)}>
			<TypeSans>
				Size
			</TypeSans>
		</Label>
		<Slider min={sizeMin} max={sizeMax} step={sizeStep} value={size} setValue={setSize} />
		<Hairline />
		<Label handleReset={e => setStrokeWidth(strokeWidthInitial)}>
			<TypeSans>
				Stroke width
			</TypeSans>
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
				<div className="flex flex-col gap-64">
					<SearchBar />
					<SearchResultsContents />
				</div>
				<div className="flex flex-col gap-20 w-384">
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

const ViewSourceContext =
	createContext<{
		viewSource:      boolean
		setViewSource:   Dispatch<SetStateAction<boolean>>
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
	const [viewSource, setViewSource] = useState(false)
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
				<ViewSourceContext.Provider value={useMemo(() => ({
					viewSource,
					setViewSource
				}), [viewSource])}>
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
				</ViewSourceContext.Provider>
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
