const plugin = require("tailwindcss/plugin")

const { percents, sizes, zIndexes } = require("./tailwind.config.tokens")

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
				// E.g. $app-w + $windows-scrollbar-width
				"2xl": `${1536 + 16}px`,
			},
		},
	},
	plugins: [],
}
