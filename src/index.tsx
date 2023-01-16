import "the-new-css-reset"

import "./css/base.scss"
import "./css/vars.scss"

import "uno.css"

import { createRoot } from "react-dom/client"
import { ProvidedApp } from "./search-app"
//// import { App } from "./app"

const root = document.getElementById("root")!
if (import.meta.env.DEV) {
	console.log("[DEBUG] createRoot")
	//// createRoot(root).render(<App initialPath={window.location.pathname} />)
	createRoot(root).render(<ProvidedApp />)
} else {
	console.log("[DEBUG] hydrateRoot")
	//// hydrateRoot(root, <App initialPath={window.location.pathname} />)
	//// hydrateRoot(root, <ProvidedApp />)
	createRoot(root).render(<ProvidedApp />)
}
