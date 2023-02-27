import "the-new-css-reset"

import "@/css/base.sass"
import "@/css/input-checkbox.sass"
import "@/css/input-range.sass"

import { SidebarProvider } from "@/components"
import { createRoot } from "react-dom/client"
import { App } from "./app"

function ProvidedApp() {
	return (
		<SidebarProvider>
			<App />
		</SidebarProvider>
	)
}

createRoot(document.getElementById("root")!).render(<ProvidedApp />)
