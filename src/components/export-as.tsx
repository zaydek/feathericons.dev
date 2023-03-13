import react from "react"

import * as Feather from "@icons/feather/tsx"

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
	tsx: "Typescript Solid",
	"strict-jsx": "React",
	"strict-tsx": "Typescript React",
	//// "strict-jsx-rn": "React Native",
	//// "strict-tsx-rn": "TypeScript React Native",
}

export function ExportAs({
	value,
	setValue,
}: {
	value: ExportAsValue
	setValue: react.Dispatch<react.SetStateAction<ExportAsValue>>
}) {
	return (
		<label className="export-as">
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
			<button className="export-as-button">
				<div className="export-as-button-icon-frame">
					<DynamicIcon className="export-as-button-icon" Icon={icons[value]} />
				</div>
				<span className="export-as-button-name">{names[value]}</span>
				<div className="export-as-button-icon-frame">
					<Feather.ChevronDown className="export-as-button-icon" />
				</div>
			</button>
		</label>
	)
}
