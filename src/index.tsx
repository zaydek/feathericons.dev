import "the-new-css-reset"

import "@/css/base.sass"
import "@/css/section.sass"

import "@/css/input-checkbox.sass"
import "@/css/input-range.sass"

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
import { App } from "./app"

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
