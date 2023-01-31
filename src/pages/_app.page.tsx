import "../css/index.scss"
import "../css/tailwind.css"

import { Fira_Code, Inter } from "@next/font/google"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import Script from "next/script"
import { useEffect } from "react"
import { detab } from "../lib/format"
import { ShikiProvider } from "../providers/shiki"
import { StateProvider } from "../providers/state"
import { Layout } from "./layout"
import { Meta } from "./meta"
import { NameProps } from "./[name].page"

const GoogleFontsInter = Inter({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-inter",
	weight: ["400", "500", "600", "700", "800", "900"],
})

const GoogleFontsFiraCode = Fira_Code({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-fira-code",
	weight: ["400"],
})

function InlineGoogleFonts() {
	return (
		// prettier-ignore
		<style id="google-fonts" dangerouslySetInnerHTML={{
			__html: "\n" + detab(`
				:root, ::before, ::after {
					--sans: ${GoogleFontsInter.style.fontFamily};
					--code: ${GoogleFontsFiraCode.style.fontFamily};
				}
			`).replaceAll("\t", "  ") + "\n"
		}} />
	)
}

// https://github.com/vercel/next.js/issues/20951#issuecomment-1003746732
function InlineNoopScrollRestoration() {
	const router = useRouter()

	useEffect(() => {
		router.beforePopState(state => {
			state.options.scroll = false
			return true
		})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		// prettier-ignore
		<Script id="noop-scroll-restoration" dangerouslySetInnerHTML={{
			__html: "\n" + detab(`
				window.history.scrollRestoration = "manual"
			`) + "\n"
		}} />
	)
}

export default function App({ Component, pageProps }: AppProps<Partial<NameProps>>) {
	return (
		<>
			<InlineGoogleFonts />
			<InlineNoopScrollRestoration />
			<ShikiProvider>
				<StateProvider>
					<Meta {...pageProps} />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</StateProvider>
			</ShikiProvider>
		</>
	)
}
