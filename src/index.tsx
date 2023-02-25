import "the-new-css-reset"

import "@/css/index.sass"

import { SidebarProvider } from "@/components/layout"
import { PropsWithChildren } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./app"

function ProvidedApp({ children }: PropsWithChildren) {
	return (
		<SidebarProvider>
			<App />
		</SidebarProvider>
	)
}

createRoot(document.getElementById("root")!).render(<ProvidedApp />)
