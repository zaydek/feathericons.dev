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
		exportAs:               ExportAsValue
		setExportAs:            Dispatch<SetStateAction<ExportAsValue>>
		selection:              Map<string, true>
		addToSelection:         (...ids: string[]) => void
		removeFromSelection:    () => void
		removeAllFromSelection: () => void
		clipboard: 		 string
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
	const [selection, setSelection] = useState<Map<string, true>>(() => new Map())
	const [clipboard, setClipboard] = useState("")

	const addToSelection = useCallback((...ids: string[]) => {
		setSelection(prev => {
			const next = new Map(prev)
			for (const id of ids) {
				next.set(id, true)
			}
			return next
		})
	}, [])

	const removeFromSelection = useCallback((...ids: string[]) => {
		setSelection(prev => {
			const next = new Map(prev)
			for (const id of ids) {
				next.delete(id)
			}
			return next
		})
	}, [])

	const removeAllFromSelection = useCallback(() => {
		setSelection(new Map())
	}, [])

	// TOOD: Change to memo?
	useEffect(() => {
		if (selection.size === 0) {
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
		const ids = [...selection.keys()]
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
	}, [exportAs, selection])

	return (
		<ClipboardContext.Provider
			value={{
				exportAs,
				setExportAs,
				selection,
				addToSelection,
				removeFromSelection,
				removeAllFromSelection,
				clipboard,
			}}
		>
			{children}
		</ClipboardContext.Provider>
	)
}
