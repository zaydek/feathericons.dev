import { variantBreakpoints, variantVariables } from "@unocss/preset-mini/variants"
import transformerVariantGroup from "@unocss/transformer-variant-group"
import { Rule } from "unocss"
import { defineConfig } from "unocss/vite"


function resolve(str: string, { sign, px }: { sign: string, px: boolean }) {
	if (str.startsWith("(") && str.endsWith(")")) {
		if (sign === "-") {
			return `calc(-1 * (${str.slice(1, -1)}))`
		} else {
			return `calc(${str.slice(1, -1)})`
		}
	} else {
		if (px && Number.isFinite(+str)) {
			return sign + str + "px"
		} else {
			return sign + str
		}
	}
}

function desugar(raw: string | undefined, { sign = "", px = true }: { sign?: string, px?: boolean } = {}) {
	if (raw === undefined || raw === "undefined" || raw === "null") {
		return undefined
	}
	const str = raw
		.replace(/_/g, " ")
		.replace(/\$([a-zA-Z][a-zA-Z-0-9]*)/g, "var(--$1)")
	return resolve(str, { sign, px })
}

const rules: Rule[] = [
	["absolute",              { "position": "absolute" }],
	["fixed",                 { "position": "fixed"    }],
	["relative",              { "position": "relative" }],
	["sticky",                { "position": "sticky"   }],

	[/^(-?)inset-(.+)$/,      ([_, sign, value]) => ({ "inset":   desugar(value, { sign }) })],
	[/^(-?)inset-t-(.+)$/,    ([_, sign, value]) => ({ "top":     desugar(value, { sign }), "right":  desugar(value, { sign }), "left":   desugar(value, { sign }) })],
	[/^(-?)inset-r-(.+)$/,    ([_, sign, value]) => ({ "top":     desugar(value, { sign }), "right":  desugar(value, { sign }), "bottom": desugar(value, { sign }) })],
	[/^(-?)inset-b-(.+)$/,    ([_, sign, value]) => ({ "right":   desugar(value, { sign }), "bottom": desugar(value, { sign }), "left":   desugar(value, { sign }) })],
	[/^(-?)inset-l-(.+)$/,    ([_, sign, value]) => ({ "top":     desugar(value, { sign }), "bottom": desugar(value, { sign }), "left":   desugar(value, { sign }) })],
	[/^(-?)tr-(.+)$/,         ([_, sign, value]) => ({ "top":     desugar(value, { sign }), "right":  desugar(value, { sign }) })],
	[/^(-?)br-(.+)$/,         ([_, sign, value]) => ({ "right":   desugar(value, { sign }), "bottom": desugar(value, { sign }) })],
	[/^(-?)bl-(.+)$/,         ([_, sign, value]) => ({ "bottom":  desugar(value, { sign }), "left":   desugar(value, { sign }) })],
	[/^(-?)tl-(.+)$/,         ([_, sign, value]) => ({ "top":     desugar(value, { sign }), "left":   desugar(value, { sign }) })],
	[/^(-?)y-(.+)$/,          ([_, sign, value]) => ({ "top":     desugar(value, { sign }), "bottom": desugar(value, { sign }) })],
	[/^(-?)x-(.+)$/,          ([_, sign, value]) => ({ "right":   desugar(value, { sign }), "left":   desugar(value, { sign }) })],
	[/^(-?)t-(.+)$/,          ([_, sign, value]) => ({ "top":     desugar(value, { sign }) })],
	[/^(-?)r-(.+)$/,          ([_, sign, value]) => ({ "right":   desugar(value, { sign }) })],
	[/^(-?)b-(.+)$/,          ([_, sign, value]) => ({ "bottom":  desugar(value, { sign }) })],
	[/^(-?)l-(.+)$/,          ([_, sign, value]) => ({ "left":    desugar(value, { sign }) })],
	[/^z-(.+)$/,              ([_, value]) =>       ({ "z-index": desugar(value, { px: false }) })],

	[/^(-?)m-(.+)$/,          ([_, sign, value]) => ({ "margin":         desugar(value, { sign }) })],
	[/^(-?)my-(.+)$/,         ([_, sign, value]) => ({ "margin-top":     desugar(value, { sign }), "margin-bottom": desugar(value, { sign }) })],
	[/^(-?)mx-(.+)$/,         ([_, sign, value]) => ({ "margin-right":   desugar(value, { sign }), "margin-left":   desugar(value, { sign }) })],
	[/^(-?)mt-(.+)$/,         ([_, sign, value]) => ({ "margin-top":     desugar(value, { sign }) })],
	[/^(-?)mr-(.+)$/,         ([_, sign, value]) => ({ "margin-right":   desugar(value, { sign }) })],
	[/^(-?)mb-(.+)$/,         ([_, sign, value]) => ({ "margin-bottom":  desugar(value, { sign }) })],
	[/^(-?)ml-(.+)$/,         ([_, sign, value]) => ({ "margin-left":    desugar(value, { sign }) })],
	[/^p-(.+)$/,              ([_, value])       => ({ "padding":        desugar(value) })],
	[/^py-(.+)$/,             ([_, value])       => ({ "padding-top":    desugar(value), "padding-bottom": desugar(value) })],
	[/^px-(.+)$/,             ([_, value])       => ({ "padding-right":  desugar(value), "padding-left":   desugar(value) })],
	[/^pt-(.+)$/,             ([_, value])       => ({ "padding-top":    desugar(value) })],
	[/^pr-(.+)$/,             ([_, value])       => ({ "padding-right":  desugar(value) })],
	[/^pb-(.+)$/,             ([_, value])       => ({ "padding-bottom": desugar(value) })],
	[/^pl-(.+)$/,             ([_, value])       => ({ "padding-left":   desugar(value) })],

	["flex",                  { "display":         "flex"          }],
	["inline-flex",           { "display":         "inline-flex"   }],
	["flex-col",              { "flex-direction":  "column"        }],
	["flex-row",              { "flex-direction":  "row"           }],
	["justify-start",	        { "justify-content": "flex-start"    }],
	["justify-end",	          { "justify-content": "flex-end"      }],
	["justify-center",        { "justify-content": "center"        }],
	["justify-between",       { "justify-content": "space-between" }],
	["justify-around",        { "justify-content": "space-around"  }],
	["justify-evenly",        { "justify-content": "space-evenly"  }],
	["align-start",           { "align-items":     "flex-start"    }],
	["align-end",             { "align-items":     "flex-end"      }],
	["align-center",          { "align-items":     "center"        }],
	["align-baseline",        { "align-items":     "baseline"      }],
	["align-stretch",         { "align-items":     "stretch"       }],

	["grid",                  { "display": "grid" }],
	[/^grid-(.+)$/,           ([_, value]) => ({ "display": "grid", "grid-template":         Number.isNaN(+value) ? desugar(value, { px: false }) : `repeat(${desugar(value, { px: false })}, 1fr)` })],
	[/^grid-cols-(.+)$/,      ([_, value]) => ({ "display": "grid", "grid-template-columns": Number.isNaN(+value) ? desugar(value, { px: false }) : `repeat(${desugar(value, { px: false })}, 1fr)` })],
	[/^grid-rows-(.+)$/,      ([_, value]) => ({ "display": "grid", "grid-template-rows":    Number.isNaN(+value) ? desugar(value, { px: false }) : `repeat(${desugar(value, { px: false })}, 1fr)` })],
	[/^grid-auto-cols-(.+)$/, ([_, value]) => ({ "grid-auto-columns":                        desugar(value, { px: true }) })],
	[/^grid-auto-rows-(.+)$/, ([_, value]) => ({ "grid-auto-rows":                           desugar(value, { px: true }) })],
	[/^gap-(.+)$/,            ([_, value]) => ({ "gap":                                      desugar(value) })],
	[/^col-gap-(.+)$/,        ([_, value]) => ({ "column-gap":                               desugar(value) })],
	[/^row-gap-(.+)$/,        ([_, value]) => ({ "row-gap":                                  desugar(value) })],

	[/^h-(.+)$/,              ([_, value]) => ({ "height":       desugar(value) })],
	[/^min-h-(.+)$/,          ([_, value]) => ({ "min-height":   desugar(value) })],
	[/^max-h-(.+)$/,          ([_, value]) => ({ "max-height":   desugar(value) })],
	[/^w-(.+)$/,              ([_, value]) => ({ "width":        desugar(value) })],
	[/^min-w-(.+)$/,          ([_, value]) => ({ "min-width":    desugar(value) })],
	[/^max-w-(.+)$/,          ([_, value]) => ({ "max-width":    desugar(value) })],
	[/^aspect-(.+)$/,         ([_, value]) => ({ "aspect-ratio": desugar(value, { px: false }) })],

	[/^rounded-(.+)$/,        ([_, value]) => ({ "border-radius":              desugar(value) })],
	[/^rounded-t-(.+)$/,      ([_, value]) => ({ "border-top-left-radius":     desugar(value), "border-top-right-radius":    desugar(value) })],
	[/^rounded-r-(.+)$/,      ([_, value]) => ({ "border-top-right-radius":    desugar(value), "border-bottom-right-radius": desugar(value) })],
	[/^rounded-b-(.+)$/,      ([_, value]) => ({ "border-bottom-left-radius":  desugar(value), "border-bottom-right-radius": desugar(value) })],
	[/^rounded-l-(.+)$/,      ([_, value]) => ({ "border-bottom-left-radius":  desugar(value), "border-top-left-radius":     desugar(value) })],
	[/^rounded-tr-(.+)$/,     ([_, value]) => ({ "border-top-right-radius":    desugar(value) })],
	[/^rounded-br-(.+)$/,     ([_, value]) => ({ "border-bottom-right-radius": desugar(value) })],
	[/^rounded-bl-(.+)$/,     ([_, value]) => ({ "border-bottom-left-radius":  desugar(value) })],
	[/^rounded-tl-(.+)$/,     ([_, value]) => ({ "border-top-left-radius":     desugar(value) })],

	//// // Arbitrary key-value e.g. property--value
	//// //
	//// // TODO: DEPRECATE
	//// [/^\[([^\]]+)\]-(.+)$/, ([_, property, value]) => {
	//// 	const px = !(property in unitless)
	//// 	return {
	//// 		[property]: desugar(value, { px }),
	//// 	}
	//// }],

	// Arbitrary key-value e.g. k--v
	[/^((?:--|-)?[a-z]+(?:-[a-z]+)*)--(.+)$/, ([_, property, value]) => {
		//// const px = !(property in unitless)
		return {
			[property]: desugar(value, { px: false }),
		}
	}],
]

export default defineConfig({
	presets: [],
	rules,
	theme: {
		breakpoints: {
			sm:     "640px",
			md:     "768px",
			lg:    "1024px",
			xl:    "1280px",
			"2xl": "1536px",
		},
	},
	transformers: [transformerVariantGroup()],
	variants: [
		variantBreakpoints, // E.g. md:x-y
		variantVariables,   // E.g. [foo]:x-y
	],
})
