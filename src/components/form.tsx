import "./form.sass"

import { Dispatch, forwardRef, SetStateAction } from "react"

export const FormSlider = forwardRef<HTMLDivElement>((props, ref) => {
	return (
		<div ref={ref} className="form-slider u-keyline u-pointer-grab">
			<div className="track">
				<div className="thumb"></div>
			</div>
		</div>
	)
})

export const FormCheckbox = forwardRef<
	HTMLDivElement,
	{
		checked: boolean
		setChecked: Dispatch<SetStateAction<boolean>>
	}
>(({ checked, setChecked }, ref) => {
	return <div ref={ref} className="form-checkbox u-pointer" tabIndex={0} onClick={e => setChecked(curr => !curr)}></div>
})
