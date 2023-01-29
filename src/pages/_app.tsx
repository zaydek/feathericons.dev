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
function HeroBackgroundImage<Tag extends keyof JSX.IntrinsicElements>({ tag, children, ...props }: { tag?: Tag } & JSX.IntrinsicElements[Tag]) {
	return <>{createElement(tag ?? "div", { ...props, "data-hero-background-image": true }, children)}</>
}

function BackgroundMask() {
	return (
		<div className="hide 2xl:show sticky t-0 z-[var(--mask-bg-z-index)]">
			{/* Use h-0 here prevents masks from stacking */}
			{/* Use overflow-x-[clip] here to prevent mar-x--10% from side-scrolling */}
			<div className="h-0 overflow-x-[clip]">
				<HeroBackgroundImage className="mar-x--10% h-160 rounded-b-50%" />
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
				<div className="relative flex-grow-[1]">
					<HeroBackgroundImage className="h-[calc(var(--inset-y)_+_var(--app-rounding))]" />
					<div className="absolute br-0">
						<HeroBackgroundImage className="h-[var(--app-rounding)] w-[var(--app-rounding)] rounded-tl-[var(--app-rounding)]" />
					</div>
				</div>
				{/* RHS */}
				<HeroBackgroundImage className="h-[var(--inset-y)] w-100% max-w-[calc(1536px_-_var(--app-rounding)_*_2)]" />
				<div className="relative flex-grow-[1]">
					<HeroBackgroundImage className="h-[calc(var(--inset-y)_+_var(--app-rounding))]" />
					<div className="absolute bl-0">
						<HeroBackgroundImage className="h-[var(--app-rounding)] w-[var(--app-rounding)] rounded-tr-[var(--app-rounding)]" />
					</div>
				</div>
			</div>
		</div>
	)
}

function StickyContainer({ pos, children }: PropsWithChildren<{ pos: "tl" | "tr" }>) {
	return (
		<div
			// TODO: Do we really want bg- here?
			className="sticky t-0 2xl:t-[var(--inset-y)] z-[var(--card-z-index)] bg-[#fff]
				2xl:[&[data-pos=tr]]:rounded-tr-[var(--app-rounding)]
				2xl:[&[data-pos=tl]]:rounded-tl-[var(--app-rounding)]"
			data-pos={pos}
		>
			{children}
		</div>
	)
}

function SponsorMeta() {
	return (
		<div className="flex align-items-[center] gap-16">
			<div className="flex align-items-[center] h-16">
				<div className="h-6 aspect-16 rounded-1e3 bg-[#fff]"></div>
			</div>
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
			<div className="h-[calc((48px_+_64px)_/_2)] aspect-3 rounded-1e3 bg-[#fff]"></div>
			{/* Name placeholder */}
			<div className="flex justify-content-[center] align-items-[center] h-16">
				<div className="h-6 aspect-16 rounded-1e3 bg-[#fff]"></div>
			</div>
		</div>
	)
}

function Layout() {
	return (
		<>
			{/* Header */}
			<HeroBackgroundImage tag="header" className="flex justify-content-[center] pad-y-64">
				<div className="flex align-items-[center] w-100% max-w-1024">
					{/* LHS */}
					<div className="flex flex-col flex-grow-[1]">
						{/* <div className="h-48 aspect-3 rounded-1e3 bg-[#fff]"></div>
						<div className="h-48 aspect-3 rounded-1e3 bg-[#fff]"></div> */}
					</div>
					{/* RHS */}
					<div className="flex flex-col align-items-[center] gap-32 w-100% max-w-640">
						<SponsorMeta />
						<div className="flex justify-content-[center] flex-wrap-[wrap] gap-16">
							{iota(5).map(index => (
								<SponsorSlot key={index} />
							))}
						</div>
					</div>
				</div>
			</HeroBackgroundImage>

			{/* Masks */}
			<BackgroundMask />
			<ForegroundMask />

			{/* Card */}
			<div className="flex justify-content-[center] pad-b-[calc(var(--inset-y)_*_2)]">
				<div className="flex w-100% max-w-1536 bg-[#fff] sh-[var(--shadow-3)] 2xl:rounded-[var(--app-rounding)]">
					{/* LHS */}
					{/* TODO: Use min-w max-w here? */}
					<main className="flex-grow-[1]">
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

	//// return (
	//// 	<>
	//// 		{/* Rounded background */}
	//// 		<div className="sticky t-0">
	//// 			{/* 😎 */}
	//// 			<div className="h-0 overflow-x-[clip]">
	//// 				<div className="-mx-10% h-160 rounded-b-50% bg-[var(--theme-color)]"></div>
	//// 			</div>
	//// 		</div>
	//// 		{/* Card */}
	//// 		<div className="sticky t-0">
	//// 			<div className="relative">
	//// 				{/* This is the background layer */}
	//// 				<div className="h-[calc(var(--inset-y)_+_var(--app-rounding))] bg-[orange]">
	//// 					{/* This is the foreground layer */}
	//// 					<div className="absolute inset-b-0">
	//// 						<div className="flex justify-content-[center]">
	//// 							{/* This is the card */}
	//// 							<div className="h-[var(--app-rounding)] w-100% max-w-1536 rounded-t-1e3 bg-[#fff] sh-[var(--shadow-1)]"></div>
	//// 						</div>
	//// 					</div>
	//// 				</div>
	//// 			</div>
	//// 		</div>
	//// 		<div className="relative t-[calc(-1_*_var(--app-rounding))]">{children}</div>
	//// 	</>
	//// )
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

			{/* App */}
			{/* <div className="flex justify-content-[center] -mt-160">
				<div className="flex w-100% max-w-1536px rounded-48 bg-[var(--white)] shadow-[var(--shadow-1)]">
					<div className="flex-grow-[1]">
						{iota(64).map(index => (
							<div key={index}>Hello</div>
						))}
					</div>
					<div className="min-w-[var(--aside-w)] max-w-[var(--aside-w)] shadow-[var(--hairline-shadow-l)]">
						{iota(10).map(index => (
							<div key={index}>Hello</div>
						))}
					</div>
				</div>
			</div> */}
			{/* {iota(100).map(index => (
				<div key={index}>Hello</div>
			))} */}
		</>
	)

	//// return (
	//// 	<>
	//// 		{/* prettier-ignore */}
	//// 		<style dangerouslySetInnerHTML={{ __html: "\n" + detab(`
	//// 			:root, ::before, ::after {
	//// 				--sans: ${sans.style.fontFamily};
	//// 				--code: ${code.style.fontFamily};
	//// 				font-family: var(--sans);
	//// 			}
	//// 			pre, code {
	//// 				font-family: var(--code);
	//// 				tab-size: 2;
	//// 			}
	//// 		`).replaceAll("\t", "  ") + "\n" }} />
	//// 		<ShikiProvider>
	//// 			<StateProvider>
	//// 				<Layout name={name} />
	//// 			</StateProvider>
	//// 		</ShikiProvider>
	//// 	</>
	//// )
}
