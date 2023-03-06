import { detab, toTitleCase, useParam } from "@/lib"
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

// prettier-ignore
export const ClipboardContext =
	createContext<{
		exportAs:             ExportAsValue
		setExportAs:          Dispatch<SetStateAction<ExportAsValue>>
		names: 	              Set<string>
		clipboard: 	          string
		addOneOrMoreNames:    (...ids: string[]) => void
		removeOneOrMoreNames: (...ids: string[]) => void
		removeAllNames:       () => void
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

	const [names, setNames] = useState(() => new Set<string>())
	const [clipboard, setClipboard] = useState("")

	const addOneOrMoreNames = useCallback((...ids: string[]) => {
		setNames(prev => {
			const next = new Set(prev)
			for (const id of ids) {
				next.add(id)
			}
			return next
		})
	}, [])

	const removeOneOrMoreNames = useCallback((...ids: string[]) => {
		setNames(prev => {
			const next = new Set(prev)
			for (const id of ids) {
				next.delete(id)
			}
			return next
		})
	}, [])

	const removeAllNames = useCallback(() => setNames(new Set<string>()), [])

	// TODO: Change to click handler or useMemo?
	useEffect(() => {
		if (names.size === 0) {
			switch (exportAs) {
				case "svg":
				case "jsx":
				case "tsx":
				case "strict-jsx":
				case "strict-tsx":
					// prettier-ignore
					setClipboard(detab(`
						// Feather icons by @colebemis
						// Licensed as MIT
						// Reuse allowed *without* attribution
						// https://github.com/feathericons/feather
						//
						// Social & payment logos by @thewolfkit
						// Licensed as CC BY 4.0
						// Reuse allowed *with* attribution
						// https://thewolfkit.com
					`, { spaces: true }))
					break
			}
			return
		}
		let clipboard = ""
		const ids = [...names.keys()]
		for (const [index, id] of ids.entries()) {
			if (index > 0) clipboard += "\n\n"
			const svg = document.getElementById(id)!.querySelector("svg")!
			if (exportAs === "svg") {
				clipboard += transformSvg(
					toTitleCase(id),
					formatSvg(svg, {
						strictJsx: !!0,
					}),
					{ banner: `<!-- https://feathericons.dev/?search=${id} -->` },
				)
			} else if (exportAs === "jsx") {
				clipboard += transformJsx(toTitleCase(id), formatSvg(svg, { strictJsx: !!0 }), {
					banner: `// https://feathericons.dev/?search=${id}&export-as=jsx`,
				})
			} else if (exportAs === "tsx") {
				if (index === 0) clipboard += 'import { JSX } from "solid-js";\n\n'
				clipboard += transformTsx(toTitleCase(id), formatSvg(svg, { strictJsx: !!0 }), {
					banner: `// https://feathericons.dev/?search=${id}&export-as=tsx`,
				})
			} else if (exportAs === "strict-jsx") {
				clipboard += transformJsx(toTitleCase(id), formatSvg(svg, { strictJsx: !!1 }), {
					banner: `// https://feathericons.dev/?search=${id}&export-as=strict-jsx`,
				})
			} else if (exportAs === "strict-tsx") {
				clipboard += transformTsx(toTitleCase(id), formatSvg(svg, { strictJsx: !!1 }), {
					banner: `// https://feathericons.dev/?search=${id}&export-as=strict-tsx`,
				})
			}
		}
		setClipboard(clipboard)
	}, [exportAs, names])

	return (
		<ClipboardContext.Provider
			value={{
				exportAs,
				setExportAs,
				names,
				clipboard,
				addOneOrMoreNames,
				removeOneOrMoreNames,
				removeAllNames,
			}}
		>
			{children}
		</ClipboardContext.Provider>
	)
}
