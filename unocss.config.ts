import presetWind from "@unocss/preset-wind"
import transformerVariantGroup from "@unocss/transformer-variant-group"
import { Rule } from "unocss"
import { defineConfig } from "unocss/vite"
import { unitless } from "./unocss.config.unitless"

//// // https://github.com/unocss/unocss/blob/464cdd19cfef2c7a7f195a1a187191c6f4bb5f48/packages/core/src/utils/helpers.ts#L12
//// function isValidSelector(selector: string) {
////   return /[!-~]+/.test(selector)
//// }
////
//// // https://github.com/unocss/unocss/blob/fa0bf070d0bdc0c2591d05b6437482feccd62d03/packages/core/src/extractors/split.ts#L4
//// function splitCode(code: string) {
////   //// return code.split(/\\?[\s"`;{}]+/g).filter(isValidSelector) // Remove '
////   return code.split(/\\?[\s"`;]+/g).filter(isValidSelector) // Remove '
//// }
////
//// // Fixes edge cases such as font-feature-settings--'tnum'
//// const extractors: Extractor[] = [{
////   name: "custom-extractor",
////   order: -1,
////   extract({ code }) {
////     return new Set(splitCode(code))
////   },
//// }]

function resolve(raw: string | undefined, { px = true }: { px?: boolean } = {}) {
	if (raw === undefined || raw === "undefined" || raw === "null") { return undefined }
	const str = raw
		.replace(/_/g, " ")
	if (px && Number.isFinite(+str)) {
		return `${str}px`
	} else {
		return str
	}
}

