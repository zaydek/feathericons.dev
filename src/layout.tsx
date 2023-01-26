import Head from "next/head"
import { useEffect } from "react"
import { manifest } from "./data/react-feather-manifest"
import { SearchResultsContents } from "./layout-search-results"
import { SidebarContents } from "./layout-sidebar-contents"
import { toKebabCase } from "./lib/cases"
import { iota } from "./lib/iota"
import { BgMask, FgMask } from "./masks"
import { IconProps } from "./pages/[icon]"

function NavLink({ pos }: { pos: "tl" | "tr" }) {
	return (
		<div
			className="absolute
				[&[data-pos=tl]]:top-16 [&[data-pos=tl]]:left-16
					[&[data-pos=tr]]:top-16 [&[data-pos=tr]]:right-16"
			data-pos={pos.toLowerCase()}
		>
			<div className="flex h-32 items-center gap-8 rounded-1e3 bg-black/25 px-8 pr-16">
				<div className="h-16 w-16 rounded-1e3 bg-white"></div>
				<div className="h-6 w-96 rounded-1e3 bg-white"></div>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function Logo() {
	return <div className="h-64 w-64 rounded-1e3 bg-white/90"></div>
}

function LogoText() {
	return (
		<div className="flex flex-col items-center gap-12">
			<div className="h-6 w-128 rounded-1e3 bg-white"></div>
			<div className="h-6 w-256 rounded-1e3 bg-white"></div>
		</div>
	)
}

function CTAButton({ primary }: { primary?: boolean }) {
	primary ||= undefined

	return (
		<div
			className="h-56 rounded-[calc(56px_*_0.375)] bg-white/50
				sm:aspect-[3.5] sm:rounded-1e3
					[&[data-primary]]:bg-white"
			data-primary={primary}
		></div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function Middot() {
	return <div className="h-2 w-2 rounded-1e3 bg-white"></div>
}

function SponsorMeta() {
	return (
		<div className="flex items-center gap-12">
			<div className="h-6 w-96 rounded-1e3 bg-white"></div>
			<Middot />
			<div className="h-6 w-96 rounded-1e3 bg-white"></div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function Sponsor() {
	return (
		<div className="flex flex-col items-center gap-12">
			<div className="aspect-[3.5] h-48 rounded-1e3 bg-white/25"></div>
			<div className="h-6 w-96 rounded-1e3 bg-white/90"></div>
		</div>
	)
}

function Header() {
	return (
		<>
			<NavLink pos="tl" />
			<NavLink pos="tr" />
			<header className="flex justify-center py-96 px-[var(--inset-x)]" data-bg-hero>
				<div
					className="flex flex-col gap-64
						xl:w-100% xl:max-w-1024 xl:flex-row xl:items-center"
				>
					{/* LHS */}
					<div className="flex grow flex-col items-center gap-32">
						<Logo />
						<LogoText />
						<div
							className="flex w-384 flex-col gap-12
								sm:flex-row sm:gap-16"
						>
							<CTAButton primary />
							<CTAButton />
						</div>
					</div>
					{/* RHS */}
					<div
						className="hidden
							sm:flex sm:flex-col sm:items-center sm:gap-32
								xl:w-100% xl:max-w-640"
					>
						<SponsorMeta />
						<div className="flex flex-wrap justify-center gap-16">
							{iota(5).map(index => (
								<Sponsor key={index} />
							))}
						</div>
					</div>
				</div>
			</header>
		</>
	)
}

//// ////////////////////////////////////////////////////////////////////////////////
////
//// //// function MainContents() {
//// //// 	return (
//// //// 		<>
//// //// 			<div
//// //// 				// Use z-* here because of masks
//// //// 				className="sticky top-0 z-10
//// //// 					2xl:top-[var(--inset-y)]"
//// //// 			>
//// //// 				<div>Hello, world!</div>
//// //// 			</div>
//// //// 			{/* {iota(100).map(index => (
//// //// 				<div key={index}>Hello</div>
//// //// 			))} */}
//// //// 			<LayoutSearchResults />
//// //// 		</>
//// //// 	)
//// //// }
////
//// ////////////////////////////////////////////////////////////////////////////////
////
//// //// function AsideContents() {
//// //// 	return (
//// //// 		<>
//// //// 			<div
//// //// 				// Use z-* here because of masks
//// //// 				className="sticky top-0 z-10
//// //// 					2xl:top-[var(--inset-y)]"
//// //// 			>
//// //// 				<SidebarContents />
//// //// 			</div>
//// //// 			{/* <div>Hello, world!</div>
//// //// 			<div>Hello, world!</div>
//// //// 			<div>Hello, world!</div> */}
//// //// 		</>
//// //// 	)
//// //// }
////
//// ////////////////////////////////////////////////////////////////////////////////

function SEO({ name }: { name?: keyof typeof manifest }) {
	useEffect(() => {
		if (name !== undefined) { return } // prettier-ignore
		document.title = "Feather"
	}, [name])

	return (
		<Head>
			{/* SEO */}
			<title>{name === undefined ? "Feather – Simply beautiful open source icons" : `Icon: ${name}`}</title>
			<meta name="description" content="Feather is a collection of simply beautiful open source icons. Each icon is designed on a 24x24 grid with an emphasis on simplicity, consistency and readability." />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href={`/feather/${toKebabCase(name ?? "Feather")}.svg`} />

			{/* SEO / Facebook */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://feathericons.dev" />
			<meta property="og:title" content="Feather – Simply beautiful open source icons" />
			<meta property="og:description" content="Feather is a collection of simply beautiful open source icons. Each icon is designed on a 24x24 grid with an emphasis on simplicity, consistency and readability." />
			<meta property="og:image" content="https://feathericons.dev/feather-og.png" />

			{/* SEO / Twitter */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://feathericons.dev" />
			<meta property="twitter:title" content="Feather – Simply beautiful open source icons" />
			<meta property="twitter:description" content="Feather is a collection of simply beautiful open source icons. Each icon is designed on a 24x24 grid with an emphasis on simplicity, consistency and readability." />
			<meta property="twitter:image" content="https://feathericons.dev/feather-og.png" />
		</Head>
	)
}

export function Layout({ name }: Partial<IconProps>) {
	//// const sm = useBreakpoint(640)
	//// const lg = useBreakpoint(1024, { initialValue: true })
	////
	//// const [showSidebar, setShowSidebar] = useState(!lg)
	////
	//// useEffect(() => {
	//// 	if (!sm) { setShowSidebar(false) } // prettier-ignore
	//// 	if (!lg) { setShowSidebar(true)  } // prettier-ignore
	//// 	setShowSidebar(false)
	//// }, [lg, sm])

	return (
		<>
			{/* SEO */}
			<SEO />

			{/* App */}
			<Header />
			<BgMask />
			<FgMask />
			<div
				className="flex justify-center
					2xl:px-[var(--inset-x)]"
			>
				<div
					className="flex min-h-[var(--computed-app-min-h)] w-100% max-w-[var(--app-w)] bg-white
						2xl:rounded-[var(--rounding)] 2xl:[box-shadow:_var(--shadow-4)]"
				>
					{/* LHS */}
					<main className="grow">
						<div
							// Use z-* here because of masks
							className="sticky top-0 z-10
								2xl:top-[var(--inset-y)]"
						>
							{/* TODO */}
							<div>Hello, world!</div>
						</div>
						<div className="p-48 pb-64">
							<SearchResultsContents />
						</div>
					</main>
					{/* RHS */}
					<aside className="w-[var(--aside-w)] [box-shadow:_var(--hairline-shadow-l)]">
						<div
							// Use z-* here because of masks
							className="sticky top-0 z-10
								2xl:top-[var(--inset-y)]"
						>
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
