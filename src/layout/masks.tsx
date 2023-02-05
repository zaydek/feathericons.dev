// TODO: This can be simplified, see https://codepen.io/zaydek/pen/YzjgXwR?editors=1100
function BackgroundMask() {
	return (
		// Use -mt-[var(--mask-inset)] > h-[var(--mask-inset)] to prevent responsive
		// layout thrashing
		<div className="sticky top-0 -z-10 -mt-[var(--mask-inset)] hidden 2xl:block">
			{/* Use overflow-x-clip to prevent side-scrolling. Note that
			overflow-x-hidden doesn't work as expected. */}
			<div className="h-[var(--mask-inset)] overflow-x-clip">
				<div className="mx-[-10%] h-[var(--mask-h)] rounded-b-50%" data-background-hero />
			</div>
		</div>
	)
}

// TODO: This can be simplified, see https://codepen.io/zaydek/pen/YzjgXwR?editors=1100
function ForegroundMask() {
	return (
		// Use -mt-[var(--mask-inset)] > h-[var(--mask-inset)] to prevent responsive
		// layout thrashing
		<div className="sticky top-0 z-100 -mt-[var(--mask-inset)] hidden 2xl:block">
			<div className="flex h-[var(--mask-inset)] justify-center">
				{/* LHS */}
				<div className="relative">
					<div className="h-[calc(var(--app-rounding)_+_var(--mask-inset))] w-[calc(var(--app-rounding)_+_var(--mask-inset))]" data-background-hero />
					<div className="absolute top-0 right-0">
						<div className="h-[calc(var(--app-rounding)_+_var(--mask-inset))] w-[calc(var(--app-rounding)_+_var(--mask-inset))]" data-background-hero />
					</div>
				</div>
				{/* RHS */}
				<div className="h-[var(--mask-inset)] w-100% max-w-[calc(var(--app-w)_-_var(--app-rounding)_*_2)]" data-background-hero />
				<div className="relative">
					<div className="h-[calc(var(--app-rounding)_+_var(--mask-inset))] w-[calc(var(--app-rounding)_+_var(--mask-inset))]" data-background-hero />
					<div className="absolute top-0 left-0">
						<div className="h-[calc(var(--app-rounding)_+_var(--mask-inset))] w-[calc(var(--app-rounding)_+_var(--mask-inset))]" data-background-hero />
					</div>
				</div>
			</div>
		</div>
	)
}

export function Masks() {
	return (
		<>
			<ForegroundMask />
			<BackgroundMask />
		</>
	)
}
