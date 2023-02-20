import presetWind from "@unocss/preset-wind"
import { Rule } from "unocss"
import { defineConfig } from "unocss/vite"
import { unitless } from "./uno.config.unitless"

// prettier-ignore
function resolve(raw: string, px?: boolean) {
	const value = raw
		.replace(/_/g, " ")                  // " "
		.replace(/\$([\w-]+)/g, "var(--$1)") // CSS variables
		.replace(/^\((.+)\)$/g, "calc($1)")  // Expressions
	if (typeof px === "boolean" && px && Number.isFinite(+value)) {
		return `${value}px`
	} else {
		return value
	}
}

// prettier-ignore
const rules: Rule[] = [
	// Position
	//
	["absolute",          { "position":                     "absolute" }],
	["fixed",             { "position":                     "fixed" }],
	["relative",          { "position":                     "relative" }],
	["sticky",            { "position":                     "sticky" }],
	[/^inset-(.+)$/,      ([, d]) => ({ "inset":            resolve(d) })],
	[/^tr-(.+)$/,         ([, d]) => ({ "top":              resolve(d), "right":  resolve(d) })],
	[/^br-(.+)$/,         ([, d]) => ({ "right":            resolve(d), "bottom": resolve(d) })],
	[/^bl-(.+)$/,         ([, d]) => ({ "bottom":           resolve(d), "left":   resolve(d) })],
	[/^tl-(.+)$/,         ([, d]) => ({ "top":              resolve(d), "left":   resolve(d) })],
	[/^y-(.+)$/,          ([, d]) => ({ "top":              resolve(d), "bottom": resolve(d) })],
	[/^x-(.+)$/,          ([, d]) => ({ "right":            resolve(d), "left":   resolve(d) })],
	[/^t-(.+)$/,          ([, d]) => ({ "top":              resolve(d) })],
	[/^r-(.+)$/,          ([, d]) => ({ "right":            resolve(d) })],
	[/^b-(.+)$/,          ([, d]) => ({ "bottom":           resolve(d) })],
	[/^l-(.+)$/,          ([, d]) => ({ "left":             resolve(d) })],
	[/^z-(.+)$/,          ([, d]) => ({ "z-index":          resolve(d) })],

	// Flex (child)
	//
	[/^flex-(.+)$/,       ([, d]) => ({ "flex":             resolve(d) })],
	[/^grow-(.+)$/,       ([, d]) => ({ "flex-grow":        resolve(d) })],
	[/^shrink-(.+)$/,     ([, d]) => ({ "flex-shrink":      resolve(d) })],
	[/^basis-(.+)$/,      ([, d]) => ({ "flex-basis":       resolve(d, true) })],

	// Margin
	//
	[/^m-(.+)$/,          ([, d]) => ({ "margin":           resolve(d, true) })],
	[/^my-(.+)$/,         ([, d]) => ({ "margin-top":       resolve(d, true), "margin-bottom": resolve(d, true) })],
	[/^mx-(.+)$/,         ([, d]) => ({ "margin-right":     resolve(d, true), "margin-left":   resolve(d, true) })],
	[/^mt-(.+)$/,         ([, d]) => ({ "margin-top":       resolve(d, true) })],
	[/^mr-(.+)$/,         ([, d]) => ({ "margin-right":     resolve(d, true) })],
	[/^mb-(.+)$/,         ([, d]) => ({ "margin-bottom":    resolve(d, true) })],
	[/^ml-(.+)$/,         ([, d]) => ({ "margin-left":      resolve(d, true) })],

	// Border box
	//
	[/^size-(.+)$/,       ([, d]) => ({ "height":           resolve(d, true), "width": resolve(d, true) })],
	[/^h-(.+)$/,          ([, d]) => ({ "height":           resolve(d, true) })],
	[/^min-h-(.+)$/,      ([, d]) => ({ "min-height":       resolve(d, true) })],
	[/^max-h-(.+)$/,      ([, d]) => ({ "max-height":       resolve(d, true) })],
	[/^w-(.+)$/,          ([, d]) => ({ "width":            resolve(d, true) })],
	[/^min-w-(.+)$/,      ([, d]) => ({ "min-width":        resolve(d, true) })],
	[/^max-w-(.+)$/,      ([, d]) => ({ "max-width":        resolve(d, true) })],
	[/^aspect-(.+)$/,     ([, d]) => ({ "aspect-ratio":     resolve(d) })],
	[/^p-(.+)$/,          ([, d]) => ({ "padding":          resolve(d, true) })],
	[/^py-(.+)$/,         ([, d]) => ({ "padding-top":      resolve(d, true), "padding-bottom": resolve(d, true) })],
	[/^px-(.+)$/,         ([, d]) => ({ "padding-right":    resolve(d, true), "padding-left":   resolve(d, true) })],
	[/^pt-(.+)$/,         ([, d]) => ({ "padding-top":      resolve(d, true) })],
	[/^pr-(.+)$/,         ([, d]) => ({ "padding-right":    resolve(d, true) })],
	[/^pb-(.+)$/,         ([, d]) => ({ "padding-bottom":   resolve(d, true) })],
	[/^pl-(.+)$/,         ([, d]) => ({ "padding-left":     resolve(d, true) })],
	[/^overflow-(.+)$/,   ([, d]) => ({ "overflow":         resolve(d) })],
	[/^overflow-y-(.+)$/, ([, d]) => ({ "overflow-y":       resolve(d) })],
	[/^overflow-x-(.+)$/, ([, d]) => ({ "overflow-x":       resolve(d) })],

	// Flexbox
	//
	["hidden",            { "display":                      "hidden" }],
	["flex",              { "display":                      "flex" }],
	["flex-row",          { "flex-direction":               "row" }],
	["flex-col",          { "flex-direction":               "column" }],
	["center",            { "justify-content":              "center", "align-items": "center" }],
	["justify-start",     { "justify-content":              "flex-start" }],
	["justify-end",       { "justify-content":              "flex-end" }],
	["justify-center",    { "justify-content":              "center" }],
	["justify-between",   { "justify-content":              "space-between" }],
	["justify-around",    { "justify-content":              "space-around" }],
	["justify-evenly",    { "justify-content":              "space-evenly" }],
	["items-start",       { "align-items":                  "flex-start" }],
	["items-end",         { "align-items":                  "flex-end" }],
	["items-center",      { "align-items":                  "center" }],
	["items-baseline",    { "align-items":                  "baseline" }],
	["items-stretch",     { "align-items":                  "stretch" }],
	[/^gap-(.+)$/,        ([, d]) => ({ "gap":              resolve(d, true) })],
	[/^col-gap-(.+)$/,    ([, d]) => ({ "column-gap":       resolve(d, true) })],
	[/^row-gap-(.+)$/,    ([, d]) => ({ "row-gap":          resolve(d, true) })],

	// Box decoration
	//
	[/^bg-(.+)$/,         ([, d]) => ({ "background-color":           resolve(d) })],
	[/^bg-image-(.+)$/,   ([, d]) => ({ "background-image":           resolve(d) })],
	[/^rounded-(.+)$/,    ([, d]) => ({ "border-radius":              resolve(d, true) })],
	[/^rounded-t-(.+)$/,  ([, d]) => ({ "border-top-right-radius":    resolve(d, true), "border-top-left-radius":     resolve(d, true) })],
	[/^rounded-r-(.+)$/,  ([, d]) => ({ "border-top-right-radius":    resolve(d, true), "border-bottom-right-radius": resolve(d, true) })],
	[/^rounded-b-(.+)$/,  ([, d]) => ({ "border-bottom-right-radius": resolve(d, true), "border-bottom-left-radius":  resolve(d, true) })],
	[/^rounded-l-(.+)$/,  ([, d]) => ({ "border-bottom-left-radius":  resolve(d, true), "border-top-left-radius":     resolve(d, true) })],
	[/^rounded-t-(.+)$/,  ([, d]) => ({ "border-top-right-radius":    resolve(d, true) })],
	[/^rounded-r-(.+)$/,  ([, d]) => ({ "border-bottom-right-radius": resolve(d, true) })],
	[/^rounded-b-(.+)$/,  ([, d]) => ({ "border-bottom-left-radius":  resolve(d, true) })],
	[/^rounded-l-(.+)$/,  ([, d]) => ({ "border-top-left-radius":     resolve(d, true) })],
	[/^shadow-(.+)$/,     ([, d]) => ({ "box-shadow":                 resolve(d) })],
	[/^opacity-(.+)$$/,   ([, d]) => ({ "opacity":                    resolve(d) })],

	// Typography
	//
	[/^font-(.+)$/,       ([, d]) => ({ "font":             resolve(d) })],
	[/^text-y-(.+)$/,     ([, d]) => ({ "line-height":      resolve(d) })],
	[/^text-x-(.+)$/,     ([, d]) => ({ "letter-spacing":   resolve(d) })],
	[/^color-(.+)$$/,     ([, d]) => ({ "color":            resolve(d) })],

	// Misc.
	//
	[
		/^\[((?:--)?[a-z][a-z-]*)\]-(.+)$/,
		([_, property, value]) => {
			const px = !(property in unitless)
			return {
				[property]: resolve(value, px),
			}
		},
	],
]

export default defineConfig({
	presets: [],
	rules,
	theme: {
		breakpoints: {
			xs: "512px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": `${1536 + 16}px`,
		},
	},
	variants: [...presetWind({}).variants!],
})
