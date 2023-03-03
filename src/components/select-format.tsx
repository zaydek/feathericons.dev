import "./select-format.sass"

import { Icon } from "@/lib"
import { ExportAs } from "@/state"
import { Dispatch, SetStateAction } from "react"
import { ReactjsIcon, SvgIcon, TypeScriptIcon } from "./icon-config"

const icons: Record<ExportAs, Icon> = {
	svg: SvgIcon,
	"strict-jsx": ReactjsIcon,
	"strict-tsx": TypeScriptIcon,
	jsx: ReactjsIcon,
	tsx: TypeScriptIcon,
	"strict-jsx-rn": SvgIcon, // TODO
	"strict-tsx-rn": SvgIcon, // TODO
	//// jpg: feather.Image,
	//// png: feather.Image,
}

const names: Record<ExportAs, string> = {
	svg: "SVG",
	"strict-jsx": "JSX",
	"strict-tsx": "TypeScript JSX",
	jsx: "JSX",
	tsx: "TypeScript JSX",
	"strict-jsx-rn": "React Native",
	"strict-tsx-rn": "React Native (TypeScript)",
	//// jpg: "JPG",
	//// png: "PNG",
}

export function SelectFormat({ value, setValue }: { value: ExportAs; setValue: Dispatch<SetStateAction<ExportAs>> }) {
	const name = names[value]
	const Icon = icons[value]

	return (
		<label className="select-format">
			<select value={value} onChange={e => setValue(e.currentTarget.value as ExportAs)}>
				<optgroup label="HTML, Vue, Svelte">
					<option value="svg">SVG</option>
				</optgroup>
				<optgroup label="CSS">
					<option value="css">CSS</option>
					<option value="scss">Sass (SCSS)</option>
					{/* <option value="sass">Sass</option> */}
				</optgroup>
				<optgroup label="Solid.js">
					<option value="jsx">JSX</option>
					<option value="tsx">JSX (TypeScript)</option>
				</optgroup>
				<optgroup label="React.js, Qwik">
					<option value="strict-jsx">React.js</option>
					<option value="strict-tsx">React.js (TypeScript)</option>
				</optgroup>
				<optgroup label="React Native">
					<option value="strict-jsx-rn">React Native</option>
					<option value="strict-tsx-rn">React Native (TypeScript)</option>
				</optgroup>
				{/* <optgroup label="Image">
					<option value="jpg">JPG</option>
					<option value="png">PNG</option>
				</optgroup> */}
			</select>
			<span className="select-format-button">
				<span className="select-format-button-name">{name}</span>
				<Icon className="select-format-button-icon" />
			</span>
		</label>
	)
}
