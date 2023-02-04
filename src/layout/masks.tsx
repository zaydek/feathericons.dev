function BgMask() {
	return (
		// Use -mt-[var(--inset-y)] > h-[var(--inset-y)] to prevent responsive
		// layout thrashing
		//
		// Use a z-index < 0 here
		<div className="sticky top-0 -mt-[var(--inset-y)] hidden 2xl:block" style={{ zIndex: -10 }}>
			{/* Use overflow-x-clip to prevent side-scrolling. Note that
			overflow-x-hidden doesn't work as expected. */}
			<div className="h-[var(--inset-y)] overflow-x-clip">
				<div className="-mx-[calc(160px_/_2)] h-160 rounded-b-50%" data-background-hero />
			</div>
		</div>
	)
}

function FgMask() {
	return (
		// Use -mt-[var(--inset-y)] > h-[var(--inset-y)] to prevent responsive
		// layout thrashing
		//
		// Use a z-index > 0 here
		<div className="sticky top-0 -mt-[var(--inset-y)] hidden 2xl:block" style={{ zIndex: +10 }}>
			<div className="flex h-[var(--inset-y)] justify-center">
				{/* LHS */}
				<div className="relative">
					<div className="h-[calc(var(--app-rounding)_+_var(--inset-y))] w-[calc(var(--app-rounding)_+_var(--inset-y))]" data-background-hero />
					<div className="absolute top-0 right-0">
						<div className="h-[calc(var(--app-rounding)_+_var(--inset-y))] w-[calc(var(--app-rounding)_+_var(--inset-y))]" data-background-hero />
					</div>
				</div>
				{/* RHS */}
				<div className="h-[var(--inset-y)] w-100% max-w-[calc(var(--app-w)_-_var(--app-rounding)_*_2)]" data-background-hero />
				<div className="relative">
					<div className="h-[calc(var(--app-rounding)_+_var(--inset-y))] w-[calc(var(--app-rounding)_+_var(--inset-y))]" data-background-hero />
					<div className="absolute top-0 left-0">
						<div className="h-[calc(var(--app-rounding)_+_var(--inset-y))] w-[calc(var(--app-rounding)_+_var(--inset-y))]" data-background-hero />
					</div>
				</div>
			</div>
		</div>
	)
}

export function Masks() {
	return (
		<>
			<FgMask />
			<BgMask />
		</>
	)
}
