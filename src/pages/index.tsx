import { ActionDropdownButton, Checkbox, FormatDropdownButton, SearchBar, Slider, SyntaxHighlighting } from "@/components/components2"
import { Heading } from "@/components/docs"
import { detab } from "@/lib"
import { PropsWithChildren, useEffect, useState } from "react"

////////////////////////////////////////////////////////////////////////////////
// Layout

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
