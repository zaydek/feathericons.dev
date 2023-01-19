import * as feather from "./data/react-feather@4.29.0"

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useMemo, useState } from "react"
import { formatAsReact, formatAsSvg, formatAsTypeScriptReact } from "../scripts/format"
import { stringify } from "../scripts/stringify"
import { jsxPlaceholder, sizeInitial, strokeWidthInitial, svgPlaceholder, tsxPlaceholder } from "./constants"
import { manifest } from "./data/react-feather-manifest@4.29.0"
import { toKebabCase } from "./lib/cases"

export const SearchContext =
	createContext<{
		compactMode:           boolean
		setCompactMode:        Dispatch<SetStateAction<boolean>>
		search:                string
		setSearch:             Dispatch<SetStateAction<string>>
		searchResults:         Partial<Record<keyof typeof feather, readonly [number, number] | null>>
	} | null>(null)

export const SelectedContext =
	createContext<{
		selectedName:          keyof typeof manifest
		setSelectedName:       Dispatch<SetStateAction<keyof typeof manifest>>
		selectedSvgElement:    SVGSVGElement | null
		setSelectedSvgElement: Dispatch<SetStateAction<SVGSVGElement | null>>
		viewSource:            boolean
		setViewSource:         Dispatch<SetStateAction<boolean>>
		formatAs:              "svg" | "jsx" | "tsx"
		setFormatAs:           Dispatch<SetStateAction<"svg" | "jsx" | "tsx">>
		clipboard:             string
	} | null>(null)

export const SliderContext =
	createContext<{
		size:                  number
		setSize:               Dispatch<SetStateAction<number>>
		strokeWidth:           number
		setStrokeWidth:        Dispatch<SetStateAction<number>>
	} | null>(null)

function getSubstringIndexes(str: string, substr: string) {
	const index = str.indexOf(substr)
	if (index === -1) { return null }
	return [index, index + substr.length] as const
}

const omitAttrs = ["class"]

export function StateProvider({ children }: PropsWithChildren) {

	//////////////////////////////////////////////////////////////////////////////
	// SearchContext

	const [compactMode, setCompactMode] = useState(false)
	const [search, setSearch] = useState("")

	const $$search = useMemo(() => {
		return search
			.replace(/[^a-zA-Z0-9]/g, "")
			.toLowerCase()
	}, [search])

	const searchResultsFallback = useMemo(() => {
		const ref: Partial<Record<keyof typeof feather, readonly [number, number] | null>> = {}
		for (const name of Object.keys(manifest)) {
			ref[name as keyof typeof feather] = null
		}
		return ref
	}, [])

	const searchResults = useMemo(() => {
		if ($$search === "") { return searchResultsFallback }
		const refA: Partial<Record<keyof typeof feather, readonly [number, number] | null>> = {}
		const refB: Partial<Record<keyof typeof feather, readonly [number, number] | null>> = {}
		for (const [name, tags] of Object.entries(manifest)) {
			const indexes = getSubstringIndexes(name.toLowerCase(), $$search)
			if (indexes !== null) {
				refA[name as keyof typeof feather] = indexes
			} else {
				for (const tag of tags) {
					if (tag.startsWith($$search)) {
						refB[name as keyof typeof feather] = null
					}
				}
			}
		}
		return { ...refA, ...refB }
	}, [$$search, searchResultsFallback])

	//////////////////////////////////////////////////////////////////////////////
	// SelectedContext

	const [selectedName, setSelectedName] = useState<keyof typeof manifest>("Feather")
	const [selectedSvgElement, setSelectedSvgElement] = useState<SVGSVGElement | null>(null)
	const [viewSource, setViewSource] = useState(false)
	const [formatAs, setFormatAs] = useState<"svg" | "jsx" | "tsx">("svg")

	const clipboard = useMemo(() => {
		if (selectedSvgElement === null) {
			return {
				"svg": svgPlaceholder.replaceAll("\t", "  "),
				"jsx": jsxPlaceholder.replaceAll("\t", "  "),
				"tsx": tsxPlaceholder.replaceAll("\t", "  "),
			}[formatAs]
		}
		if (formatAs === "svg") {
			const code = stringify(selectedSvgElement, { strictJsx: false, omitAttrs })
			return formatAsSvg(toKebabCase(selectedName), code, { comment: `https://feathericons.dev/${toKebabCase(selectedName)}` })
				.replaceAll("\t", "  ")
		} else if (formatAs === "jsx") {
			const code = stringify(selectedSvgElement, { strictJsx: false, omitAttrs })
			return formatAsReact(selectedName, code, { comment: `https://feathericons.dev/${toKebabCase(selectedName)}?format=jsx` })
				.replaceAll("\t", "  ")
		} else {
			const code = stringify(selectedSvgElement, { strictJsx: false, omitAttrs })
			return formatAsTypeScriptReact(selectedName, code, { comment: `https://feathericons.dev/${toKebabCase(selectedName)}?format=tsx` })
				.replaceAll("\t", "  ")
		}
	}, [formatAs, selectedName, selectedSvgElement])

	//////////////////////////////////////////////////////////////////////////////
	// SliderContext

	const [size, setSize] = useState(sizeInitial)
	const [strokeWidth, setStrokeWidth] = useState(strokeWidthInitial)

	//////////////////////////////////////////////////////////////////////////////

	return <>
		<SearchContext.Provider value={useMemo(() => ({
			compactMode,
			setCompactMode,
			/**/
			search,
			setSearch,
			/**/
			searchResults,
		}), [compactMode, search, searchResults])}>
			<SelectedContext.Provider value={useMemo(() => ({
				selectedName,
				setSelectedName,
				/**/
				selectedSvgElement,
				setSelectedSvgElement,
				/**/
				viewSource,
				setViewSource,
				/**/
				formatAs,
				setFormatAs,
				/**/
				clipboard,
			}), [clipboard, formatAs, selectedSvgElement, selectedName, viewSource])}>
				<SliderContext.Provider value={useMemo(() => ({
					size,
					setSize,
					/**/
					strokeWidth,
					setStrokeWidth,
				}), [size, strokeWidth])}>
					<CSSVariableEffect />
					{children}
				</SliderContext.Provider>
			</SelectedContext.Provider>
		</SearchContext.Provider>
	</>
}

function CSSVariableEffect() {
	const { size, strokeWidth } = useContext(SliderContext)!

	useEffect(() => {
		document.body.style.setProperty("--scale", `${size / sizeInitial}`)
		document.body.style.setProperty("--stroke-width", `${strokeWidth}px`)
	}, [size, strokeWidth])

	return <></>
}