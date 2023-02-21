import { CSSProperties, useState } from "react"

export function Checkbox(props: JSX.IntrinsicElements["div"]) {
	return (
		<div
			className="form-checkbox m-[calc((var(--container-height)_-_var(--icon-height))_/_2)]"
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={0}
			{...props}
		></div>
	)
}

export function FormSlider(props: JSX.IntrinsicElements["div"]) {
	const [value, setValue] = useState(50)

	return (
		<div
			className="form-slider-track my-[calc((var(--container-height)_-_var(--slider-track-height))_/_2)] cursor-grab select-none hover:active:cursor-grabbing"
			style={{ "--progress": `${value}%` } as CSSProperties}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={0}
			{...props}
		>
			<div className="form-slider-thumb"></div>
		</div>
	)
}
