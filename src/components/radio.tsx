import React from "react"

import { DynamicIcon, Icon } from "../lib/dynamic-icon"

type RadioProps<T> = JSX.IntrinsicElements["input"] & React.PropsWithChildren & { icon: Icon; value: T }

export function Radio<T extends string>({ icon, children, ...props }: RadioProps<T>) {
	const ref = React.useRef<HTMLInputElement | null>(null)

	return (
		<label
			className="radio"
			onClick={e => ref.current!.click()}
			onKeyDown={e => {
				if (e.key === " ") {
					e.preventDefault() // Call e.preventDefault() to prevent scrolling
					ref.current!.click()
				}
			}}
			tabIndex={0}
		>
			<div className="widget-alignment-icon-frame">
				<DynamicIcon className="radio-icon" icon={icon} />
			</div>
			<span className="radio-type u-flex-1">{children}</span>
			<div className="widget-alignment-icon-frame">
				<input ref={ref} type="checkbox" {...props} tabIndex={-1} />
			</div>
		</label>
	)
}

type CheckboxProps = JSX.IntrinsicElements["input"] &
	React.PropsWithChildren & { icon: <P extends JSX.IntrinsicElements["div"]>(_: P) => JSX.Element }

// eslint-disable-next-line destructuring/no-rename
export function Checkbox({ icon: Icon, children, ...props }: CheckboxProps) {
	const ref = React.useRef<HTMLInputElement | null>(null)

	return (
		<label
			className="radio"
			onClick={e => ref.current!.click()}
			onKeyDown={e => {
				if (e.key === " ") {
					e.preventDefault() // Call e.preventDefault() to prevent scrolling
					ref.current!.click()
				}
			}}
			tabIndex={0}
		>
			<div className="widget-alignment-icon-frame">
				<Icon className="radio-icon" />
			</div>
			<span className="radio-type u-flex-1">{children}</span>
			<div className="widget-alignment-icon-frame">
				<input ref={ref} type="checkbox" {...props} tabIndex={-1} />
			</div>
		</label>
	)
}
