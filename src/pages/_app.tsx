//// import "the-new-css-reset"
import "../css/index.scss"
import "../css/tailwind.css"

import { Fira_Code, Inter } from "@next/font/google"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import Script from "next/script"
import { PropsWithChildren, useEffect } from "react"
import { detab } from "../lib/format"
import { iota } from "../lib/iota"
import { SEO } from "../seo"
import { SharedSidebar } from "../shared-sidebar"
import { ShikiProvider } from "../shiki"
import { StateProvider } from "../state"
import { IconProps } from "./[icon]"

function NavLink({ pos }: { pos: "tl" | "tr" }) {
	return (
		<div
			className="absolute
				[&[data-pos=tl]]:top-16 [&[data-pos=tl]]:left-16
				[&[data-pos=tr]]:top-16 [&[data-pos=tr]]:right-16"
			data-pos={pos}
		>
			<div className="flex h-32 items-center gap-8 rounded-1e3 bg-[#000]/25 px-8 pr-16">
				<div className="h-16 w-16 rounded-1e3 bg-[#fff]"></div>
				<div className="h-6 w-96 rounded-1e3 bg-[#fff]"></div>
			</div>
		</div>
	)
}

function Logo() {
	return <div className="h-64 w-64 rounded-1e3 bg-[#fff]"></div>
}

function HeadingSubheading() {
	return (
		<div className="flex flex-col items-center">
			<div className="flex h-16 items-center">
				<div className="aspect-[16] h-6 rounded-1e3 bg-[#fff]"></div>
			</div>
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
				<div className="-mx-[calc(160px_/_2)] h-160 rounded-b-50%" data-background-hero />
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
					<div
						// prettier-ignore
						className="h-[calc(var(--app-rounding)_+_var(--inset-y))]"
						data-background-hero
					/>
					<div className="absolute top-0 right-0">
						<div
							// prettier-ignore
							className="h-[calc(var(--app-rounding)_+_var(--inset-y))] w-[calc(var(--app-rounding)_+_var(--inset-y))]"
							data-background-hero
						/>
					</div>
				</div>
				{/* RHS */}
				<div
					// prettier-ignore
					className="h-[var(--inset-y)] w-100% max-w-[calc(var(--app-w)_-_var(--app-rounding)_*_2)]"
					data-background-hero
				/>
				<div className="relative">
					<div
						// prettier-ignore
						className="h-[calc(var(--app-rounding)_+_var(--inset-y))]"
						data-background-hero
					/>
					<div className="absolute top-0 left-0">
						<div
							// prettier-ignore
							className="h-[calc(var(--app-rounding)_+_var(--inset-y))] w-[calc(var(--app-rounding)_+_var(--inset-y))]"
							data-background-hero
						/>
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

function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<header
				// prettier-ignore
				className="flex justify-center py-64 px-16 xl:py-96"
				data-background-hero
			>
				<NavLink pos="tl" />
				<NavLink pos="tr" />
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
			</header>
			<LayoutContainer>
				{/* LHS */}
				<main className="w-100% min-w-0">
					<StickyContainer pos="tl">
						{iota(4).map(index => (
							<div key={index}>Hello, world!</div>
						))}
					</StickyContainer>
					<div className="p-16 lg:p-32 2xl:p-64">{children}</div>
				</main>
				{/* RHS */}
				{/* Use border-l instead of shadow-[hairline-shadow-l] */}
				<aside className="hidden min-w-[var(--aside-w)] max-w-[var(--aside-w)] border-l lg:block">
					<StickyContainer pos="tr">
						<SharedSidebar />
					</StickyContainer>
				</aside>
			</LayoutContainer>
		</>
	)
}

const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
})
const fontCode = Fira_Code({
	subsets: ["latin"],
	variable: "--font-fira-code",
})

function GoogleFonts() {
	return (
		// prettier-ignore
		<style dangerouslySetInnerHTML={{
			__html: "\n" + detab(`
				:root, ::before, ::after {
					--sans: ${fontSans.style.fontFamily};
					--code: ${fontCode.style.fontFamily};
				}
			`).replaceAll("\t", "  ") + "\n"
		}} />
	)
}

// https://github.com/vercel/next.js/issues/20951#issuecomment-1003746732
function NoopScrollRestoration() {
	const router = useRouter()

	useEffect(() => {
		router.beforePopState(state => {
			state.options.scroll = false
			return true
		})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		// prettier-ignore
		<Script id="noop-scroll-restoration" dangerouslySetInnerHTML={{
			__html: "\n" + detab(`
				window.history.scrollRestoration = "manual"
			`) + "\n"
		}} />
	)
}

export default function App({ Component, pageProps }: AppProps<Partial<IconProps>>) {
	return (
		<>
			<GoogleFonts />
			<NoopScrollRestoration />
			<ShikiProvider>
				<StateProvider>
					<SEO />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</StateProvider>
			</ShikiProvider>
		</>
	)
}
