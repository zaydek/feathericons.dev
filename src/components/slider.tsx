import React from "react"

import { AriaSlider, AriaSliderProps } from "@/aria"

export function Slider(props: Omit<AriaSliderProps, "thumb" | "track">) {
	const [thumb, setThumb] = React.useState<HTMLDivElement | null>(null)
	const [track, setTrack] = React.useState<HTMLDivElement | null>(null)

	return (
		<AriaSlider className="form-slider" thumb={thumb} track={track} {...props}>
			<div ref={setTrack} className="form-slider-track">
				<div ref={setThumb} className="form-slider-thumb"></div>
			</div>
		</AriaSlider>
	)
}
