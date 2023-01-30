import Head from "next/head"
import { useEffect } from "react"
import { manifest } from "../data/react-feather-manifest"
import { toKebabCase } from "../lib/cases"

// prettier-ignore
const URL =
	"https://feathericons.dev"

// prettier-ignore
const OG_URL =
	"https://feathericons.dev/feather-og.png"

// prettier-ignore
const TITLE =
	"Feather – Simply beautiful open source icons"

// prettier-ignore
const DESCRIPTION =
	"Feather is a collection of simply beautiful open source icons. Each icon is designed on a 24x24 grid with an emphasis on simplicity, consistency and readability."

export function Meta({ name }: { name?: keyof typeof manifest }) {
	useEffect(() => {
		if (name !== undefined) { return } // prettier-ignore
		document.title = "Feather"
	}, [name])

	return (
		<Head>
			{/* GOOG */}
			<title>{name === undefined ? TITLE : `Icon: ${name}`}</title>
			<meta name="description" content={DESCRIPTION} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href={`/feather/${toKebabCase(name ?? "Feather")}.svg`} />

			{/* TWTR */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={URL} />
			<meta property="twitter:title" content={TITLE} />
			<meta property="twitter:description" content={DESCRIPTION} />
			<meta property="twitter:image" content={OG_URL} />

			{/* META */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content={URL} />
			<meta property="og:title" content={TITLE} />
			<meta property="og:description" content={DESCRIPTION} />
			<meta property="og:image" content={OG_URL} />
		</Head>
	)
}
