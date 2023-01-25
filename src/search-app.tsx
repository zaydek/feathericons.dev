import * as feather from "./data/react-feather"

import { memo, MouseEventHandler, PropsWithChildren, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react"
import { IThemedToken } from "shiki-es"
import { AriaCheckbox, AriaCheckboxProps } from "./aria/aria-checkbox"
import { AriaSlider, AriaSliderProps } from "./aria/aria-slider"
import { sizeInitial, sizeMax, sizeMin, sizeStep, strokeWidthInitial, strokeWidthMax, strokeWidthMin, strokeWidthStep } from "./constants"
import { manifest } from "./data/react-feather-manifest"
import { ReactJsIcon, ReactJsIconColor, SvgIcon, SvgIconColor, TypeScriptIcon, TypeScriptIconColor } from "./icon-config"
import { toKebabCase } from "./lib/cases"
import { cx } from "./lib/cx"
import { download } from "./lib/download"
import { Icon, IconComponent } from "./lib/react/icon"
import { ShikiContext } from "./shiki"
import { SearchContext, SelectedContext, SliderContext } from "./state"
import { Transition } from "./transition"
import { ThickIcon, TypographyCaps, TypographySmallSans } from "./typography"

function MouseTooltip({ pos, content, children }: /* prettier-ignore */ PropsWithChildren<{
	pos:     "start" | "center" | "end"
	content: ReactNode
}>) {
	const [hover, setHover] = useState(false)

	return (
		<div className="relative flex flex-col" onMouseEnter={e => setHover(true)} onMouseLeave={e => setHover(false)}>
			{children}
			<Transition
				when={hover}
				unmount="start"
				s1={{
					// prettier-ignore
					transform: pos === "center"
						? "translateY(8px) translateX(-50%)"
						: "translateY(8px)",
					opacity: 0,
				}}
				s2={{
					// prettier-ignore
					transform: pos === "center"
						? "translateY(0px) translateX(-50%)"
						: "translateY(0px)",
					opacity: 1,
				}}
				duration={100}
				ease={[0, 1, 1, 1]}
				delay={hover ? 10 : 0}
			>
				<div
					className={
						// prettier-ignore
						{
							start:  cx("pointer-events-none absolute top-[calc(100%_+_10px)] left-0     z-10"),
							center: cx("pointer-events-none absolute top-[calc(100%_+_10px)] left-[50%] z-10"),
							end:    cx("pointer-events-none absolute top-[calc(100%_+_10px)] right-0    z-10"),
						}[pos]
					}
				>
					<div className="flex h-32 items-center gap-10 rounded-12 bg-white px-12 [box-shadow:_var(--shadow-6),_var(--base-shadow-6)]">
						<TypographyCaps className="text-gray-700">{content}</TypographyCaps>
					</div>
				</div>
			</Transition>
		</div>
	)
}

function SearchBarButton({ icon, ...props }: { icon: IconComponent } & JSX.IntrinsicElements["button"]) {
	return (
		<button className="flex h-64 w-64 items-center justify-center" {...props}>
			<Icon className="h-24 w-24 text-gray-400" icon={icon} />
		</button>
	)
}

function SearchBar() {
	const { setCompactMode, search, setSearch } = useContext(SearchContext)!

	const ref = useRef<HTMLInputElement | null>(null)

	return (
		<div className="flex h-64 rounded-1e3 bg-white [box-shadow:_var(--shadow-2)] [&_>_:nth-child(2)]:grow">
			<MouseTooltip pos="start" content={<>SEARCH FEATHER</>}>
				<SearchBarButton
					icon={feather.Search}
					onClick={e => {
						ref.current?.focus()
					}}
					aria-label="Search Feather"
				/>
			</MouseTooltip>
			<input ref={ref} type="text" value={search} onChange={e => setSearch(e.currentTarget.value)} autoFocus />
			<MouseTooltip pos="end" content={<>COMPACT MODE</>}>
				<SearchBarButton
					icon={feather.MoreHorizontal}
					onClick={e => {
						setCompactMode(curr => !curr)
					}}
					aria-label="Toggle compact mode"
				/>
			</MouseTooltip>
		</div>
	)
}

//// function Wbr({ children }: { children: string }) {
//// 	const ws = children.split(/(?=[A-Z])/)
////
//// 	return (
//// 		<>
//// 			{ws.map((w, index) => (
//// 				<Fragment key={w}>
//// 					{index > 0 && <wbr />}
//// 					{w}
//// 				</Fragment>
//// 			))}
//// 		</>
//// 	)
//// }

function Highlight({ indexes, children }: { indexes: readonly [number, number] | null; children: string }) {
	if (indexes === null) {
		return <>{children}</>
	} else {
		return (
			<>
				{children.slice(0, indexes[0])}
				<span className="bg-amber-200 bg-opacity-60 text-amber-900">{children.slice(indexes[0], indexes[1])}</span>
				{children.slice(indexes[1])}
			</>
		)
	}
}

// TODO: It's not clear these need to be memoized, maybe if we add
// highlighting...
const Memo_CompactGridItem = memo(function CompactGridItem({ name }: { name: keyof typeof manifest }) {
	const { setSelectedName, setSelectedSvgElement } = useContext(SelectedContext)!

	return (
		<div className="flex flex-col">
			<MouseTooltip pos="center" content={<>{toKebabCase(name).toUpperCase()}</>}>
				<button
					className="flex h-112 items-center justify-center"
					onClick={e => {
						setSelectedName(name)
						setSelectedSvgElement(document.getElementById(name)! as Element as SVGSVGElement)
					}}
					aria-label={`Icon ${name}`}
				>
					<Icon id={name} className="h-32 w-32 text-gray-800 [stroke-width:_var(--stroke-width)] [transform:_scale(var(--scale))]" icon={feather[name]} />
				</button>
			</MouseTooltip>
		</div>
	)
})

// TODO: It's not clear these need to be memoized, maybe if we add
// highlighting...
const Memo_GridItem = memo(function GridItem({ name, indexes }: { name: keyof typeof manifest; indexes: readonly [number, number] | null }) {
	const { setSelectedName, setSelectedSvgElement } = useContext(SelectedContext)!

	return (
		<div className="flex flex-col">
			<button
				className="flex h-112 items-center justify-center"
				onClick={e => {
					setSelectedName(name)
					setSelectedSvgElement(document.getElementById(name)! as Element as SVGSVGElement)
				}}
				aria-label={`Icon ${name}`}
			>
				<Icon id={name} className="h-32 w-32 text-gray-800 [stroke-width:_var(--stroke-width)] [transform:_scale(var(--scale))]" icon={feather[name]} />
			</button>
			{/* Use select-all so users can copy-paste names. Note that select-text
			doesn't work as expected */}
			<div className="flex h-16 select-all items-center justify-center truncate px-4">
				<TypographySmallSans className="truncate text-gray-800">
					<Highlight indexes={indexes}>{name}</Highlight>
				</TypographySmallSans>
			</div>
			{/* <div className="flex h-40 items-center justify-center px-4">
				<div className="h-20 text-center [font:_400_12px_/_normal_var(--sans)]">
					<Wbr>{name}</Wbr>
				</div>
			</div> */}
		</div>
	)
})

function SearchGridContents() {
	const { compactMode, searchResults } = useContext(SearchContext)!

	const GridItem = useMemo(() => {
		if (compactMode) {
			return Memo_CompactGridItem
		} else {
			return Memo_GridItem
		}
	}, [compactMode])

	return (
		<div className="grid grid-cols-[repeat(auto-fill,_minmax(112px,_1fr))]">
			{Object.keys(searchResults).map(name => (
				<GridItem key={name} name={name as keyof typeof manifest} indexes={searchResults[name as keyof typeof manifest]!} />
			))}
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function HtmlCommentAnchor({ children }: { children: string }) {
	const href = children.slice("<!-- ".length, -1 * " -->".length)
	return (
		<>
			{"<!-- "}
			<a href={href} target="_blank" rel="noreferrer" className="underline">
				{href}
			</a>
			{"--> "}
		</>
	)
}

function NonHtmlCommentAnchor({ children }: { children: string }) {
	const href = children.slice("// ".length)
	return (
		<>
			{"// "}
			<a href={href} target="_blank" rel="noreferrer" className="underline">
				{href}
			</a>
		</>
	)
}

function CommentAnchor({ formatAs, children }: { formatAs: "svg" | "jsx" | "tsx"; children: string }) {
	// prettier-ignore
	return formatAs === "svg"
		? <HtmlCommentAnchor>{children}</HtmlCommentAnchor>
		: <NonHtmlCommentAnchor>{children}</NonHtmlCommentAnchor>
}

function IconPreview() {
	const { highlighter } = useContext(ShikiContext)!
	const { selectedName, viewSource, formatAs, clipboard: code } = useContext(SelectedContext)!

	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)

	useEffect(() => {
		if (highlighter === null) { return } // prettier-ignore
		const tokens = highlighter.codeToThemedTokens(code + "\n", formatAs === "svg" ? "html" : "tsx", "github-light", {
			includeExplanation: false,
		})
		setTokens(tokens)
	}, [code, formatAs, highlighter])

	return viewSource ? (
		<pre className="min-h-256 overflow-x-auto rounded-24 bg-white py-24 text-gray-800 [box-shadow:_var(--shadow-2)]">
			<code>
				{tokens === null
					? code.split("\n").map((ys, y) => (
							<div key={y} className="relative px-48">
								<div className="absolute top-0 bottom-0 left-0 select-none">
									<div className="w-32 text-right text-gray-400">{y + 1}</div>
								</div>
								{ys || <br />}
							</div>
					  ))
					: tokens.map((ys, y) => (
							<div key={y} className="relative px-48">
								<div className="absolute top-0 bottom-0 left-0 select-none">
									<div className="w-32 text-right text-gray-400">{y + 1}</div>
								</div>
								{ys.length > 0 ? (
									ys.map(({ color, content }, x) => (
										<span key={x} style={{ color }}>
											{y === 0 ? <CommentAnchor formatAs={formatAs}>{content}</CommentAnchor> : content}
										</span>
									))
								) : (
									<br />
								)}
							</div>
					  ))}
			</code>
		</pre>
	) : (
		<div className="dots-pattern flex h-256 items-center justify-center rounded-24 bg-white [box-shadow:_var(--shadow-2)]">
			<Icon className="h-64 w-64 text-gray-800 [stroke-width:_var(--stroke-width)] [transform:_scale(var(--scale))]" icon={feather[selectedName]} />
		</div>
	)
}

function FormatButton() {
	const { formatAs, setFormatAs } = useContext(SelectedContext)!

	const ref = useRef<HTMLDivElement | null>(null)
	const [show, setShow] = useState(false)

	const [color, svg, desc] = useMemo(() => {
		return {
			svg: [SvgIconColor, SvgIcon, "SVG"] as const,
			jsx: [ReactJsIconColor, ReactJsIcon, "REACT"] as const,
			tsx: [TypeScriptIconColor, TypeScriptIcon, "TYPESCRIPT REACT"] as const,
		}[formatAs]
	}, [formatAs])

	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (ref.current === null) { return } // prettier-ignore
			if (!(e.target instanceof HTMLElement && ref.current.contains(e.target))) {
				setShow(false)
			}
		}
		window.addEventListener("click", handleClick, false)
		return () => window.removeEventListener("click", handleClick, false)
	}, [])

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setShow(false)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [])

	return (
		<div className="relative flex flex-col">
			<div className="relative flex flex-col">
				<button
					className="flex h-36 items-center justify-center gap-10 rounded-1e3 bg-white px-16 [box-shadow:_var(--shadow-2)]
						[&:hover:active]:bg-gray-200"
					onClick={e => {
						setShow(curr => !curr)
					}}
					aria-label="Click to select formatting"
				>
					<Icon className="h-16 w-16" style={{ color }} icon={svg} />
					<TypographyCaps className="text-gray-700">FORMAT AS {desc}</TypographyCaps>
				</button>
				<div className="pointer-events-none absolute top-0 right-0 bottom-0">
					<div className="flex h-36 w-36 items-center justify-center">
						<ThickIcon className="h-16 w-16 text-gray-500" icon={feather.ChevronDown} />
					</div>
				</div>
			</div>
			<Transition
				when={show}
				unmount="start"
				s1={{
					transform: "translateY(-8px)",
					opacity: 0,
				}}
				s2={{
					transform: "translateY(0px)",
					opacity: 1,
				}}
				duration={100}
				ease={[0, 1, 1, 1]}
				delay={show ? 10 : 0}
			>
				<div className="absolute top-[calc(100%_+_10px)] right-0 z-10">
					<div ref={ref} className="flex flex-col rounded-12 bg-white [box-shadow:_var(--shadow-6),_var(--base-shadow-6)]">
						<button
							className="flex h-32 items-center gap-10 px-12
								[&:hover:active]:bg-gray-200 [&:hover]:bg-gray-100
									[&:first-child]:rounded-t-12 [&:last-child]:rounded-b-12"
							onClick={e => {
								setFormatAs("svg")
								setShow(false)
							}}
							aria-label="SVG"
						>
							<Icon className="h-16 w-16" style={{ color: SvgIconColor }} icon={SvgIcon} />
							<TypographyCaps className="text-gray-700">SVG</TypographyCaps>
						</button>
						<button
							className="flex h-32 items-center gap-10 px-12
								[&:hover:active]:bg-gray-200 [&:hover]:bg-gray-100
									[&:first-child]:rounded-t-12 [&:last-child]:rounded-b-12"
							onClick={e => {
								setFormatAs("jsx")
								setShow(false)
							}}
							aria-label="React"
						>
							<Icon className="h-16 w-16" style={{ color: ReactJsIconColor }} icon={ReactJsIcon} />
							<TypographyCaps className="text-gray-700">REACT</TypographyCaps>
						</button>
						<button
							className="flex h-32 items-center gap-10 px-12
								[&:hover:active]:bg-gray-200 [&:hover]:bg-gray-100
									[&:first-child]:rounded-t-12 [&:last-child]:rounded-b-12"
							onClick={e => {
								setFormatAs("tsx")
								setShow(false)
							}}
							aria-label="TypeScript React"
						>
							<Icon className="h-16 w-16" style={{ color: TypeScriptIconColor }} icon={TypeScriptIcon} />
							<TypographyCaps className="text-gray-700">TYPESCRIPT REACT</TypographyCaps>
						</button>
					</div>
				</div>
			</Transition>
		</div>
	)
}

