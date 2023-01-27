import "../css/_index.scss"
import "../css/_tailwind.css"

import { AppProps } from "next/app"

// TODO: Move to _document.tsx?
//// import { Fira_Code, Inter } from "@next/font/google"
import { Layout } from "../layout"
import { ShikiProvider } from "../shiki"
import { StateProvider } from "../state"
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
	//// type Options = "foo" | "bar" | "baz" | "qux" | ""
	////
	//// const [show, setShow] = useState(false)
	//// const [currentId, setCurrentId] = useState<Options>("")
	////
	//// return (
	//// 	<div className="flex h-screen items-start justify-center bg-gray-200 py-256">
	//// 		<AriaSimpleDropDown<Options>
	//// 			className="flex w-448 flex-col gap-8 rounded-32 bg-white p-16 shadow
	//// 				focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-200"
	//// 			show={show}
	//// 			setShow={setShow}
	//// 			currentId={currentId}
	//// 			setCurrentId={setCurrentId}
	//// 		>
	//// 			<div className="p-16">Click me</div>
	//// 			{show && (
	//// 				<>
	//// 					<AriaSimpleDropDownItem<Options>
	//// 						id="foo"
	//// 						className="flex h-32 items-center rounded-1e3 bg-gray-100 px-16
	//// 							hover:bg-gray-200
	//// 							focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white
	//// 							hover:active:bg-blue-300
	//// 							aria-selected:bg-blue-300"
	//// 					>
	//// 						<div>foo</div>
	//// 					</AriaSimpleDropDownItem>
	//// 					<AriaSimpleDropDownItem<Options>
	//// 						id="bar"
	//// 						className="flex h-32 items-center rounded-1e3 bg-gray-100 px-16
	//// 							hover:bg-gray-200
	//// 							focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white
	//// 							hover:active:bg-blue-300
	//// 							aria-selected:bg-blue-300"
	//// 					>
	//// 						<div>bar</div>
	//// 					</AriaSimpleDropDownItem>
	//// 					<AriaSimpleDropDownItem<Options>
	//// 						id="baz"
	//// 						className="flex h-32 items-center rounded-1e3 bg-gray-100 px-16
	//// 							hover:bg-gray-200
	//// 							focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white
	//// 							hover:active:bg-blue-300
	//// 							aria-selected:bg-blue-300"
	//// 					>
	//// 						<div>baz</div>
	//// 					</AriaSimpleDropDownItem>
	//// 					<AriaSimpleDropDownItem<Options>
	//// 						id="qux"
	//// 						className="flex h-32 items-center rounded-1e3 bg-gray-100 px-16
	//// 							hover:bg-gray-200
	//// 							focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white
	//// 							hover:active:bg-blue-300
	//// 							aria-selected:bg-blue-300"
	//// 					>
	//// 						<div>qux</div>
	//// 					</AriaSimpleDropDownItem>
	//// 				</>
	//// 			)}
	//// 		</AriaSimpleDropDown>
	//// 	</div>
	//// )

	const name = pageProps.name

	return (
		<ShikiProvider>
			<StateProvider>
				{/* <SharedApp name={name} /> */}
				<Layout />
			</StateProvider>
		</ShikiProvider>
	)
}
