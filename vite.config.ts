import reactJs from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [reactJs()],
	preview: { host: true, port: 3000 },
	server:  { host: true, port: 3000 },
})
