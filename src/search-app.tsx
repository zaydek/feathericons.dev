import "./search-app.scss"

import * as feather from "./data/react-feather@4.29.0"

//// import featherZip from "./data/feather@4.29.0.zip?url"

import {
	ButtonHTMLAttributes,
	Dispatch,
	Fragment,
	PropsWithChildren,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react"
import { AriaCheckbox } from "./aria/aria-checkbox"
import { AriaSlider } from "./aria/aria-slider"
import {
	sizeInitial,
	sizeMax,
	sizeMin,
	sizeStep,
	strokeWidthInitial,
	strokeWidthMax,
	strokeWidthMin,
	strokeWidthStep,
} from "./constants"
import { manifest } from "./data/react-feather-manifest@4.29.0"
import { JSXIcon, SVGIcon, TSXIcon } from "./icon-config"
import { toKebabCase } from "./lib/cases"
import { cx } from "./lib/cx"
import { download } from "./lib/download"
import { Icon, IconComponent } from "./lib/react/icon"
import { SearchContext, SelectedContext, SliderContext, StateProvider } from "./state"
import { Transition } from "./transition"
import { TypeCaps } from "./typography"

type Position = "start" | "center" | "end"

function Tooltip({
	pos,
	icon,
	text,
	children,
}: PropsWithChildren<{ pos: Position; icon?: IconComponent; text: ReactNode; data?: any }>) {
	const [hover, setHover] = useState(false)

	return (
		<>
			{/* Use flex flex-col to preserve width */}
			<div className="relative flex flex-col" onMouseEnter={e => setHover(true)} onMouseLeave={e => setHover(false)}>
				{children}
				<Transition
					when={hover}
					unmount="start"
					s1={{
						transform: pos === "center" ? "translateY(8px) translateX(-50%)" : "translateY(8px)",
						opacity: 0,
					}}
					s2={{
						transform: pos === "center" ? "translateY(0px) translateX(-50%)" : "translateY(0px)",
						opacity: 1,
					}}
					duration={100}
					ease={[0, 1, 1, 1]}
					delay={hover ? 10 : 0}
				>
					<div
						className={
							{
								start: cx("t-(100%_+_10px) l-0 pointer-events--none   absolute z-10"),
								center: cx("t-(100%_+_10px) l-50% pointer-events--none absolute z-10"),
								end: cx("t-(100%_+_10px) r-0 pointer-events--none   absolute z-10"),
							}[pos]
						}
					>
						<div className="align-center background-color--hsl(0,_0%,_99%) box-shadow--$shadow-6,_$raw-shadow-6 flex h-32 gap-8 rounded-12 px-12">
							{icon !== undefined && <Icon className="color--#333 h-16 w-16" icon={icon} />}
							<TypeCaps>{text}</TypeCaps>
						</div>
					</div>
				</Transition>
			</div>
		</>
	)
}

function SearchBarButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<>
			<button className="align-center h-$search-bar-height flex px-8" {...props}>
				<div className="center background-color--pink flex h-32 w-32 rounded-1e3">
					<div className="background-color--red h-16 w-16 rounded-1e3"></div>
				</div>
			</button>
		</>
	)
}

export function SearchBar() {
	const { setCompactMode, search, setSearch } = useContext(SearchContext)!

	const ref = useRef<HTMLInputElement | null>(null)

	return (
		<>
			<div className="align-center background-color--#fff box-shadow--$shadow-2 flex h-64 rounded-1e3 px-8 [&_>_:nth-child(2)]:grow">
				<Tooltip pos="start" text={<>SEARCH FEATHER</>}>
					<SearchBarButton onClick={e => ref.current!.select()} />
				</Tooltip>
				<input
					ref={ref}
					className="h-$search-bar-height px-8"
					type="text"
					value={search}
					onChange={e => setSearch(e.currentTarget.value)}
					//// onKeyDown={e => {
					//// 	if (e.key === "ArrowUp") {
					//// 		e.preventDefault()
					//// 		restoreSearch(-1)
					//// 	} else if (e.key === "ArrowDown") {
					//// 		e.preventDefault()
					//// 		restoreSearch(+1)
					//// 	}
					//// }}
					autoFocus
				/>
				<Tooltip pos="end" text={<>COMPACT MODE</>}>
					<SearchBarButton onClick={e => setCompactMode(curr => !curr)} />
				</Tooltip>
				{/* <Tooltip pos="end" text={<>TOGGLE THEME</>}>
				<SearchBarButton />
			</Tooltip> */}
			</div>
		</>
	)
}

