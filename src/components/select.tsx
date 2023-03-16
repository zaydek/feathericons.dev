import React from "react"

import * as feather from "@icons/feather/tsx"

import { Reactjs, Solidjs, Svg } from "@/components/icons"
import { DynamicIcon, IconComponent } from "@/lib"
import { ExportAsValue } from "@/providers"

const icons: Record<ExportAsValue, IconComponent> = {
	svg: Svg,
	jsx: Solidjs,
	tsx: Solidjs,
	"strict-jsx": Reactjs,
	"strict-tsx": Reactjs,
	//// "strict-jsx-rn": ReactjsIcon,
	//// "strict-tsx-rn": TypeScriptIcon,
}

const names: Record<ExportAsValue, string> = {
	svg: "SVG",
	jsx: "Solid",
	tsx: "TypeScript Solid",
	"strict-jsx": "React",
	"strict-tsx": "TypeScript React",
	//// "strict-jsx-rn": "React Native",
	//// "strict-tsx-rn": "TypeScript React Native",
}

export function Select({
	value,
	setValue,
}: {
	value: ExportAsValue
	setValue: React.Dispatch<React.SetStateAction<ExportAsValue>>
}) {
	return (
		<label className="select">
			<select value={value} onChange={e => setValue(e.currentTarget.value as ExportAsValue)}>
				<optgroup label="HTML, Vue, Svelte">
					<option value="svg">SVG</option>
				</optgroup>
				{/* <optgroup label="CSS">
					<option value="css">CSS</option>
					<option value="scss">Sass (SCSS)</option>
				</optgroup> */}
				<optgroup label="Solid">
					<option value="jsx">Solid</option>
					<option value="tsx">TypeScript Solid</option>
				</optgroup>
				<optgroup label="React, Qwik">
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
					<DynamicIcon className="select-button-icon" Icon={icons[value]} />
				</div>
				<span className="select-button-type">{names[value]}</span>
				<div className="select-button-icon-frame">
					<feather.ChevronDown className="select-button-icon" />
				</div>
			</button>
		</label>
	)
}
