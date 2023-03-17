// prettier-ignore
export type IconsetValue =
	| "feather"
	| "wk-brands"
	| "wk-payments"
	| "wk-payments-filled"

export const ICONSET_VALUE_DEFAULT: IconsetValue = "feather"

export const MONOCHROME_DEFAULT = false

////////////////////////////////////////////////////////////////////////////////
export const SIZE_MIN       = 16.0 // prettier-ignore
export const SIZE_MAX       = 32.0 // prettier-ignore
export const SIZE_STEP      =  1.0 // prettier-ignore
export const SIZE_DEFAULT   = 24.0 // prettier-ignore

export const STROKE_MIN     =  0.5 // prettier-ignore
export const STROKE_MAX     =  3.5 // prettier-ignore
export const STROKE_STEP    =  0.1 // prettier-ignore
export const STROKE_DEFAULT =  2.0 // prettier-ignore

////////////////////////////////////////////////////////////////////////////////

// prettier-ignore
export type FormatValue =
	| "svg"
	| "jsx"
	| "tsx"
	| "strict-jsx"
	| "strict-tsx"
//// | "strict-jsx-rn"
//// | "strict-tsx-rn"
//// | "jpg"
//// | "png"

export const READONLY_CLIPBOARD_DEFAULT = `
// Feather by @colebemis
// Licensed as MIT
// Reuse allowed without attribution
// https://github.com/feathericons/feather
//
// Logos by @thewolfkit
// Licensed as CC BY 4.0
// Reuse allowed with attribution
// https://thewolfkit.com
//
// Website by @username_ZAYDEK
`.trim()
