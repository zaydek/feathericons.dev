import "../css/_index.scss"
import "../css/_tailwind.css"

import { AppProps } from "next/app"
import { ShikiProvider } from "../shiki"
import { StateProvider } from "../state"

// TODO: Move to _document.tsx?
//// import { Fira_Code, Inter } from "@next/font/google"
import { Layout } from "../layout"
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
				<Layout />
			</StateProvider>
		</ShikiProvider>
	)
}
