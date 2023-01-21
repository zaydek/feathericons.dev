import * as feather from "./data/react-feather@4.29.0"

import { PropsWithChildren, useEffect, useRef, useState } from "react"
import { JSXIcon, SVGIcon, TSXIcon } from "./icon-config"
import { cx } from "./lib/cx"
import { iota } from "./lib/iota"
import { createStyled } from "./lib/react/create-styled"
import { Icon, SVG } from "./lib/react/icon"
import { StateProvider } from "./state"
import { Transition } from "./transition"

////////////////////////////////////////////////////////////////////////////////

const TYPE_CAPS = "type-caps"

const TypeCaps = createStyled(TYPE_CAPS)

export function ThickIcon({
	svg,
	...props
}: { svg: SVG } & Exclude<JSX.IntrinsicElements["svg"], "strokeWidth">): JSX.Element {
	return <Icon svg={svg} strokeWidth={2.5} {...props} />
}

////////////////////////////////////////////////////////////////////////////////

function HoverTooltip({
	pos,
	icon,
	children,
}: /* prettier-ignore */ PropsWithChildren<{
	pos:   "start" | "center" | "end"
	icon?: SVG
}>) {
	const [hover, setHover] = useState(false)

	return (
		<div className="relative" onMouseEnter={e => setHover(true)} onMouseLeave={e => setHover(false)}>
			{children}
			<Transition
				when={hover}
				unmount="start"
				start={{
					// prettier-ignore
					transform: pos === "center"
						? "translateY(8px) translateX(-50%)"
						: "translateY(8px)",
					opacity: 0,
				}}
				end={{
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
							start:  cx("pointer-events-none absolute top-[calc(100%_+_10px)] left-0   z-10"),
							center: cx("pointer-events-none absolute top-[calc(100%_+_10px)] left-50% z-10"),
							end:    cx("pointer-events-none absolute top-[calc(100%_+_10px)] right-0  z-10"),
						}[pos]
					}
				>
					<div
						className="flex h-32 items-center gap-8 rounded-12 bg-white px-12
							[box-shadow:_var(--shadow-6),_var(--base-shadow-6)]"
					>
						{icon && <div className="h-16 w-16 rounded-1e3 bg-gray-500"></div>}
						<TypeCaps>ICON NAME</TypeCaps>
					</div>
				</div>
			</Transition>
		</div>
	)
}

function SearchBarButton() {
	return (
		<div className="flex h-64 w-64 items-center justify-center">
			<div className="flex h-32 w-32 items-center justify-center rounded-1e3 bg-red-500">
				<div className="h-16 w-16 rounded-1e3 bg-red-300"></div>
			</div>
		</div>
	)
}

function SearchBar() {
	return (
		<div className="flex h-64 items-center rounded-1e3 bg-white [box-shadow:_var(--shadow-2)] [&_>_:nth-child(2)]:grow">
			<HoverTooltip pos="start">
				<SearchBarButton />
			</HoverTooltip>
			<div className="flex h-64 items-center px-16">
				<div>Hello, world!</div>
			</div>
			<HoverTooltip pos="end">
				<SearchBarButton />
			</HoverTooltip>
		</div>
	)
}

function SearchGridItem() {
	return (
		<div className="flex flex-col">
			{/* <HoverTooltip pos="center"> */}
			<div className="flex h-96 items-center justify-center">
				<div className="h-32 w-32 rounded-1e3 bg-gray-500"></div>
			</div>
			{/* </HoverTooltip> */}
			{/* Use select-text here so users can easily copy-paste names */}
			<div className="flex h-20 select-text items-center justify-center px-4">
				<div className="truncate">Hello hello hello</div>
			</div>
		</div>
	)
}

