import "./css/index.sass"

import { createRoot } from "react-dom/client"
import { App } from "./app"
import { ProgresssBar } from "./components"
import { AppStateProvider, LayoutProvider, ProgressBarProvider, ShikiProvider, ThemeProvider } from "./providers"

function ProvidedApp() {
	return (
		<ThemeProvider>
			<ProgressBarProvider>
				<ProgresssBar />
				<ShikiProvider>
					<LayoutProvider>
						<AppStateProvider>
							<App />
						</AppStateProvider>
					</LayoutProvider>
				</ShikiProvider>
			</ProgressBarProvider>
		</ThemeProvider>
	)
}

//// const root = createRoot(document.getElementById("root")!)
//// root.render(<ProvidedApp />)

// Vite hack
if (import.meta.env.DEV) {
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
