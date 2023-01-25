import Head from "next/head"
import Link, { LinkProps } from "next/link"
import { PropsWithChildren, useEffect } from "react"
import { toKebabCase } from "./lib/cases"
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

			{/* Header */}
			<header className="h-320 bg-blue-500">
				{/* ... */}
				{/* ... */}
			</header>

			{/* Backdrop */}
			<div className="fixed top-0 right-0 left-0">
				<div className="h-320 bg-[green]"></div>
				<div className="mx-[-10%] h-320 rounded-b-[100%] bg-[green]"></div>
			</div>
			<div className="sticky top-0 z-10">
				<div className="flex justify-center">
					<div className="relative">
						<div className="h-64 w-64 bg-[orange]"></div>
						<div className="absolute bottom-0 right-0">
							<div className="h-32 w-32 rounded-tl-1e3 bg-[pink]"></div>
						</div>
					</div>
					<div className="h-32 w-[calc(2e3px_-_64px)] bg-[red]"></div>
					<div className="relative">
						<div className="h-64 w-64 bg-[orange]"></div>
						<div className="absolute bottom-0 left-0">
							<div className="h-32 w-32 rounded-tr-1e3 bg-[pink]"></div>
						</div>
					</div>
				</div>
			</div>

			{/* Main */}
			<main className="relative -top-32 flex justify-center">
				<div className="h-2e3 w-2e3 rounded-32 bg-white [box-shadow:_var(--shadow-2)]">
					{/* ... */}
					{/* ... */}
				</div>
			</main>
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
