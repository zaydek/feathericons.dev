// TODO: Move to _document.tsx?
import "../css/tailwind.css"

import "../css/misc.scss"
import "../css/type.scss"
import "../css/vars.scss"

import { AppProps } from "next/app"
import { Head } from "next/document" // eslint-disable-line @next/next/no-document-import-in-page
import { toKebabCase } from "../lib/cases"
import { SharedApp } from "../shared-app"
import { ShikiProvider } from "../shiki"
import { StateProvider } from "../state"

// TODO: Move to _document.tsx?
import { Fira_Code, Inter } from "@next/font/google"
import { IconProps } from "./[icon]"

// TODO
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
})

// TODO
const firaCode = Fira_Code({
	subsets: ["latin"],
	variable: "--font-fira-code",
})

export default function App({ pageProps }: AppProps<undefined | IconProps>) {
	const name = pageProps?.name

	//// // Shorten <title>
	//// useEffect(() => {
	//// 	if (name !== undefined) { return } // prettier-ignore
	//// 	document.title = "Feather"
	//// }, [name])

	return (
		<>
			<Head>
				{/* SEO */}
				{/* eslint-disable-next-line @next/next/no-title-in-document-head */}
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
			<ShikiProvider>
				<StateProvider>
					<SharedApp name={name} />
				</StateProvider>
			</ShikiProvider>
		</>
	)
}
