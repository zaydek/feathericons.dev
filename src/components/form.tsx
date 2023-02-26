import "./form-checkbox.sass"
import "./form-slider.sass"

import { Dispatch, forwardRef, SetStateAction } from "react"

export const FormSlider = forwardRef<HTMLDivElement>((props, ref) => {
	return (
		<div ref={ref} className="form-slider u-keyline-generic u-pointer-grab">
			<div className="track">
				<div className="thumb"></div>
			</div>
		</div>
	)
})

export const FormCheckbox = forwardRef<
	HTMLInputElement,
	{
		checked: boolean
		setChecked: Dispatch<SetStateAction<boolean>>
	} & JSX.IntrinsicElements["input"]
>(({ checked, setChecked, ...props }, ref) => {
	return <input ref={ref} type="checkbox" checked={checked} onChange={e => setChecked(curr => !curr)} {...props} />
})
