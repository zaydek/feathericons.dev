const {
	percents,
	sizes,
	zIndexes,
} = require("./tailwind.config.tokens")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.tsx"],
	theme: {
		fontFamily: {
			"sans": "var(--sans)",
			"code": "var(--code)",
		},
		borderRadius: { ...sizes, ...percents },
		maxHeight:    { ...sizes, ...percents },
		maxWidth:     { ...sizes, ...percents },
		minHeight:    { ...sizes, ...percents },
		minWidth:     { ...sizes, ...percents },
		spacing:      { ...sizes, ...percents },
		zIndex:       zIndexes,
		extend: {
			screens: {
				// $app-w + $inset-x * 2 + $windows-scrollbar-width (see masks.scss)
				"2xl": `${1536 + 16 * 2 + 16}px`,
			},
		},
	},
	plugins: [],
}
