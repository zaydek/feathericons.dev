import "the-new-css-reset"

import "@/css/index.sass"

import { PropsWithChildren } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./app"
import { SidebarProvider } from "./layout"

function ProvidedApp({ children }: PropsWithChildren) {
	return (
		<SidebarProvider>
			<App />
		</SidebarProvider>
	)
}

createRoot(document.getElementById("root")!).render(<ProvidedApp />)
