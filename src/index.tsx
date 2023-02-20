// CSS reset
import "the-new-css-reset"

// CSS variables
import "@/css/tailwind-colors.scss"

// CSS
import "@/css/base.scss"
import "@/css/index.scss"

// Form
import "@/css/form-checkbox.scss"
import "@/css/form-slider.scss"

import { createRoot } from "react-dom/client"
import { App } from "./app"

createRoot(document.getElementById("root")!).render(<App />)
