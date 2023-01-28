import Head from "next/head"
import { useEffect } from "react"
import { Documentation } from "./layout-docs"
import { Header } from "./layout-header"
import { SearchResultsContents } from "./layout-search-results"
import { SidebarContents } from "./layout-sidebar"
import { toKebabCase } from "./lib/cases"
import { IconProps } from "./pages/[icon]"

// See css/masks.scss
function BgMask() {
	return (
		<div className="bg-mask-sticky">
			<div className="bg-mask" data-bg-hero></div>
		</div>
	)
}

// See css/masks.scss
function FgMask() {
	return (
		<div className="fg-mask-sticky">
			<div className="fg-mask-bit-1" data-bg-hero>
				<div className="fg-mask-bit-1-nested"></div>
			</div>
			<div className="fg-mask-bit-2" data-bg-hero></div>
			<div className="fg-mask-bit-3" data-bg-hero>
				<div className="fg-mask-bit-3-nested"></div>
			</div>
		</div>
	)
}

function SearchEngineOptimization({ name }: Partial<IconProps>) {
	useEffect(() => {
		if (name !== undefined) { return } // prettier-ignore
		document.title = "Feather"
	}, [name])

	return (
		<Head>
			{/* GOOG */}
			<title>{name === undefined ? "Feather – Simply beautiful open source icons" : `Icon: ${name}`}</title>
			<meta
				name="description"
				content="
					Feather is a collection of simply beautiful open source icons.
					Each icon is designed on a 24x24 grid with an emphasis on simplicity, consistency and readability."
			/>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href={`/feather/${toKebabCase(name ?? "Feather")}.svg`} />

			{/* FB */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://feathericons.dev" />
			<meta property="og:title" content="Feather – Simply beautiful open source icons" />
			<meta
				property="og:description"
				content="
					Feather is a collection of simply beautiful open source icons.
					Each icon is designed on a 24x24 grid with an emphasis on simplicity, consistency and readability."
			/>
			<meta property="og:image" content="https://feathericons.dev/feather-og.png" />

			{/* TWTR */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://feathericons.dev" />
			<meta property="twitter:title" content="Feather – Simply beautiful open source icons" />
			<meta
				property="twitter:description"
				content="
					Feather is a collection of simply beautiful open source icons.
					Each icon is designed on a 24x24 grid with an emphasis on simplicity, consistency and readability."
			/>
			<meta property="twitter:image" content="https://feathericons.dev/feather-og.png" />
		</Head>
	)
}

export function Layout({ name }: Partial<IconProps>) {
	return (
		<>
			<SearchEngineOptimization name={name} />

			<Header />
			<BgMask />
			<FgMask />
			{/* TODO: Extract to CSS variables? */}
			<div className="flex justify-center">
				{/* TODO: Extract to CSS variables? */}
				<div
					className="flex min-h-[calc(100dvh_-_(var(--rounding)_+_var(--inset-y)))] w-100% max-w-[var(--app-w)] bg-white
						2xl:rounded-[var(--rounding)] 2xl:[box-shadow:_var(--shadow-4)]"
				>
					{/* LHS */}
					<main className="min-w-0 grow">
						<div className="sticky top-0 z-10 2xl:top-[var(--inset-y)]">{/* <div>Hello, world!</div> */}</div>
						{/* TODO: Extract to CSS variables? */}
						{/* prettier-ignore */}
						<div className="py-48 px-24 2xl:px-48">
							{name === undefined
								? <SearchResultsContents />
								: <Documentation name={name} />}
						</div>
					</main>
					{/* RHS */}
					<aside className="hidden min-w-[var(--aside-w)] max-w-[var(--aside-w)] [box-shadow:_var(--hairline-shadow-l)] lg:block">
						<div className="sticky top-0 z-10 2xl:top-[var(--inset-y)]">
							<SidebarContents />
						</div>
					</aside>
				</div>
			</div>

			{/* <Transition2
				when={showSidebar}
				unmount="start"
				s1={{
					opacity: 0,
				}}
				s2={{
					opacity: 1,
				}}
				duration={300}
				ease={[0, 1, 1, 1]}
			>
				<div
					className="fixed inset-0 z-100 bg-black/20"
					onClick={e => {
						setShowSidebar(false)
					}}
				></div>
			</Transition2>
			<Transition2
				when={showSidebar}
				unmount="start"
				s1={{
					transform: "translateX(100%)",
					opacity: 0,
				}}
				s2={{
					transform: "translateX(0px)",
					opacity: 1,
				}}
				duration={300}
				ease={[0, 1, 1, 1]}
			>
				{/!* Use flex to forward bounding box dimensions *!/}
				<aside className="fixed top-0 right-0 bottom-0 z-100 flex">
					<div className="w-[var(--sidebar-w)] bg-white [box-shadow:_var(--shadow-1)]">
						<SidebarFragment />
					</div>
				</aside>
			</Transition2> */}
		</>
	)
}
