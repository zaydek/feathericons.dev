import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// prettier-ignore
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": "/src",
			"@icons/wolf-kit/payment": "/icons/wolf-kit/production/payment/tsx/index.ts",
			"@icons/wolf-kit/social-media": "/icons/wolf-kit/production/social-media/tsx/index.ts",
			"@icons/feather": "/icons/feather/production/tsx/index.ts",
		},
	},
	preview: { host: true, port: 3000 },
	server:  { host: true, port: 3000 },
})