const rules: Rule[] = [
	["absolute",              { "position": "absolute" }],
	["fixed",                 { "position": "fixed"    }],
	["relative",              { "position": "relative" }],
	["sticky",                { "position": "sticky"   }],

	[/^inset-(.+)$/,          ([_, value]) => ({ "inset":   resolve(value) })],
	[/^inset-t-(.+)$/,        ([_, value]) => ({ "top":     resolve(value), "right":  resolve(value), "left":   resolve(value) })],
	[/^inset-r-(.+)$/,        ([_, value]) => ({ "top":     resolve(value), "right":  resolve(value), "bottom": resolve(value) })],
	[/^inset-b-(.+)$/,        ([_, value]) => ({ "right":   resolve(value), "bottom": resolve(value), "left":   resolve(value) })],
	[/^inset-l-(.+)$/,        ([_, value]) => ({ "top":     resolve(value), "bottom": resolve(value), "left":   resolve(value) })],
	[/^tr-(.+)$/,             ([_, value]) => ({ "top":     resolve(value), "right":  resolve(value) })],
	[/^br-(.+)$/,             ([_, value]) => ({ "right":   resolve(value), "bottom": resolve(value) })],
	[/^bl-(.+)$/,             ([_, value]) => ({ "bottom":  resolve(value), "left":   resolve(value) })],
	[/^tl-(.+)$/,             ([_, value]) => ({ "top":     resolve(value), "left":   resolve(value) })],
	[/^y-(.+)$/,              ([_, value]) => ({ "top":     resolve(value), "bottom": resolve(value) })],
	[/^x-(.+)$/,              ([_, value]) => ({ "right":   resolve(value), "left":   resolve(value) })],
	[/^t-(.+)$/,              ([_, value]) => ({ "top":     resolve(value) })],
	[/^r-(.+)$/,              ([_, value]) => ({ "right":   resolve(value) })],
	[/^b-(.+)$/,              ([_, value]) => ({ "bottom":  resolve(value) })],
	[/^l-(.+)$/,              ([_, value]) => ({ "left":    resolve(value) })],
	[/^z-(.+)$/,              ([_, value]) => ({ "z-index": resolve(value, { px: false }) })],

	["flex",                  { "display":         "flex"          }],
	["inline-flex",           { "display":         "inline-flex"   }],
	["flex-col",              { "flex-direction":  "column"        }],
	["flex-row",              { "flex-direction":  "row"           }],

	["grid",                  { "display": "grid" }],
	[/^grid-(.+)$/,           ([_, value]) => ({ "display": "grid", "grid-template":         Number.isNaN(+value) ? resolve(value, { px: false }) : `repeat(${resolve(value, { px: false })}, 1fr)` })],
	[/^grid-cols-(.+)$/,      ([_, value]) => ({ "display": "grid", "grid-template-columns": Number.isNaN(+value) ? resolve(value, { px: false }) : `repeat(${resolve(value, { px: false })}, 1fr)` })],
	[/^grid-rows-(.+)$/,      ([_, value]) => ({ "display": "grid", "grid-template-rows":    Number.isNaN(+value) ? resolve(value, { px: false }) : `repeat(${resolve(value, { px: false })}, 1fr)` })],
	[/^grid-auto-cols-(.+)$/, ([_, value]) => ({ "grid-auto-columns":                        resolve(value, { px: true }) })],
	[/^grid-auto-rows-(.+)$/, ([_, value]) => ({ "grid-auto-rows":                           resolve(value, { px: true }) })],

	[/^g-(.+)$/,              ([_, value]) => ({ "gap":        resolve(value) })],
	[/^gy-(.+)$/,             ([_, value]) => ({ "row-gap":    resolve(value) })],
	[/^gx-(.+)$/,             ([_, value]) => ({ "column-gap": resolve(value) })],
	[/^m-(.+)$/,              ([_, value]) => ({ "margin":         resolve(value) })],
	[/^my-(.+)$/,             ([_, value]) => ({ "margin-top":     resolve(value), "margin-bottom": resolve(value) })],
	[/^mx-(.+)$/,             ([_, value]) => ({ "margin-right":   resolve(value), "margin-left":   resolve(value) })],
	[/^mt-(.+)$/,             ([_, value]) => ({ "margin-top":     resolve(value) })],
	[/^mr-(.+)$/,             ([_, value]) => ({ "margin-right":   resolve(value) })],
	[/^mb-(.+)$/,             ([_, value]) => ({ "margin-bottom":  resolve(value) })],
	[/^ml-(.+)$/,             ([_, value]) => ({ "margin-left":    resolve(value) })],
	[/^p-(.+)$/,              ([_, value]) => ({ "padding":        resolve(value) })],
	[/^py-(.+)$/,             ([_, value]) => ({ "padding-top":    resolve(value), "padding-bottom": resolve(value) })],
	[/^px-(.+)$/,             ([_, value]) => ({ "padding-right":  resolve(value), "padding-left":   resolve(value) })],
	[/^pt-(.+)$/,             ([_, value]) => ({ "padding-top":    resolve(value) })],
	[/^pr-(.+)$/,             ([_, value]) => ({ "padding-right":  resolve(value) })],
	[/^pb-(.+)$/,             ([_, value]) => ({ "padding-bottom": resolve(value) })],
	[/^pl-(.+)$/,             ([_, value]) => ({ "padding-left":   resolve(value) })],

	[/^size-(.+)$/,           ([_, value]) => ({ "height": resolve(value), "width": resolve(value) })],

	[/^h-(.+)$/,              ([_, value]) => ({ "height":       resolve(value) })],
	[/^min-h-(.+)$/,          ([_, value]) => ({ "min-height":   resolve(value) })],
	[/^max-h-(.+)$/,          ([_, value]) => ({ "max-height":   resolve(value) })],
	[/^w-(.+)$/,              ([_, value]) => ({ "width":        resolve(value) })],
	[/^min-w-(.+)$/,          ([_, value]) => ({ "min-width":    resolve(value) })],
	[/^max-w-(.+)$/,          ([_, value]) => ({ "max-width":    resolve(value) })],
	[/^aspect-(.+)$/,         ([_, value]) => ({ "aspect-ratio": resolve(value, { px: false }) })],

	[/^rounded-(.+)$/,        ([_, value]) => ({ "border-radius":              resolve(value) })],
	[/^rounded-t-(.+)$/,      ([_, value]) => ({ "border-top-left-radius":     resolve(value), "border-top-right-radius":    resolve(value) })],
	[/^rounded-r-(.+)$/,      ([_, value]) => ({ "border-top-right-radius":    resolve(value), "border-bottom-right-radius": resolve(value) })],
	[/^rounded-b-(.+)$/,      ([_, value]) => ({ "border-bottom-left-radius":  resolve(value), "border-bottom-right-radius": resolve(value) })],
	[/^rounded-l-(.+)$/,      ([_, value]) => ({ "border-bottom-left-radius":  resolve(value), "border-top-left-radius":     resolve(value) })],
	[/^rounded-tr-(.+)$/,     ([_, value]) => ({ "border-top-right-radius":    resolve(value) })],
	[/^rounded-br-(.+)$/,     ([_, value]) => ({ "border-bottom-right-radius": resolve(value) })],
	[/^rounded-bl-(.+)$/,     ([_, value]) => ({ "border-bottom-left-radius":  resolve(value) })],
	[/^rounded-tl-(.+)$/,     ([_, value]) => ({ "border-top-left-radius":     resolve(value) })],

	// Arbitrary key-value e.g. k-[v]
	[/^(?:-|--)?([a-z][a-z-]*)-\[([^\]]+)\]$/, ([_, property, value]) => {
		const px = !(property in unitless)
		return {
			[property]: resolve(value, { px }),
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
	variants: [...presetWind({}).variants!],
})
