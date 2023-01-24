import "../css/tailwind.css"

import "../css/base.scss"
import "../css/misc.scss"
import "../css/type.scss"
//// import "../css/vars-2.scss"

import { AppProps } from "next/app"
//// import { SharedApp } from "../shared-app"
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
