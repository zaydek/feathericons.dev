import "the-new-css-reset"

import "@/css/base.sass"
import "@/css/input-checkbox.sass"
import "@/css/input-range.sass"

import { SidebarProvider } from "@/components"
import { createRoot } from "react-dom/client"
import { App } from "./app"
import { StateProvider } from "./state"

function ProvidedApp() {
	return (
		<SidebarProvider>
			<StateProvider>
				<App />
			</StateProvider>
		</SidebarProvider>
	)
}

createRoot(document.getElementById("root")!).render(<ProvidedApp />)
