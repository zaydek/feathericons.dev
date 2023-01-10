import "the-new-css-reset"
import "uno.css"

import "./idea.css"

import { createRoot, hydrateRoot } from "react-dom/client"
import { App } from "./app"

const root = document.getElementById("root")!
if (typeof window === "undefined") {
	hydrateRoot(root, <App />)
} else {
	createRoot(root).render(<App />)
}
