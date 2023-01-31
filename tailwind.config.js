const plugin = require("tailwindcss/plugin")
const defaultTheme = require("./tailwind.default-theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.tsx", "./og/**/*.tsx"],
	corePlugins: {
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
		disableColorOpacityUtilitiesByDefault: true,
		hoverOnlyWhenSupported: true,
	},
	theme: {
		...defaultTheme,
		extend: {
			screens: {
				//// // TODO: Change to 500 for production?
				//// "xs":  "512px",
				"2xl": `${1792 + 16}px`,
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
