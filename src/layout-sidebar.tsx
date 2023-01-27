import * as feather from "./data/react-feather"

import { Dispatch, MouseEventHandler, MutableRefObject, SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { IThemedToken } from "shiki-es"
import { AriaCheckbox, AriaCheckboxProps } from "./aria/aria-checkbox"
import { AriaSlider, AriaSliderProps } from "./aria/aria-slider"
import { sizeInitial, sizeMax, sizeMin, sizeStep, strokeWidthInitial, strokeWidthMax, strokeWidthMin, strokeWidthStep } from "./constants"
import { ReactJsIcon, ReactJsIconColor, SvgIcon, SvgIconColor, TypeScriptIcon, TypeScriptIconColor } from "./icon-config"
import { toKebabCase } from "./lib/cases"
import { download } from "./lib/download"
import { Icon, IconComponent } from "./lib/react/icon"
import { Hairline } from "./random"
import { ShikiContext } from "./shiki"
import { SelectedContext, SliderContext } from "./state"
import { Transition } from "./transition"
import { TypographyCaps } from "./typography"

function CommentLink({ formatAs, children }: { formatAs: "svg" | "jsx" | "tsx"; children: string }) {
	if (formatAs === "svg") {
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
	} else {
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
}

function IconPreview() {
	const { highlighter } = useContext(ShikiContext)!
	const { selectedName, viewSource, formatAs, clipboard: code } = useContext(SelectedContext)!

	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)

	useEffect(() => {
		if (highlighter === null) { return } // prettier-ignore
		const tokens = highlighter.codeToThemedTokens(code + "\n", formatAs === "svg" ? "html" : "tsx", "github-light")
		setTokens(tokens)
	}, [code, formatAs, highlighter])

	return viewSource ? (
		<pre className="min-h-256 overflow-auto rounded-24 bg-white text-gray-800 [box-shadow:_var(--shadow-2)]">
			<code className="inline-block py-24">
				{tokens === null
					? code.split("\n").map((ys, y) => (
							<div key={y} className="relative px-48 pr-24">
								<div className="absolute top-0 bottom-0 left-0 select-none">
									<div className="w-32 text-right text-gray-400">{y + 1}</div>
								</div>
								{ys || <br />}
							</div>
					  ))
					: tokens.map((ys, y) => (
							<div key={y} className="relative px-48 pr-24">
								<div className="absolute top-0 bottom-0 left-0 select-none">
									<div className="w-32 text-right text-gray-400">{y + 1}</div>
								</div>
								{ys.length > 0 ? (
									ys.map(({ color, content }, x) => (
										<span key={x} style={{ color }}>
											{y === 0 ? <CommentLink formatAs={formatAs}>{content}</CommentLink> : content}
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
		<div>
			<div className="flex h-256 items-center justify-center rounded-24 bg-white [box-shadow:_var(--shadow-2)]" data-bg-dots>
				<Icon
					className="h-64 w-64 text-gray-800
						[stroke-width:_var(--stroke-width)] [transform:_scale(var(--scale))]"
					icon={feather[selectedName]}
				/>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function useCancelable(ref: MutableRefObject<HTMLDivElement | null>, setShow: Dispatch<SetStateAction<boolean>>) {
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (ref.current === null) { return } // prettier-ignore
			if (!(e.target instanceof HTMLElement && ref.current.contains(e.target))) {
				setShow(false)
			}
		}
		window.addEventListener("click", handleClick, false)
		return () => window.removeEventListener("click", handleClick, false)
	}, [ref, setShow])

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setShow(false)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [setShow])

	return null
}

function DropDownItem({ children, ...props }: JSX.IntrinsicElements["button"]) {
	return (
		<button
			className="flex h-32 items-center gap-8 px-12
				first:rounded-t-12 last:rounded-b-12
					hover:bg-gray-100 hover:active:bg-gray-200"
			{...props}
		>
			{children}
		</button>
	)
}

function FormatButton() {
	const { formatAs, setFormatAs } = useContext(SelectedContext)!

	const ref = useRef<HTMLDivElement | null>(null)
	const [show, setShow] = useState(false)

	const [hex, icon, desc] = useMemo(() => {
		return {
			svg: [SvgIconColor, SvgIcon, "SVG"] as const,
			jsx: [ReactJsIconColor, ReactJsIcon, "REACT"] as const,
			tsx: [TypeScriptIconColor, TypeScriptIcon, "TS REACT"] as const,
		}[formatAs]
	}, [formatAs])

	useCancelable(ref, setShow)

	return (
		<div className="relative flex flex-col">
			{/* Button */}
			<div className="relative flex flex-col">
				<button
					className="group
						flex h-32 items-center justify-center gap-8 rounded-1e3 bg-white px-16 [box-shadow:_var(--shadow-2)]
							hover:active:bg-gray-200 hover:active:[box-shadow:_var(--inset-shadow-2)]"
					onClick={e => {
						setShow(curr => !curr)
					}}
					onKeyDown={e => {
						if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
							e.preventDefault()
							console.log("Hello, world!")
						} else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
							e.preventDefault()
							console.log("Hello, world!")
						}
					}}
					aria-label="Click to select formatting"
				>
					<Icon className="h-16 w-16" style={{ color: hex }} icon={icon} />
					<TypographyCaps className="text-gray-700">FORMAT AS {desc}</TypographyCaps>
				</button>
				{/* Arrow */}
				<div className="pointer-events-none absolute top-0 right-0 bottom-0">
					<div className="flex h-32 w-32 items-center justify-center">
						<Icon className="h-16 w-16 text-gray-500" icon={feather.ChevronDown} />
					</div>
				</div>
			</div>
			{/* Drop down */}
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
				<div className="absolute top-[calc(100%_+_8px)] right-0 z-10">
					<div ref={ref} className="flex flex-col rounded-12 bg-white [box-shadow:_var(--shadow-6),_var(--base-shadow-6)]">
						<DropDownItem
							onClick={e => {
								setFormatAs("svg")
								setShow(false)
							}}
							aria-label="SVG"
						>
							<Icon className="h-16 w-16" style={{ color: SvgIconColor }} icon={SvgIcon} />
							<TypographyCaps className="text-gray-700">SVG</TypographyCaps>
						</DropDownItem>
						<DropDownItem
							onClick={e => {
								setFormatAs("jsx")
								setShow(false)
							}}
							aria-label="React"
						>
							<Icon className="h-16 w-16" style={{ color: ReactJsIconColor }} icon={ReactJsIcon} />
							<TypographyCaps className="text-gray-700">REACT</TypographyCaps>
						</DropDownItem>
						<DropDownItem
							onClick={e => {
								setFormatAs("tsx")
								setShow(false)
							}}
							aria-label="TypeScript React"
						>
							<Icon className="h-16 w-16" style={{ color: TypeScriptIconColor }} icon={TypeScriptIcon} />
							<TypographyCaps className="text-gray-700">TS REACT</TypographyCaps>
						</DropDownItem>
					</div>
				</div>
			</Transition>
		</div>
	)
}

function ActionButton({ icon, onClick, children, ...props }: { icon: IconComponent } & JSX.IntrinsicElements["button"]) {
	const [pressed, setPressed] = useState(false)

	useEffect(() => {
		if (!pressed) { return } // prettier-ignore
		const d = window.setTimeout(() => {
			setPressed(false)
		}, 1e3)
		return () => window.clearTimeout(d)
	}, [pressed])

	return (
		<button
			className="group
				flex h-32 items-center justify-center gap-8 rounded-1e3 bg-white px-16 [box-shadow:_var(--shadow-2)]
					hover:active:bg-[var(--theme-color-cyan)] hover:active:[box-shadow:_var(--inset-shadow-2)]"
			onClick={e => {
				setPressed(true)
				onClick?.(e)
			}}
			{...props}
		>
			<Icon
				className="h-16 w-16 text-[var(--theme-color-cyan)]
					group-hover:group-active:text-white"
				icon={pressed ? feather.Check : icon}
			/>
			<TypographyCaps
				className="text-gray-700
					group-hover:group-active:text-white"
			>
				{children}
			</TypographyCaps>
		</button>
	)
}

////////////////////////////////////////////////////////////////////////////////

function DecorativeIcon({ icon }: { icon: IconComponent }) {
	return (
		<div className="flex h-24 w-24 items-center justify-center rounded-1e3 bg-gray-200/75">
			<Icon className="h-12 w-12 text-gray-700" icon={icon} />
		</div>
	)
}

function Checkbox({ children, ...props }: AriaCheckboxProps) {
	return (
		<AriaCheckbox className="flex h-24 items-center justify-between" {...props}>
			{/* LHS */}
			<div className="flex items-center gap-8">
				<DecorativeIcon icon={feather.Code} />
				<TypographyCaps className="text-gray-700">{children}</TypographyCaps>
			</div>
			{/* RHS */}
			{/* prettier-ignore */}
			<Transition
				when={props.checked}
				s1={{ backgroundColor: "var(--hairline-color)"   }}
				s2={{ backgroundColor: "var(--theme-color-cyan)" }}
				duration={100}
				ease={[0, 1, 1, 1]} // No bounce here
			>
				<div className="flex h-12 w-48 items-center rounded-1e3 bg-[var(--theme-color-cyan)]">
					{/* prettier-ignore */}
					<Transition
						when={props.checked}
						s1={{ transform: "translateX(0%)"  }}
						s2={{ transform: "translateX(50%)" }}
						duration={100}
						ease={[0, 1, 0.5, 1.25]} // Bounce here
					>
						<div className="h-36 w-36 rounded-1e3 bg-white [box-shadow:_var(--shadow-6)]"></div>
					</Transition>
				</div>
			</Transition>
		</AriaCheckbox>
	)
}

const linearGradientFromHell = "bg-[linear-gradient(to_right,_var(--theme-color-cyan)_calc(var(--progress,_0.5)_*_100%),_var(--hairline-color)_calc(var(--progress,_0.5)_*_100%))]"

function Slider({ icon, resetHandler, children, ...props }: { icon: IconComponent } & { resetHandler: MouseEventHandler } & Omit<AriaSliderProps, "track" | "thumb">) {
	const [track, setTrack] = useState<HTMLDivElement | null>(null)
	const [thumb, setThumb] = useState<HTMLDivElement | null>(null)

	return (
		<>
			<div className="flex h-24 items-center justify-between">
				{/* LHS */}
				<div className="flex items-center gap-8">
					<DecorativeIcon icon={icon} />
					<TypographyCaps className="text-gray-700">{children}</TypographyCaps>
				</div>
				{/* RHS */}
				<div className="flex items-center gap-8">
					{/* prettier-ignore */}
					<TypographyCaps className="text-gray-700">
						{props.value < sizeMin
							? props.value.toFixed(2)
							: `${props.value} PX`}
					</TypographyCaps>
					<button className="flex h-24 w-24 items-center justify-center" onClick={resetHandler}>
						<Icon className="h-16 w-16 text-gray-300 [button:hover_&]:text-gray-700" icon={feather.RotateCcw} />
					</button>
				</div>
			</div>
			<div className="px-12">
				<AriaSlider track={track} thumb={thumb} {...props}>
					<div ref={setTrack} className="flex h-24 flex-col justify-center">
						<div className={`flex h-6 items-center rounded-1e3 ${linearGradientFromHell}`}>
							<div ref={setThumb} className="h-36 w-36 rounded-1e3 bg-white [box-shadow:_var(--shadow-6)]" style={{ transform: "translateX(50%)" }}></div>
						</div>
					</div>
				</AriaSlider>
			</div>
		</>
	)
}

////////////////////////////////////////////////////////////////////////////////

function SectionWrapper({ children, ...props }: JSX.IntrinsicElements["section"]) {
	return (
		<section className="flex flex-col gap-16 px-24" {...props}>
			{children}
		</section>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function SidebarContents() {
	const { selectedName, viewSource, setViewSource, formatAs, clipboard } = useContext(SelectedContext)!
	const { size, setSize, strokeWidth, setStrokeWidth } = useContext(SliderContext)!

	const handleClickCopy = useCallback(() => {
		async function fn() {
			await navigator.clipboard.writeText(clipboard)
		}
		fn()
	}, [clipboard])

	const handleClickDownload = useCallback(() => {
		const filename = `${formatAs === "svg" ? toKebabCase(selectedName) : selectedName}.${formatAs}`
		const contents = clipboard + "\n"
		download(filename, contents)
	}, [clipboard, formatAs, selectedName])

	return (
		<div className="flex flex-col gap-16 py-24">
			<SectionWrapper>
				<Checkbox checked={viewSource} setChecked={setViewSource}>
					VIEW SOURCE FOR {toKebabCase(selectedName).toUpperCase()}
				</Checkbox>
			</SectionWrapper>
			<SectionWrapper>
				<IconPreview />
			</SectionWrapper>
			<SectionWrapper>
				<div className="flex flex-col gap-8">
					<FormatButton />
					<div className="grid grid-cols-2 gap-8">
						<ActionButton icon={feather.Clipboard} onClick={handleClickCopy} aria-label={`Copy ${selectedName} as ${formatAs.toUpperCase()} to the clipboard`}>
							COPY
						</ActionButton>
						<ActionButton icon={feather.Download} onClick={handleClickDownload} aria-label={`Download ${selectedName} as ${formatAs.toUpperCase()}`}>
							DOWNLOAD
						</ActionButton>
					</div>
				</div>
			</SectionWrapper>
			<Hairline />
			<SectionWrapper>
				{/* prettier-ignore */}
				<Slider
					icon={feather.Maximize2}
					min={sizeMin} max={sizeMax} step={sizeStep} value={size} setValue={setSize}
					resetHandler={e => setSize(sizeInitial)}
				>
					PREVIEW SIZE
				</Slider>
			</SectionWrapper>
			<Hairline />
			<SectionWrapper>
				{/* prettier-ignore */}
				<Slider
					icon={feather.Minimize2}
					min={strokeWidthMin} max={strokeWidthMax} step={strokeWidthStep} value={strokeWidth} setValue={setStrokeWidth}
					resetHandler={e => setStrokeWidth(strokeWidthInitial)}
				>
					PREVIEW STROKE WIDTH
				</Slider>
			</SectionWrapper>
		</div>
	)
}