function CopyButton({ icon, onClick, children, ...props }: { icon: IconComponent } & JSX.IntrinsicElements["button"]) {
	const { selectedName, formatAs } = useContext(SelectedContext)!

	const [copy, setCopy] = useState(false)

	useEffect(() => {
		if (!copy) { return } // prettier-ignore
		const d = window.setTimeout(() => {
			setCopy(false)
		}, 1e3)
		return () => window.clearTimeout(d)
	}, [copy])

	return (
		<button
			className="flex h-36 items-center justify-center gap-10 rounded-1e3 bg-white px-16 [box-shadow:_var(--shadow-2)]
				[&:hover:active]:bg-[var(--trim-color)] [&:hover:active]:[box-shadow:_var(--inset-shadow-2)]"
			onClick={e => {
				setCopy(true)
				onClick?.(e)
			}}
			aria-label={`Copy ${selectedName} as ${formatAs.toUpperCase()} to the clipboard`}
			{...props}
		>
			<ThickIcon className="h-16 w-16 text-[var(--trim-color)] [button:hover:active_&]:text-white" icon={copy ? feather.Check : icon} />
			<TypographyCaps className="text-gray-700 [button:hover:active_&]:text-white">{children}</TypographyCaps>
		</button>
	)
}

function DownloadButton({ icon, onClick, children, ...props }: { icon: IconComponent } & JSX.IntrinsicElements["button"]) {
	const { selectedName, formatAs } = useContext(SelectedContext)!

	const [pressed, setPressed] = useState(false)

	useEffect(() => {
		if (!pressed) {
			return
		}
		const d = window.setTimeout(() => {
			setPressed(false)
		}, 750)
		return () => window.clearTimeout(d)
	}, [pressed])

	return (
		<button
			className="flex h-36 items-center justify-center gap-10 rounded-1e3 bg-white px-16 [box-shadow:_var(--shadow-2)]
				[&:hover:active]:bg-[var(--trim-color)] [&:hover:active]:[box-shadow:_var(--inset-shadow-2)]"
			onClick={e => {
				setPressed(true)
				onClick?.(e)
			}}
			aria-label={`Download ${selectedName} as ${formatAs.toUpperCase()}`}
			{...props}
		>
			<ThickIcon className="h-16 w-16 text-[var(--trim-color)] [button:hover:active_&]:text-white" icon={pressed ? feather.Check : icon} />
			<TypographyCaps className="text-gray-700 [button:hover:active_&]:text-white">{children}</TypographyCaps>
		</button>
	)
}

