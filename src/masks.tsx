export function BgMask() {
	return (
		<div className="bg-mask-sticky">
			<div className="bg-mask" data-bg-hero></div>
		</div>
	)
}

export function FgMask() {
	return (
		<div className="fg-mask-sticky">
			<div className="fg-mask-bit-1" data-bg-hero>
				<div className="fg-mask-bit-1-nested"></div>
			</div>
			<div className="fg-mask-bit-2" data-bg-hero></div>
			<div className="fg-mask-bit-3" data-bg-hero>
				<div className="fg-mask-bit-3-nested"></div>
			</div>
		</div>
	)
}
