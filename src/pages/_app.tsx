import "../css/_index.scss"
//// import "../css/_tailwind.css"
import "../css/uno.generated.css"

import { Fira_Code, Inter } from "@next/font/google"
import { AppProps } from "next/app"
import { detab } from "../lib/format"
import { iota } from "../lib/iota"
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

			{/* <div className="flex justify-content-[center] align-items-[center] h-100vh">
				<div className="group/lol flex align-items-[center] g-16 px-20 h-40 rounded-1e3 background-color-[orange]">
					<div className="group-hover/lol:color-[red] @hover:active:color-[red] size-16 rounded-1e3 background-color-[#fff]"></div>
					<div className="font-weight-[600] font-size-[12px] letter-spacing-[0.05em] color-[#fff]">HELLO, WORLD</div>
				</div>
			</div> */}

			{/* Header */}
			<div className="h-320 bg-[var(--theme-color)]"></div>
			{/* Backdrop */}
			{/* Use overflow-[hidden] ... -mx-10% */}
			<div className="sticky t-[var(--inset-y)] z-10">
				<div className="flex justify-content-[center] bg-[var(--red-500)]">
					{/* Merge relative here */}
					<div className="relative w-100% max-w-1536">
						{/* Background */}
						<div className="h-[var(--app-rounding)] w-100% max-w-1536">
							<div>Hello</div>
						</div>
						{/* Foreground */}
						<div className="absolute inset-t-0">
							<div className="h-[var(--app-rounding)] rounded-t-48 bg-[whitesmoke]"></div>
						</div>
					</div>
				</div>
			</div>
			<div className="overflow-[hidden]">
				<div className="-mx-10% h-160 rounded-b-50% bg-[var(--theme-color)]"></div>
			</div>
			<div className="flex justify-content-[center] -mt-160">
				<div className="flex w-100% max-w-1536px rounded-48 bg-[var(--white)] shadow-[var(--shadow-1)]">
					<div className="flex-grow-[1]">
						{iota(64).map(index => (
							<div key={index}>Hello</div>
						))}
					</div>
					<div className="min-w-[var(--aside-w)] max-w-[var(--aside-w)] shadow-[var(--hairline-shadow-l)]">
						{iota(10).map(index => (
							<div key={index}>Hello</div>
						))}
					</div>
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
