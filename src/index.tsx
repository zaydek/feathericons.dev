import "the-new-css-reset"

import "@/css/base.sass"
import "@/css/input-checkbox.sass"
import "@/css/input-range.sass"

import { LayoutProvider, RangeProvider, SearchProvider } from "@/providers"
import { createRoot } from "react-dom/client"
import { App } from "./app"

function ProvidedApp() {
	return (
		<LayoutProvider>
			<SearchProvider>
				<RangeProvider>
					<App />
				</RangeProvider>
			</SearchProvider>
		</LayoutProvider>
	)
}

createRoot(document.getElementById("root")!).render(<ProvidedApp />)
