import { iota } from "@/lib"
import { PropsWithChildren, ReactNode, useCallback, useState } from "react"
import { Lang } from "shiki-es"

////////////////////////////////////////////////////////////////////////////////
// Heading

// EXPORTED
export function Heading({ children }: PropsWithChildren) {
	// Use w-fit because of flex flex-col
	return <div className="ml-8 flex h-[var(--heading-height)] w-fit items-center rounded-1e3 bg-gray-200 px-[calc(var(--heading-height)_/_2)]">{children}</div>
}

////////////////////////////////////////////////////////////////////////////////
// Search bar

function SearchBarButton() {
	return <div className="m-[var(--search-bar-icon-negative-margin)] aspect-square h-[var(--search-bar-icon-height)] rounded-1e3 bg-gray-700"></div>
}

// EXPORTED
export function SearchBar() {
	return (
		<div className="flex h-[var(--search-bar-height)] rounded-1e3 bg-white shadow-[var(--inset-shadow)]">
			{/* LHS */}
			<SearchBarButton />
			{/* Merge relative grow */}
			<div className="relative grow">
				<input className="h-100% w-100% bg-transparent" type="text" />
				<div className="absolute inset-0 flex items-center">
					{/* Use a <div> because flex items-center breaks WS */}
					<div>
						Try: <span className="underline-offset-3 underline">netflix</span>, <span className="underline-offset-3 underline">chill</span>
					</div>
				</div>
			</div>
			{/* RHS */}
			<SearchBarButton />
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////
// Search grid

//// {/* NOTE: Using <button> here breaks truncate 🫠 */}
//// <div className="flex h-[var(--search-grid-item-height)] w-[var(--search-grid-item-height)] flex-col">
//// 	{/* Icon */}
//// 	<div className="flex grow items-center justify-center">
//// 		<div className="-mb-[calc(var(--search-grid-item-text-container-height)_/_2)] h-[var(--search-grid-item-icon-height)] w-[var(--search-grid-item-icon-height)] rounded-1e3 bg-gray-700 group-hover:group-active:bg-sky-400"></div>
//// 	</div>
//// 	{/* Text */}
//// 	<div className="flex h-[var(--search-grid-item-text-container-height)] items-center justify-center px-16">
//// 		<div className="truncate group-hover:group-active:text-sky-400">Hello, world! Hello, world!</div>
//// 	</div>
//// </div>

// E.g. https://play.tailwindcss.com/AlKl7fvFY3
function SearchGridItem() {
	return (
		// NOTE: Using <button> here breaks truncate 🫠
		<button className="group flex justify-center">
			{/* Use pt-0 to make icons appear more optically aligned */}
			<div className="flex aspect-square h-[var(--search-grid-item-height)] flex-col p-16 pt-0">
				<div className="flex grow items-center justify-center">
					<div className="aspect-square h-[var(--search-grid-item-icon-height)] rounded-1e3 bg-gray-700"></div>
				</div>
				<div className="truncate">Hello, world! Hello, world!</div>
			</div>
		</button>
	)
}

// EXPORTED
export function SearchGrid() {
	return (
		<div className="grid grid-cols-[repeat(auto-fill,_minmax(var(--search-grid-item-height),_1fr))]">
			{iota(300).map(index => (
				<SearchGridItem key={index} />
			))}
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////
// Form

// EXPORTED
export function Checkbox({ desc, children }: PropsWithChildren<{ desc: ReactNode[] }>) {
	return (
		<div className="flex flex-col gap-[var(--spacing-1)]">
			{/* Button */}
			<div className="flex h-[var(--form-height)] items-center justify-between rounded-1e3 bg-white shadow-[var(--inset-shadow)]">
				{/* LHS */}
				<div className="flex items-center">
					<div className="m-[var(--form-icon-negative-margin)] aspect-square h-[var(--form-icon-height)] rounded-1e3 bg-gray-700"></div>
					{children}
				</div>
				{/* RHS */}
				<div className="m-[var(--form-icon-negative-margin)] flex aspect-square h-[var(--form-icon-height)] items-center justify-center rounded-1e3 bg-gray-700">
					<div className="aspect-square h-[var(--form-sm-icon-height)] rounded-1e3 bg-white"></div>
				</div>
			</div>
			{/* Description */}
			<p className="ml-8 leading-[1.5]">{desc[0]}</p>
			<p className="ml-8 leading-[1.5]">{desc[1]}</p>
		</div>
	)
}

function DropdownItem({ children }: PropsWithChildren) {
	return (
		<>
			<hr className="first:hidden" />
			<div className="flex h-40 items-center">
				<div className="m-10 aspect-square h-20 rounded-1e3 bg-gray-700"></div>
				{children}
			</div>
		</>
	)
}

// EXPORTED
export function FormatDropdownButton() {
	const [show, setShow] = useState(false)

	return (
		<div className="relative">
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
			<div
				className="flex h-[var(--form-height)] items-center rounded-1e3 bg-white shadow-[var(--inset-shadow)]"
				onClick={e => setShow(curr => !curr)}
				onKeyDown={e => {
					if (e.key === " ") {
						setShow(curr => !curr)
					}
				}}
				// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
				tabIndex={0}
			>
				<div className="m-[var(--form-icon-negative-margin)] aspect-square h-[var(--form-icon-height)] rounded-1e3 bg-gray-700"></div>
				TypeScript React
				{/* Arrow */}
				<div className="m-[var(--form-sm-icon-negative-margin)] aspect-square h-[var(--form-sm-icon-height)] rounded-1e3 bg-gray-700"></div>
			</div>
			{show && (
				<div className="absolute top-[calc(100%_+_var(--spacing-1))] right-0">
					<div className="w-128 rounded-[calc(var(--lg-form-height)_/_2)] bg-white shadow-[var(--inset-shadow)]">
						<DropdownItem>SVG</DropdownItem>
						<DropdownItem>React JS</DropdownItem>
						<DropdownItem>React TSX</DropdownItem>
					</div>
				</div>
			)}
		</div>
	)
}

// EXPORTED
export function ActionDropdownButton() {
	const [show, setShow] = useState(false)

	return (
		<div className="relative">
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
			<div
				className="flex h-[var(--lg-form-height)] items-center justify-center rounded-1e3 bg-white shadow-[var(--inset-shadow)]"
				onClick={e => setShow(curr => !curr)}
				onKeyDown={e => {
					if (e.key === " ") {
						setShow(curr => !curr)
					}
				}}
				// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
				tabIndex={0}
			>
				<div>Copy</div>
				<div className="m-[var(--lg-form-icon-negative-margin)] mr-0 aspect-square h-[var(--lg-form-icon-height)] rounded-1e3 bg-gray-700"></div>
			</div>
			{/* Arrow */}
			{/* Use pointer-events-none because of absolute */}
			<div className="pointer-events-none absolute top-0 right-0 bottom-0">
				<div className="m-[var(--lg-form-sm-icon-negative-margin)] aspect-square h-[var(--lg-form-sm-icon-height)] rounded-1e3 bg-gray-700"></div>
			</div>
			{show && (
				<div className="absolute top-[calc(100%_+_12px)] right-0">
					<div className="w-128 rounded-[calc(var(--lg-form-height)_/_2)] bg-white shadow-[var(--inset-shadow)]">
						<DropdownItem>Copy</DropdownItem>
						<DropdownItem>Download</DropdownItem>
					</div>
				</div>
			)}
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////
// Syntax highlighting

// EXPORTED
export function SyntaxHighlighting({ lang: _, children }: PropsWithChildren<{ lang: Lang }>) {
	const lines = ((children + "\n") as string).split("\n")
	const lineCount = ("" + lines.length).length

	const getLineNumberFromIndex = useCallback(
		(index: number) => {
			const lineNumber = index + 1
			return ("" + lineNumber).padStart(lineCount, " ")
		},
		[lineCount],
	)

	return (
		<pre className="resize-y overflow-x-scroll">
			<code className="inline-block leading-[1.5]">
				{lines.map((line, index) => (
					<div className="flex" key={index}>
						<div className="sticky left-0 select-none bg-white" style={{ width: lineCount + 2 + "ch" }}>
							{getLineNumberFromIndex(index)}
						</div>
						{line}
					</div>
				))}
			</code>
		</pre>
	)
}

////////////////////////////////////////////////////////////////////////////////
// Slider

function SliderLabel({ value, children }: PropsWithChildren<{ value: number }>) {
	return (
		<div className="flex h-[var(--heading-height)] items-center justify-between">
			{/* LHS */}
			<Heading>{children}</Heading>
			{/* RHS */}
			<div className="flex items-center">
				<code>{value < 10 ? value.toFixed(2) : `${value} PX`}</code>
				<div className="m-[var(--slider-reset-button-negative-margin)] aspect-square h-[var(--slider-reset-button-height)] rounded-1e3 bg-gray-700"></div>
			</div>
		</div>
	)
}

function SliderInput() {
	return (
		<div className="mr-8 ml-12">
			<div className="flex h-[var(--slider-thumb-height)] flex-col justify-center">
				<div className="flex h-[var(--slider-track-height)] items-center justify-center rounded-1e3 bg-gray-300">
					<div className="aspect-square h-[var(--slider-thumb-height)] rounded-1e3 bg-white shadow-[var(--inset-shadow)]"></div>
				</div>
			</div>
		</div>
	)
}

// EXPORTED
export function Slider({ value, children }: PropsWithChildren<{ value: number }>) {
	return (
		<div className="flex flex-col gap-[var(--spacing-1)]">
			<SliderLabel value={value}>{children}</SliderLabel>
			<SliderInput />
		</div>
	)
}
