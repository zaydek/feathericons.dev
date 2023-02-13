import { cx, iota } from "@/lib"
import { createElement, CSSProperties, PropsWithChildren, useCallback } from "react"
import { Lang } from "shiki-es"

////////////////////////////////////////////////////////////////////////////////
// Gray chip

const _grayChipVars = {
	"--gray-chip-height": "24px",
} as CSSProperties

export function GrayChip({ children }: PropsWithChildren) {
	return (
		<div className="h-[var(--gray-chip-height)] rounded-1e3 bg-gray-200 px-[calc(var(--gray-chip-height)_/_2)]" style={_grayChipVars}>
			<div className="flex h-100% items-center">
				{/* TODO: Use leading-[normal] here because 13px is an odd number? */}
				<div className="text-[13px] leading-[normal]">{children}</div>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////
// Inputs

const _checkboxIndicatorVars = {
	"--checkbox-size": "var(--generic-input-icon-height)",
	"--checkbox-check-size": "8px",
} as CSSProperties

// Visual representation of a checkbox, stateless
function CheckboxIndicator({ checked = false }: { checked?: boolean }) {
	return (
		<div
			className={`h-[var(--checkbox-size)] w-[var(--checkbox-size)] rounded-1e3 ${
				checked ? "bg-blue-500" : "bg-white shadow-[0_0_0_1px_theme('colors.gray.300')]"
			}`}
			style={_checkboxIndicatorVars}
		>
			{checked && (
				<div className="flex h-100% items-center justify-center">
					<div className="h-[var(--checkbox-check-size)] w-[var(--checkbox-check-size)] rounded-1e3 bg-white"></div>
				</div>
			)}
		</div>
	)
}

const _dropDownVars = {
	"--dropdown-size": "24px",
	"--dropdown-arrow-size": "8px",
} as CSSProperties

// Visual representation of a dropdown, stateless
function DropDownIndicator() {
	return (
		<div className="h-[var(--dropdown-size)] w-[var(--dropdown-size)]" style={_dropDownVars}>
			<div className="flex h-100% items-center justify-center">
				<div className="h-[var(--dropdown-arrow-size)] w-[var(--dropdown-arrow-size)] rounded-1e3 bg-gray-700"></div>
			</div>
		</div>
	)
}

// Use globalVars
//// const _genericInputVars = {
//// 	"--generic-input-height": "32px",
//// 	"--generic-input-icon-height": "24px",
//// } as CSSProperties

function GenericInput({ children }: PropsWithChildren) {
	return <div className="flex h-[var(--generic-input-height)] items-center rounded-1e3 shadow-[0_0_0_1px_theme('colors.gray.300')]">{children}</div>
}

// State goes here
export function Checkbox({ checked = false, children }: PropsWithChildren<{ checked?: boolean }>) {
	return (
		<GenericInput>
			<div className="flex grow items-center justify-between">
				{/* LHS */}
				<div className="flex items-center">
					<div className="flex h-[var(--generic-input-height)] w-[var(--generic-input-height)] items-center justify-center">
						<div className="h-[var(--generic-input-icon-height)] w-[var(--generic-input-icon-height)] rounded-1e3 bg-blue-500"></div>
					</div>
					<div>{children}</div>
				</div>
				{/* RHS */}
				<div className="flex h-[var(--generic-input-height)] w-[var(--generic-input-height)] items-center justify-center">
					<CheckboxIndicator checked={checked} />
				</div>
			</div>
		</GenericInput>
	)
}

// State goes here
export function DropDown({ children }: PropsWithChildren) {
	return (
		<GenericInput>
			<div className="flex grow items-center justify-between">
				{/* LHS */}
				<div className="flex items-center">
					<div className="flex h-[var(--generic-input-height)] w-[var(--generic-input-height)] items-center justify-center">
						<div className="h-[var(--generic-input-icon-height)] w-[var(--generic-input-icon-height)] rounded-1e3 bg-blue-500"></div>
					</div>
					<div>{children}</div>
				</div>
				{/* RHS */}
				<div className="flex h-[var(--generic-input-height)] w-[var(--generic-input-height)] items-center justify-center">
					<DropDownIndicator />
				</div>
			</div>
		</GenericInput>
	)
}

////////////////////////////////////////////////////////////////////////////////
// Syntax highlighting

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
			<code className="inline-block pr-[var(--sidebar-spacing)]">
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
// Action button

const _actionButtonVars = {
	"--action-button-height": "36px",
	"--action-button-icon-size": "16px",
} as CSSProperties

export function ActionButton() {
	return (
		<div className="h-[var(--action-button-height)] rounded-1e3 bg-white shadow-[0_0_0_1px_theme('colors.gray.300')]" style={_actionButtonVars}>
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
// Slider

const _sliderLabelVars = {
	"--slider-label-height": "32px",
	"--slider-reset-button-size": "16px",
} as CSSProperties

export function SliderLabel({ value, children }: PropsWithChildren<{ value: number }>) {
	return (
		<div className="flex items-center justify-between" style={_sliderLabelVars}>
			<GrayChip>{children}</GrayChip>
			<div className="flex items-center">
				<code>{value < 10 ? value.toFixed(2) : `${value} PX`}</code>
				<div className="flex h-[var(--slider-label-height)] w-[var(--slider-label-height)] items-center justify-center">
					<div className="h-[var(--slider-reset-button-size)] w-[var(--slider-reset-button-size)] rounded-1e3 bg-gray-700"></div>
				</div>
			</div>
		</div>
	)
}

const _sliderInputVars = {
	"--slider-track-height": "6px",
	"--slider-thumb-size": "32px",
} as CSSProperties

export function SliderInput() {
	return (
		<div className="flex h-[var(--slider-thumb-size)] flex-col justify-center" style={_sliderInputVars}>
			{/* Track */}
			<div className="css-slider-background-image h-[var(--slider-track-height)] rounded-1e3">
				{/* <div className="flex h-100% items-center"> */}
				<div className="flex h-100% items-center justify-center">
					{/* Thumb */}
					<div className="h-[var(--slider-thumb-size)] w-[var(--slider-thumb-size)] rounded-1e3 bg-white shadow-[0_0_0_1px_theme('colors.gray.300')]"></div>
				</div>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////
// Sidebar

export function Sidebar({ tag = "div", children }: PropsWithChildren<{ tag?: keyof JSX.IntrinsicElements }>) {
	return <>{createElement(tag, { className: "flex flex-col gap-[var(--sidebar-spacing)]" }, children)}</>
}

export function Section({ gutter = true, children }: PropsWithChildren<{ gutter?: boolean }>) {
	return <section className={cx(`flex flex-col gap-[var(--sidebar-spacing)] ${gutter ? "px-[var(--sidebar-spacing)]" : ""}`)}>{children}</section>
}

////////////////////////////////////////////////////////////////////////////////
// Search bar

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
		<div className="h-[var(--search-bar-height)] rounded-1e3 bg-white shadow-[0_0_0_1px_theme('colors.gray.300')]">
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
// Search grid

const _searchGridVars = {
	"--search-grid-item-size": "128px",
	"--search-grid-item-icon-size": "32px",
	"--search-grid-item-text-container-height": "32px",
} as CSSProperties

// E.g. https://play.tailwindcss.com/AlKl7fvFY3
function SearchGridItem() {
	return (
		<button className="group/button flex justify-center">
			<div className="flex h-[var(--search-grid-item-size)] w-[var(--search-grid-item-size)] flex-col">
				{/* Icon */}
				<div className="flex grow items-center justify-center">
					<div
						// Use -mb-* to optically center
						className="-mb-[calc(var(--search-grid-item-text-container-height))] h-[var(--search-grid-item-icon-size)] w-[var(--search-grid-item-icon-size)] rounded-1e3 bg-gray-700
							group-hover/button:group-active/button:bg-sky-400"
					></div>
				</div>
				{/* Text */}
				{/* TODO: Add a checkmark on click */}
				<div className="flex h-[var(--search-grid-item-text-container-height)] items-center justify-center px-16">
					<div
						className="truncate
							group-hover/button:group-active/button:text-sky-400"
					>
						Hello
					</div>
				</div>
			</div>
		</button>
	)
}

export function SearchGrid() {
	return (
		<div className="css-search-grid" style={_searchGridVars}>
			{iota(300).map(index => (
				<SearchGridItem key={index} />
			))}
		</div>
	)
}
