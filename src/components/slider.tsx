import { forwardRef } from "react"

export const Slider = forwardRef<HTMLDivElement, JSX.IntrinsicElements["div"]>((props, ref) => {
	return (
		<div className="form-slider">
			<div className="track">
				<div className="thumb"></div>
			</div>
		</div>
	)
})
