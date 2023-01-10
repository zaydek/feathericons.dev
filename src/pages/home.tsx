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
		<div className="h-320 bg-$trim-color"></div>
		<div className="-mx-64 sticky t-32">
			<div className="h-200 rounded-b-50% bg-$trim-color"></div>
		</div>
		{/* Use negative margin-top here because of foreground obscure effect */}
		<div className="mt-calc(-1_*_(200px_+_32px)) pb-64 px-32 bg-$gray-color">
			<div className="-mx-32 sticky t-0 z-10 flex [&_>_:nth-child(3)]:grow-1">
				<div className="h-64 w-32 bg-$trim-color"></div>
				<div className="relative">
					<div className="h-64 w-32 bg-$trim-color"></div>
					<div className="absolute br-0 h-32 w-32 rounded-tl-1e3 bg-$base-color"></div>
				</div>
				<div className="h-32 bg-$trim-color"></div>
				<div className="relative">
					<div className="h-64 w-32 bg-$trim-color"></div>
					<div className="absolute bl-0 h-32 w-32 rounded-tr-1e3 bg-$gray-color"></div>
				</div>
				<div className="h-64 w-32 bg-$trim-color"></div>
			</div>
			{/* Use negative margin-top here because of foreground obscure effect */}
			{/* Use relative here because of background obscure effect */}
			<div className="-mt-32 relative flex rounded-b-$rounding bg-$base-color shadow-$realistic-shadow [&_>_:nth-child(1)]:grow-1 [&_>_:nth-child(n_+_1)]:shrink-0">
				{/* LHS */}
				<div>
					{/* Navigation bar */}
					<div className="sticky t-32 h-72 bg-$base-color shadow-0_$hairline-thickness_0_0_$hairline-color">
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
				<div className="w-400 rounded-br-$rounding bg-$gray-color shadow-inset_$hairline-thickness_0_0_$hairline-color">
					{/* Sidebar */}
					<div className="sticky t-32">
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
