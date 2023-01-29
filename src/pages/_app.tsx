import "../css/_index.scss"
//// import "../css/_tailwind.css"
import "../css/uno.generated.css"

import { Fira_Code, Inter } from "@next/font/google"
import { AppProps } from "next/app"
import { createElement, PropsWithChildren } from "react"
import { detab } from "../lib/format"
import { iota } from "../lib/iota"
import { IconProps } from "./[icon]"

const sans = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
})

const code = Fira_Code({
	subsets: ["latin"],
	variable: "--font-fira-code",
})

// NOTE: TypeScript doesn't accept { tag = "div" ... } so use tag ?? "div"
function HeroLinearGradient<Tag extends keyof JSX.IntrinsicElements>({ tag, children, ...props }: { tag?: Tag } & JSX.IntrinsicElements[Tag]) {
	return <>{createElement(tag ?? "div", { ...props, "data-hero-background-image": true }, children)}</>
}

function BackgroundMask() {
	return (
		<div className="hide 2xl:show sticky t-0 z-[var(--mask-bg-z-index)]">
			{/* Use h-0 here prevents masks from stacking */}
			{/* Use overflow-x-[clip] here to prevent mx--10% from side-scrolling */}
			<div className="h-0 overflow-x-[clip]">
				<HeroLinearGradient className="mx--10% h-160 rounded-b-50%" />
			</div>
		</div>
	)
}

function ForegroundMask() {
	return (
		<div className="hide 2xl:show sticky t-0 z-[var(--mask-fg-z-index)]">
			{/* Use h-0 here prevents masks from stacking */}
			<div className="flex h-0">
				{/* LHS */}
				<div className="relative w-100%">
					<HeroLinearGradient className="h-[calc(var(--inset-y)_+_var(--app-rounding))]" />
					<div className="absolute br-0">
						<HeroLinearGradient className="h-[var(--app-rounding)] w-[var(--app-rounding)] rounded-tl-[var(--app-rounding)]" />
					</div>
				</div>
				{/* RHS */}
				<HeroLinearGradient className="h-[var(--inset-y)] w-100% max-w-[calc(var(--app-w)_-_var(--app-rounding)_*_2)]" />
				<div className="relative w-100%">
					<HeroLinearGradient className="h-[calc(var(--inset-y)_+_var(--app-rounding))]" />
					<div className="absolute bl-0">
						<HeroLinearGradient className="h-[var(--app-rounding)] w-[var(--app-rounding)] rounded-tr-[var(--app-rounding)]" />
					</div>
				</div>
			</div>
		</div>
	)
}

function Logo() {
	return <div className="h-64 w-64 rounded-1e3 bg-[#fff]"></div>
}

function HeadingSubheading() {
	return (
		<div className="flex flex-col align-items-[center]">
			{/* H1 */}
			<div className="flex align-items-[center] h-16">
				<div className="h-6 aspect-16 rounded-1e3 bg-[#fff]"></div>
			</div>
			{/* H2 */}
			<div className="flex align-items-[center] h-16">
				<div className="h-6 aspect-32 rounded-1e3 bg-[#fff]"></div>
			</div>
		</div>
	)
}

function CTAButton({ primary = undefined }: { primary?: true }) {
	return (
		<div
			className="h-64 aspect-6 xs:aspect-3 rounded-[calc(64px_*_0.375)] xs:rounded-1e3 bg-[#fff7]
				[&[data-primary]]:bg-[#fff]"
			data-primary={primary}
		></div>
	)
}

function SponsorMeta() {
	return (
		<div className="flex align-items-[center] gap-16">
			{/* LHS */}
			<div className="flex align-items-[center] h-16">
				<div className="h-6 aspect-16 rounded-1e3 bg-[#fff]"></div>
			</div>
			{/* RHS */}
			<div className="h-3 w-3 rounded-1e3 bg-[#fff]"></div>
			<div className="flex align-items-[center] h-16">
				<div className="h-6 aspect-16 rounded-1e3 bg-[#fff]"></div>
			</div>
		</div>
	)
}

function SponsorSlot() {
	return (
		<div className="flex flex-col gap-8">
			{/* Logo placeholder */}
			<div className="h-48 aspect-3 rounded-1e3 bg-[#fff]"></div>
			{/* Name placeholder */}
			<div className="flex justify-content-[center] align-items-[center] h-16">
				<div className="h-6 aspect-16 rounded-1e3 bg-[#fff]"></div>
			</div>
		</div>
	)
}

function StickyContainer({ pos, children }: PropsWithChildren<{ pos: "tl" | "tr" }>) {
	return (
		<div className="sticky t-0 2xl:t-[var(--inset-y)] z-[var(--card-z-index)]" data-pos={pos}>
			<div
				className="2xl:[[data-pos=tr]_&]:rounded-tr-[var(--app-rounding)]
				           2xl:[[data-pos=tl]_&]:rounded-tl-[var(--app-rounding)]
				             bg-[#fff]"
			>
				{children}
			</div>
		</div>
	)
}

function Layout() {
	return (
		<>
			{/* Header */}
			<HeroLinearGradient tag="header" className="flex justify-content-[center] py-64 xl:py-96">
				<div className="flex flex-col xl:flex-row align-items-[center] gap-64 w-100% max-w-1024">
					{/* LHS */}
					<div className="flex flex-col align-items-[center] gap-32">
						<Logo />
						<HeadingSubheading />
						<div className="flex flex-col xs:flex-row gap-16">
							<CTAButton primary />
							<CTAButton />
						</div>
					</div>
					{/* RHS */}
					<div className="hide xs:flex flex-col align-items-[center] gap-16 xl:w-100% xl:max-w-512">
						<SponsorMeta />
						<div className="flex justify-content-[center] flex-wrap-[wrap] gap-16">
							{iota(5).map(index => (
								<SponsorSlot key={index} />
							))}
						</div>
					</div>
				</div>
			</HeroLinearGradient>

			{/* Masks */}
			<BackgroundMask />
			<ForegroundMask />

			{/* Card */}
			<div className="flex justify-content-[center] pb-[calc(var(--inset-y)_*_2)]">
				<div className="flex w-100% max-w-[var(--app-w)] 2xl:rounded-[var(--app-rounding)] bg-[#fff] sh-[var(--shadow-3)]">
					{/* LHS */}
					{/* TODO: Use min-w max-w here? */}
					<main className="w-100%">
						<StickyContainer pos="tl">
							{iota(4).map(index => (
								<div key={index}>Hello, world!</div>
							))}
						</StickyContainer>
						{iota(100).map(index => (
							<div key={index}>Hello, world!</div>
						))}
					</main>
					{/* RHS */}
					<aside className="hide lg:show w-[var(--aside-w)] sh-[var(--hairline-shadow-l)]">
						<StickyContainer pos="tr">
							{iota(4).map(index => (
								<div key={index}>Hello, world!</div>
							))}
						</StickyContainer>
					</aside>
				</div>
			</div>
		</>
	)
}

export default function App({ pageProps: { name } }: AppProps<Partial<IconProps>>) {
	return (
		<>
			{/* prettier-ignore */}
			<style dangerouslySetInnerHTML={{
				__html: "\n" + detab(`
					:root, ::before, ::after {
						--sans: ${sans.style.fontFamily};
						--code: ${code.style.fontFamily};
					}
				`).replaceAll("\t", "  ") + "\n"
			}} />
			<Layout />
		</>
	)
}
