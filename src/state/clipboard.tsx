import { useParam } from "@/hooks"
import { detab, toTitleCase } from "@/lib"
import {
	formatSvg,
	transformReactjsJsx,
	transformReactjsTsx,
	transformSolidjsJsx,
	transformSolidjsTsx,
	transformSvg,
} from "@scripts/utils"
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

function getClipboardPlaceholder(exportAs: ExportAs) {
	// prettier-ignore
	switch (exportAs) {
		case "svg":
			return detab(`
				<!-- https://feathericons.dev/#!/feather -->
				<svg class="feather feather-feather" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
					<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
					<line x1="16" x2="2" y1="8" y2="22" />
					<line x1="17.5" x2="9" y1="15" y2="15" />
				</svg>
			`, { spaces: true })
		case "jsx":
			return detab(`
				// https://feathericons.dev/#!/feather?export-as=jsx
				export function Feather(props) {
					return (
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" {...props}>
							<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
							<line x1="16" x2="2" y1="8" y2="22" />
							<line x1="17.5" x2="9" y1="15" y2="15" />
						</svg>
					)
				}
			`, { spaces: true })
		case "tsx":
			return detab(`
				import { JSX } from "solid-js";

				// https://feathericons.dev/#!/feather?export-as=tsx
				export function Feather(props: JSX.IntrinsicElements["svg"]) {
					return (
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" {...props}>
							<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
							<line x1="16" x2="2" y1="8" y2="22" />
							<line x1="17.5" x2="9" y1="15" y2="15" />
						</svg>
					)
				}
			`, { spaces: true })
		case "strict-jsx":
			return detab(`
				// https://feathericons.dev/#!/feather?export-as=strict-jsx
				export function Feather(props) {
					return (
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" {...props}>
							<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
							<line x1="16" x2="2" y1="8" y2="22" />
							<line x1="17.5" x2="9" y1="15" y2="15" />
						</svg>
					)
				}
			`, { spaces: true })
		case "strict-tsx":
			return detab(`
				// https://feathericons.dev/#!/feather?export-as=strict-tsx
				export function Feather(props: JSX.IntrinsicElements["svg"]) {
					return (
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" {...props}>
							<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
							<line x1="16" x2="2" y1="8" y2="22" />
							<line x1="17.5" x2="9" y1="15" y2="15" />
						</svg>
					)
				}
			`, { spaces: true })
		//// case "strict-jsx-rn":
		//// 	return detab(`
		//// 		// https://feathericons.dev/#!/feather?export-as=strict-jsx-rn
		//// 		export function Feather(props) {
		//// 			return (
		//// 				<Svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" {...props}>
		//// 					<Path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
		//// 					<Line x1="16" x2="2" y1="8" y2="22" />
		//// 					<Line x1="17.5" x2="9" y1="15" y2="15" />
		//// 				</Svg>
		//// 			);
		//// 		}
		//// 	`, { spaces: true })
		//// case "strict-tsx-rn":
		//// 	return detab(`
		//// 		import { Line, Path, Svg, SvgProps } from 'react-native-svg';
////
		//// 		// https://feathericons.dev/#!/feather?export-as=strict-tsx-rn
		//// 		export function Feather(props: SvgProps) {
		//// 			return (
		//// 				<Svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" {...props}>
		//// 					<Path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
		//// 					<Line x1="16" x2="2" y1="8" y2="22" />
		//// 					<Line x1="17.5" x2="9" y1="15" y2="15" />
		//// 				</Svg>
		//// 			);
		//// 		}
		//// 	`, { spaces: true })
	}
	// TODO: Never
	return ""
}

export function ClipboardProvider({ children }: { children: ReactNode }) {
	//// // TODO: Change to useParam
	//// const [exportAs, setExportAs] = useState<ExportAs>("svg")
	//// const [selected, setSelected] = useState<Map<string, true>>(() => new Map())

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

	//// const [selected, setSelected] = useParam({
	////   key: "selected",
	////   initialValue: new Map<string, true>()
	//// })

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
			if (exportAs === "svg") {
				// prettier-ignore
				clipboard += transformSvg(
					toTitleCase(id),
					formatSvg(svg, { strictJsx: !!0 }),
					{ banner: `<!-- https://feathericons.dev/#!/${id} -->` },
				)
			} else if (exportAs === "jsx") {
				// prettier-ignore
				clipboard += transformSolidjsJsx(
					toTitleCase(id),
					formatSvg(svg, { strictJsx: !!0 }),
					{ banner: `// https://feathericons.dev/#!/${id}?export-as=jsx` },
				)
			} else if (exportAs === "tsx") {
				// prettier-ignore
				clipboard += transformSolidjsTsx(
					toTitleCase(id),
					formatSvg(svg, { strictJsx: !!0 }),
					{ banner: `// https://feathericons.dev/#!/${id}?export-as=tsx` },
				)
			} else if (exportAs === "strict-jsx") {
				// prettier-ignore
				clipboard += transformReactjsJsx(
					toTitleCase(id),
					formatSvg(svg, { strictJsx: !!1 }),
					{ banner: `// https://feathericons.dev/#!/${id}?export-as=strict-jsx` },
				)
			} else if (exportAs === "strict-tsx") {
				// prettier-ignore
				clipboard += transformReactjsTsx(
					toTitleCase(id),
					formatSvg(svg, { strictJsx: !!1 }),
					{ banner: `// https://feathericons.dev/#!/${id}?export-as=strict-tsx` },
				)
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