//// function Wbr({ children }: { children: string }) {
//// 	const parts = children.split(/(?=[A-Z])/)
//// 	return <>
//// 		{parts.map((part, index) => <Fragment key={part}>
//// 			{index > 0 && <wbr />}
//// 			{part}
//// 		</Fragment>)}
//// 	</>
//// }

function Highlight({ indexes, children }: { indexes: readonly [number, number] | null; children: string }) {
	if (indexes === null) {
		return <>{children}</>
	} else {
		return (
			<>
				{children.slice(0, indexes[0])}
				<span className="color--#111 background-color--hsl(45,_100%,_50%,_0.5) -mx-2 rounded-2 p-2">
					{children.slice(indexes[0], indexes[1])}
				</span>
				{children.slice(indexes[1])}
			</>
		)
	}
}

export function SearchResultsContents() {
	const { compactMode, searchResults } = useContext(SearchContext)!
	const { setSelectedName, setSelectedSvgElement: setSelectedIcon } = useContext(SelectedContext)!

	return (
		<>
			<div className="grid-cols-repeat(auto-fill,_minmax(96px,_1fr)) grid">
				{compactMode ? (
					<>
						{Object.keys(searchResults).map(name => (
							<Fragment key={name}>
								<button
									className="flex flex-col"
									onClick={e => {
										setSelectedName(name as keyof typeof manifest)
										setSelectedIcon(document.getElementById(name)! as unknown as SVGSVGElement)
									}}
								>
									<Tooltip
										pos="center"
										icon={feather[name as keyof typeof feather]}
										text={toKebabCase(name).toUpperCase()}
									>
										<div className="center flex h-96">
											<Icon
												id={name}
												className="transform--scale($scale) stroke-width--$stroke-width color--#333 h-32 w-32"
												icon={feather[name as keyof typeof feather]}
											/>
										</div>
									</Tooltip>
								</button>
							</Fragment>
						))}
					</>
				) : (
					<>
						{Object.keys(searchResults).map(name => (
							<Fragment key={name}>
								<button
									className="flex flex-col"
									onClick={e => {
										setSelectedName(name as keyof typeof manifest)
										setSelectedIcon(document.getElementById(name)! as unknown as SVGSVGElement)
									}}
								>
									<div className="center flex h-96">
										<Icon
											id={name}
											className="transform--scale($scale) stroke-width--$stroke-width color--#333 h-32 w-32"
											icon={feather[name as keyof typeof feather]}
										/>
									</div>
									<div className="center -webkit-user-select--all user-select--all flex h-32 px-4">
										<div className="font--400_12px_/_normal_$sans overflow--hidden text-overflow--ellipsis white-space--nowrap color--#333">
											<Highlight indexes={searchResults[name as keyof typeof feather]!}>{name}</Highlight>
										</div>
									</div>
								</button>
							</Fragment>
						))}
					</>
				)}
			</div>
		</>
	)
}

function Hairline() {
	return <hr className="h-$hairline-height background-color--$hairline-color" />
}

function Checkbox({
	checked,
	setChecked,
	children,
}: PropsWithChildren<{ checked: boolean; setChecked: Dispatch<SetStateAction<boolean>> }>) {
	return (
		<>
			<AriaCheckbox
				className="align-center h-$sidebar-label-height flex justify-between"
				checked={checked}
				setChecked={setChecked}
			>
				{children}
				<div className="h-$sidebar-label-height flex flex-col justify-center">
					<Transition
						when={checked}
						s1={{ backgroundColor: "var(--hairline-color)" }}
						s2={{ backgroundColor: "var(--alt-trim-color)" }}
						duration={75}
						ease={[0, 1, 1, 1.25]}
					>
						<div className="align-center flex h-12 w-48 rounded-1e3">
							<Transition
								when={checked}
								s1={{ transform: "translateX(0%)" }}
								s2={{ transform: "translateX(50%)" }}
								duration={75}
								ease={[0, 1, 1, 1.25]}
							>
								<div className="h-$sidebar-input-height w-$sidebar-input-height background-color--#ffff box-shadow--$shadow-6 rounded-1e3"></div>
							</Transition>
						</div>
					</Transition>
				</div>
			</AriaCheckbox>
		</>
	)
}

