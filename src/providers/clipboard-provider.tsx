import { getKeys, toKebabCase, toTitleCase, useParam } from "@/lib"
import { formatSvg, transformJsx, transformSvg, transformTsx } from "@scripts/utils"
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useState } from "react"

// prettier-ignore
export type ExportAsValue =
	| "svg"
	| "jsx" // TODO
	| "tsx" // TODO
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
export const ClipboardContext = createContext<{
	exportAs:                ExportAsValue
	setExportAs:             Dispatch<SetStateAction<ExportAsValue>>
	selectedNames:           Set<string>
	selectedNamesStart:      number | null
	setSelectedNamesStart:   Dispatch<SetStateAction<number | null>>
	selectedNamesEnd:        number | null
	setSelectedNamesEnd:     Dispatch<SetStateAction<number | null>>
	addToSelectedNames:      (...names: string[]) => void
	removeFromSelectedNames: (...names: string[]) => void
	clearSelectedNames:      () => void
	readOnlyClipboard:       string
} | null>(null)

export function ClipboardProvider({ children }: { children: ReactNode }) {
	const [exportAs, setExportAs] = useParam<ExportAsValue>({
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

	const [selectedNames, _setNames] = useState(() => new Set<string>())
	const [selectedNamesStart, setSelectedNamesStart] = useState<number | null>(null)
	const [selectedNamesEnd, setSelectedNamesEnd] = useState<number | null>(null)

	const addToSelectedNames = useCallback((...names: string[]) => {
		_setNames(prev => {
			const next = new Set(prev)
			for (const name of names) {
				next.add(name)
			}
			return next
		})
	}, [])

	const removeFromSelectedNames = useCallback((...names: string[]) => {
		_setNames(prev => {
			const next = new Set(prev)
			for (const name of names) {
				next.delete(name)
			}
			return next
		})
	}, [])

	const clearSelectedNames = useCallback(() => {
		setSelectedNamesStart(null)
		setSelectedNamesEnd(null)
		_setNames(new Set<string>())
	}, [])

	// TODO: Change to a click event?
	const [readOnlyClipboard, _setReadOnlyClipboard] = useState("")

	useEffect(() => {
		if (selectedNames.size === 0) {
			_setReadOnlyClipboard("")
			return
		}
		let readOnlyClipboard = ""
		const [keys, hasMore] = getKeys(selectedNames, { limit: 10 })
		for (const [index, name] of keys.entries()) {
			if (index > 0) {
				readOnlyClipboard += "\n\n"
			}
			const search = toKebabCase(name).toLowerCase()
			const svg = document.getElementById(name)!.querySelector("svg")!
			if (exportAs === "svg") {
				readOnlyClipboard += transformSvg(toTitleCase(name), formatSvg(svg, { strictJsx: !!0 }), {
					banner: `<!-- https://feathericons.dev/?search=${search} -->`,
				})
			} else if (exportAs === "jsx") {
				readOnlyClipboard += transformJsx(toTitleCase(name), formatSvg(svg, { strictJsx: !!0 }), {
					banner: `// https://feathericons.dev/?search=${search}&export-as=jsx`,
				})
			} else if (exportAs === "tsx") {
				if (index === 0) readOnlyClipboard += 'import { JSX } from "solid-js";\n\n'
				readOnlyClipboard += transformTsx(toTitleCase(name), formatSvg(svg, { strictJsx: !!0 }), {
					banner: `// https://feathericons.dev/?search=${search}&export-as=tsx`,
				})
			} else if (exportAs === "strict-jsx") {
				readOnlyClipboard += transformJsx(toTitleCase(name), formatSvg(svg, { strictJsx: !!1 }), {
					banner: `// https://feathericons.dev/?search=${search}&export-as=strict-jsx`,
				})
			} else if (exportAs === "strict-tsx") {
				readOnlyClipboard += transformTsx(toTitleCase(name), formatSvg(svg, { strictJsx: !!1 }), {
					banner: `// https://feathericons.dev/?search=${search}&export-as=strict-tsx`,
				})
			}
		}
		if (hasMore) {
			if (exportAs === "svg") {
				readOnlyClipboard += `\n\n<!-- ... -->`
			} else {
				readOnlyClipboard += `\n\n// ...`
			}
		}
		_setReadOnlyClipboard(readOnlyClipboard)
	}, [exportAs, selectedNames])

	return (
		<ClipboardContext.Provider
			value={{
				exportAs,
				setExportAs,
				selectedNames,
				selectedNamesStart,
				setSelectedNamesStart,
				selectedNamesEnd,
				setSelectedNamesEnd,
				addToSelectedNames,
				removeFromSelectedNames,
				clearSelectedNames,
				readOnlyClipboard,
			}}
		>
			{children}
		</ClipboardContext.Provider>
	)
}
