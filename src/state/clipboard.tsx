import { detab } from "@/lib"
import { formatSvg, transformSvg } from "@scripts/utils"
import { createContext, ReactNode, useCallback, useEffect, useState } from "react"

// prettier-ignore
export type ExportAs =
	| "svg"
	| "react"
	| "ts-react"
	| "react-native"
	| "ts-react-native"
//// | "jpg"
//// | "png"

// prettier-ignore
export const ClipboardContext =
	createContext<{
		exportAs:      ExportAs
		setExportAs:   (exportAs: ExportAs) => void
		selected:      Map<string, true>
		addToSelected: (...ids: string[]) => void
		clearSelected: () => void

		clipboard: 		 string
	} | null>(null)

function getClipboardPlaceholder(exportAs: ExportAs) {
	// prettier-ignore
	switch (exportAs) {
		case "svg":
			return detab(`
				<!-- https://feathericons.dev/feather -->
				<svg class="feather feather-feather" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
					<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
					<line x1="16" x2="2" y1="8" y2="22"></line>
					<line x1="17.5" x2="9" y1="15" y2="15"></line>
				</svg>
			`, { spaces: true })
		case "react":
			return detab(`
				<!-- https://feathericons.dev/feather -->
				<svg class="feather feather-feather" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
					<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
					<line x1="16" x2="2" y1="8" y2="22"></line>
					<line x1="17.5" x2="9" y1="15" y2="15"></line>
				</svg>
			`, { spaces: true })
		case "ts-react":
			return detab(`
				<!-- https://feathericons.dev/feather -->
				<svg class="feather feather-feather" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
					<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
					<line x1="16" x2="2" y1="8" y2="22"></line>
					<line x1="17.5" x2="9" y1="15" y2="15"></line>
				</svg>
			`, { spaces: true })
		case "react-native":
			return detab(`
				<!-- https://feathericons.dev/feather -->
				<svg class="feather feather-feather" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
					<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
					<line x1="16" x2="2" y1="8" y2="22"></line>
					<line x1="17.5" x2="9" y1="15" y2="15"></line>
				</svg>
			`, { spaces: true })
		case "ts-react-native":
			return detab(`
				<!-- https://feathericons.dev/feather -->
				<svg class="feather feather-feather" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
					<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
					<line x1="16" x2="2" y1="8" y2="22"></line>
					<line x1="17.5" x2="9" y1="15" y2="15"></line>
				</svg>
			`, { spaces: true })
	}
}

export function ClipboardProvider({ children }: { children: ReactNode }) {
	// TODO: Change to useParam
	const [exportAs, setExportAs] = useState<ExportAs>("svg")
	const [selected, setSelected] = useState<Map<string, true>>(() => new Map())

	const [clipboard, setClipboard] = useState(() => getClipboardPlaceholder(exportAs))

	//// const clipboard = useMemo(() => {
	//// 	if (selectedSvgElement === null) {
	//// 		return {
	//// 			svg: svgPlaceholder.replaceAll("\t", "  "),
	//// 			jsx: jsxPlaceholder.replaceAll("\t", "  "),
	//// 			tsx: tsxPlaceholder.replaceAll("\t", "  "),
	//// 		}[formatAs]
	//// 	}
	//// 	if (formatAs === "svg") {
	//// 		const code = stringify(selectedSvgElement, {
	//// 			strictJsx: false,
	//// 			omitAttrs,
	//// 		})
	//// 		return formatAsSvg(toKebabCase(selectedName).toLowerCase(), code, {
	//// 			comment: `https://feathericons.dev/${toKebabCase(selectedName).toLowerCase()}`,
	//// 		}).replaceAll("\t", "  ")
	//// 	} else if (formatAs === "jsx") {
	//// 		const code = stringify(selectedSvgElement, {
	//// 			strictJsx: false,
	//// 			omitAttrs,
	//// 		})
	//// 		return formatAsJsx(selectedName, code, {
	//// 			comment: `https://feathericons.dev/${toKebabCase(selectedName).toLowerCase()}?format=jsx`,
	//// 		}).replaceAll("\t", "  ")
	//// 	} else {
	//// 		const code = stringify(selectedSvgElement, {
	//// 			strictJsx: false,
	//// 			omitAttrs,
	//// 		})
	//// 		return formatAsTsx(selectedName, code, {
	//// 			comment: `https://feathericons.dev/${toKebabCase(selectedName).toLowerCase()}?format=tsx`,
	//// 		}).replaceAll("\t", "  ")
	//// 	}
	//// }, [formatAs, selectedName, selectedSvgElement])

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

	useEffect(() => {
		if (selected.size === 0) {
			setClipboard(getClipboardPlaceholder(exportAs))
			return
		}
		let clipboard = ""
		const ids = [...selected.keys()]
		for (const id of ids) {
			if (clipboard !== "") {
				clipboard += "\n\n"
			}
			const svg = document.getElementById(id)!.querySelector("svg")!
			clipboard += transformSvg(id, formatSvg(svg), { banner: `<!-- https://feathericons.dev/${id} -->` })
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
