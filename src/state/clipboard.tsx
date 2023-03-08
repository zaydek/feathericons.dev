import { detab, toKebabCase, toTitleCase, useParam } from "@/lib"
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
		exportAs:    ExportAsValue
		setExportAs: Dispatch<SetStateAction<ExportAsValue>>
		index1:      number | null
		setIndex1:   Dispatch<SetStateAction<number | null>>
		index2:      number | null
		setIndex2:   Dispatch<SetStateAction<number | null>>
		names: 	     Set<string>
		clipboard: 	 string
		addNames:    (...names: string[]) => void
		removeNames: (...names: string[]) => void
		clearNames:  () => void
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

	// Selection indexes
	const [index1, setIndex1] = useState<number | null>(null)
	const [index2, setIndex2] = useState<number | null>(null)

	const [names, _setNames] = useState(() => new Set<string>())
	const [clipboard, _setClipboard] = useState("")

	const addNames = useCallback((...names: string[]) => {
		_setNames(prev => {
			const next = new Set(prev)
			for (const name of names) {
				next.add(name)
			}
			return next
		})
	}, [])

	const removeNames = useCallback((...names: string[]) => {
		_setNames(prev => {
			const next = new Set(prev)
			for (const name of names) {
				next.delete(name)
			}
			return next
		})
	}, [])

	const clearNames = useCallback(() => {
		_setNames(new Set<string>())
	}, [])

	useEffect(() => {
		if (names.size === 0) {
			switch (exportAs) {
				case "svg":
				case "jsx":
				case "tsx":
				case "strict-jsx":
				case "strict-tsx":
					// prettier-ignore
					_setClipboard(detab(`
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
					`, { spaces: true }))
					break
			}
			return
		}
		let clipboard = ""
		const keyItr = names.keys()
		const firstNames: string[] = []
		for (let index = 0; index < 10; index++) {
			const name = keyItr.next().value
			if (name === undefined) break
			firstNames.push(name)
		}
		for (const [index, name] of firstNames.entries()) {
			if (index > 0) {
				clipboard += "\n\n"
			}
			const svg = document.getElementById(name)!.querySelector("svg")!
			if (exportAs === "svg") {
				clipboard += transformSvg(
					toTitleCase(name),
					formatSvg(svg, {
						strictJsx: !!0,
					}),
					{ banner: `<!-- https://feathericons.dev/?search=${toKebabCase(name).toLowerCase()} -->` },
				)
			} else if (exportAs === "jsx") {
				clipboard += transformJsx(toTitleCase(name), formatSvg(svg, { strictJsx: !!0 }), {
					banner: `// https://feathericons.dev/?search=${toKebabCase(name).toLowerCase()}&export-as=jsx`,
				})
			} else if (exportAs === "tsx") {
				if (index === 0) clipboard += 'import { JSX } from "solid-js";\n\n'
				clipboard += transformTsx(toTitleCase(name), formatSvg(svg, { strictJsx: !!0 }), {
					banner: `// https://feathericons.dev/?search=${toKebabCase(name).toLowerCase()}&export-as=tsx`,
				})
			} else if (exportAs === "strict-jsx") {
				clipboard += transformJsx(toTitleCase(name), formatSvg(svg, { strictJsx: !!1 }), {
					banner: `// https://feathericons.dev/?search=${toKebabCase(name).toLowerCase()}&export-as=strict-jsx`,
				})
			} else if (exportAs === "strict-tsx") {
				clipboard += transformTsx(toTitleCase(name), formatSvg(svg, { strictJsx: !!1 }), {
					banner: `// https://feathericons.dev/?search=${toKebabCase(name).toLowerCase()}&export-as=strict-tsx`,
				})
			}
		}
		if (!keyItr.next().done) {
			clipboard += `\n\n...${names.size - 10} more`
		}
		_setClipboard(clipboard)
	}, [exportAs, names])

	return (
		<ClipboardContext.Provider
			value={{
				exportAs,
				setExportAs,
				index1,
				setIndex1,
				index2,
				setIndex2,
				names,
				clipboard,
				addNames,
				removeNames,
				clearNames,
			}}
		>
			{children}
		</ClipboardContext.Provider>
	)
}
