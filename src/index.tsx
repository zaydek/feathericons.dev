import "the-new-css-reset"

import "@/css/index.sass"

import { createRoot } from "react-dom/client"
import { App } from "./app"

createRoot(document.getElementById("root")!).render(<App />)
