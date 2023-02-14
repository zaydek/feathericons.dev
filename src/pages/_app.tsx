import "../css2/base.css"

import "../css2/vars.scss"

import "../css2/data-bg-image.scss"

import { DM_Sans, Fira_Code, Inter } from "@next/font/google"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import Script from "next/script"
import { useEffect } from "react"
import { detab } from "../lib/format"
import { ShikiProvider } from "../providers/shiki"
import { NameProps } from "./[name]"

const fontDmSans = DM_Sans({
	display: "swap",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
})

const fontInter = Inter({
	display: "swap",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
})

const fontFiraCode = Fira_Code({
	display: "swap",
	subsets: ["latin"],
	weight: ["400"],
})

function InlineGoogleFonts() {
	return (
		// prettier-ignore
		<style id="google-fonts" dangerouslySetInnerHTML={{
			__html: "\n" + detab(`
				:root, ::before, ::after {
					--font-hero: ${fontDmSans.style.fontFamily};
					--font-sans: ${fontInter.style.fontFamily};
					--font-code: ${fontFiraCode.style.fontFamily};
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

export default function App({ Component: Page, pageProps }: AppProps<Partial<NameProps>>) {
	return (
		<>
			<InlineGoogleFonts />
			<InlineNoopScrollRestoration />
			<ShikiProvider>
				<Page {...pageProps} />
				{/* <StateProvider>
					<Meta {...pageProps} />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</StateProvider> */}
			</ShikiProvider>
		</>
	)
}
