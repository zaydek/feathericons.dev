import { createRoot } from "react-dom/client"

function App() {
	return <>
		<div>Hello, world!</div>
	</>
}

createRoot(document.getElementById("root")!)
	.render(<App />)
