import { iota } from "../lib/iota"

//// function NavigationIcon() {
//// 	return <>
//// 		<div className="flex justify-center align-center h-32 w-32 rounded-1e3 bg-orange">
//// 			<div className="h-24 w-24 rounded-1e3 bg-white"></div>
//// 		</div>
//// 	</>
//// }

export function Home() {
	return <>
		<div className="h-$hero-height bg-$trim-color"></div>
		<div className="-mx-64 sticky t-$inset-y">
			<div className="h-$ribbon-height rounded-b-50% bg-$trim-color"></div>
		</div>
		<div className="mt-calc(-1_*_($ribbon-height_+_$rounding)) pb-calc($inset-y_*_2) px-$inset-x bg-$gray-color">
			<div className="mx-calc(-1_*_$inset-x) sticky t-0 z-10 flex [&_>_:nth-child(3)]:grow-1">
				<div className="h-calc($inset-y_+_$rounding) w-$inset-x bg-$trim-color"></div>
				<div className="relative">
					<div className="h-calc($inset-y_+_$rounding) w-$rounding bg-$trim-color"></div>
					<div className="absolute br-0 h-$rounding w-$rounding rounded-tl-1e3 bg-$base-color"></div>
				</div>
				<div className="h-$inset-y bg-$trim-color"></div>
				<div className="relative">
					<div className="h-calc($inset-y_+_$rounding) w-$rounding bg-$trim-color"></div>
					<div className="absolute bl-0 h-$rounding w-$rounding rounded-tr-1e3 bg-$gray-color"></div>
				</div>
				<div className="h-calc($inset-y_+_$rounding) w-$inset-x bg-$trim-color"></div>
			</div>
			{/* Use relative here because of the ribbon */}
			<div className="mt-calc(-1_*_$inset-y) relative flex rounded-b-$rounding bg-$base-color shadow-$realistic-shadow [&_>_:nth-child(1)]:grow-1 [&_>_:nth-child(n_+_1)]:shrink-0">
				{/* LHS */}
				<div>
					{/* Navigation bar */}
					<div className="sticky t-$inset-y h-$navigation-height bg-$base-color shadow-0_$hairline-thickness_0_0_$hairline-color">
						<div>Hello, world!</div>
					</div>
					{iota(400).map(index =>
						<div key={index}>
							Hello, world! ({index})
						</div>
					)}
				</div>
				{/* RHS */}
				{/* <div className="w-400 rounded-r-$rounding bg-$gray-color shadow-inset_$hairline-thickness_0_0_$hairline-color ~[&_>_:nth-child(1)]:(bg-$gray-color shadow-inset_$hairline-thickness_0_0_$hairline-color)"> */}
				<div className="w-$sidebar-width rounded-br-$rounding bg-$gray-color shadow-inset_$hairline-thickness_0_0_$hairline-color">
					{/* Sidebar */}
					<div className="sticky t-$inset-y">
						{iota(10).map(index =>
							<div key={index}>
								Hello, world! ({index})
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	</>
}