function Hairline() {
	return <hr className="h-1 bg-gray-200" />
}

function CheckboxField({ children, ...props }: AriaCheckboxProps) {
	return (
		<AriaCheckbox {...props}>
			<div className="flex h-20 items-center justify-between">
				{/* LHS */}
				<div className="flex items-center gap-10">
					<div className="flex h-24 w-24 items-center justify-center rounded-[43.75%] bg-gray-100">
						<ThickIcon className="h-12 w-12 text-gray-700" icon={feather.Code} />
					</div>
					<TypographyCaps className="text-gray-700">{children}</TypographyCaps>
				</div>
				{/* RHS */}
				{/* prettier-ignore */}
				<Transition
					when={props.checked}
					s1={{ backgroundColor: "var(--hairline-color)" }}
					s2={{ backgroundColor: "var(--trim-color)"     }}
					duration={100}
					ease={[0, 1, 1, 1]} // No bounce here
				>
					<div className="flex h-12 w-48 items-center rounded-1e3 bg-[var(--trim-color)]">
						{/* prettier-ignore */}
						<Transition
							when={props.checked}
							s1={{ transform: "translateX(0%)"  }}
							s2={{ transform: "translateX(50%)" }}
							duration={100}
							ease={[0, 1, 0.5, 1.25]}
						>
							<div className="h-32 w-32 rounded-1e3 bg-white [box-shadow:_var(--shadow-6)]"></div>
						</Transition>
					</div>
				</Transition>
			</div>
		</AriaCheckbox>
	)
}

