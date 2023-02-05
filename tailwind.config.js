const plugin = require("tailwindcss/plugin")
const defaultTheme = require("./tailwind.default-theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.tsx"],
	corePlugins: {
		boxShadow:      false,
		boxShadowColor: false,
	},
	// Optimization
	experimental: {
		optimizeUniversalDefaults: true,
	},
	// Optimization
	future: {
		disableColorOpacityUtilitiesByDefault: true,
		hoverOnlyWhenSupported: true,
	},
	theme: {
		...defaultTheme,
		extend: {
			screens: {
				// Use 16px for Windows scrollbar
				"2xl": `${1536 + 256 + 16}px`,
			},
		},
	},
	// See corePlugins
	plugins: [
		plugin(function ({ matchUtilities }) {
			return matchUtilities({
				"shadow": value => ({ boxShadow: value }),
			})
		}),
	],
}
