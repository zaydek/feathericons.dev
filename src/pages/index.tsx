import {
	ActionButton,
	Checkbox,
	DropDown,
	GrayChip,
	SearchBar,
	SearchGrid,
	Section,
	Sidebar,
	SliderInput,
	SliderLabel,
	SyntaxHighlighting,
} from "@/components/components"
import { detab } from "@/lib"
import { useEffect, useState } from "react"

////////////////////////////////////////////////////////////////////////////////

function IconsGroupFeather({ checked = false }: { checked?: boolean }) {
	return (
		<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)]">
			<Checkbox checked={checked}>Feather</Checkbox>
			<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)] px-[calc(var(--sidebar-spacing)_/_4)]">
				<div className="leading-[1.5]">
					24x24px user interface icons, designed by{" "}
					<a href="TODO">
						@<span className="underline underline-offset-[3px]">colebemis</span>
					</a>
				</div>
				<div className="leading-[1.5]">
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

function IconsGroupSocialMedia({ checked = false }: { checked?: boolean }) {
	return (
		<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)]">
			<Checkbox checked={checked}>Social media</Checkbox>
			<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)] px-[calc(var(--sidebar-spacing)_/_4)]">
				<div className="leading-[1.5]">
					24x24px user interface icons, sourced from{" "}
					<a href="TODO">
						@<span className="underline underline-offset-[3px]">Wolf Kit</span>
					</a>
				</div>
				<div className="leading-[1.5]">
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

function IconsGroupPaymentServices({ checked = false }: { checked?: boolean }) {
	return (
		<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)]">
			<Checkbox checked={checked}>Payment services</Checkbox>
			<div className="flex flex-col gap-[calc(var(--sidebar-spacing)_/_2)] px-[calc(var(--sidebar-spacing)_/_4)]">
				<div className="leading-[1.5]">
					56x32px user interface icons, sourced from{" "}
					<a href="TODO">
						<span className="underline underline-offset-[3px]">Wolf Kit</span>
					</a>
				</div>
				<div className="leading-[1.5]">
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

function Sidebar1() {
	return (
		<Sidebar>
			<Section>
				<IconsGroupFeather checked />
			</Section>
			<Section>
				<IconsGroupSocialMedia />
			</Section>
			<Section>
				<IconsGroupPaymentServices />
			</Section>
		</Sidebar>
	)
}

function SearchApp() {
	return (
		<>
			<div className="css-search-bar-background-image sticky top-0 p-[var(--main-spacing)]">
				<div className="flex flex-col gap-16">
					{/* Use var(--generic-input-height) here to make optically centered (see sidebars) */}
					<div className="flex h-[var(--generic-input-height)] items-center justify-between">
						<GrayChip>Search</GrayChip>
						<div>Twitter TODO</div>
					</div>
					<SearchBar />
				</div>
			</div>
			<SearchGrid />
		</>
	)
}

function Sidebar2() {
	return (
		<Sidebar>
			<Section>
				<div className="flex items-center justify-between">
					<GrayChip>Code</GrayChip>
					<DropDown>TypeScript React</DropDown>
				</div>
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
			<style>
				{showOutline &&
					detab(`
						* { outline: 1px solid hsl(0, 100%, 50%, 0.1); }
					`)}
			</style>
			<div className="flex">
				<aside className="min-h-[100dvh] w-[var(--sidebar-1-width)] py-[var(--main-spacing)] shadow-[0_0_0_1px_theme('colors.gray.300')]">
					<div className="sticky top-[var(--main-spacing)]">
						<Sidebar1 />
					</div>
				</aside>
				<main className="flex grow justify-center px-[var(--main-spacing)] pb-[calc(var(--main-spacing)_*_2)]">
					<div className="max-w-xl w-100%">
						<SearchApp />
					</div>
				</main>
				<aside className="min-h-[100dvh] w-[var(--sidebar-2-width)] py-[var(--main-spacing)] shadow-[0_0_0_1px_theme('colors.gray.300')]">
					<div className="sticky top-[var(--main-spacing)]">
						<Sidebar2 />
					</div>
				</aside>
			</div>
		</>
	)
}
