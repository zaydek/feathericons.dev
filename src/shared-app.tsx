import Head from "next/head"
import Link, { LinkProps } from "next/link"
import { PropsWithChildren, useEffect } from "react"
import { manifest } from "./data/react-feather-manifest"
import { toKebabCase } from "./lib/cases"
import { IconProps } from "./pages/[icon]"

function OrangeLink({ children, ...props }: PropsWithChildren<LinkProps>) {
	return (
		<Link className="flex h-24 items-center bg-[orange] px-12" {...props}>
			{children}
		</Link>
	)
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

			{/* Home */}
			<div className="p-16">
				<nav className="flex flex-wrap gap-4">
					<OrangeLink href="/" aria-label="Navigate to home">
						<div>Home</div>
					</OrangeLink>
					{Object.keys(manifest).map(name => (
						<OrangeLink key={name} href={`/${toKebabCase(name)}`} aria-label={`Navigate to /${toKebabCase(name)}`}>
							<div>{name}</div>
						</OrangeLink>
					))}
				</nav>
			</div>

			{/* Docs */}
			{JSON.stringify({ name }, null, 2)}
			{/* {kebabCase === undefined ? (
				<RouteTransition>
					<SearchApp />
				</RouteTransition>
			) : (
				<Docs name={titleCase as any} />
			)} */}
		</>
	)
}
