import "./tw.generated.css"

import * as feather from "../../../src/data/react-feather"

import { createRoot } from "react-dom/client"
import { Icon } from "../../../src/lib/react/icon"

function OgImage() {
	return (
		<div className="relative h-100%">
			<div id="ig" className="flex h-100% items-center justify-center bg-[rgb(59,_134,_247)]">
				<div className="aspect-square h-[31.25%]">
					<Icon className="h-100% w-100% text-white" icon={feather.Feather} />
				</div>
			</div>
			<div className="contents" style={{ "--inset": "64px", "--size": "96px" } as any}>
				<div className="absolute top-[var(--inset)] right-[var(--inset)] bottom-auto left-auto">
					<Icon className="h-[var(--size)] w-[var(--size)] text-white" icon={feather.Plus} strokeLinecap="butt" />
				</div>
				<div className="absolute top-auto right-[var(--inset)] bottom-[var(--inset)] left-auto">
					<Icon className="h-[var(--size)] w-[var(--size)] text-white" icon={feather.Plus} strokeLinecap="butt" />
				</div>
				<div className="absolute top-auto right-auto bottom-[var(--inset)] left-[var(--inset)]">
					<Icon className="h-[var(--size)] w-[var(--size)] text-white" icon={feather.Plus} strokeLinecap="butt" />
				</div>
				<div className="absolute top-[var(--inset)] right-auto bottom-auto left-[var(--inset)]">
					<Icon className="h-[var(--size)] w-[var(--size)] text-white" icon={feather.Plus} strokeLinecap="butt" />
				</div>
			</div>
		</div>
	)
}

function App() {
	return (
		<div className="flex h-screen items-center justify-center">
			{/* https://support.wix.com/en/article/wix-editor-recommended-ogimage-size */}
			<div className="h-[630px] w-[1200px]">
				<OgImage />
			</div>
		</div>
	)
}

createRoot(document.getElementById("root")!).render(<App />)
