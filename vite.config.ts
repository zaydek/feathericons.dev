import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [react()],
	resolve: {
		// Must use /dir syntax for Vite 🤷‍♂️
		alias: {
			"@": "/src",
			"@icons/feather": "/icons/feather/production/tsx/index.ts",
			"@icons/wolf-kit/brands": "/icons/wolf-kit/production/brands/tsx/index.ts",
			"@icons/wolf-kit/payments": "/icons/wolf-kit/production/payments/tsx/index.ts",
		},
	},
	preview: { host: true, port: 3000 },
	server:  { host: true, port: 3000 }, // prettier-ignore
})
