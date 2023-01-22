import "the-new-css-reset"

// Base
import "../css/base.scss"
import "../css/vars-2.scss"

// Typography
import "../css/typography.scss"

import "../css/globals.scss"
import "../css/tailwind.css"

import { AppProps } from "next/app"
import { SharedApp } from "../shared-app"
import { StateProvider } from "../state"

export default function App({ pageProps }: AppProps) {
	return (
		<StateProvider>
			{/* TODO: Remove debug JSON */}
			<SharedApp {...pageProps}>{JSON.stringify(pageProps, null, 2)}</SharedApp>
		</StateProvider>
	)
}
