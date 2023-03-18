import React from "react"

import * as feather from "@icons/feather/tsx"

import { Reactjs, Solidjs, Svg, TypeScript } from "@/components/icons"
import { DynamicIcon, IconComponent, sleep } from "@/lib"
import { ClipboardContext, FormatValue } from "@/providers"

const formatNames: Record<FormatValue, string> = {
	svg: "SVG",
	jsx: "Solid",
	tsx: "TypeScript Solid",
	"strict-jsx": "React",
	"strict-tsx": "TypeScript React",
	//// "strict-jsx-rn": "React Native",
	//// "strict-tsx-rn": "TypeScript React Native",
}

const fomatIcons: Record<FormatValue, IconComponent> = {
	svg: Svg,
	jsx: Solidjs,
	tsx: TypeScript,
	"strict-jsx": Reactjs,
	"strict-tsx": TypeScript,
	//// "strict-jsx-rn": ReactjsIcon,
	//// "strict-tsx-rn": TypeScriptIcon,
}

export function ExportMenu({
	value,
	setValue,
}: {
	value: FormatValue
	setValue: React.Dispatch<React.SetStateAction<FormatValue>>
}) {
	const { clipboard } = React.useContext(ClipboardContext)!

	const [copy, setCopy] = React.useState(false)
	const [save, setSave] = React.useState(false)

	React.useEffect(() => {
		if (!copy) return
		async function fn() {
			await navigator.clipboard.writeText(clipboard)
			await sleep(500)
			setCopy(false)
		}
		fn()
	}, [clipboard, copy])

	React.useEffect(() => {
		if (!save) return
		async function fn() {
			await navigator.clipboard.writeText(clipboard)
			await sleep(500)
			setSave(false)
		}
		fn()
	}, [clipboard, save])

	return (
		// TODO: Change to form?
		<div className="export-menu">
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
						<DynamicIcon className="select-button-start-icon" icon={fomatIcons[value]} />
					</div>
					<span className="select-button-type">{formatNames[value]}</span>
					<div className="select-button-icon-frame">
						<feather.ChevronDown className="select-button-end-icon" strokeWidth={3} />
					</div>
				</button>
			</label>
			<div style={{ flex: 1 }}></div>
			{/* prettier-ignore */}
			<button className="action-button-icon-frame" onClick={e => setCopy(true)}>
				{copy
					? <feather.Check className="action-button-icon" strokeWidth={2.5} />
					: <feather.Clipboard className="action-button-icon" strokeWidth={2.5} />
				}
			</button>
			{/* prettier-ignore */}
			<button className="action-button-icon-frame" onClick={e => setSave(true)}>
				{save
					? <feather.Check className="action-button-icon" strokeWidth={2.5} />
					: <feather.Download className="action-button-icon" strokeWidth={2.5} />
				}
			</button>
		</div>
	)
}
