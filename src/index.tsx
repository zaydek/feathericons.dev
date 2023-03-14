import "the-new-css-reset"

import "@/css/base.sass"
import "@/css/components/index.sass"
import "@/css/form/index.sass"

import { App } from "@/app"
import { ProgresssBar } from "@/components"
import {
	ClipboardProvider,
	ProgressBarProvider,
	RangeProvider,
	SearchProvider,
	ShikiProvider,
	SidebarProvider,
} from "@/providers"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRoot } from "react-dom/client"

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			networkMode: "offlineFirst",
		},
	},
})

function ProvidedApp() {
	return (
		<QueryClientProvider client={queryClient}>
			<ProgressBarProvider>
				<ProgresssBar />
				<ShikiProvider>
					<SidebarProvider>
						<SearchProvider>
							<RangeProvider>
								<ClipboardProvider>
									<App />
								</ClipboardProvider>
							</RangeProvider>
						</SearchProvider>
					</SidebarProvider>
				</ShikiProvider>
			</ProgressBarProvider>
		</QueryClientProvider>
	)
}

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
