import presetWind from "@unocss/preset-wind"
import transformerVariantGroup from "@unocss/transformer-variant-group"
import { Rule } from "unocss"
import { defineConfig } from "unocss/vite"
import { unitless } from "./uno.config.unitless"

// Safely remove braces from a value
function removeBraces(value: string) {
	if (value.startsWith("[") && value.endsWith("]")) {
		return value.slice(1, -1)
	} else {
		return value
	}
}

// Safely remove spaces from a value
function removeSpaces(value: string) {
	if (value.includes("_")) {
		return value.replaceAll("_", " ")
	} else {
		return value
	}
}

function resolve(rawValue: string, { px = true }: { px?: boolean } = {}) {
	if (rawValue === "[null]") { return undefined }
	const value = removeSpaces(removeBraces(rawValue))
	if (px && Number.isFinite(+value)) {
		return `${value}px`
	} else {
		return value
	}
}

const rules: Rule[] = [
	// Arbitrary key-value e.g. k-[v]
	[/^(?:-|--)?([a-z][a-z-]*)-\[([^\]]+)\]$/, ([_, property, value]) => {
		const px = !(property in unitless)
		return {
			[property]: resolve(value, { px }),
		}
	}],

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

	["flex",                  { "display":        "flex"          }],
	["inline-flex",           { "display":        "inline-flex"   }],
	["flex-col",              { "flex-direction": "column"        }],
	["flex-row",              { "flex-direction": "row"           }],

	["grid",                  { "display": "grid" }],
	[/^grid-(.+)$/,           ([_, value]) => ({ "display": "grid", "grid-template":         Number.isNaN(+value) ? resolve(value, { px: false }) : `repeat(${resolve(value, { px: false })}, 1fr)` })],
	[/^grid-cols-(.+)$/,      ([_, value]) => ({ "display": "grid", "grid-template-columns": Number.isNaN(+value) ? resolve(value, { px: false }) : `repeat(${resolve(value, { px: false })}, 1fr)` })],
	[/^grid-rows-(.+)$/,      ([_, value]) => ({ "display": "grid", "grid-template-rows":    Number.isNaN(+value) ? resolve(value, { px: false }) : `repeat(${resolve(value, { px: false })}, 1fr)` })],
	[/^grid-auto-cols-(.+)$/, ([_, value]) => ({ "grid-auto-columns":                        resolve(value, { px: true }) })],
	[/^grid-auto-rows-(.+)$/, ([_, value]) => ({ "grid-auto-rows":                           resolve(value, { px: true }) })],

	[/^g-(.+)$/,              ([_, value]) => ({ "gap":            resolve(value) })],
	[/^gy-(.+)$/,             ([_, value]) => ({ "row-gap":        resolve(value) })],
	[/^gx-(.+)$/,             ([_, value]) => ({ "column-gap":     resolve(value) })],
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

	[/^bg-(.+)$/,             ([_, value]) => ({ "background-color": resolve(value) })],
	[/^bg-image-(.+)$/,       ([_, value]) => ({ "background-image": resolve(value) })],
	[/^sh-(.+)$/,             ([_, value]) => ({ "box-shadow":       resolve(value) })],
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
	// E.g. hover:(foo-bar foo-baz)
	transformers: [transformerVariantGroup()],
	// E.g. md:hover:(foo-bar foo-baz)
	variants: [...presetWind({}).variants!],
})
