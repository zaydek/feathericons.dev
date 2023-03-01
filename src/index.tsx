import "the-new-css-reset"

import "@/css/base.sass"
import "@/css/input-checkbox.sass"
import "@/css/input-range.sass"

import { ProgresssBar } from "@/components"
import { LayoutProvider, ProgressBarProvider, RangeProvider, SearchProvider } from "@/state"
import { createRoot } from "react-dom/client"
import { App } from "./app"

function ProvidedApp() {
	return (
		<ProgressBarProvider>
			<ProgresssBar />
			<LayoutProvider>
				<SearchProvider>
					<RangeProvider>
						<App />
					</RangeProvider>
				</SearchProvider>
			</LayoutProvider>
		</ProgressBarProvider>
	)
}

createRoot(document.getElementById("root")!).render(<ProvidedApp />)
