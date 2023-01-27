const plugin = require("tailwindcss/plugin")

const { percents, sizes, zIndexes } = require("./tailwind.config.tokens")

const cornersConfig = {
	tr: ["top", "right"],
	br: ["bottom", "right"],
	bl: ["bottom", "left"],
	tl: ["top", "left"],
}

// https://tailwindcss.com/docs/plugins
const cornersPlugin = plugin(function ({ addUtilities, matchUtilities, addComponents, matchComponents, addBase, addVariant, matchVariant, theme, config, corePlugins, e }) {
	const newUtilities = {}
	for (const [shorthand, props] of Object.entries(cornersConfig)) {
		for (const [k, v] of Object.entries(theme("spacing"))) {
			newUtilities[e(`${shorthand}-${k}`)] = props.reduce((acc, prop) => {
				acc[prop] = v
				return acc
			}, {})
		}
	}
	addUtilities(newUtilities)
})

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.tsx"],
	theme: {
		fontFamily: {
			sans: "var(--sans)",
			code: "var(--code)",
		},
		borderRadius: { ...sizes, ...percents }, // prettier-ignore
		maxHeight:    { ...sizes, ...percents }, // prettier-ignore
		maxWidth:     { ...sizes, ...percents }, // prettier-ignore
		minHeight:    { ...sizes, ...percents }, // prettier-ignore
		minWidth:     { ...sizes, ...percents }, // prettier-ignore
		spacing:      { ...sizes, ...percents }, // prettier-ignore
		zIndex:       zIndexes, // prettier-ignore
		extend: {
			screens: {
				// FIXME: Hmm...
				"2xl": `${1536 + 16 * 2 + 16}px`,
			},
		},
	},
	plugins: [
		//// plugin(function ({ addUtilities, matchUtilities, addComponents, matchComponents, addBase, addVariant, matchVariant, theme, config, corePlugins, e }) {
		plugin(function ({ addUtilities, theme, e }) {
			const newUtilities = {}
			for (const [shorthand, props] of Object.entries(cornersConfig)) {
				for (const [k, v] of Object.entries(theme("spacing"))) {
					newUtilities[`.${e(`${shorthand}-${k}`)}`] = props.reduce((acc, prop) => {
						acc[prop] = v
						return acc
					}, {})
				}
			}
			addUtilities(newUtilities)
		}),
	],
}
