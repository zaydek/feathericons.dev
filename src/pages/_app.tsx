//// // TODO: Move to _document.tsx?
//// import "../css/tailwind-custom-base.css"
//// import "../css/tailwind.css"
////
//// import "../css/misc.scss"
//// import "../css/type.scss"
//// import "../css/vars-layout.scss"
//// import "../css/vars.scss"

import "the-new-css-reset"

import "../css/base.scss"
import "../css/masks.scss"
import "../shared-app-2.scss"

import "../css/tailwind.css"

import { AppProps } from "next/app"
import { ShikiProvider } from "../shiki"
import { StateProvider } from "../state"

// TODO: Move to _document.tsx?
//// import { Fira_Code, Inter } from "@next/font/google"
import { SharedApp2 } from "../shared-app-2"
import { IconProps } from "./[icon]"

//// // TODO
//// const inter = Inter({
//// 	subsets: ["latin"],
//// 	variable: "--font-inter",
//// })
////
//// // TODO
//// const firaCode = Fira_Code({
//// 	subsets: ["latin"],
//// 	variable: "--font-fira-code",
//// })

export default function App({ pageProps }: AppProps<Partial<IconProps>>) {
	const name = pageProps.name

	return (
		<ShikiProvider>
			<StateProvider>
				{/* <SharedApp name={name} /> */}
				<SharedApp2 />
			</StateProvider>
		</ShikiProvider>
	)
}
