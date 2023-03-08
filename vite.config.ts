import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": "/src",
			"@icons/feather": "/icons/feather/production",
			"@icons/wk": "/icons/wk/production",
			"@scripts/utils": "/scripts/utils/index.ts",
		},
	},
	preview: { host: true, port: 3000 },
	server:  { host: true, port: 3000 }, // prettier-ignore
})
