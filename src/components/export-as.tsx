import { Reactjs, Svg, TypeScript } from "@/components/icons"
import { Icon } from "@/lib"
import { ExportAsValue } from "@/state"
import { Dispatch, SetStateAction } from "react"

const icons: Record<ExportAsValue, Icon> = {
	svg: Svg,
	jsx: Reactjs, // TODO
	tsx: TypeScript,
	"strict-jsx": Reactjs,
	"strict-tsx": TypeScript,
	//// "strict-jsx-rn": ReactjsIcon,
	//// "strict-tsx-rn": TypeScriptIcon,
}

const names: Record<ExportAsValue, string> = {
	svg: "SVG",
	jsx: "Solid.js",
	tsx: "Typescript Solid.js",
	"strict-jsx": "React.js",
	"strict-tsx": "Typescript React.js",
	//// "strict-jsx-rn": "React Native",
	//// "strict-tsx-rn": "TypeScript React Native",
}

export function ExportAs({
	value,
	setValue,
}: {
	value: ExportAsValue
	setValue: Dispatch<SetStateAction<ExportAsValue>>
}) {
	const name = names[value]
	const Icon = icons[value]

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
			<span className="export-as-button">
				<span className="export-as-name">{name}</span>
				<Icon className="export-as-icon" />
			</span>
		</label>
	)
}