function SearchGridContents() {
	return (
		<div className="grid grid-cols-[repeat(auto-fill,_minmax(96px,_1fr))]">
			{iota(100).map(index => (
				<SearchGridItem key={index} />
			))}
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function Preview() {
	return (
		<div className="flex aspect-[1.5] items-center justify-center rounded-24 bg-white [box-shadow:_var(--shadow-2)]">
			<div className="h-64 w-64 rounded-1e3 bg-red-500"></div>
		</div>
	)
}

function FormatButton() {
	const ref = useRef<HTMLDivElement | null>(null)
	const [show, setShow] = useState(false)

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
					className="flex h-36 items-center justify-center gap-8 rounded-1e3 bg-white px-16 [box-shadow:_var(--shadow-2)]"
					onClick={e => setShow(curr => !curr)}
				>
					<Icon className="h-16 w-16 text-[var(--svg-color)]" svg={SVGIcon} />
					<TypeCaps className="text-gray-700">FORMAT AS SVG</TypeCaps>
				</button>
				<div className="pointer-events-none absolute top-0 right-0 bottom-0">
					<div className="flex h-36 w-36 items-center justify-center">
						<ThickIcon className="h-16 w-16 text-gray-500" svg={feather.ChevronDown} />
					</div>
				</div>
			</div>
			<Transition
				when={show}
				unmount="start"
				start={{
					transform: "translateY(-8px)",
					opacity: 0,
				}}
				end={{
					transform: "translateY(0px)",
					opacity: 1,
				}}
				duration={100}
				ease={[0, 1, 1, 1]}
				delay={show ? 10 : 0}
			>
				<div className="absolute top-[calc(100%_+_10px)] right-0 z-10">
					<div
						ref={ref}
						className="flex flex-col rounded-12 bg-white [box-shadow:_var(--shadow-6),_var(--base-shadow-6)]"
					>
						<button
							className="flex h-32 items-center gap-8 px-12
								[&:hover]:bg-gray-100 [&:first-child]:rounded-t-12 [&:last-child]:rounded-b-12"
							onClick={e => setShow(false)}
						>
							<Icon className="h-16 w-16 rounded-1e3 text-[var(--svg-color)]" svg={SVGIcon} />
							<TypeCaps>SVG</TypeCaps>
						</button>
						<button
							className="flex h-32 items-center gap-8 px-12
								[&:hover]:bg-gray-100 [&:first-child]:rounded-t-12 [&:last-child]:rounded-b-12"
							onClick={e => setShow(false)}
						>
							<Icon className="h-16 w-16 rounded-1e3 text-[var(--jsx-color)]" svg={JSXIcon} />
							<TypeCaps>REACT</TypeCaps>
						</button>
						<button
							className="flex h-32 items-center gap-8 px-12
								[&:hover]:bg-gray-100 [&:first-child]:rounded-t-12 [&:last-child]:rounded-b-12"
							onClick={e => setShow(false)}
						>
							<Icon className="h-16 w-16 rounded-1e3 text-[var(--tsx-color)]" svg={TSXIcon} />
							<TypeCaps>TS REACT</TypeCaps>
						</button>
					</div>
				</div>
			</Transition>
		</div>
	)
}

function CopyButton({ icon, onClick, children, ...props }: { icon: SVG } & JSX.IntrinsicElements["button"]) {
	const [pressed, setPressed] = useState(false)

	useEffect(() => {
		if (!pressed) {
			return
		}
		const d = window.setTimeout(() => {
			setPressed(false)
		}, 1e3)
		return () => window.clearTimeout(d)
	}, [pressed])

	return (
		<button
			className="flex h-36 items-center justify-center gap-8 rounded-1e3 bg-white px-16 [box-shadow:_var(--shadow-2)]
				[&:hover:active]:bg-[var(--trim-color)] [&:hover:active]:[box-shadow:_var(--inset-shadow-2)]"
			onClick={e => {
				setPressed(true)
				onClick?.(e)
			}}
			{...props}
		>
			<ThickIcon
				className="h-16 w-16 text-[var(--trim-color)] [button:hover:active_&]:text-white"
				svg={pressed ? feather.Check : icon}
			/>
			<TypeCaps className="text-gray-700 [button:hover:active_&]:text-white">{children}</TypeCaps>
		</button>
	)
}

function DownloadButton({ icon, onClick, children, ...props }: { icon: SVG } & JSX.IntrinsicElements["button"]) {
	const [pressed, setPressed] = useState(false)

	useEffect(() => {
		if (!pressed) {
			return
		}
		const d = window.setTimeout(() => {
			setPressed(false)
		}, 1e3)
		return () => window.clearTimeout(d)
	}, [pressed])

	return (
		<button
			className="flex h-36 items-center justify-center gap-8 rounded-1e3 bg-white px-16 [box-shadow:_var(--shadow-2)]
				[&:hover:active]:bg-[var(--trim-color)] [&:hover:active]:[box-shadow:_var(--inset-shadow-2)]"
			onClick={e => {
				setPressed(true)
				onClick?.(e)
			}}
			{...props}
		>
			<ThickIcon
				className="h-16 w-16 text-[var(--trim-color)] [button:hover:active_&]:text-white"
				svg={pressed ? feather.Check : icon}
			/>
			<TypeCaps className="text-gray-700 [button:hover:active_&]:text-white">{children}</TypeCaps>
		</button>
	)
}

function Hairline() {
	return <hr className="h-1 bg-gray-200" />
}

function CheckboxField({ children }: PropsWithChildren) {
	return (
		<div className="flex h-20 items-center justify-between">
			{/* LHS */}
			<div className="flex items-center gap-8">
				<div className="flex h-24 w-24 items-center justify-center rounded-[43.75%] bg-gray-200">
					<ThickIcon className="h-12 w-12 text-gray-700" svg={feather.Code} />
				</div>
				<TypeCaps>{children}</TypeCaps>
			</div>
			{/* RHS */}
			<div className="flex h-12 w-48 items-center rounded-1e3 bg-[var(--trim-color)]">
				<div className="h-32 w-32 rounded-1e3 bg-white [box-shadow:_var(--shadow-6)]"></div>
			</div>
		</div>
	)
}

function SliderFieldFragment({ icon, children }: PropsWithChildren<{ icon: SVG }>) {
	return (
		<>
			<div className="flex h-20 items-center justify-between">
				{/* LHS */}
				<div className="flex items-center gap-8">
					<div className="flex h-24 w-24 items-center justify-center rounded-[43.75%] bg-gray-200">
						<ThickIcon className="h-12 w-12 text-gray-700" svg={icon} />
					</div>
					<TypeCaps>{children}</TypeCaps>
				</div>
				{/* RHS */}
				<div className="flex items-center gap-8">
					<TypeCaps>XX</TypeCaps>
					<ThickIcon className="h-16 w-16 text-gray-300" svg={feather.RotateCcw} />
				</div>
			</div>
			<div className="h-20 px-12">
				<div className="flex h-6 items-center justify-center rounded-1e3 bg-[linear-gradient(to_right,_var(--trim-color)_calc(var(--progress,_0.5)_*_100%),_var(--hairline-color)_calc(var(--progress,_0.5)_*_100%))]">
					<div className="h-36 w-36 rounded-1e3 bg-white [box-shadow:_var(--shadow-6)]"></div>
				</div>
			</div>
		</>
	)
}

function SidebarFragment() {
	return (
		<>
			<CheckboxField>VIEW SOURCE</CheckboxField>
			<Preview />
			<div className="flex flex-col gap-10">
				<FormatButton />
				<div className="grid grid-cols-2 gap-10">
					<CopyButton icon={feather.Clipboard}>COPY</CopyButton>
					<DownloadButton icon={feather.Download}>DOWNLOAD</DownloadButton>
				</div>
			</div>
			<Hairline />
			<SliderFieldFragment icon={feather.Maximize2}>PREVIEW SIZE</SliderFieldFragment>
			<Hairline />
			<SliderFieldFragment icon={feather.Minimize2}>PREVIEW STROKE WIDTH</SliderFieldFragment>
		</>
	)
}

////////////////////////////////////////////////////////////////////////////////

function App() {
	return (
		<div className="flex justify-center p-32">
			<div className="flex basis-1792 gap-32 [&_>_:nth-child(1)]:grow">
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

export function ProvidedApp() {
	return (
		<StateProvider>
			<App />
		</StateProvider>
	)
}
