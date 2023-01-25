import Head from "next/head"
import Link, { LinkProps } from "next/link"
import { PropsWithChildren, useEffect, useState } from "react"
import { toKebabCase } from "./lib/cases"
import { iota } from "./lib/iota"
import { IconProps } from "./pages/[icon]"

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

//// function useBreakpoint(minWidth: number) {
//// 	const [matches, setMatches] = useState(typeof window === "undefined" ? true : window.innerWidth >= minWidth)
//// 	useEffect(() => {
//// 		const media = window.matchMedia(`(min-width: ${minWidth}px)`)
//// 		media.addEventListener("change", e => {
//// 			setMatches(e.matches)
//// 		})
//// 	}, [minWidth])
//// 	return matches
//// }

function Breakpoint({ minWidth, initial, children }: PropsWithChildren<{ minWidth: number; initial?: boolean }>) {
	const [matches, setMatches] = useState(initial ?? false)

	useEffect(() => {
		const media = window.matchMedia(`(min-width: ${minWidth}px)`)
		media.addEventListener("change", e => {
			setMatches(e.matches)
		})
	}, [minWidth])

	if (matches) {
		return <>{children}</>
	} else {
		return null
	}
}

export function SharedApp({ name }: Partial<IconProps>) {
	// Shorten <title>
	useEffect(() => {
		if (name !== undefined) { return } // prettier-ignore
		document.title = "Feather"
	}, [name])

	return (
		<>
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

			<Breakpoint minWidth={0} initial>
				{/* <header> */}
				{/* Use z-* here */}
				<div className="relative z-10">
					<div className="h-[var(--header-h)] bg-[#1570fb]">
						{/* ... */}
						{/* ... */}
					</div>
				</div>
				<div className="fixed top-0 right-0 left-0 hidden 2xl:block">
					<div className="h-[var(--header-h)] bg-[#1570fb]"></div>
					<div className="mx-[-10%] h-[var(--header-backdrop-h)] rounded-b-[100%] bg-[#1570fb]"></div>
				</div>
				{/* Use z-* here */}
				<div className="sticky top-0 z-10 hidden 2xl:block">
					<div className="flex justify-center">
						<div className="relative">
							<div className="h-[calc(var(--inset-x)_+_var(--rounding))] w-[calc(var(--inset-x)_+_var(--rounding))] bg-[#1570fb]"></div>
							<div className="absolute bottom-0 right-0">
								<div className="h-[var(--rounding)] w-[var(--rounding)] rounded-tl-1e3 bg-white"></div>
							</div>
						</div>
						<div className="h-[var(--inset-y)] basis-[calc(var(--main-w)_-_var(--rounding)_*_2)] bg-[#1570fb]"></div>
						<div className="relative">
							<div className="h-[calc(var(--inset-x)_+_var(--rounding))] w-[calc(var(--inset-x)_+_var(--rounding))] bg-[#1570fb]"></div>
							<div className="absolute bottom-0 left-0">
								<div className="h-[var(--rounding)] w-[var(--rounding)] rounded-tr-1e3 bg-white"></div>
							</div>
						</div>
					</div>
				</div>
				{/* <main> */}
				<main className="relative top-0 2xl:-top-[var(--rounding)]">
					<div className="flex justify-center 2xl:px-[var(--inset-x)]">
						<div className="flex basis-[var(--main-w)] bg-white [box-shadow:_var(--shadow-2)] 2xl:rounded-[var(--rounding)]">
							<div className="grow">
								{iota(1e3).map(key => (
									<div key={key}>Hello {key}</div>
								))}
							</div>
							<div className="w-[var(--sidebar-w)]">
								<div className="sticky top-[var(--inset-y)]">
									<div>Hello</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</Breakpoint>
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
