const plugin = require("tailwindcss/plugin")
const defaultTheme = require("./tailwind.default-theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.tsx"],
	corePlugins: {
		// Noop composition for box-shadow
		boxShadow:       false,
		boxShadowColor:  false,
		ringColor:       false,
		ringOffsetColor: false,
		ringOffsetWidth: false,
		ringOpacity:     false,
		ringWidth:       false,
	},
	experimental: {
		optimizeUniversalDefaults: true,
	},
	future: {
		// Noop composition for color, background-color
		disableColorOpacityUtilitiesByDefault: true,
		hoverOnlyWhenSupported: true,
	},
	theme: {
		...defaultTheme,
		extend: {
			screens: {
				"2xl": `${1536 + 16}px`,
			},
		},
	},
	plugins: [
		plugin(function ({ matchUtilities }) {
			return matchUtilities({
				"shadow": value => ({
					boxShadow: value,
				}),
			})
		}),
	],
}
