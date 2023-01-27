import "../css/_index.scss"
import "../css/_tailwind.css"

import { AppProps } from "next/app"

// TODO: Move to _document.tsx?
//// import { Fira_Code, Inter } from "@next/font/google"
import { AriaSimpleDropDown, AriaSimpleDropDownItem } from "../aria/aria-simple-dropdown"
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
	//// const [open, setOpen] = useState(false)

	return (
		<div className="flex h-screen items-center justify-center bg-gray-200">
			<AriaSimpleDropDown className="flex w-640 flex-col gap-8 rounded-32 bg-white p-16 shadow">
				<AriaSimpleDropDownItem className="flex h-32 items-center rounded-1e3 bg-gray-100 px-16 aria-selected:bg-gray-200">
					<div>foo</div>
				</AriaSimpleDropDownItem>
				<AriaSimpleDropDownItem className="flex h-32 items-center rounded-1e3 bg-gray-100 px-16 aria-selected:bg-gray-200">
					<div>bar</div>
				</AriaSimpleDropDownItem>
				<AriaSimpleDropDownItem className="flex h-32 items-center rounded-1e3 bg-gray-100 px-16 aria-selected:bg-gray-200">
					<div>baz</div>
				</AriaSimpleDropDownItem>
				<AriaSimpleDropDownItem className="flex h-32 items-center rounded-1e3 bg-gray-100 px-16 aria-selected:bg-gray-200">
					<div>qux</div>
				</AriaSimpleDropDownItem>
			</AriaSimpleDropDown>
		</div>
	)

	//// const name = pageProps.name
	////
	//// return (
	//// 	<ShikiProvider>
	//// 		<StateProvider>
	//// 			{/* <SharedApp name={name} /> */}
	//// 			<Layout />
	//// 		</StateProvider>
	//// 	</ShikiProvider>
	//// )
}
