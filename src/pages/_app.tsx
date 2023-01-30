import "the-new-css-reset"
import "../css/index.scss"
import "../css/tailwind.css"

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
function Hero<Tag extends keyof JSX.IntrinsicElements>({ tag, children, ...props }: { tag?: Tag } & JSX.IntrinsicElements[Tag]) {
	return <>{createElement(tag ?? "div", { ...props, "data-hero-background-image": true }, children)}</>
}

function Logo() {
	return <div className="h-64 w-64 rounded-1e3 bg-[#fff]"></div>
}

function HeadingSubheading() {
	return (
		<div className="flex flex-col items-center">
			{/* TODO: <h1> */}
			<div className="flex h-16 items-center">
				<div className="aspect-[16] h-6 rounded-1e3 bg-[#fff]"></div>
			</div>
			{/* TODO: <h2> */}
			<div className="flex h-16 items-center">
				<div className="aspect-[32] h-6 rounded-1e3 bg-[#fff]"></div>
			</div>
		</div>
	)
}

function CTAButton({ primary = undefined }: { primary?: true }) {
	return (
		<div
			className="aspect-[6] h-64 rounded-[calc(64px_*_0.375)] bg-[#fff7] sm:aspect-[3] sm:rounded-1e3
				[&[data-primary]]:bg-[#fff]"
			data-primary={primary}
		></div>
	)
}

function SponsorMeta() {
	return (
		<div className="flex items-center gap-16">
			{/* LHS */}
			<div className="flex h-16 items-center">
				<div className="aspect-[16] h-6 rounded-1e3 bg-[#fff]"></div>
			</div>
			{/* RHS */}
			<div className="h-3 w-3 rounded-1e3 bg-[#fff]"></div>
			<div className="flex h-16 items-center">
				<div className="aspect-[16] h-6 rounded-1e3 bg-[#fff]"></div>
			</div>
		</div>
	)
}

function SponsorSlot() {
	return (
		<div className="flex flex-col gap-8">
			<div className="aspect-[3] h-48 rounded-1e3 bg-[#fff]"></div>
			<div className="flex h-16 items-center justify-center">
				<div className="aspect-[16] h-6 rounded-1e3 bg-[#fff]"></div>
			</div>
		</div>
	)
}

function BackgroundMask() {
	return (
		// Use -mt-[var(--inset-y)] > h-[var(--inset-y)] to prevent responsive
		// layout thrashing
		<div className="sticky top-0 z-[var(--bg-mask-z)] -mt-[var(--inset-y)] hidden 2xl:block">
			{/* Use overflow-x-clip to prevent side-scrolling. Note that
			overflow-x-hidden doesn't work as expected. */}
			<div className="h-[var(--inset-y)] overflow-x-clip">
				<Hero className="-mx-16 h-160 rounded-b-50%" />
			</div>
		</div>
	)
}

function ForegroundMask() {
	return (
		// Use -mt-[var(--inset-y)] > h-[var(--inset-y)] to prevent responsive
		// layout thrashing
		<div className="sticky top-0 z-[var(--fg-mask-z)] -mt-[var(--inset-y)] hidden 2xl:block">
			<div className="flex h-[var(--inset-y)] justify-center">
				{/* LHS */}
				<div className="relative">
					<Hero className="h-[calc(var(--app-rounding)_+_var(--inset-y))]" />
					<div className="absolute top-0 right-0">
						<Hero className="h-[calc(var(--app-rounding)_+_var(--inset-y))] w-[calc(var(--app-rounding)_+_var(--inset-y))]" />
					</div>
				</div>
				{/* RHS */}
				<Hero className="h-[var(--inset-y)] w-100% max-w-[calc(var(--app-w)_-_var(--app-rounding)_*_2)]" />
				<div className="relative">
					<Hero className="h-[calc(var(--app-rounding)_+_var(--inset-y))]" />
					<div className="absolute top-0 left-0">
						<Hero className="h-[calc(var(--app-rounding)_+_var(--inset-y))] w-[calc(var(--app-rounding)_+_var(--inset-y))]" />
					</div>
				</div>
			</div>
		</div>
	)
}

function LayoutContainer({ children }: PropsWithChildren) {
	return (
		<>
			<BackgroundMask />
			<ForegroundMask />
			<div className="flex justify-center pb-[calc(var(--inset-y)_*_2)]">
				<div className="flex w-100% max-w-[var(--app-w)] bg-[#fff] shadow-[var(--shadow-3)] 2xl:rounded-[var(--app-rounding)]">{children}</div>
			</div>
		</>
	)
}

function StickyContainer({ pos, children }: PropsWithChildren<{ pos: "tl" | "tr" }>) {
	return (
		<div className="sticky top-0 z-[var(--app-z)] 2xl:top-[var(--inset-y)]" data-pos={pos}>
			<div
				className="bg-[#fff]
					2xl:[[data-pos=tr]_&]:rounded-tr-[var(--app-rounding)]
					2xl:[[data-pos=tl]_&]:rounded-tl-[var(--app-rounding)]"
			>
				{children}
			</div>
		</div>
	)
}

function Layout() {
	return (
		<>
			<Hero tag="header" className="flex justify-center py-64 px-16 xl:py-96">
				<div className="flex w-100% max-w-1024 flex-col items-center gap-64 xl:flex-row">
					{/* LHS */}
					<div className="flex flex-col items-center gap-32">
						<Logo />
						<HeadingSubheading />
						<div className="flex flex-col gap-16 sm:flex-row">
							<CTAButton primary />
							<CTAButton />
						</div>
					</div>
					{/* RHS */}
					<div className="hidden flex-col items-center gap-16 sm:flex xl:w-100% xl:max-w-512">
						<SponsorMeta />
						<div className="flex flex-wrap justify-center gap-16">
							{iota(5).map(index => (
								<SponsorSlot key={index} />
							))}
						</div>
					</div>
				</div>
			</Hero>
			<LayoutContainer>
				{/* LHS */}
				<main className="w-100% min-w-0">
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
				<aside className="hidden min-w-[var(--aside-w)] max-w-[var(--aside-w)] shadow-[var(--hairline-shadow-l)] lg:block">
					<StickyContainer pos="tr">
						{iota(4).map(index => (
							<div key={index}>Hello, world!</div>
						))}
					</StickyContainer>
				</aside>
			</LayoutContainer>
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
