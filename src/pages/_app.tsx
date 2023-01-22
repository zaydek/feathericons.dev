import "the-new-css-reset"
import "../css/base.scss"
import "../css/tailwind.css"

import { AppProps } from "next/app"
import { SharedApp } from "../shared-app"

export default function App({ pageProps }: AppProps) {
	return <SharedApp {...pageProps}>{JSON.stringify(pageProps, null, 2)}</SharedApp>
}
