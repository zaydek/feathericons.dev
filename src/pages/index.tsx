import { detab } from "@/lib"
import { PropsWithChildren, ReactNode, useCallback, useEffect, useState } from "react"
import { Lang } from "shiki-es"

////////////////////////////////////////////////////////////////////////////////

//// function LiFeather({ checked = false }: { checked?: boolean }) {
//// 	return (
//// 		<li className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)]">
//// 			<Checkbox checked={checked}>Feather</Checkbox>
//// 			<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)] px-8">
//// 				<div className="leading-[1.5]">
//// 					24x24px user interface icons, designed by{" "}
//// 					<a href="TODO">
//// 						@<span className="underline underline-offset-[3px]">colebemis</span>
//// 					</a>
//// 				</div>
//// 				<div className="leading-[1.5]">
//// 					For example:{" "}
//// 					<a href="TODO">
//// 						<span className="underline underline-offset-[3px]">arrow</span>
//// 					</a>
//// 					,{" "}
//// 					<a href="TODO">
//// 						<span className="underline underline-offset-[3px]">chevron</span>
//// 					</a>
//// 				</div>
//// 			</div>
//// 		</li>
//// 	)
//// }
////
//// function LiSocialMedia({ checked = false }: { checked?: boolean }) {
//// 	return (
//// 		<li className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)]">
//// 			<Checkbox checked={checked}>Social media</Checkbox>
//// 			<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)] px-8">
//// 				<div className="leading-[1.5]">
//// 					24x24px user interface icons, sourced from{" "}
//// 					<a href="TODO">
//// 						@<span className="underline underline-offset-[3px]">Wolf Kit</span>
//// 					</a>
//// 				</div>
//// 				<div className="leading-[1.5]">
//// 					For example:{" "}
//// 					<a href="TODO">
//// 						<span className="underline underline-offset-[3px]">twitter</span>
//// 					</a>
//// 					,{" "}
//// 					<a href="TODO">
//// 						{/* Prefer to put facebook here but doesn't fit */}
//// 						<span className="underline underline-offset-[3px]">github</span>
//// 					</a>
//// 				</div>
//// 			</div>
//// 		</li>
//// 	)
//// }
////
//// function LiPaymentServices({ checked = false }: { checked?: boolean }) {
//// 	return (
//// 		<li className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)]">
//// 			<Checkbox checked={checked}>Payment services</Checkbox>
//// 			<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)] px-8">
//// 				<div className="leading-[1.5]">
//// 					56x32px user interface icons, sourced from{" "}
//// 					<a href="TODO">
//// 						<span className="underline underline-offset-[3px]">Wolf Kit</span>
//// 					</a>
//// 				</div>
//// 				<div className="leading-[1.5]">
//// 					For example:{" "}
//// 					<a href="TODO">
//// 						<span className="underline underline-offset-[3px]">stripe</span>
//// 					</a>
//// 					,{" "}
//// 					<a href="TODO">
//// 						<span className="underline underline-offset-[3px]">paypal</span>
//// 					</a>
//// 				</div>
//// 			</div>
//// 		</li>
//// 	)
//// }
////
//// ////////////////////////////////////////////////////////////////////////////////
////
//// function Section({ children, ...props }: JSX.IntrinsicElements["section"]) {
//// 	return (
//// 		<section
//// 			className="flex flex-col gap-[var(--sidebar-spacing)] px-[var(--sidebar-spacing)]"
//// 			{...props}
//// 		>
//// 			{children}
//// 		</section>
//// 	)
//// }
////
//// function Aside1Contents() {
//// 	return (
//// 		<Section>
//// 			<div className="flex flex-col gap-16">
//// 				<Chip>Icons</Chip>
//// 				<ul className="flex flex-col gap-[var(--sidebar-spacing)]">
//// 					<LiFeather checked />
//// 					<LiSocialMedia />
//// 					<LiPaymentServices />
//// 				</ul>
//// 			</div>
//// 		</Section>
//// 	)
//// }
////
//// function MainContents() {
//// 	return (
//// 		<>
//// 			<div className="css-search-bar-bg-image sticky top-0 flex flex-col gap-16 py-[var(--main-spacing)]">
//// 				<Chip>Search</Chip>
//// 				<SearchBar />
//// 			</div>
//// 			<SearchGrid />
//// 		</>
//// 	)
//// }
////
//// function Aside2Contents() {
//// 	return (
//// 		<div className="flex flex-col gap-[var(--sidebar-spacing)]">
//// 			<Section>
//// 				{/* Use h-[var(--chip-height)] to optically align */}
//// 				<div className="flex h-[var(--chip-height)] items-center justify-between">
//// 					<Chip>Code</Chip>
//// 					<DropDown>TypeScript React</DropDown>
//// 				</div>
//// 				<SyntaxHighlighting language="html">
//// 					{detab(`
//// 						<!-- https://feathericons.com/feather -->
//// 						<svg class="feather feather-feather" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
//// 							<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
//// 							<line x1="16" x2="2" y1="8" y2="22"></line>
//// 							<line x1="17.5" x2="9" y1="15" y2="15"></line>
//// 						</svg>
//// 					`)}
//// 				</SyntaxHighlighting>
//// 				<ActionButton />
//// 			</Section>
//// 			<hr />
//// 			<Section>
//// 				<Slider value={32}>Size</Slider>
//// 			</Section>
//// 			<hr />
//// 			<Section>
//// 				<Slider value={2}>Stroke width</Slider>
//// 			</Section>
//// 			<hr />
//// 		</div>
//// 	)
//// }