function Slider(props: {
	min: number
	max: number
	step: number
	value: number
	setValue: Dispatch<SetStateAction<number>>
}) {
	const [track, setTrack] = useState<HTMLDivElement | null>(null)
	const [thumb, setThumb] = useState<HTMLDivElement | null>(null)

	return (
		<>
			<AriaSlider track={track} thumb={thumb} {...props}>
				<div className="px-8">
					<div ref={setTrack} className="h-$sidebar-label-height flex flex-col justify-center">
						<div className="align-center background-image--linear-gradient(to_right,_$alt-trim-color_calc($progress_*_100%),_$hairline-color_calc($progress_*_100%)) flex h-6 rounded-1e3">
							<div
								ref={setThumb}
								className="h-($sidebar-input-height_+_4px) w-($sidebar-input-height_+_4px) background-color--#fff box-shadow--$shadow-6 rounded-1e3"
							></div>
						</div>
					</div>
				</div>
			</AriaSlider>
		</>
	)
}

function FormatButton() {
	const { formatAs, setFormatAs } = useContext(SelectedContext)!

	const ref = useRef<HTMLDivElement | null>(null)
	const [show, setShow] = useState(false)

	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (ref.current === null) {
				return
			}
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
		<>
			<div className="relative flex flex-col">
				<div className="relative flex flex-col">
					<button
						className="center background-color--#fff box-shadow--$shadow-2 flex h-32 gap-8 rounded-12 px-16"
						onClick={e => setShow(curr => !curr)}
					>
						<Icon
							className={cx(
								`h-16 w-16  ${
									{
										svg: "color--$svg-color",
										jsx: "color--$jsx-color",
										tsx: "color--$tsx-color",
									}[formatAs]
								}`
							)}
							icon={
								{
									svg: SVGIcon,
									jsx: JSXIcon,
									tsx: TSXIcon,
								}[formatAs]
							}
							strokeWidth={2.5}
						/>
						<TypeCaps>
							FORMAT AS{" "}
							{
								{
									svg: "SVG",
									jsx: "REACT",
									tsx: "TS REACT",
								}[formatAs]
							}
						</TypeCaps>
						<div className="inset-r-0 absolute">
							<div className="center flex h-32 w-32 rounded-1e3">
								<Icon className="color--#555 h-16 w-16" icon={feather.ChevronDown} strokeWidth={2.5} />
							</div>
						</div>
					</button>
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
				>
					<div ref={ref} className="t-(100%_+_10px) r-0 absolute z-10">
						<div className="background-color--hsl(0,_0%,_99%) box-shadow--$shadow-6 flex flex-col rounded-12">
							<button
								className={cx(`align-center [&:hover]:background-color--hsl($base-h,_$base-s,_$base-l,_0.1) flex h-32 gap-8
								px-12 [&:first-child]:rounded-t-12
									[&:last-child]:rounded-b-12`)}
								onClick={e => {
									setFormatAs("svg")
									setShow(false)
								}}
							>
								<Icon className="color--$svg-color h-16 w-16" icon={SVGIcon} />
								<TypeCaps>SVG</TypeCaps>
							</button>
							<button
								className={cx(`align-center [&:hover]:background-color--hsl($base-h,_$base-s,_$base-l,_0.1) flex h-32 gap-8
								px-12 [&:first-child]:rounded-t-12
									[&:last-child]:rounded-b-12`)}
								onClick={e => {
									setFormatAs("jsx")
									setShow(false)
								}}
							>
								<Icon className="color--$jsx-color h-16 w-16" icon={JSXIcon} />
								<TypeCaps>REACT</TypeCaps>
							</button>
							<button
								className={cx(`align-center [&:hover]:background-color--hsl($base-h,_$base-s,_$base-l,_0.1) flex h-32 gap-8
								px-12 [&:first-child]:rounded-t-12
									[&:last-child]:rounded-b-12`)}
								onClick={e => {
									setFormatAs("tsx")
									setShow(false)
								}}
							>
								<Icon className="color--$tsx-color h-16 w-16" icon={TSXIcon} />
								<TypeCaps>TS REACT</TypeCaps>
							</button>
						</div>
					</div>
				</Transition>
			</div>
		</>
	)
}

