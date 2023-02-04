import Head from "next/head"
import { manifest } from "../data/manifest"
import { convertToKebabCase, convertToSpaceCase } from "../lib/cases"

// prettier-ignore
const URL =
	"https://feathericons.com"

// prettier-ignore
const OG_URL = (name: keyof typeof manifest | "index") =>
	`https://feathericons.com/og/${convertToKebabCase(name).toLowerCase()}.png`

// prettier-ignore
const TITLE =
	"Feather – Simply beautiful open source icons"

// prettier-ignore
const DESCRIPTION =
	"Feather is a collection of simply beautiful open source icons. " +
	"Each icon is designed on a 24x24 grid with an emphasis on simplicity, consistency and readability."

export function Meta({ name }: { name?: keyof typeof manifest }) {
	return (
		<Head>
			{/* GOOG */}
			<title>{name === undefined ? TITLE : convertToSpaceCase(name)}</title>
			<meta name="description" content={DESCRIPTION} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href={`/feather/${convertToKebabCase(name ?? "Feather")}.svg`} />

			{/* TWTR */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={URL} />
			<meta property="twitter:title" content={TITLE} />
			<meta property="twitter:description" content={DESCRIPTION} />
			<meta property="twitter:image" content={OG_URL(name ?? "index")} />

			{/* META */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content={URL} />
			<meta property="og:title" content={TITLE} />
			<meta property="og:description" content={DESCRIPTION} />
			<meta property="og:image" content={OG_URL(name ?? "index")} />
		</Head>
	)
}