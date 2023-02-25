//// // CSS reset
//// import "the-new-css-reset"

//// import "@/css/idea.scss"

import "the-new-css-reset"

import "@/css/idea3.sass"

//// import "@/css/tailwind-colors.scss"
////
//// import "@/css/base.scss"
//// import "@/css/vars.scss"
////
//// import "@/css/form-checkbox.scss"
//// import "@/css/form-slider.scss"
////
//// import "@/css/tailwind.generated.css"

import { createRoot } from "react-dom/client"
import { App } from "./app"

createRoot(document.getElementById("root")!).render(<App />)
