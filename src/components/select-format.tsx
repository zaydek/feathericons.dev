import "./select-format.sass"

import { Icon } from "@/lib"
import { ExportAs } from "@/state"
import { Dispatch, SetStateAction } from "react"
import { ReactjsIcon, SvgIcon, TypeScriptIcon } from "./icon-config"

const icons: Record<ExportAs, Icon> = {
	svg: SvgIcon,
	react: ReactjsIcon,
	"ts-react": TypeScriptIcon,
	"react-native": ReactjsIcon,
	"ts-react-native": TypeScriptIcon,
	//// jpg: feather.Image,
	//// png: feather.Image,
}

const names: Record<ExportAs, string> = {
	svg: "SVG",
	react: "React",
	"ts-react": "React (TypeScript)",
	"react-native": "React Native",
	"ts-react-native": "React Native (TypeScript)",
	//// jpg: "JPG",
	//// png: "PNG",
}

export function SelectFormat({ value, setValue }: { value: ExportAs; setValue: Dispatch<SetStateAction<ExportAs>> }) {
	const name = names[value]
	const Icon = icons[value]

	return (
		<label className="select-format">
			<select value={value} onChange={e => setValue(e.currentTarget.value as ExportAs)}>
				<optgroup label="Web">
					<option value="svg">SVG</option>
					<option value="react">React</option>
					<option value="ts-react">React (TypeScript)</option>
				</optgroup>
				<optgroup label="React Native">
					<option value="react-native">React Native</option>
					<option value="ts-react-native">React Native (TypeScript)</option>
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
