import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": "/src",
			"@icons/feather/manifest.json": "/icons/feather/production/manifest.json",
			"@icons/feather": "/icons/feather/production/tsx/index.ts",
			"@icons/wolf-kit/brands/manifest.json": "/icons/wolf-kit/production/brands/manifest.json",
			"@icons/wolf-kit/brands": "/icons/wolf-kit/production/brands/tsx/index.ts",
			"@icons/wolf-kit/payments/manifest.json": "/icons/wolf-kit/production/payments/manifest.json",
			"@icons/wolf-kit/payments": "/icons/wolf-kit/production/payments/tsx/index.ts",
		},
	},
	preview: { host: true, port: 3000 },
	server:  { host: true, port: 3000 }, // prettier-ignore
})
