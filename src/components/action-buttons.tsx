import React from "react"

import * as feather from "@icons/feather/tsx"

import { Reactjs, Solidjs, Svg, TypeScript } from "@/components/icons"
import { DynamicIcon, IconComponent, sleep } from "@/lib"
import { ClipboardContext, FormatValue } from "@/providers"
import { StrokeIcon } from "./stroke-icon"

const names: Record<FormatValue, string> = {
	svg: "SVG",
	jsx: "Solid",
	tsx: "TypeScript Solid",
	"strict-jsx": "React",
	"strict-tsx": "TypeScript React",
	//// "strict-jsx-rn": "React Native",
	//// "strict-tsx-rn": "TypeScript React Native",
}

const icons: Record<FormatValue, IconComponent> = {
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
					<DynamicIcon className="select-button-start-icon" icon={icons[value]} />
				</div>
				<span className="select-button-type">{names[value]}</span>
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
		async function fn() {
			await navigator.clipboard.writeText(clipboard)
			await sleep(1e3)
			setPressed(false)
		}
		fn()
	}, [clipboard, pressed])

	return (
		<button className="action-button-icon-frame" onClick={e => setPressed(true)}>
			<StrokeIcon
				// prettier-ignore
				className="action-button-icon"
				icon={pressed ? feather.Check : feather.Clipboard}
			/>
		</button>
	)
}

export function SaveButton() {
	const { clipboard } = React.useContext(ClipboardContext)!
	const [pressed, setPressed] = React.useState(false)

	React.useEffect(() => {
		if (!pressed) return
		async function fn() {
			await navigator.clipboard.writeText(clipboard)
			await sleep(1e3)
			setPressed(false)
		}
		fn()
	}, [clipboard, pressed])

	return (
		<button className="action-button-icon-frame" onClick={e => setPressed(true)}>
			<StrokeIcon
				// prettier-ignore
				className="action-button-icon"
				icon={pressed ? feather.Check : feather.Download}
			/>
		</button>
	)
}
