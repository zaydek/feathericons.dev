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
				// FIXME: Hmm...
				"2xl": `${1536 + 16 * 2 + 16}px`,
			},
		},
	},
	plugins: [
		//// plugin(function ({ matchUtilities, theme }) {
		//// 	matchUtilities(
		//// 		{
		//// 			"exact-w": value => {
		//// 				return {
		//// 					minWidth: value,
		//// 					maxWidth: value,
		//// 				}
		//// 			},
		//// 		},
		//// 		{ values: theme("spacing") }
		//// 	)
		//// }),
		//// plugin(function ({ matchUtilities, theme }) {
		//// 	// prettier-ignore
		//// 	matchUtilities(
		//// 		{
		//// 			inset: value => ({ inset:  value, }),
		//// 			y:     value => ({ top:    value, bottom: value }),
		//// 			x:     value => ({ right:  value, left:   value }),
		//// 			tr:    value => ({ top:    value, right:  value }),
		//// 			br:    value => ({ bottom: value, right:  value }),
		//// 			bl:    value => ({ bottom: value, left:   value }),
		//// 			tl:    value => ({ top:    value, left:   value }),
		//// 			t:     value => ({ top:    value }),
		//// 			r:     value => ({ right:  value }),
		//// 			b:     value => ({ bottom: value }),
		//// 			l:     value => ({ left:   value }),
		//// 		},
		//// 		{ values: theme("spacing") }
		//// 	)
		//// }),
	],
}
