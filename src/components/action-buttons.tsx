import React from "react"

import * as feather from "@icons/feather/tsx"

import { Reactjs, Solidjs, Svg, TypeScript } from "../components/vendor-icons"
import { downloadText, downloadZipArchive } from "../lib"
import { DynamicIcon, Icon } from "../lib/dynamic-icon"
import { ClipboardContext, FormatValue, SearchContext } from "../providers"

const formatNames: Record<FormatValue, string> = {
	svg: "SVG",
	jsx: "Solid",
	tsx: "TypeScript Solid",
	"strict-jsx": "React",
	"strict-tsx": "TypeScript React",
	//// "strict-jsx-rn": "React Native",
	//// "strict-tsx-rn": "TypeScript React Native",
}

const formatIcons: Record<FormatValue, Icon> = {
	svg: Svg,
	jsx: Solidjs,
	tsx: TypeScript,
	"strict-jsx": Reactjs,
	"strict-tsx": TypeScript,
	//// "strict-jsx-rn": ReactjsIcon,
	//// "strict-tsx-rn": TypeScriptIcon,
}

export function FormatButton({
	value,
	setValue,
}: {
	value: FormatValue
	setValue: React.Dispatch<React.SetStateAction<FormatValue>>
}) {
	return (
		<label className="select">
			<select value={value} onChange={e => setValue(e.currentTarget.value as FormatValue)}>
				<optgroup label="HTML, Vue, Svelte">
					<option value="svg">SVG</option>
				</optgroup>
				{/* <optgroup label="CSS">
					<option value="css">CSS</option>
					<option value="scss">Sass (SCSS)</option>
				</optgroup> */}
				<optgroup label="JSX: Solid">
					<option value="jsx">Solid</option>
					<option value="tsx">TypeScript Solid</option>
				</optgroup>
				<optgroup label="Strict JSX: React, Qwik">
					<option value="strict-jsx">React</option>
					<option value="strict-tsx">TypeScript React</option>
				</optgroup>
				{/* <optgroup label="React Native">
					<option value="strict-jsx-rn">React Native</option>
					<option value="strict-tsx-rn">TypeScript React Native</option>
				</optgroup> */}
			</select>
			<button className="select-button" tabIndex={-1}>
				<div className="select-button-icon-frame">
					<DynamicIcon className="select-button-start-icon" icon={formatIcons[value]} />
				</div>
				<span className="select-button-type">{formatNames[value]}</span>
				<div className="select-button-icon-frame">
					{/* Don't use <StrokeIcon> here */}
					<DynamicIcon className="select-button-end-icon" icon={feather.ChevronDown} />
				</div>
			</button>
		</label>
	)
}

export function CopyButton() {
	const { clipboard } = React.useContext(ClipboardContext)!
	const [pressed, setPressed] = React.useState(false)

	React.useEffect(() => {
		if (!pressed) return
		navigator.clipboard.writeText([...clipboard.values()].join("\n"))
		const d = window.setTimeout(() => setPressed(false), 1e3)
		return () => window.clearTimeout(d)
	}, [clipboard, pressed])

	return (
		<button className="action-button" onClick={e => setPressed(true)}>
			<DynamicIcon
				// prettier-ignore
				className="action-button-icon"
				icon={pressed ? feather.Check : feather.Clipboard}
			/>
		</button>
	)
}

function ext(format: FormatValue) {
	switch (format) {
		case "svg":
		case "jsx":
		case "tsx":
			return format
		case "strict-jsx":
			return "jsx"
		case "strict-tsx":
			return "tsx"
	}
}

export function SaveButton() {
	const { iconset } = React.useContext(SearchContext)!
	const { format, clipboard } = React.useContext(ClipboardContext)!

	const [pressed, setPressed] = React.useState(false)

	React.useEffect(() => {
		if (!pressed) return
		if (clipboard.size === 1) {
			const [[name, content]] = clipboard.entries()
			downloadText({ filename: `${name}.${ext(format)}`, content })
		} else if (clipboard.size > 1) {
			const files: { filename: string; content: string }[] = []
			for (const [filename, content] of clipboard) {
				files.push({ filename: `${filename}.${ext(format)}`, content })
			}
			downloadZipArchive(`${iconset}-${ext(format)}`, files)
		}
		const d = window.setTimeout(() => setPressed(false), 1e3)
		return () => window.clearTimeout(d)
	}, [clipboard, format, iconset, pressed])

	return (
		<button className="action-button" onClick={e => setPressed(true)}>
			<DynamicIcon
				// prettier-ignore
				className="action-button-icon"
				icon={pressed ? feather.Check : feather.Download}
			/>
		</button>
	)
}
