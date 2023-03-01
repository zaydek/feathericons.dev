import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": "/src",
			"@icons/feather": "/icons/feather/production",
			"@icons/wolfkit": "/icons/wolfkit/production",
		},
	},
	preview: { host: true, port: 3000 },
	server:  { host: true, port: 3000 }, // prettier-ignore
})
