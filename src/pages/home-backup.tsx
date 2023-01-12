
//// function NavigationIcon() {
//// 	return <>
//// 		<div className="flex justify-center align-center h-32 w-32 rounded-1e3 bg-orange">
//// 			<div className="h-24 w-24 rounded-1e3 bg-white"></div>
//// 		</div>
//// 	</>
//// }

import { iota } from "../lib/iota"

export function Home() {
	return <>
		<div className="h-$hero-height bg-$trim-color"></div>
		<div className="-mx-128 sticky t-$rounding">
			<div className="h-$ribbon-height rounded-b-50% bg-$trim-color"></div>
		</div>
		<div className="mt-calc(-1_*_($ribbon-height_+_$rounding)) pb-calc($inset-y_*_2) px-$inset-x">
			<div className="mx-calc(-1_*_$inset-x) sticky t-0 z-10 flex [&_>_:nth-child(3)]:grow-1">
				{/* LHS */}
				<div className="h-calc($inset-y_+_$rounding) w-$inset-x bg-$trim-color"></div>
				<div className="relative">
					<div className="h-calc($inset-y_+_$rounding) w-$rounding bg-$trim-color"></div>
					<div className="absolute br-0 h-$rounding w-$rounding rounded-tl-1e3 bg-$base-color"></div>
				</div>
				{/* RHS */}
				<div className="h-$inset-y bg-$trim-color"></div>
				<div className="relative">
					<div className="h-calc($inset-y_+_$rounding) w-$rounding bg-$trim-color"></div>
					<div className="absolute bl-0 h-$rounding w-$rounding rounded-tr-1e3 bg-$gray-color"></div>
				</div>
				<div className="h-calc($inset-y_+_$rounding) w-$inset-x bg-$trim-color"></div>
			</div>
			{/* Use relative here because of the ribbon */}
			<div className="mt-calc(-1_*_$rounding) relative flex rounded-b-$rounding bg-$base-color shadow-$realistic-shadow [&_>_:nth-child(2)]:grow-1">
				<aside className="w-$sidebar-1-width rounded-bl-$rounding bg-$gray-color shadow-inset_$hairline-thickness_0_0_$hairline-color">
					<div className="sticky t-$inset-y">
						{iota(10).map(index =>
							<div key={index}>
								Hello, world! ({index})
							</div>
						)}
					</div>
				</aside>
				<main>
					<div className="sticky t-$inset-y h-$navigation-height bg-$base-color shadow-0_$hairline-thickness_0_0_$hairline-color">
						{/* <div>Hello, world!</div> */}
					</div>
					{iota(400).map(index =>
						<div key={index}>
							Hello, world! ({index})
						</div>
					)}
				</main>
				<aside className="w-$sidebar-2-width rounded-br-$rounding bg-$gray-color shadow-inset_$hairline-thickness_0_0_$hairline-color">
					<div className="sticky t-$inset-y">
						{iota(10).map(index =>
							<div key={index}>
								Hello, world! ({index})
							</div>
						)}
					</div>
				</aside>
			</div>
		</div>
	</>
}
