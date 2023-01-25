import Head from "next/head"
import Link, { LinkProps } from "next/link"
import { PropsWithChildren, useEffect, useState } from "react"
import { manifest } from "./data/react-feather-manifest"
import { Docs } from "./docs"
import { toKebabCase } from "./lib/cases"
import { IconProps } from "./pages/[icon]"
import { SearchBar, SidebarFragment } from "./search-app"
import { Transition2 } from "./transition-2"

function OrangeLink({ children, ...props }: PropsWithChildren<LinkProps>) {
	return (
		<Link className="flex h-24 items-center bg-[orange] px-12" {...props}>
			{children}
		</Link>
	)
}

function ComponentA() {
	return <>Hello, world! A</>
}

function ComponentB() {
	return <>Hello, world! B</>
}

function useBreakpoint(minWidth: number, { initialValue }: { initialValue?: boolean } = {}) {
	const [matches, setMatches] = useState(initialValue ?? false)

	useEffect(() => {
		const media = window.matchMedia(`(min-width: ${minWidth}px)`)
		setMatches(media.matches)
		media.addEventListener("change", e => {
			setMatches(e.matches)
		})
	}, [minWidth])

	return matches
}

//// function Breakpoint({ minWidth, initial, children }: PropsWithChildren<{ minWidth: number; initial?: boolean }>) {
//// 	const [matches, setMatches] = useState(initial ?? false)
////
//// 	useEffect(() => {
//// 		const media = window.matchMedia(`(min-width: ${minWidth}px)`)
//// 		media.addEventListener("change", e => {
//// 			setMatches(e.matches)
//// 		})
//// 	}, [minWidth])
////
//// 	if (matches) {
//// 		return <>{children}</>
//// 	} else {
//// 		return null
//// 	}
//// }

function Meta({ name }: { name?: keyof typeof manifest }) {
	// Shorten <title>
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

export function SharedApp({ name }: Partial<IconProps>) {
	const sm = useBreakpoint(640)
	const lg = useBreakpoint(1024, { initialValue: true })

	const [showSidebar, setShowSidebar] = useState(!lg)

	useEffect(() => {
		if (!sm) { setShowSidebar(false) } // prettier-ignore
		if (!lg) { setShowSidebar(true)  } // prettier-ignore
		setShowSidebar(false)
	}, [lg, sm])

	//// return (
	//// 	<div className="flex justify-center">
	//// 		<div className="flex w-100% max-w-1536">
	//// 			<div className="min-w-0">
	//// 				<Docs name="Feather" />
	//// 			</div>
	//// 			<div className="min-w-400">
	//// 				<div>Hello</div>
	//// 			</div>
	//// 		</div>
	//// 	</div>
	//// )

	return (
		<>
			<Meta />

			{/* <header> */}
			<header className="hidden bg-[#1570fb] lg:block">
				{/* TODO */}
				<div className="h-640"></div>
			</header>

			{/* Use z-* here */}
			<div className="pointer-events-none sticky top-0 z-20 hidden 2xl:block">
				<div className="flex">
					{/* LHS */}
					<div className="h-[calc(var(--inset-y)_+_var(--rounding))] flex-1 bg-[#1570fb]"></div>
					<div className="relative">
						<div className="h-[calc(var(--inset-y)_+_var(--rounding))] w-[calc(var(--inset-x)_+_var(--rounding))] bg-[#1570fb]"></div>
						<div className="absolute bottom-0 right-0">
							<div className="h-[var(--rounding)] w-[var(--rounding)] rounded-tl-1e3 bg-white"></div>
						</div>
					</div>
					<div className="h-[var(--inset-y)] w-100% max-w-[calc(var(--main-w)_-_var(--rounding)_*_2)] bg-[#1570fb]"></div>
					{/* RHS */}
					<div className="relative">
						<div className="h-[calc(var(--inset-y)_+_var(--rounding))] w-[calc(var(--inset-x)_+_var(--rounding))] bg-[#1570fb]"></div>
						<div className="absolute bottom-0 left-0">
							<div className="h-[var(--rounding)] w-[var(--rounding)] rounded-tr-1e3 bg-white"></div>
						</div>
					</div>
					<div className="h-[calc(var(--inset-y)_+_var(--rounding))] flex-1 bg-[#1570fb]"></div>
				</div>
			</div>
			<div className="sticky top-[calc(var(--inset-y)_+_var(--rounding))] hidden 2xl:block">
				<div className="h-0">
					<div className="mx-[-10%] h-[var(--header-backdrop-h)] rounded-b-[100%] bg-[#1570fb]"></div>
				</div>
			</div>

			{/* <main> */}
			<main className="relative top-0 2xl:-top-[var(--rounding)]">
				<div className="flex justify-center 2xl:px-[var(--inset-x)]">
					<div
						//// className="flex min-h-[100dvh] w-100% max-w-[var(--main-w)] bg-white [box-shadow:_var(--shadow-4)]
						//// 	2xl:min-h-[110dvh] 2xl:rounded-[var(--rounding)]"
						className="flex min-h-[100dvh] w-100% max-w-[var(--main-w)] bg-white [box-shadow:_var(--shadow-4)] 2xl:min-h-[calc(100dvh_-_var(--rounding))]
							2xl:rounded-[var(--rounding)]"
					>
						{/* LHS */}
						{/* I seriously don't know a better way to manage width... */}
						<div className="min-w-0 flex-1">
							{/* <div className="sticky top-0 2xl:top-[var(--inset-y)]">
								<div>Hello, world!</div>
							</div> */}
							<div
								className="sticky top-0 z-10 h-[calc(var(--search-bar-h)_+_var(--inset-y)_*_4)] py-[calc(var(--inset-y)_*_2)] px-[calc(var(--rounding)_+_1px_*_2)]
									[background-image:_linear-gradient(to_bottom,_white_calc(var(--inset-y)_+_var(--search-bar-h)),_transparent)]
										2xl:top-[var(--inset-y)]"
							>
								<SearchBar />
							</div>
							{/* <RouteTransition>
								<div className="px-[var(--rounding)] pb-[calc(var(--rounding)_*_1.5)]">
									<SearchGridContents />
								</div>
							</RouteTransition> */}
							<div className="p-[var(--rounding)] pt-0 pb-[calc(var(--rounding)_*_2)]">
								<Docs name={name ?? "Feather"} />
							</div>
						</div>
						{/* RHS */}
						{/* I seriously don't know a better way to manage width... */}
						<div className="hidden w-[var(--sidebar-w)] [box-shadow:_var(--inset-hairline-shadow-l)] lg:block">
							<div className="sticky top-0 2xl:top-[var(--inset-y)]">
								<SidebarFragment />
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* <aside> */}
			<Transition2
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
					transform: "translateX(0)",
					opacity: 1,
				}}
				duration={300}
				ease={[0, 1, 1, 1]}
			>
				{/* Use flex to forward bounding box dimensions */}
				<aside className="fixed top-0 right-0 bottom-0 z-100 flex">
					<div className="w-[var(--sidebar-w)] bg-white [box-shadow:_var(--shadow-1)]">
						<SidebarFragment />
					</div>
				</aside>
			</Transition2>
		</>
	)
}

//// {/* {kebabCase === undefined ? (
//// 	<RouteTransition>
//// 		<SearchApp />
//// 	</RouteTransition>
//// ) : (
//// 	<Docs name={titleCase as any} />
//// )} */}
