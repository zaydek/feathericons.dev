import "the-new-css-reset"

import "@/css/base.sass"
import "@/css/components/index.sass"
import "@/css/form/index.sass"

import { App } from "@/app"
import { ProgresssBar } from "@/components"
import {
	ClipboardProvider,
	LayoutProvider,
	ProgressBarProvider,
	RangeProvider,
	SearchProvider,
	ShikiProvider,
} from "@/state"
import { createRoot } from "react-dom/client"

function ProvidedApp() {
	return (
		<ProgressBarProvider>
			<ProgresssBar />
			<ShikiProvider>
				<LayoutProvider>
					<SearchProvider>
						<RangeProvider>
							<ClipboardProvider>
								<App />
							</ClipboardProvider>
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
	window.addEventListener(
		"DOMContentLoaded",
		e => {
			if (!container) {
				const root = createRoot(document.getElementById("root")!)
				root.render(<ProvidedApp />)
			}
		},
		false,
	)
} else {
	const root = createRoot(document.getElementById("root")!)
	root.render(<ProvidedApp />)
}
