import { createRoot } from "react-dom/client"

// https://support.wix.com/en/article/wix-editor-recommended-ogimage-size
function OgImage() {
	return (
		<div className="h-[630px] w-[1200px] bg-red-500">
			<div>Hello, world!</div>
		</div>
	)
}

export function App() {
	return (
		<div className="flex h-screen items-center justify-center">
			<OgImage />
		</div>
	)
}

createRoot(document.getElementById("root")!).render(<App />)
