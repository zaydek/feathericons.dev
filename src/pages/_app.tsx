import "the-new-css-reset"

// Base
import "../css/base.scss"
import "../css/vars-2.scss"

// Typography
import "../css/prose.scss"
import "../css/typography.scss"

import "../css/globals.scss"
import "../css/tailwind.css"

import { AppProps } from "next/app"
import { StateProvider } from "../state"

export default function App({ pageProps, Component }: AppProps) {
	return (
		<StateProvider>
			{/* TODO: Remove debug JSON */}
			{/* <SharedApp {...pageProps}>{JSON.stringify(pageProps, null, 2)}</SharedApp> */}
			<Component />
		</StateProvider>
	)
}
