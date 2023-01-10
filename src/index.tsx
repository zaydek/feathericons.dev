import "the-new-css-reset"
import "./css/base.scss"
import "./css/vars.scss"
//// import "./css/_tailwind.generated.css"
import "uno.css"

import { createRoot, hydrateRoot } from "react-dom/client"
import { App } from "./app"

const root = document.getElementById("root")!
if (import.meta.env.DEV) {
	console.log("[DEBUG] createRoot")
	createRoot(root).render(<App initialPath={window.location.pathname} />)
} else {
	console.log("[DEBUG] hydrateRoot")
	hydrateRoot(root, <App initialPath={window.location.pathname} />)
}
