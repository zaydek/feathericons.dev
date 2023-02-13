import { cx, iota } from "@/lib"
import { PropsWithChildren, useCallback } from "react"
import { Lang } from "shiki-es"

////////////////////////////////////////////////////////////////////////////////

export function Chip({ children }: PropsWithChildren) {
	return (
		// Use mx-* to optically center
		<div className="mx-8 h-[var(--chip-height)] rounded-1e3 bg-gray-200 px-[calc(var(--chip-height)_/_2)]">
			<div className="flex h-100% items-center">
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
			className={`h-[var(--form-symbol-size)] w-[var(--form-symbol-size)] rounded-1e3 ${checked
				? "bg-sky-400"
				: "bg-white shadow-[inset_0_0_0_1px_theme('colors.gray.300')]"
			}`}
		>
			{checked && (
				<div className="flex h-100% items-center justify-center">
					<div className="h-[var(--form-tick-symbol-size)] w-[var(--form-tick-symbol-size)] rounded-1e3 bg-white"></div>
				</div>
			)}
		</div>
	)
}

// Visual representation of a dropdown; stateless
function DropDownSymbol() {
	return (
		<div className="h-[var(--form-symbol-size)] w-[var(--form-symbol-size)]">
			<div className="flex h-100% items-center justify-center">
				<div className="h-[var(--form-tick-symbol-size)] w-[var(--form-tick-symbol-size)] rounded-1e3 bg-gray-700"></div>
			</div>
		</div>
	)
}

export function Checkbox({ checked = false, children }: PropsWithChildren<{ checked?: boolean }>) {
	return (
		<div className="flex h-[var(--form-height)] items-center rounded-1e3 shadow-[inset_0_0_0_1px_theme('colors.gray.300')]">
			<div className="flex grow items-center justify-between">
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
			</div>
		</div>
	)
}

export function DropDown({ children }: PropsWithChildren) {
	return (
		<div className="flex h-[var(--form-height)] items-center rounded-1e3 shadow-[inset_0_0_0_1px_theme('colors.gray.300')]">
			<div className="flex grow items-center justify-between">
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
			</div>
		</div>
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
		<div className="h-[var(--action-button-height)] rounded-1e3 bg-white shadow-[inset_0_0_0_1px_theme('colors.gray.300')]">
			<div className="flex items-center justify-center">
				<div>Copy</div>
				<div className="flex h-[var(--action-button-height)] w-[var(--action-button-height)] items-center justify-center">
					<div className="h-[var(--action-button-icon-size)] w-[var(--action-button-icon-size)] rounded-1e3 bg-gray-700"></div>
				</div>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function SliderLabel({ value, children }: PropsWithChildren<{ value: number }>) {
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

export function SliderInput() {
	return (
		// Use mx-* to optically center
		<div className="mx-20 flex h-[var(--slider-thumb-size)] flex-col justify-center">
			{/* Track */}
			<div className="slider-bg-image h-[var(--slider-track-height)] rounded-1e3">
				{/* <div className="flex h-100% items-center"> */}
				<div className="flex h-100% items-center justify-center">
					{/* Thumb */}
					<div className="h-[var(--slider-thumb-size)] w-[var(--slider-thumb-size)] rounded-1e3 bg-white shadow-[inset_0_0_0_1px_theme('colors.gray.300')]"></div>
				</div>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function Section({ gutter = true, children }: PropsWithChildren<{ gutter?: boolean }>) {
	return <section className={cx(`flex flex-col gap-[var(--sidebar-spacing)] ${gutter ? "mx-[var(--sidebar-spacing)]" : ""}`)}>{children}</section>
}

////////////////////////////////////////////////////////////////////////////////

function SearchTextField() {
	return (
		// Use h-100% for the ascending bounding box and flex for the descending
		// bounding box
		<div className="relative flex h-100%">
			{/* TODO */}
			<input type="text" />
			<div className="absolute inset-0">
				{/* Placeholder */}
				<div className="flex h-100% items-center">
					<div className="opacity-[62.5%]">
						For example: <span className="underline underline-offset-[3px]">netflix</span>, <span className="underline underline-offset-[3px]">chill</span>
						{"\u00a0".repeat(2)}
						(Hint: Use commas to search for more than one icon)
					</div>
				</div>
			</div>
		</div>
	)
}

export function SearchBar() {
	return (
		<div className="h-[var(--search-bar-height)] rounded-1e3 bg-white shadow-[inset_0_0_0_1px_theme('colors.gray.300')]">
			<div className="flex">
				{/* LHS */}
				<div className="flex h-[var(--search-bar-height)] w-[var(--search-bar-height)] items-center justify-center">
					<div className="h-[var(--search-bar-icon-size)] w-[var(--search-bar-icon-size)] rounded-1e3 bg-gray-700"></div>
				</div>
				{/* Text field */}
				<div className="grow">
					<SearchTextField />
				</div>
				{/* LHS */}
				<div className="flex h-[var(--search-bar-height)] w-[var(--search-bar-height)] items-center justify-center">
					<div className="h-[var(--search-bar-icon-size)] w-[var(--search-bar-icon-size)] rounded-1e3 bg-gray-700"></div>
				</div>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

// E.g. https://play.tailwindcss.com/AlKl7fvFY3
function SearchGridItem() {
	return (
		<button className="group/button flex justify-center">
			<div className="flex h-[var(--search-grid-item-size)] w-[var(--search-grid-item-size)] flex-col">
				{/* Icon */}
				<div className="flex grow items-center justify-center">
					<div
						// Use mb-* to optically center
						className="-mb-[calc(var(--search-grid-item-text-container-height))] h-[var(--search-grid-item-icon-size)] w-[var(--search-grid-item-icon-size)] rounded-1e3 bg-gray-700
							group-hover/button:group-active/button:bg-sky-400"
					></div>
				</div>
				{/* Text */}
				{/* TODO: Add a checkmark on click */}
				<div className="mx-16 flex h-[var(--search-grid-item-text-container-height)] items-center justify-center">
					<div
						className="truncate
							group-hover/button:group-active/button:text-sky-400"
					>
						Hello asdasd asd asdasd
					</div>
				</div>
			</div>
		</button>
	)
}

export function SearchGrid() {
	return (
		<div className="search-grid">
			{iota(300).map(index => (
				<SearchGridItem key={index} />
			))}
		</div>
	)
}