function SliderFieldFragment({ icon, reset, children, ...props }: { icon: IconComponent } & { reset: MouseEventHandler } & Omit<AriaSliderProps, "track" | "thumb">) {
	const [track, setTrack] = useState<HTMLDivElement | null>(null)
	const [thumb, setThumb] = useState<HTMLDivElement | null>(null)

	return (
		<>
			<div className="flex h-20 items-center justify-between">
				{/* LHS */}
				<div className="flex items-center gap-10">
					<div className="flex h-24 w-24 items-center justify-center rounded-[43.75%] bg-gray-100">
						<ThickIcon className="h-12 w-12 text-gray-700" icon={icon} />
					</div>
					<TypographyCaps className="text-gray-700">{children}</TypographyCaps>
				</div>
				{/* RHS */}
				<div className="flex items-center gap-10">
					{/* prettier-ignore */}
					<TypographyCaps className="text-gray-700">
						{props.value < sizeMin
							? props.value.toFixed(2)
							: `${props.value} PX`}
					</TypographyCaps>
					{/* TODO: Add aria-label here */}
					<button className="flex h-24 w-24 items-center justify-center" onClick={reset}>
						<ThickIcon className="h-16 w-16 text-gray-300 [button:hover_&]:text-gray-700" icon={feather.RotateCcw} />
					</button>
				</div>
			</div>
			<div className="px-12">
				<AriaSlider track={track} thumb={thumb} {...props}>
					<div ref={setTrack} className="flex h-20 flex-col justify-center">
						<div
							className="flex h-6 items-center rounded-1e3
								bg-[linear-gradient(to_right,_var(--trim-color)_calc(var(--progress,_0.5)_*_100%),_var(--hairline-color)_calc(var(--progress,_0.5)_*_100%))]"
						>
							<div ref={setThumb} className="h-36 w-36 rounded-1e3 bg-white [box-shadow:_var(--shadow-6)]"></div>
						</div>
					</div>
				</AriaSlider>
			</div>
		</>
	)
}

