import "./index.sass"

import { Icon } from "@/lib"
import { ExportAs } from "@/state"
import { Dispatch, SetStateAction } from "react"
import { Reactjs, Svg, TypeScript } from "./icons"

const icons: Record<ExportAs, Icon> = {
	svg: Svg,
	jsx: Reactjs, // TODO
	tsx: TypeScript,
	"strict-jsx": Reactjs,
	"strict-tsx": TypeScript,
	//// "strict-jsx-rn": ReactjsIcon,
	//// "strict-tsx-rn": TypeScriptIcon,
}

const names: Record<ExportAs, string> = {
	svg: "SVG",
	jsx: "Solid.js",
	tsx: "Typescript Solid.js",
	"strict-jsx": "React.js",
	"strict-tsx": "Typescript React.js",
	//// "strict-jsx-rn": "React Native",
	//// "strict-tsx-rn": "TypeScript React Native",
}

export function ExportSelect({ value, setValue }: { value: ExportAs; setValue: Dispatch<SetStateAction<ExportAs>> }) {
	const name = names[value]
	const Icon = icons[value]

	return (
		<label className="export-select">
			<select value={value} onChange={e => setValue(e.currentTarget.value as ExportAs)}>
				<optgroup label="HTML, Vue, Svelte">
					<option value="svg">SVG</option>
				</optgroup>
				{/* <optgroup label="CSS">
					<option value="css">CSS</option>
					<option value="scss">Sass (SCSS)</option>
				</optgroup> */}
				<optgroup label="Solid.js">
					<option value="jsx">Solid.js</option>
					<option value="tsx">TypeScript Solid.js</option>
				</optgroup>
				<optgroup label="React.js, Qwik">
					<option value="strict-jsx">React.js</option>
					<option value="strict-tsx">TypeScript React.js</option>
				</optgroup>
				{/* <optgroup label="React Native">
					<option value="strict-jsx-rn">React Native</option>
					<option value="strict-tsx-rn">TypeScript React Native</option>
				</optgroup> */}
			</select>
			<span className="export-select-button">
				<span className="export-select-button-name">{name}</span>
				<Icon className="export-select-button-icon" />
			</span>
		</label>
	)
}
