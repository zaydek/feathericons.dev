import "./select-format.sass"

import { Icon } from "@/lib"
import { ExportAs } from "@/state"
import { Dispatch, SetStateAction } from "react"
import { ReactjsIcon, SvgIcon, TypeScriptIcon } from "./icon-config"

const icons: Record<ExportAs, Icon> = {
	svg: SvgIcon,
	jsx: ReactjsIcon,
	tsx: TypeScriptIcon,
	"strict-jsx": ReactjsIcon,
	"strict-tsx": TypeScriptIcon,
	"strict-jsx-rn": ReactjsIcon,
	"strict-tsx-rn": TypeScriptIcon,
}

const names: Record<ExportAs, string> = {
	svg: "SVG",
	jsx: "JavaScript JSX",
	tsx: "TypeScript JSX",
	"strict-jsx": "Strict JavaScript JSX",
	"strict-tsx": "Strict TypeScript JSX",
	"strict-jsx-rn": "React Native",
	"strict-tsx-rn": "TypeScript React Native",
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
					<option value="jsx">JavaScript JSX</option>
					<option value="tsx">TypeScript JSX</option>
				</optgroup>
				<optgroup label="React.js, Qwik">
					<option value="strict-jsx">Strict JavaScript JSX</option>
					<option value="strict-tsx">Strict TypeScript JSX</option>
				</optgroup>
				<optgroup label="React Native">
					<option value="strict-jsx-rn">React Native</option>
					<option value="strict-tsx-rn">TypeScript React Native</option>
				</optgroup>
			</select>
			<span className="select-format-button">
				<span className="select-format-button-name">{name}</span>
				<Icon className="select-format-button-icon" />
			</span>
		</label>
	)
}
