import { cx, detab, iota } from "@/lib"
import { createElement, CSSProperties, PropsWithChildren, useCallback, useEffect, useState } from "react"
import { Lang } from "shiki-es"

////////////////////////////////////////////////////////////////////////////////
// Gray chip

const grayChipVars = {
	"--gray-chip-height": "24px",
} as CSSProperties

function GrayChip({ children }: PropsWithChildren) {
	return (
		<div className="h-[var(--gray-chip-height)] rounded-1e3 bg-gray-200 px-[calc(var(--gray-chip-height)_/_2)]" style={grayChipVars}>
			<div className="flex h-100% items-center">
				<div className="text-[13px]">{children}</div>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////
// Inputs

const checkboxIndicatorVars = {
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
			style={checkboxIndicatorVars}
		>
			{checked && (
				<div className="flex h-100% items-center justify-center">
					<div className="h-[var(--checkbox-check-size)] w-[var(--checkbox-check-size)] rounded-1e3 bg-white"></div>
				</div>
			)}
		</div>
	)
}

const dropDownVars = {
	"--dropdown-size": "24px",
	"--dropdown-arrow-size": "8px",
} as CSSProperties

// Visual representation of a dropdown, stateless
function DropDownIndicator() {
	return (
		<div className="h-[var(--dropdown-size)] w-[var(--dropdown-size)]" style={dropDownVars}>
			<div className="flex h-100% items-center justify-center">
				<div className="h-[var(--dropdown-arrow-size)] w-[var(--dropdown-arrow-size)] rounded-1e3 bg-gray-700"></div>
			</div>
		</div>
	)
}

const genericInputVars = {
	"--generic-input-height": "36px",
	"--generic-input-icon-height": "24px",
} as CSSProperties

function GenericInput({ children }: PropsWithChildren) {
	return (
		<div className="flex h-[var(--generic-input-height)] items-center rounded-1e3 shadow-[0_0_0_1px_theme('colors.gray.300')]" style={genericInputVars}>
			{children}
		</div>
	)
}

// State goes here
function Checkbox({ checked = false, children }: PropsWithChildren<{ checked?: boolean }>) {
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
function DropDown({ children }: PropsWithChildren) {
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

function SyntaxHighlighting({ language: _, children }: PropsWithChildren<{ language: Lang }>) {
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

const actionButtonVars = {
	"--action-button-height": "36px",
	"--action-button-icon-size": "16px",
} as CSSProperties

function ActionButton() {
	return (
		<div className="h-[var(--action-button-height)] rounded-1e3 bg-white shadow-[0_0_0_1px_theme('colors.gray.300')]" style={actionButtonVars}>
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

const sliderLabelVars = {
	"--slider-label-height": "32px",
	"--slider-reset-button-size": "16px",
} as CSSProperties

function SliderLabel({ value, children }: PropsWithChildren<{ value: number }>) {
	return (
		<div className="flex items-center justify-between" style={sliderLabelVars}>
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

const sliderInputVars = {
	"--slider-track-height": "6px",
	"--slider-thumb-size": "32px",
} as CSSProperties

function SliderInput() {
	return (
		<div className="flex h-[var(--slider-thumb-size)] flex-col justify-center" style={sliderInputVars}>
			{/* Track */}
			<div className="h-[var(--slider-track-height)] bg-gray-300">
				<div className="flex h-100% items-center">
					{/* Thumb */}
					<div className="h-[var(--slider-thumb-size)] w-[var(--slider-thumb-size)] rounded-1e3 bg-white shadow-[0_0_0_1px_theme('colors.gray.300')]"></div>
				</div>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////
// Checkbox group

function CheckboxGroupFeather({ checked = false }: { checked?: boolean }) {
	return (
		<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)]">
			<Checkbox checked={checked}>Feather</Checkbox>
			<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)] px-[calc(var(--sidebar-spacing)_/_4)]">
				<div>
					24x24px user interface icons, designed by{" "}
					<a href="TODO">
						@<span className="underline underline-offset-[3px]">colebemis</span>
					</a>
				</div>
				<div>
					For example:{" "}
					<a href="TODO">
						<span className="underline underline-offset-[3px]">arrow</span>
					</a>
					,{" "}
					<a href="TODO">
						<span className="underline underline-offset-[3px]">chevron</span>
					</a>
				</div>
			</div>
		</div>
	)
}

function CheckboxGroupSocialMedia({ checked = false }: { checked?: boolean }) {
	return (
		<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)]">
			<Checkbox checked={checked}>Social media</Checkbox>
			<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)] px-[calc(var(--sidebar-spacing)_/_4)]">
				<div>
					24x24px user interface icons, sourced from{" "}
					<a href="TODO">
						@<span className="underline underline-offset-[3px]">Wolf Kit</span>
					</a>
				</div>
				<div>
					For example:{" "}
					<a href="TODO">
						<span className="underline underline-offset-[3px]">twitter</span>
					</a>
					,{" "}
					<a href="TODO">
						{/* Prefer to put facebook here but doesn't fit */}
						<span className="underline underline-offset-[3px]">github</span>
					</a>
				</div>
			</div>
		</div>
	)
}

function CheckboxGroupPaymentServices({ checked = false }: { checked?: boolean }) {
	return (
		<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)]">
			<Checkbox checked={checked}>Payment services</Checkbox>
			<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)] px-[calc(var(--sidebar-spacing)_/_4)]">
				<div>
					56x32px user interface icons, sourced from{" "}
					<a href="TODO">
						<span className="underline underline-offset-[3px]">Wolf Kit</span>
					</a>
				</div>
				<div>
					For example:{" "}
					<a href="TODO">
						<span className="underline underline-offset-[3px]">stripe</span>
					</a>
					,{" "}
					<a href="TODO">
						<span className="underline underline-offset-[3px]">paypal</span>
					</a>
				</div>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////
