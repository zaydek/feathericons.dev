import "../css/_index.scss"
import "../css/_tailwind.css"

import "../css/uno.generated.css"

import { Fira_Code, Inter } from "@next/font/google"
import { AppProps } from "next/app"
import { detab } from "../lib/format"
import { IconProps } from "./[icon]"

const sans = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
})

const code = Fira_Code({
	subsets: ["latin"],
	variable: "--font-fira-code",
})

export default function App({ pageProps: { name } }: AppProps<Partial<IconProps>>) {
	return (
		<>
			{/* prettier-ignore */}
			<style dangerouslySetInnerHTML={{
				__html: "\n" + detab(`
				:root, ::before, ::after {
					--sans: ${sans.style.fontFamily};
					--code: ${code.style.fontFamily};
				}
			`).replaceAll("\t", "  ") + "\n"
			}} />

			{/* <div className="flex items-center justify-center h-[100vh]">
				<div className="flex items-{center} gap-8 px-20 h-40 rounded-1e3 bg-[orange]">
					<div className="size-16 rounded-1e3 bg-[#fff}"></div>
					<div className="font-[600] size-[12px] tracking-[0.05em] text-{#fff}">HELLO, WORLD</div>
				</div>
			</div> */}

			{/* <div className="flex justify-content-{center} align-items-{center} h-100vh">
				<div className="group/lol flex align-items-{center} g-16 px-20 h-40 rounded-1e3 background-color-{orange}">
					<div className="lt-md:color-{red} @hover:active:color-{red} size-16 rounded-1e3 background-color-{#fff}"></div>
					<div className="font-weight-{600} font-size-{12px} letter-spacing-{0.05em} color-{#fff}">HELLO, WORLD</div>
				</div>
			</div> */}

			<div className="flex justify-content-[center] align-items-[center] h-100vh">
				<div className="group/lol flex align-items-[center] g-16 px-20 h-40 rounded-1e3 background-color-[orange]">
					<div className="lt-md:color-[red] @hover:active:color-[red] size-16 rounded-1e3 background-color-[#fff]"></div>
					<div className="font-weight-[600] font-size-[12px] letter-spacing-[0.05em] color-[#fff]">HELLO, WORLD</div>
				</div>
			</div>
		</>
	)

	//// return (
	//// 	<>
	//// 		{/* prettier-ignore */}
	//// 		<style dangerouslySetInnerHTML={{ __html: "\n" + detab(`
	//// 			:root, ::before, ::after {
	//// 				--sans: ${sans.style.fontFamily};
	//// 				--code: ${code.style.fontFamily};
	//// 				font-family: var(--sans);
	//// 			}
	//// 			pre, code {
	//// 				font-family: var(--code);
	//// 				tab-size: 2;
	//// 			}
	//// 		`).replaceAll("\t", "  ") + "\n" }} />
	//// 		<ShikiProvider>
	//// 			<StateProvider>
	//// 				<Layout name={name} />
	//// 			</StateProvider>
	//// 		</ShikiProvider>
	//// 	</>
	//// )
}
