import Head from "next/head"
import Link, { LinkProps } from "next/link"
import { PropsWithChildren } from "react"
import { keys } from "./data/keys"
import { IconProps } from "./pages/[icon]"

function OrangeLink({ children, ...props }: PropsWithChildren<LinkProps>) {
	return (
		<Link className="flex h-24 items-center bg-[orange] px-12" {...props}>
			{children}
		</Link>
	)
}

export function SharedApp({ kebabCase, titleCase }: Partial<IconProps>) {
	return (
		<>
			{/* prettier-ignore */}
			{/* TODO: Hook up feather.svg to meta tags */}
			{/* Shouldn't kebabCase be optional because of home? */}
			<Head>
				{/* SEO */}
				<title>{kebabCase}</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />

				{/* SEO / Facebook */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://dapper-kataifi-254e93.netlify.app" />
				<meta property="og:title" content="Feather – Simply beautiful open source icons" />
				<meta property="og:description" content="Feather is a collection of simply beautiful open source icons. Each icon is designed on a 24x24 grid with an emphasis on simplicity, consistency and readability." />
				<meta property="og:image" content="https://dapper-kataifi-254e93.netlify.app/feather-og.png" />

				{/* SEO / Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://dapper-kataifi-254e93.netlify.app" />
				<meta property="twitter:title" content="Feather – Simply beautiful open source icons" />
				<meta property="twitter:description" content="Feather is a collection of simply beautiful open source icons. Each icon is designed on a 24x24 grid with an emphasis on simplicity, consistency and readability." />
				<meta property="twitter:image" content="https://dapper-kataifi-254e93.netlify.app/feather-og.png" />
			</Head>

			{/* Home */}
			<div className="p-16">
				<nav className="flex flex-wrap gap-4">
					<OrangeLink href="/" aria-label="Navigate to home">
						<div>Home</div>
					</OrangeLink>
					{keys.map(name => (
						<OrangeLink key={name} href={`/${name}`} aria-label={`Navigate to /${name}`}>
							<div>{name}</div>
						</OrangeLink>
					))}
				</nav>
			</div>

			{/* Docs */}
			{JSON.stringify({ kebabCase }, null, 2)}
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
