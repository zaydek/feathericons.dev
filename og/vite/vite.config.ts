import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
	css: {
		// Disable PostCSS
		postcss: {
			plugins: [],
		},
	},
	plugins: [react()],
	server: {
		port: 3010,
	},
})
