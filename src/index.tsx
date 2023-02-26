import "the-new-css-reset"

import "@/css/index.sass"

import { SidebarProvider } from "@/components/layout"
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
