import { App } from "./app"

import { renderToString } from "react-dom/server"

console.log(renderToString(<App path="/foo/bar" />))
