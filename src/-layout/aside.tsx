import * as feather from "../data/react-feather"

import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"
import { MouseEventHandler, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { IThemedToken } from "shiki-es"
import { Accessible } from "../aria/a11y"
import { AriaCheckbox, AriaCheckboxProps } from "../aria/aria-checkbox"
import { AriaSimpleDropDown, AriaSimpleDropDownItem, AriaSimpleDropDownItemProps } from "../aria/aria-simple-dropdown"
import { AriaSlider, AriaSliderProps } from "../aria/aria-slider"
import { Anchor } from "../components/anchor"
import { TypographyCaps, TypographyCode } from "../components/bindings"
import { DynamicIcon, Icon } from "../components/dynamic-icon"
import { ReactjsIcon, SvgIcon, TypeScriptIcon } from "../components/icon-config"
import { ResizableIcon } from "../components/resizable-icon"
import { FormatAs, sizeInitial, sizeMax, sizeMin, sizeStep, strokeWidthInitial, strokeWidthMax, strokeWidthMin, strokeWidthStep } from "../constants"
import { manifest } from "../data/manifest"
import { toKebabCase, toTitleCase } from "../lib/cases"
import { downloadText } from "../lib/download"
import { Mutable } from "../lib/types"
import { ShikiContext } from "../state/shiki"
import { SelectedContext, SliderContext } from "../state/state"

function TransformAnchor({ formatAs, children, ...props }: PropsWithChildren<{ formatAs: FormatAs }>) {
	if (formatAs === "svg") {
		const href = (children as string).slice("<!-- ".length, -1 * " -->".length)
		return (
			<>
				{"<!-- "}
				<Anchor className="underline" href={href} {...props}>
					{href}
				</Anchor>{" "}
				✨ {"--> "}
			</>
		)
	} else {
		const href = (children as string).slice("// ".length)
		return (
			<>
				{"// "}
				<Anchor className="underline" href={href} {...props}>
					{href}
				</Anchor>{" "}
				✨{" "}
			</>
		)
	}
}

// Because <Aside> is a shared component it's easier to access the name from the
// route instead of props
function useNameFromRouter() {
	let name: keyof typeof manifest | undefined = undefined
	const queryName = useRouter().query.name
	if (queryName !== undefined) {
		name = toTitleCase(queryName as string) as keyof typeof manifest
	}
	return name
}

function Preview() {
	const routeName = useNameFromRouter()
	const { selectedName } = useContext(SelectedContext)!
	const name = routeName ?? selectedName

	const { highlighter } = useContext(ShikiContext)!
	const { viewSource, formatAs, clipboard: code } = useContext(SelectedContext)!

	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)

	useEffect(() => {
		if (highlighter === null) { return } // prettier-ignore
		const tokens = highlighter.codeToThemedTokens(code, formatAs === "svg" ? "html" : "tsx", "github-light")
		setTokens(tokens)
	}, [code, formatAs, highlighter])

	return viewSource ? (
		<pre className="aspect-[1.5] overflow-auto rounded-24 bg-white shadow-[var(--shadow-2)]">
			<TypographyCode tag="code" className="inline-block py-24 text-gray-800">
				{tokens === null
					? code.split("\n").map((ys, y) => (
							<div key={y} className="px-24">
								{ys.length > 0 ? y === 0 ? <TransformAnchor formatAs={formatAs}>{ys}</TransformAnchor> : ys : <br />}
							</div>
					  ))
					: tokens.map((ys, y) => (
							<div key={y} className="px-24">
								{ys.length > 0 ? (
									ys.map(({ color, content }, x) => (
										<span key={x} style={{ color }}>
											{y === 0 ? <TransformAnchor formatAs={formatAs}>{content}</TransformAnchor> : content}
										</span>
									))
								) : (
									<br />
								)}
							</div>
					  ))}
			</TypographyCode>
		</pre>
	) : (
		<div className="flex aspect-[1.5] items-center justify-center rounded-24 bg-white shadow-[var(--shadow-2)]" data-background-dots>
			{/* <ResizableIcon className="h-64 w-64 text-gray-800" icon={feather[name]} /> */}
			<ResizableIcon className="h-64 w-64 text-gray-800" icon={feather[name]} />
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function DropDownItem({ id, children, ...props }: AriaSimpleDropDownItemProps<FormatAs>) {
	return (
		<AriaSimpleDropDownItem
			id={id}
			className="flex h-[var(--form-size)] items-center gap-8 px-16
				hover:bg-gray-100
				hover:active:bg-gray-200
				aria-selected:bg-gray-100"
			{...props}
		>
			{children}
		</AriaSimpleDropDownItem>
	)
}

function FormatButton() {
	const { formatAs, setFormatAs } = useContext(SelectedContext)!

	const ref = useRef<HTMLDivElement | null>(null)
	const [show, setShow] = useState(false)

	const [icon, desc] = useMemo(() => {
		return {
			svg: [SvgIcon, "SVG"] as const,
			jsx: [ReactjsIcon, "JSX"] as const,
			tsx: [TypeScriptIcon, "TSX"] as const,
		}[formatAs as Mutable<FormatAs>]
	}, [formatAs])

	return (
		<AriaSimpleDropDown<FormatAs>
			// Use cursor-pointer select-none because of synthetic aria component
			className="relative flex cursor-pointer select-none flex-col"
			show={show}
			setShow={setShow}
			currentId={formatAs}
			setCurrentId={setFormatAs}
			// prettier-ignore: aria-label
			aria-label="Click to format as SVG, JSX, or TSX"
		>
			<div className="relative flex flex-col">
				<div
					className="group/button flex h-[var(--form-size)] items-center justify-center rounded-1e3 bg-white shadow-[var(--shadow-2)]
						hover:active:bg-gray-200
						hover:active:shadow-[var(--inset-shadow-2)]"
				>
					<div className="-ml-[calc((var(--form-size)_-_16px)_/_2)] flex h-[var(--form-size)] w-[var(--form-size)] items-center justify-center">
						<DynamicIcon className="h-16 w-16 group-hover/button:group-active/button:text-white" icon={icon} />
					</div>
					<TypographyCaps className="text-gray-900">
						FORMAT AS <span className="inline-flex h-0 w-24">{desc}</span>
					</TypographyCaps>
				</div>
				<div className="pointer-events-none absolute top-0 right-0 bottom-0">
					<div className="flex h-[var(--form-size)] w-[calc(var(--form-size)_+_var(--form-size)_/_4)] items-center justify-center">
						<DynamicIcon className="h-16 w-16 text-gray-600" icon={feather.ChevronDown} />
					</div>
				</div>
			</div>
			<AnimatePresence>
				{show && (
					<motion.div
						initial={{
							y: -8,
							opacity: 0,
						}}
						animate={{
							y: 0,
							opacity: 1,
						}}
						exit={{
							y: -8,
							opacity: 0,
						}}
						transition={{
							duration: 0.1,
							ease: [0, 1, 1, 1],
						}}
						className="absolute top-[calc(100%_+_8px)] right-0 z-10"
					>
						<div ref={ref} className="flex flex-col overflow-hidden rounded-12 bg-white shadow-[var(--shadow-6),_var(--base-shadow-6)]">
							<DropDownItem
								id="svg"
								// prettier-ignore: aria-label
								aria-label="Format as SVG"
							>
								<DynamicIcon className="h-16 w-16" icon={SvgIcon} />
								<TypographyCaps className="text-gray-900">SVG</TypographyCaps>
							</DropDownItem>
							<DropDownItem
								id="jsx"
								// prettier-ignore: aria-label
								aria-label="Format as React"
							>
								<DynamicIcon className="h-16 w-16" icon={ReactjsIcon} />
								<TypographyCaps className="text-gray-900">REACT</TypographyCaps>
							</DropDownItem>
							<DropDownItem
								id="tsx"
								// prettier-ignore: aria-label
								aria-label="Format as TypeScript React"
							>
								<DynamicIcon className="h-16 w-16" icon={TypeScriptIcon} />
								<TypographyCaps className="text-gray-900">TS REACT</TypographyCaps>
							</DropDownItem>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</AriaSimpleDropDown>
	)
}

function ActionButton({ icon, onClick, children, ...props }: { icon: Icon } & Accessible<JSX.IntrinsicElements["button"]>) {
	const [click, setClick] = useState(false)

	useEffect(() => {
		if (!click) { return } // prettier-ignore
		const d = window.setTimeout(() => {
			setClick(false)
		}, 1e3)
		return () => window.clearTimeout(d)
	}, [click])

	return (
		<button
			className="group/button flex h-[var(--form-size)] items-center justify-center rounded-1e3 bg-white shadow-[var(--shadow-2)]
				hover:active:bg-[var(--theme-color)]
				hover:active:shadow-[var(--inset-shadow-2)]"
			onClick={e => {
				setClick(true)
				onClick?.(e)
			}}
			{...props}
		>
			<div className="-ml-[calc((var(--form-size)_-_16px)_/_2)] flex h-[var(--form-size)] w-[var(--form-size)] items-center justify-center">
				<DynamicIcon
					className="h-16 w-16 text-[var(--theme-color)] group-hover/button:group-active/button:text-white"
					icon={click ? feather.Check : icon}
					// Use a slightly thicker stroke when checked
					{...(click && { strokeWidth: 2.5 })}
				/>
			</div>
			<TypographyCaps className="text-gray-900 group-hover/button:group-active/button:text-white">{children}</TypographyCaps>
		</button>
	)
}

////////////////////////////////////////////////////////////////////////////////

function DecorativeIcon({ icon }: { icon: Icon }) {
	return (
		<div className="flex h-24 w-24 items-center justify-center rounded-1e3 bg-gray-200">
			<DynamicIcon className="h-12 w-12 text-gray-800" icon={icon} />
		</div>
	)
}

function CompoundCheckbox({ children, ...props }: AriaCheckboxProps) {
	return (
		// Use cursor-pointer select-none because of synthetic aria component
		<AriaCheckbox className="group/checkbox flex h-24 cursor-pointer select-none items-center justify-between" {...props}>
			{/* LHS */}
			<div className="flex items-center gap-8">
				<DecorativeIcon icon={feather.Code} />
				<TypographyCaps className="text-gray-900">{children}</TypographyCaps>
			</div>
			{/* RHS */}
			<div className="flex h-16 w-48 items-center rounded-1e3 bg-[var(--hairline-color)] group-aria-checked/checkbox:bg-[var(--theme-color)]">
				<motion.div
					animate={{ x: props.checked ? "50%" : 0 }}
					transition={{
						duration: 0.075,
						ease: [0, 1, 1, 1],
					}}
					className="h-[var(--reduced-form-size)] w-[var(--reduced-form-size)] rounded-1e3 bg-white shadow-[var(--shadow-6)]"
				></motion.div>
			</div>
		</AriaCheckbox>
	)
}

const sliderLinearGradientFromHell =
	"bg-[linear-gradient(to_right,_var(--theme-color)_calc(var(--progress,_0.5)_*_100%),_var(--hairline-color)_calc(var(--progress,_0.5)_*_100%))]"

function CompoundSlider({
	icon,
	resetHandler,
	children,
	...props
}: { icon: Icon } & { resetHandler: MouseEventHandler } & Omit<AriaSliderProps, "track" | "thumb">) {
	const [track, setTrack] = useState<HTMLDivElement | null>(null)
	const [thumb, setThumb] = useState<HTMLDivElement | null>(null)

	return (
		<>
			<div className="flex h-24 items-center justify-between">
				{/* LHS */}
				<div className="flex items-center gap-8">
					<DecorativeIcon icon={icon} />
					<TypographyCaps className="text-gray-900">{children}</TypographyCaps>
				</div>
				{/* RHS */}
				<div className="flex items-center gap-8">
					{/* prettier-ignore */}
					<TypographyCaps className="text-gray-900">
						{props.value < sizeMin
							? props.value.toFixed(2)
							: `${props.value} PX`}
					</TypographyCaps>
					<button
						className="flex h-24 w-24 items-center justify-center"
						onClick={resetHandler}
						// prettier-ignore: aria-label
						aria-label={`Reset ${props.value < sizeMin ? "stroke-width" : "size"}`}
					>
						<DynamicIcon className="h-16 w-16 text-gray-300 [button:hover_&]:text-gray-800" icon={feather.RotateCcw} />
					</button>
				</div>
			</div>
			<div className="px-12">
				{/* Use cursor-pointer select-none because of synthetic aria component */}
				<AriaSlider className="cursor-grab select-none hover:active:cursor-grabbing" track={track} thumb={thumb} {...props}>
					<div ref={setTrack} className="flex h-24 flex-col justify-center">
						<div className={`flex h-6 items-center rounded-1e3 ${sliderLinearGradientFromHell}`}>
							<div ref={setThumb} className="h-[var(--form-size)] w-[var(--form-size)] rounded-1e3 bg-white shadow-[var(--shadow-6)]"></div>
						</div>
					</div>
				</AriaSlider>
			</div>
		</>
	)
}

////////////////////////////////////////////////////////////////////////////////

function Section({ children, ...props }: JSX.IntrinsicElements["section"]) {
	return (
		<section className="flex flex-col gap-[var(--aside-gap)] px-[var(--aside-inset)]" {...props}>
			{children}
		</section>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function Aside() {
	const { selectedName, viewSource, setViewSource, formatAs, clipboard } = useContext(SelectedContext)!
	const { size, setSize, strokeWidth, setStrokeWidth } = useContext(SliderContext)!

	const handleClickCopy = useCallback(() => {
		async function fn() {
			await navigator.clipboard.writeText(clipboard)
		}
		fn()
	}, [clipboard])

	const handleClickDownload = useCallback(() => {
		const filename = `${formatAs === "svg" ? toKebabCase(selectedName).toLowerCase() : selectedName}.${formatAs}`
		const contents = clipboard + "\n"
		downloadText(filename, contents)
	}, [clipboard, formatAs, selectedName])

	return (
		<div className="flex flex-col gap-[var(--aside-gap)] py-[var(--aside-inset)]">
			<Section>
				<CompoundCheckbox
					checked={viewSource}
					setChecked={setViewSource}
					// prettier-ignore: aria-label
					aria-label="View source"
				>
					VIEW SOURCE
				</CompoundCheckbox>
			</Section>
			<Section>
				<Preview />
			</Section>
			<Section>
				<div className="flex flex-col gap-8">
					<FormatButton />
					<div className="grid grid-cols-2 gap-8">
						<ActionButton
							icon={feather.Clipboard}
							onClick={handleClickCopy}
							// prettier-ignore: aria-label
							aria-label={`Copy ${selectedName} as ${formatAs.toUpperCase()} to the clipboard`}
						>
							COPY
						</ActionButton>
						<ActionButton
							icon={feather.Download}
							onClick={handleClickDownload}
							// prettier-ignore: aria-label
							aria-label={`Download ${selectedName} as ${formatAs.toUpperCase()}`}
						>
							DOWNLOAD
						</ActionButton>
					</div>
				</div>
			</Section>
			<hr />
			<Section>
				<CompoundSlider
					icon={feather.Maximize2}
					min={sizeMin}
					max={sizeMax}
					step={sizeStep}
					value={size}
					setValue={setSize}
					resetHandler={e => setSize(sizeInitial)}
					// prettier-ignore: aria-label
					aria-label="Preview size"
				>
					PREVIEW SIZE
				</CompoundSlider>
			</Section>
			<hr />
			<Section>
				<CompoundSlider
					icon={feather.Minimize2}
					min={strokeWidthMin}
					max={strokeWidthMax}
					step={strokeWidthStep}
					value={strokeWidth}
					setValue={setStrokeWidth}
					resetHandler={e => setStrokeWidth(strokeWidthInitial)}
					// prettier-ignore: aria-label
					aria-label="Preview stroke-width"
				>
					PREVIEW STROKE WIDTH
				</CompoundSlider>
			</Section>
			<hr />
		</div>
	)
}
