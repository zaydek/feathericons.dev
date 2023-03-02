import "the-new-css-reset"

import "@/css/base.sass"
import "@/css/input-checkbox.sass"
import "@/css/input-range.sass"

import { ProgresssBar } from "@/components"
import { LayoutProvider, ProgressBarProvider, RangeProvider, SearchProvider, ShikiProvider } from "@/state"
import { createRoot } from "react-dom/client"
import { App } from "./app"

function ProvidedApp() {
	return (
		<ProgressBarProvider>
			<ShikiProvider>
				<ProgresssBar />
				<LayoutProvider>
					<SearchProvider>
						<RangeProvider>
							<App />
						</RangeProvider>
					</SearchProvider>
				</LayoutProvider>
			</ShikiProvider>
		</ProgressBarProvider>
	)
}

if (import.meta.env.DEV) {
	// Vite hack
	let container: HTMLElement | null = null
	document.addEventListener("DOMContentLoaded", e => {
		if (!container) {
			const root = createRoot(document.getElementById("root")!)
			root.render(<ProvidedApp />)
		}
	})
} else {
	const root = createRoot(document.getElementById("root")!)
	root.render(<ProvidedApp />)
}