function SidebarFragment() {
	const { selectedName, viewSource, setViewSource, formatAs, clipboard } = useContext(SelectedContext)!
	const { size, setSize, strokeWidth, setStrokeWidth } = useContext(SliderContext)!

	return (
		<>
			<CheckboxField checked={viewSource} setChecked={setViewSource}>
				VIEW SOURCE
			</CheckboxField>
			<IconPreview />
			<div className="flex flex-col gap-10">
				<FormatButton />
				<div className="grid grid-cols-2 gap-10">
					<CopyButton
						icon={feather.Clipboard}
						onClick={async e => {
							await navigator.clipboard.writeText(clipboard)
						}}
					>
						COPY
					</CopyButton>
					<DownloadButton
						icon={feather.Download}
						onClick={e => {
							const filename = `${formatAs === "svg" ? toKebabCase(selectedName) : selectedName}.${formatAs}`
							const contents = clipboard + "\n"
							download(filename, contents)
						}}
					>
						DOWNLOAD
					</DownloadButton>
				</div>
			</div>
			<Hairline />
			{/* prettier-ignore */}
			<SliderFieldFragment
				icon={feather.Maximize2}
				min={sizeMin} max={sizeMax} step={sizeStep} value={size} setValue={setSize}
				reset={e => setSize(sizeInitial)}
			>
				PREVIEW SIZE
			</SliderFieldFragment>
			<Hairline />
			{/* prettier-ignore */}
			<SliderFieldFragment
				icon={feather.Minimize2}
				min={strokeWidthMin} max={strokeWidthMax} step={strokeWidthStep} value={strokeWidth} setValue={setStrokeWidth}
				reset={e => setStrokeWidth(strokeWidthInitial)}
			>
				PREVIEW STROKE WIDTH
			</SliderFieldFragment>
		</>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function SearchApp() {
	return (
		<div className="flex justify-center p-32">
			<div className="flex basis-2e3 gap-64 [&_>_:nth-child(1)]:grow">
				<main className="flex flex-col gap-64">
					<SearchBar />
					<SearchGridContents />
				</main>
				<aside className="flex w-384 flex-col gap-20">
					<SidebarFragment />
				</aside>
			</div>
		</div>
	)
}
