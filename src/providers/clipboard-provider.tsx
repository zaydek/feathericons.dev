import React from "react"

import { getKeys, toKebabCase, toTitleCase, useParam } from "@/lib"
import { formatSvg, transformJsx, transformSvg, transformTsx } from "@scripts/utils"

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

// prettier-ignore
export const ClipboardContext = React.createContext<{
	// Format
	format:            FormatValue
	setFormatAs:       React.Dispatch<React.SetStateAction<FormatValue>>

	// Names
	names:             Set<string>
	namesStart:        number | null
	setNamesStart:     React.Dispatch<React.SetStateAction<number | null>>
	namesEnd:          number | null
	setNamesEnd:       React.Dispatch<React.SetStateAction<number | null>>
	addNames:          (...names: string[]) => void
	removeNames:       (...names: string[]) => void
	removeAllNames:    () => void

	// Clipboard
	readOnlyClipboard: string
} | null>(null)

export function ClipboardProvider({ children }: { children: React.ReactNode }) {
	const [format, setFormatAs] = useParam<FormatValue>({
		key: "export-as",
		initialValue: "svg",
		parser: value => {
			switch (value) {
				case "svg":
				case "jsx":
				case "tsx":
				case "strict-jsx":
				case "strict-tsx":
					return value
			}
			return "svg"
		},
	})

	const [names, _setNames] = React.useState(() => new Set<string>())

	const [namesStart, setNamesStart] = React.useState<number | null>(null)
	const [namesEnd, setNamesEnd] = React.useState<number | null>(null)

	const addNames = React.useCallback((...names: string[]) => {
		_setNames(prev => {
			const next = new Set(prev)
			for (const name of names) {
				next.add(name)
			}
			return next
		})
	}, [])

	const removeNames = React.useCallback((...names: string[]) => {
		_setNames(prev => {
			const next = new Set(prev)
			for (const name of names) {
				next.delete(name)
			}
			return next
		})
	}, [])

	const removeAllNames = React.useCallback(() => {
		setNamesStart(null)
		setNamesEnd(null)
		_setNames(new Set<string>())
	}, [])

	// TODO: Change to a click event?
	const [readOnlyClipboard, _setReadOnlyClipboard] = React.useState("")

	React.useEffect(() => {
		if (names.size === 0) {
			_setReadOnlyClipboard("")
			return
		}
		let readOnlyClipboard = ""
		const [keys, hasMore] = getKeys(names, { limit: 10 })
		for (const [index, name] of keys.entries()) {
			if (index > 0) {
				readOnlyClipboard += "\n\n"
			}
			const search = toKebabCase(name).toLowerCase()
			const svg = document.getElementById(name)!.querySelector("svg")!
			if (format === "svg") {
				readOnlyClipboard += transformSvg(toTitleCase(name), formatSvg(svg, { strictJsx: !!0 }), {
					banner: `<!-- https://feathericons.dev/?search=${search} -->`,
				})
			} else if (format === "jsx") {
				readOnlyClipboard += transformJsx(toTitleCase(name), formatSvg(svg, { strictJsx: !!0 }), {
					banner: `// https://feathericons.dev/?search=${search}&export-as=jsx`,
				})
			} else if (format === "tsx") {
				if (index === 0) readOnlyClipboard += 'import { JSX } from "solid-js";\n\n'
				readOnlyClipboard += transformTsx(toTitleCase(name), formatSvg(svg, { strictJsx: !!0 }), {
					banner: `// https://feathericons.dev/?search=${search}&export-as=tsx`,
				})
			} else if (format === "strict-jsx") {
				readOnlyClipboard += transformJsx(toTitleCase(name), formatSvg(svg, { strictJsx: !!1 }), {
					banner: `// https://feathericons.dev/?search=${search}&export-as=strict-jsx`,
				})
			} else if (format === "strict-tsx") {
				readOnlyClipboard += transformTsx(toTitleCase(name), formatSvg(svg, { strictJsx: !!1 }), {
					banner: `// https://feathericons.dev/?search=${search}&export-as=strict-tsx`,
				})
			}
		}
		if (hasMore) {
			if (format === "svg") {
				readOnlyClipboard += `\n\n<!-- ... -->`
			} else {
				readOnlyClipboard += `\n\n// ...`
			}
		}
		_setReadOnlyClipboard(readOnlyClipboard)
	}, [format, names])

	return (
		<ClipboardContext.Provider
			value={{
				// Format
				format,
				setFormatAs,

				// Names
				names,
				namesStart,
				setNamesStart,
				namesEnd,
				setNamesEnd,
				addNames,
				removeNames,
				removeAllNames,

				// Clipboard
				readOnlyClipboard,
			}}
		>
			{children}
		</ClipboardContext.Provider>
	)
}