////////////////////////////////////////////////////////////////////////////////

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
			{/* DEBUG */}
			<style>
				{showOutline &&
					detab(`
						* { outline: 1px solid hsl(0, 100%, 50%, 0.1); }
					`)}
			</style>
			<Sidebar1>
				<Heading>Icons</Heading>
				<Checkbox p1={<>Hello, world! Hello, world! Hello, world!</>} p2={<>Hello, world!</>}>
					Feather
				</Checkbox>
				<Checkbox p1={<>Hello, world! Hello, world! Hello, world!</>} p2={<>Hello, world!</>}>
					Feather
				</Checkbox>
				<Checkbox p1={<>Hello, world! Hello, world! Hello, world!</>} p2={<>Hello, world!</>}>
					Feather
				</Checkbox>
			</Sidebar1>
			<Sidebar2>
				<div className="flex h-[var(--heading-height)] items-center justify-between">
					<Heading>Code</Heading>
					<FormatDropdownButton />
				</div>
				<SyntaxHighlighting lang="html">
					{detab(`
						<!-- https://feathericons.com/feather -->
						<svg class="feather feather-feather" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
							<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
							<line x1="16" x2="2" y1="8" y2="22"></line>
							<line x1="17.5" x2="9" y1="15" y2="15"></line>
						</svg>
					`)}
				</SyntaxHighlighting>
				<ActionDropdownButton />
				<hr className="-mx-[var(--spacing-2)]" />
				<Slider value={32}>Size</Slider>
				<hr className="-mx-[var(--spacing-2)]" />
				<Slider value={2}>Stroke width</Slider>
				<hr className="-mx-[var(--spacing-2)]" />
			</Sidebar2>
			<Main>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
				<div>Hello</div>
			</Main>
		</>
	)
}

function SearchBarButton() {
	return <div className="m-[var(--search-bar-icon-negative-margin)] aspect-square h-[var(--search-bar-icon-height)] rounded-1e3 bg-gray-700"></div>
}

function SearchBar() {
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

function Main({ children }: PropsWithChildren) {
	return (
		// Container
		//
		// Use absolute because relative doesn't work as expected
		<div className="absolute right-[var(--sidebar-2-width)] left-[var(--sidebar-1-width)] flex justify-center p-[var(--spacing-2)] pt-0">
			<div className="w-100% max-w-lg">
				{/* Search bar */}
				<div className="sticky top-0 flex flex-col gap-[var(--spacing-2)] bg-white py-[var(--spacing-2)]">
					<Heading>Search</Heading>
					<SearchBar />
				</div>
				{/* Search results */}
				{children}
			</div>
		</div>
	)
}

function Sidebar1({ children }: PropsWithChildren) {
	return (
		<div
			className="fixed z-10 flex min-h-[100dvh] w-[var(--sidebar-1-width)] flex-col gap-[var(--spacing-2)] bg-white p-[var(--spacing-2)] shadow-[var(--shadow)]"
			style={{ inset: "var(--sidebar-1-inset)" }}
		>
			{children}
		</div>
	)
}

function Sidebar2({ children }: PropsWithChildren) {
	return (
		<div
			className="fixed z-10 flex min-h-[100dvh] w-[var(--sidebar-2-width)] flex-col gap-[var(--spacing-2)] bg-white p-[var(--spacing-2)] shadow-[var(--shadow)]"
			style={{ inset: "var(--sidebar-2-inset)" }}
		>
			{children}
		</div>
	)
}

function Heading({ children }: PropsWithChildren) {
	// Use w-fit because of flex flex-col
	return <div className="ml-8 flex h-[var(--heading-height)] w-fit items-center rounded-1e3 bg-gray-200 px-[calc(var(--heading-height)_/_2)]">{children}</div>
}

function Checkbox({ p1, p2, children }: PropsWithChildren<{ p1: ReactNode; p2: ReactNode }>) {
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
			<p className="ml-8 leading-[1.5]">{p1}</p>
			<p className="ml-8 leading-[1.5]">{p2}</p>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////
// Dropdowns

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

function FormatDropdownButton() {
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
					<div className="w-128 rounded-16 bg-white shadow-[var(--inset-shadow)]">
						<DropdownItem>SVG</DropdownItem>
						<DropdownItem>React JS</DropdownItem>
						<DropdownItem>React TSX</DropdownItem>
					</div>
				</div>
			)}
		</div>
	)
}

function ActionDropdownButton() {
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
					<div className="w-128 rounded-16 bg-white shadow-[var(--inset-shadow)]">
						<DropdownItem>Copy</DropdownItem>
						<DropdownItem>Download</DropdownItem>
					</div>
				</div>
			)}
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

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

export function Slider({ value, children }: PropsWithChildren<{ value: number }>) {
	return (
		<div className="flex flex-col gap-[var(--spacing-1)]">
			<SliderLabel value={value}>{children}</SliderLabel>
			<SliderInput />
		</div>
	)
}

//// <aside className="min-h-[100dvh] w-[var(--sidebar-1-width)] py-[var(--main-spacing)] shadow-[0_0_0_1px_theme('colors.gray.300')]">
//// 	<div className="sticky top-[var(--main-spacing)]">
//// 		<Aside1Contents />
//// 	</div>
//// </aside>
//// {/* Use grow because #__next uses flex */}
//// {/* Omit pt-* because of <SearchBar> */}
//// <main className="flex grow justify-center px-[var(--main-spacing)] pb-[calc(var(--main-spacing)_*_2)]">
//// 	{/* <div className="w-100% max-w-[896px]"> */}
//// 	<div className="w-100% max-w-xl">
//// 		<MainContents />
//// 	</div>
//// </main>
//// <aside className="min-h-[100dvh] w-[var(--sidebar-2-width)] py-[var(--main-spacing)] shadow-[0_0_0_1px_theme('colors.gray.300')]">
//// 	<div className="sticky top-[var(--main-spacing)]">
//// 		<Aside2Contents />
//// 	</div>
//// </aside>
