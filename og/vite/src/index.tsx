import "./tw.css"

import * as feather from "../../../src/data/react-feather"

import { createRoot } from "react-dom/client"
import { Icon } from "../../../src/lib/react/icon"

// https://support.wix.com/en/article/wix-editor-recommended-ogimage-size
function OgImage() {
	return (
		<div id="ig" className="flex h-100% items-center justify-center bg-[rgb(59,_134,_247)]">
			{/* <Icon className="h-256 w-256 text-white [filter:_drop-shadow(0px_16px_32px_#0007)]" icon={feather.Feather} /> */}
			<Icon className="h-256 w-256 text-white" icon={feather.Feather} />
		</div>
	)
}

function App() {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="h-[630px] w-[1200px]">
				<OgImage />
			</div>
		</div>
	)
}

createRoot(document.getElementById("root")!).render(<App />)