function CopyButton({ onPointerUp, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	const [pressed, setPressed] = useState(false)

	useEffect(() => {
		if (!pressed) {
			return
		}
		const d = window.setTimeout(() => {
			setPressed(false)
		}, 500)
		return () => window.clearTimeout(d)
	}, [pressed])

	return (
		<>
			<button
				className={cx(`center background-color--#fff box-shadow--$shadow-2 [&:hover:active]:background-color--$alt-trim-color [&:hover:active_*]:color--#fff flex h-32 gap-8
				rounded-12 px-16`)}
				onPointerUp={e => {
					setPressed(true)
					onPointerUp?.(e)
				}}
				{...props}
			>
				<Icon
					className="color--$alt-trim-color h-16 w-16"
					icon={pressed ? feather.Check : feather.Clipboard}
					strokeWidth={pressed ? 3 : 2.5}
				/>
				<TypeCaps>COPY</TypeCaps>
			</button>
		</>
	)
}

function DownloadButton({ onPointerUp, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	const [pressed, setPressed] = useState(false)

	// TODO: Add esc button support
	useEffect(() => {
		if (!pressed) {
			return
		}
		const d = window.setTimeout(() => {
			setPressed(false)
		}, 500)
		return () => window.clearTimeout(d)
	}, [pressed])

	return (
		<>
			<button
				className={cx(`center background-color--#fff box-shadow--$shadow-2 [&:hover:active]:background-color--$alt-trim-color [&:hover:active_*]:color--#fff flex h-32 gap-8
				rounded-12 px-16`)}
				onPointerUp={e => {
					setPressed(true)
					onPointerUp?.(e)
				}}
				{...props}
			>
				<Icon
					className="color--$alt-trim-color h-16 w-16"
					icon={pressed ? feather.Check : feather.Download}
					strokeWidth={pressed ? 3 : 2.5}
				/>
				<TypeCaps>DOWNLOAD</TypeCaps>
			</button>
		</>
	)
}

export function SidebarContents() {
	const { selectedName, viewSource, setViewSource, formatAs, clipboard } = useContext(SelectedContext)!
	const { size, setSize, strokeWidth, setStrokeWidth } = useContext(SliderContext)!

	const [value, setValue] = useState(clipboard)

	useEffect(() => {
		setValue(clipboard)
	}, [clipboard])

	return (
		<>
			<Checkbox checked={viewSource} setChecked={setViewSource}>
				<div className="align-center flex gap-10">
					<div className="center rounded-43.75% background-color--hsl($base-h,_$base-s,_$base-l,_0.125) flex h-24 w-24">
						<Icon className="color--#333 h-12 w-12" icon={feather.Code} />
					</div>
					<TypeCaps>VIEW SOURCE</TypeCaps>
				</div>
			</Checkbox>
			{viewSource ? (
				<>
					<textarea
						className={cx(`
					background-color--#fff box-shadow--$shadow-2 white-space--pre font--400_14px_/_normal_$code

					font-feature-settings--'tnum'
					letter-spacing--null
					color--#333
					rounded-24
					p-24
				`)}
						value={value}
						onChange={e => setValue(e.currentTarget.value)}
						rows={clipboard.split("\n").length}
					/>
				</>
			) : (
				<>
					<div
						className="center aspect-1.5 background-color--#fff box-shadow--$shadow-2 flex rounded-24"
						style={
							viewSource
								? undefined
								: {
										// https://30secondsofcode.org/css/s/polka-dot-pattern
										backgroundImage:
											"radial-gradient(hsl(0, 0%, 75%) 0%, transparent 10%), radial-gradient(hsl(0, 0%, 75%) 0%, transparent 10%)",
										backgroundPosition: "center calc(320px / 2 - (32px + 10px + 32px) / 2)",
										backgroundSize: "calc(16px * var(--scale)) calc(16px * var(--scale))",
								  }
						}
					>
						<Icon
							className="transform--scale($scale) stroke-width--$stroke-width color--#111 h-64 w-64"
							icon={feather[selectedName]}
						/>
					</div>
				</>
			)}
			<div className="flex flex-col gap-10">
				<FormatButton />
				<div className="grid grid-cols-2 gap-10">
					<CopyButton
						onClick={async e => {
							await navigator.clipboard.writeText(clipboard)
						}}
					/>
					<DownloadButton
						onClick={e => {
							const filename = `${formatAs === "svg" ? toKebabCase(selectedName) : selectedName}.${formatAs}`
							const contents = clipboard + "\n"
							download(filename, contents)
						}}
					/>
				</div>
			</div>
			<Hairline />
			<div className="align-center h-$sidebar-label-height flex justify-between">
				<div className="align-center flex gap-10">
					{/* <Icon className="h-16 w-16 color--#ccc" icon={feather.Maximize2} /> */}
					<div className="center rounded-43.75% background-color--hsl($base-h,_$base-s,_$base-l,_0.125) flex h-24 w-24">
						<Icon className="color--#333 h-12 w-12" icon={feather.Maximize2} />
					</div>
					<TypeCaps>PREVIEW SIZE</TypeCaps>
				</div>
				<div className="align-center flex gap-8">
					<TypeCaps>{size} PX</TypeCaps>
					<button className="center flex" onClick={e => setSize(sizeInitial)}>
						<Icon
							className="color--#ccc [&:hover]:color--#333 h-16 w-16"
							icon={feather.RotateCcw}
							strokeWidth={2.5}
							onClick={e => setSize(sizeInitial)}
						/>
					</button>
				</div>
			</div>
			<Slider min={sizeMin} max={sizeMax} step={sizeStep} value={size} setValue={setSize} />
			<Hairline />
			<div className="align-center h-$sidebar-label-height flex justify-between">
				<div className="align-center flex gap-10">
					{/* <Icon className="h-16 w-16 color--#ccc" icon={feather.Minimize2} /> */}
					<div className="center rounded-43.75% background-color--hsl($base-h,_$base-s,_$base-l,_0.125) flex h-24 w-24">
						<Icon className="color--#333 h-12 w-12" icon={feather.Minimize2} />
					</div>
					<TypeCaps>PREVIEW STROKE WIDTH</TypeCaps>
				</div>
				<div className="align-center flex gap-8">
					<TypeCaps>{strokeWidth.toFixed(2)}</TypeCaps>
					<button className="center flex" onClick={e => setStrokeWidth(strokeWidthInitial)}>
						<Icon
							className="color--#ccc [&:hover]:color--#333 h-16 w-16"
							icon={feather.RotateCcw}
							strokeWidth={2.5}
							onClick={e => setStrokeWidth(strokeWidthInitial)}
						/>
					</button>
				</div>
			</div>
			<Slider
				min={strokeWidthMin}
				max={strokeWidthMax}
				step={strokeWidthStep}
				value={strokeWidth}
				setValue={setStrokeWidth}
			/>
		</>
	)
}

// TODO: DEPRECATE
function App() {
	return (
		<>
			{/* <a href={featherZip} download>
			Click me
		</a> */}
			<div className="flex justify-center p-32">
				<div className="flex-basis--2e3px flex gap-64 [&_>_:nth-child(1)]:grow">
					<div className="flex flex-col gap-64">
						<SearchBar />
						<SearchResultsContents />
					</div>
					<div className="flex w-384 flex-col gap-20">
						<SidebarContents />
					</div>
				</div>
			</div>
		</>
	)
}

export function ProvidedApp() {
	return (
		<>
			<StateProvider>
				<App />
			</StateProvider>
		</>
	)
}
