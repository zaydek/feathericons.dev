import "../css/_index.scss"
import "../css/_tailwind.css"

import { AppProps } from "next/app"

import { Fira_Code, Inter } from "@next/font/google"
import { Layout } from "../layout"
import { detab } from "../lib/format"
import { ShikiProvider } from "../shiki"
import { StateProvider } from "../state"
import { IconProps } from "./[icon]"

const sans = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
})

const code = Fira_Code({
	subsets: ["latin"],
	variable: "--font-fira-code",
})

export default function App({ pageProps }: AppProps<Partial<IconProps>>) {
	const name = pageProps.name

	return (
		<>
			{/* prettier-ignore */}
			<style dangerouslySetInnerHTML={{__html: detab(`
				:root, ::before, ::after {
					--sans: ${sans.style.fontFamily};
					--code: ${code.style.fontFamily};
					font-family: var(--sans);
				}
				pre, code {
					font-family: var(--code);
					tab-size: 2;
				}
			`)}} />
			<ShikiProvider>
				<StateProvider>
					<Layout name={name} />
				</StateProvider>
			</ShikiProvider>
		</>
	)
}
