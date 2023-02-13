import { iota } from "@/lib"
import { PropsWithChildren, useCallback } from "react"
import { Lang } from "shiki-es"

////////////////////////////////////////////////////////////////////////////////

export function Chip({ children }: PropsWithChildren) {
	return (
		// Use flex to ensure <Chip> never stretches
		<div className="flex px-8">
			<div className="flex h-[var(--chip-height)] items-center rounded-1e3 bg-gray-200 px-[calc(var(--chip-height)_/_2)]">
				<div>{children}</div>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

// Visual representation of a checkbox; stateless
function CheckboxSymbol({ checked = false }: { checked?: boolean }) {
	return (
		<div
			// prettier-ignore
			className={`flex h-[var(--form-symbol-size)] w-[var(--form-symbol-size)] items-center justify-center rounded-1e3 ${checked
				? "bg-sky-400"
				: "bg-white shadow-[inset_0_0_0_1px_theme('colors.gray.300')]"
			}`}
		>
			{checked && <div className="h-[var(--form-tick-symbol-size)] w-[var(--form-tick-symbol-size)] rounded-1e3 bg-white"></div>}
		</div>
	)
}

// Visual representation of a dropdown; stateless
function DropDownSymbol() {
	return (
		<div className="flex h-[var(--form-symbol-size)] w-[var(--form-symbol-size)] items-center justify-center">
			<div className="h-[var(--form-tick-symbol-size)] w-[var(--form-tick-symbol-size)] rounded-1e3 bg-gray-700"></div>
		</div>
	)
}

function FormElement({ children }: PropsWithChildren) {
	return (
		<div className="flex h-[var(--form-height)] items-center justify-between rounded-1e3 shadow-[inset_0_0_0_1px_theme('colors.gray.300')]">{children}</div>
	)
}

export function Checkbox({ checked = false, children }: PropsWithChildren<{ checked?: boolean }>) {
	return (
		<FormElement>
			{/* LHS */}
			<div className="flex items-center">
				<div className="flex h-[var(--form-height)] w-[var(--form-height)] items-center justify-center">
					<div className="h-[var(--form-icon-size)] w-[var(--form-icon-size)] rounded-1e3 bg-sky-400"></div>
				</div>
				<div>{children}</div>
			</div>
			{/* RHS */}
			<div className="flex h-[var(--form-height)] w-[var(--form-height)] items-center justify-center">
				<CheckboxSymbol checked={checked} />
			</div>
		</FormElement>
	)
}

export function DropDown({ children }: PropsWithChildren) {
	return (
		<FormElement>
			{/* LHS */}
			<div className="flex items-center">
				<div className="flex h-[var(--form-height)] w-[var(--form-height)] items-center justify-center">
					<div className="h-[var(--form-icon-size)] w-[var(--form-icon-size)] rounded-1e3 bg-sky-400"></div>
				</div>
				<div>{children}</div>
			</div>
			{/* RHS */}
			<div className="flex h-[var(--form-height)] w-[var(--form-height)] items-center justify-center">
				<DropDownSymbol />
			</div>
		</FormElement>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function SyntaxHighlighting({ language: _, children }: PropsWithChildren<{ language: Lang }>) {
	const lines = ((children + "\n") as string).split("\n")
	const linesCount = ("" + lines.length).length

	const getLineNumberFromIndex = useCallback(
		(index: number) => {
			const lineNumber = index + 1
			return ("" + lineNumber).padStart(linesCount, " ")
		},
		[linesCount]
	)

	return (
		<pre className="resize-y overflow-x-scroll">
			<code className="inline-block pr-[var(--sidebar-spacing)] leading-[1.5]">
				{lines.map((line, index) => (
					<div className="flex" key={index}>
						{/* It's not worth separating the card layer from the text so merge them here */}
						<div className="sticky left-0 select-none bg-white" style={{ width: linesCount + 2 + "ch" }}>
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

export function ActionButton() {
	return (
		<div className="flex h-[var(--action-button-height)] items-center justify-center rounded-1e3 bg-white shadow-[inset_0_0_0_1px_theme('colors.gray.300')]">
			<div>Copy</div>
			<div
				// Use -mr-* to trim negative space
				className="-mr-[calc((var(--action-button-height)_-_var(--action-button-icon-size))_/_2)]
					flex h-[var(--action-button-height)] w-[var(--action-button-height)] items-center justify-center"
			>
				<div className="h-[var(--action-button-icon-size)] w-[var(--action-button-icon-size)] rounded-1e3 bg-gray-700"></div>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function SliderLabel({ value, children }: PropsWithChildren<{ value: number }>) {
	return (
		<div className="flex items-center justify-between">
			<Chip>{children}</Chip>
			<div className="flex items-center">
				<code>{value < 10 ? value.toFixed(2) : `${value} PX`}</code>
				<div className="flex h-[var(--slider-label-height)] w-[var(--slider-label-height)] items-center justify-center">
					<div className="h-[var(--slider-reset-button-size)] w-[var(--slider-reset-button-size)] rounded-1e3 bg-gray-700"></div>
				</div>
			</div>
		</div>
	)
}

function SliderInput() {
	return (
		<div className="px-20">
			{/* Container */}
			<div className="flex h-[var(--slider-thumb-size)] flex-col justify-center">
				{/* Track */}
				<div className="css-slider-bg-image flex h-[var(--slider-track-height)] items-center justify-center rounded-1e3">
					{/* Thumb */}
					<div className="h-[var(--slider-thumb-size)] w-[var(--slider-thumb-size)] rounded-1e3 bg-white shadow-[inset_0_0_0_1px_theme('colors.gray.300')]"></div>
				</div>
			</div>
		</div>
	)
}

export function Slider({ value, children }: PropsWithChildren<{ value: number }>) {
	return (
		<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)]">
			<SliderLabel value={value}>{children}</SliderLabel>
			<SliderInput />
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function SearchBarButton() {
	return (
		<div className="flex h-[var(--search-bar-height)] w-[var(--search-bar-height)] items-center justify-center">
			<div className="h-[var(--search-bar-icon-size)] w-[var(--search-bar-icon-size)] rounded-1e3 bg-gray-700"></div>
		</div>
	)
}

export function SearchBar() {
	return (
		<nav className="flex h-[var(--search-bar-height)] rounded-1e3 bg-white shadow-[inset_0_0_0_1px_theme('colors.gray.300')]">
			{/* LHS */}
			<SearchBarButton />
			{/* Use flex to ensure <input> stretches */}
			<div className="relative flex grow">
				{/* CSS resets */}
				<input className="w-100% bg-transparent" type="text" />
				<div className="absolute inset-0 flex items-center">
					{/* Placeholder */}
					<div className="opacity-[62.5%]">
						For example: <span className="underline underline-offset-[3px]">netflix</span>, <span className="underline underline-offset-[3px]">chill</span>
						{"\u00a0".repeat(2)}
						(Hint: Use commas to search for more than one icon)
					</div>
				</div>
			</div>
			{/* RHS */}
			<SearchBarButton />
		</nav>
	)
}

////////////////////////////////////////////////////////////////////////////////

// TODO: Add checkmark interaction
//
// E.g. https://play.tailwindcss.com/AlKl7fvFY3
function SearchGridItem() {
	return (
		<button className="group flex justify-center">
			{/* NOTE: Using <button> here breaks truncate 🫠 */}
			<div className="flex h-[var(--search-grid-item-size)] w-[var(--search-grid-item-size)] flex-col">
				{/* Icon */}
				<div className="flex grow items-center justify-center">
					<div className="-mb-[calc(var(--search-grid-item-text-container-height)_/_2)] h-[var(--search-grid-item-icon-size)] w-[var(--search-grid-item-icon-size)] rounded-1e3 bg-gray-700 group-hover:group-active:bg-sky-400"></div>
				</div>
				{/* Text */}
				<div className="flex h-[var(--search-grid-item-text-container-height)] items-center justify-center px-16">
					<div className="truncate group-hover:group-active:text-sky-400">Hello, world! Hello, world!</div>
				</div>
			</div>
		</button>
	)
}

export function SearchGrid() {
	return (
		<div className="css-search-grid">
			{iota(300).map(index => (
				<SearchGridItem key={index} />
			))}
		</div>
	)
}
