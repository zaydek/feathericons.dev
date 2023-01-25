// TODO: Move to _document.tsx?
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

export default function App({ pageProps }: AppProps<Partial<IconProps>>) {
	const name = pageProps.name

	return (
		<ShikiProvider>
			<StateProvider>
				<SharedApp name={name} />
			</StateProvider>
		</ShikiProvider>
	)
}