// Sidebar

const sidebarVars = {
	"--sidebar-spacing": "24px",
} as CSSProperties

function Sidebar({ tag = "div", children }: PropsWithChildren<{ tag?: keyof JSX.IntrinsicElements }>) {
	return (
		<>
			{createElement(
				tag,
				{
					className: "flex flex-col gap-[var(--sidebar-spacing)] py-[var(--sidebar-spacing)]",
					style: sidebarVars,
				},
				children
			)}
		</>
	)
}

function Section({ gutter = true, children }: PropsWithChildren<{ gutter?: boolean }>) {
	// Use cx because of ""
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
						{"\u00a0".repeat(4)}
						(Hint: Use commas to perform many search queries)
					</div>
				</div>
			</div>
		</div>
	)
}

function SearchBar() {
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

const searchGridVars = {
	"--search-grid-item-size": "128px",
	"--search-grid-item-icon-size": "32px",
	"--search-grid-item-text-container-height": "48px",
} as CSSProperties

function SearchGrid() {
	return (
		<div className="css-search-grid" style={searchGridVars}>
			{iota(300).map(index => (
				<div key={index}>Hello</div>
			))}
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

const globalVars = {
	// Sidebar
	"--sidebar-1-width": "250px",
	"--sidebar-2-width": "400px",

	// Search bar
	"--search-bar-height": "48px",
	"--search-bar-icon-size": "16px",
} as CSSProperties

export default function Page() {
	const [showOutline, setShowOutline] = useState(false)

	useEffect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === "`") {
				setShowOutline(curr => !curr)
			}
		}
		window.addEventListener("keydown", handleKeydown, false)
		return () => window.removeEventListener("keydown", handleKeydown, false)
	}, [])

	return (
		<>
			<style>
				{showOutline &&
					detab(`
						* { outline: 1px solid hsl(0, 100%, 50%, 0.1); }
					`)}
			</style>
			<div className="flex" style={globalVars}>
				{/* LHS */}
				<aside className="w-[var(--sidebar-1-width)] shadow-[0_0_0_1px_theme('colors.gray.300')]">
					<div className="sticky top-0">
						<Sidebar>
							<Section>
								<CheckboxGroupFeather checked />
							</Section>
							<Section>
								<CheckboxGroupSocialMedia />
							</Section>
							<Section>
								<CheckboxGroupPaymentServices />
							</Section>
						</Sidebar>
					</div>
				</aside>
				<main className="flex grow justify-center py-32 px-16">
					{/* TODO */}
					<div className="flex w-100% max-w-xl flex-col gap-64">
						{/* Search bar */}
						<div className="flex flex-col gap-16">
							<div className="flex items-center justify-between">
								<GrayChip>Search</GrayChip>
								<div>Twitter</div>
							</div>
							<SearchBar />
						</div>
						<SearchGrid />
					</div>
				</main>
				{/* RHS */}
				<aside className="w-[var(--sidebar-2-width)] shadow-[0_0_0_1px_theme('colors.gray.300')]">
					<div className="sticky top-0">
						<Sidebar>
							<Section>
								<div className="flex items-center justify-between">
									<GrayChip>Code</GrayChip>
									<DropDown>TypeScript React</DropDown>
								</div>
								{/* <div className="mr-[calc(-1_*_var(--sidebar-spacing))]"> */}
								<SyntaxHighlighting language="html">
									{detab(`
											<!-- https://feathericons.com/feather -->
											<svg class="feather feather-feather" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
												<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
												<line x1="16" x2="2" y1="8" y2="22"></line>
												<line x1="17.5" x2="9" y1="15" y2="15"></line>
											</svg>
										`)}
								</SyntaxHighlighting>
								{/* </div> */}
								<ActionButton />
							</Section>
							<hr />
							<Section>
								<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)]">
									<SliderLabel value={32}>Size</SliderLabel>
									<SliderInput />
								</div>
							</Section>
							<hr />
							<Section>
								<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)]">
									<SliderLabel value={2}>Stroke width</SliderLabel>
									<SliderInput />
								</div>
							</Section>
							<hr />
						</Sidebar>
					</div>
				</aside>
			</div>
		</>
	)
}
