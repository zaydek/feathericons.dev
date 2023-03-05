import { useParam } from "@/hooks"
import { detab, toTitleCase } from "@/lib"
import { formatSvg, transformJsx, transformSvg, transformTsx } from "@scripts/utils"
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useState } from "react"

// prettier-ignore
export type ExportAs =
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
		exportAs:      ExportAs
		setExportAs:   Dispatch<SetStateAction<ExportAs>>
		selected:      Map<string, true>
		addToSelected: (...ids: string[]) => void
		clearSelected: () => void
		clipboard: 		 string
	} | null>(null)

export function ClipboardProvider({ children }: { children: ReactNode }) {
	const [exportAs, setExportAs] = useParam<ExportAs>({
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
	const [selected, setSelected] = useState<Map<string, true>>(() => new Map())
	const [clipboard, setClipboard] = useState("")

	const addToSelected = useCallback((...ids: string[]) => {
		setSelected(prev => {
			const next = new Map(prev)
			for (const id of ids) {
				next.set(id, true)
			}
			return next
		})
	}, [])

	const clearSelected = useCallback(() => {
		setSelected(new Map())
	}, [])

	// TOOD: Change to memo?
	useEffect(() => {
		if (selected.size === 0) {
			switch (exportAs) {
				case "svg":
					// prettier-ignore
					setClipboard(detab(`
						<!--

						Feather icons designed by @colebemis
						Licensed as MIT
						Personal & commercial use allowed *without* attribution
						https://github.com/feathericons/feather

						Logos sourced from The Wolf Kit
						Licensed as CC BY 4.0
						Personal & commercial use allowed *with* attribution
						https://thewolfkit.com

						-->
					`, { spaces: true }))
					break
				case "jsx":
				case "tsx":
				case "strict-jsx":
				case "strict-tsx":
					// prettier-ignore
					setClipboard(detab(`
						// Feather icons designed by @colebemis
						// Licensed as MIT
						// Personal & commercial use allowed *without* attribution
						// https://github.com/feathericons/feather
						//
						// Logos sourced from The Wolf Kit
						// Licensed as CC BY 4.0
						// Personal & commercial use allowed *with* attribution
						// https://thewolfkit.com
					`, { spaces: true }))
					break
			}
			return
		}
		let clipboard = ""
		//// if (exportAs === "svg") {
		//// 	clipboard = "<!-- https://feathericons.dev -->\n\n"
		//// } else {
		//// 	clipboard = "// https://feathericons.dev\n\n"
		//// }
		const ids = [...selected.keys()]
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
	}, [exportAs, selected])

	return (
		<ClipboardContext.Provider
			value={{
				exportAs,
				setExportAs,
				selected,
				addToSelected,
				clearSelected,
				clipboard,
			}}
		>
			{children}
		</ClipboardContext.Provider>
	)
}
