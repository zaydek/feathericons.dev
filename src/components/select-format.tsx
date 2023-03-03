import "./select-format.sass"

import { useState } from "react"

// prettier-ignore
type Format =
	| "svg"
	| "react"
	| "ts-react"
	| "react-native"
	| "ts-react-native"
	| "jpg"
	| "png"

export function SelectFormat() {
	const [value, setValue] = useState<Format>("svg")

	return (
		<label className="select-format">
			<select value={value} onChange={e => setValue(e.currentTarget.value as Format)}>
				<optgroup label="Web">
					<option value="svg">SVG</option>
					<option value="react">React</option>
					<option value="ts-react">TS React</option>
				</optgroup>
				<optgroup label="React Native">
					<option value="react-native">React Native</option>
					<option value="ts-react-native">TS React Native</option>
				</optgroup>
				<optgroup label="Image">
					<option value="jpg">JPG</option>
					<option value="png">PNG</option>
				</optgroup>
			</select>
			<div className="select-format-button">SVG</div>
		</label>
	)
}
