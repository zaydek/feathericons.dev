import "../css/tailwind.css"

import "../css/misc.scss"
import "../css/type.scss"
import "../css/vars.scss"

import { AppProps } from "next/app"
import { SharedApp } from "../shared-app"
import { ShikiProvider } from "../shiki"
import { StateProvider } from "../state"

// TODO: Move to _document.tsx?
import { Fira_Code, Inter } from "@next/font/google"

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

export default function App({ pageProps, Component }: AppProps) {
	return (
		<ShikiProvider>
			<StateProvider>
				{/* TODO: Remove debug JSON */}
				<SharedApp {...pageProps}>{JSON.stringify(pageProps, null, 2)}</SharedApp>
			</StateProvider>
		</ShikiProvider>
	)
}
