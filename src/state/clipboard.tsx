import { getKeys, toKebabCase, toTitleCase, useParam } from "@/lib"
import { formatSvg, transformJsx, transformSvg, transformTsx } from "@scripts/utils"
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from "react"

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

const READONLY_CLIPBOARD_DEFAULT = `
// Feather icons by @colebemis
// Licensed as MIT
// Reuse allowed without attribution
// https://github.com/feathericons/feather
//
// Social & payment logos by @thewolfkit
// Licensed as CC BY 4.0
// Reuse allowed with attribution
// https://thewolfkit.com
//
// Website by @username_ZAYDEK
`.trim()

// prettier-ignore
export const ExportAsContext = createContext<{
	exportAs:      ExportAsValue
	setExportAs:   Dispatch<SetStateAction<ExportAsValue>>
} | null>(null)

// TODO: We can change this to map of SVGSvgElement
// prettier-ignore
export const SelectionContext = createContext<{
	names:         Set<string>
	startIndex:    number | null
	setStartIndex: Dispatch<SetStateAction<number | null>>
	endIndex:      number | null
	setEndIndex:   Dispatch<SetStateAction<number | null>>
	addNames:      (...names: string[]) => void
	removeNames:   (...names: string[]) => void
	clearNames:    () => void
} | null>(null)

export const ReadOnlyClipboardContext = createContext<{ readOnlyClipboard: string } | null>(null)

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

	const [names, __setNames] = useState(() => new Set<string>())
	const [startIndex, setStartIndex] = useState<number | null>(null)
	const [endIndex, setEndIndex] = useState<number | null>(null)

	const addNames = useCallback((...names: string[]) => {
		__setNames(prev => {
			const next = new Set(prev)
			for (const name of names) {
				next.add(name)
			}
			return next
		})
	}, [])

	const removeNames = useCallback((...names: string[]) => {
		__setNames(prev => {
			const next = new Set(prev)
			for (const name of names) {
				next.delete(name)
			}
			return next
		})
	}, [])

	const clearNames = useCallback(() => {
		__setNames(new Set<string>())
	}, [])

	const [readOnlyClipboard, __setReadOnlyClipboard] = useState("")

	useEffect(() => {
		if (names.size === 0) {
			__setReadOnlyClipboard(READONLY_CLIPBOARD_DEFAULT)
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
			readOnlyClipboard += `\n\n...${names.size - 10} more`
		}
		__setReadOnlyClipboard(readOnlyClipboard)
	}, [exportAs, names])

	return (
		<ExportAsContext.Provider
			value={useMemo(
				() => ({
					exportAs,
					setExportAs,
				}),
				[exportAs, setExportAs],
			)}
		>
			<SelectionContext.Provider
				value={useMemo(
					() => ({
						names,
						startIndex,
						setStartIndex,
						endIndex,
						setEndIndex,
						addNames,
						removeNames,
						clearNames,
					}),
					[addNames, clearNames, endIndex, names, removeNames, startIndex],
				)}
			>
				<ReadOnlyClipboardContext.Provider
					value={useMemo(
						() => ({
							readOnlyClipboard,
						}),
						[readOnlyClipboard],
					)}
				>
					{children}
				</ReadOnlyClipboardContext.Provider>
			</SelectionContext.Provider>
		</ExportAsContext.Provider>
	)
}
