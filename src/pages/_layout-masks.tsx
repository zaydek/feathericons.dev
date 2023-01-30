function BackgroundMask() {
	return (
		// Use -mt-[var(--inset-y)] > h-[var(--inset-y)] to prevent responsive
		// layout thrashing
		<div className="sticky top-0 z-[var(--background-mask-z)] -mt-[var(--inset-y)] hidden 2xl:block">
			{/* Use overflow-x-clip to prevent side-scrolling. Note that
			overflow-x-hidden doesn't work as expected. */}
			<div className="h-[var(--inset-y)] overflow-x-clip">
				<div className="-mx-[calc(160px_/_2)] h-160 rounded-b-50%" data-background-hero />
			</div>
		</div>
	)
}

function ForegroundMask() {
	return (
		// Use -mt-[var(--inset-y)] > h-[var(--inset-y)] to prevent responsive
		// layout thrashing
		<div className="sticky top-0 z-[var(--foreground-mask-z)] -mt-[var(--inset-y)] hidden 2xl:block">
			<div className="flex h-[var(--inset-y)] justify-center">
				{/* LHS */}
				<div className="relative">
					<div
						// prettier-ignore
						className="h-[calc(var(--app-rounding)_+_var(--inset-y))] w-[calc(var(--app-rounding)_+_var(--inset-y))]"
						data-background-hero
					/>
					<div className="absolute top-0 right-0">
						<div
							// prettier-ignore
							className="h-[calc(var(--app-rounding)_+_var(--inset-y))] w-[calc(var(--app-rounding)_+_var(--inset-y))]"
							data-background-hero
						/>
					</div>
				</div>
				{/* RHS */}
				<div
					// prettier-ignore
					className="h-[var(--inset-y)] w-100% max-w-[calc(var(--app-w)_-_var(--app-rounding)_*_2)]"
					data-background-hero
				/>
				<div className="relative">
					<div
						// prettier-ignore
						className="h-[calc(var(--app-rounding)_+_var(--inset-y))] w-[calc(var(--app-rounding)_+_var(--inset-y))]"
						data-background-hero
					/>
					<div className="absolute top-0 left-0">
						<div
							// prettier-ignore
							className="h-[calc(var(--app-rounding)_+_var(--inset-y))] w-[calc(var(--app-rounding)_+_var(--inset-y))]"
							data-background-hero
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export function LayoutMasks() {
	return (
		<>
			<ForegroundMask />
			<BackgroundMask />
		</>
	)
}
