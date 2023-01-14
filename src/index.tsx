import "the-new-css-reset"

import "./css/base.scss"
import "./css/vars.scss"

import "uno.css"

import { createRoot, hydrateRoot } from "react-dom/client"
import { ProvidedSearchApp } from "./search-app"
//// import { App } from "./app"

const root = document.getElementById("root")!
if (import.meta.env.DEV) {
	console.log("[DEBUG] createRoot")
	//// createRoot(root).render(<App initialPath={window.location.pathname} />)
	createRoot(root).render(<ProvidedSearchApp />)
} else {
	console.log("[DEBUG] hydrateRoot")
	//// hydrateRoot(root, <App initialPath={window.location.pathname} />)
	hydrateRoot(root, <ProvidedSearchApp />)
}
