const { percents, sizes, zIndexes } = require("./tailwind.config.tokens")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.tsx"],
	theme: {
		fontFamily: {
			"sans": "var(--sans)",
			"code": "var(--code)",
		},
		borderRadius:       sizes,
		maxHeight:          sizes,
		maxWidth:           sizes,
		minHeight:          sizes,
		minWidth:           sizes,
		spacing:            sizes,
		zIndex:             zIndexes,
		backdropOpacity:    percents,
		backgroundOpacity:  percents,
		borderOpacity:      percents,
		divideOpacity:      percents,
		opacity:            percents,
		placeholderOpacity: percents,
		ringOpacity:        percents,
		textOpacity:        percents,
		extend: {
			screens: {
				// 1536px + $inset-x * 2 + $windows-scrollbar-width
				"2xl": `${1536 + 16 * 3}px`,
			},
		},
	},
	plugins: [],
}
