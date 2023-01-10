//// import { Navbar } from "../navbar"

import { PropsWithChildren } from "react"
import { iota } from "../lib/iota"

function NavigationIcon() {
	return <>
		<div className="flex justify-center align-center h-32 w-32 rounded-1e3 bg-orange">
			<div className="h-24 w-24 rounded-1e3 bg-white"></div>
		</div>
	</>
}

function NavigationBarContainer({ children }: PropsWithChildren) {
	return <>
		<div
			className="
				sticky inset-t-8
				flex align-center px-calc(72px_/_4) h-72 rounded-tl-$rounding
				bg-WHITE shadow-0_$hairline-thickness_0_0_$hairline-color
				[&_>_:nth-child(2)]:grow-1
			"
		>
			{children}
		</div>
	</>
}

export function Home() {
	return <>
		<div className="h-320 bg-green"></div>
		<div className="sticky t-32">
			<div className="h-200 bg-orange"></div>
		</div>
		{/* Use negative margin-top here because of foreground obscure effect */}
		<div className="mt-calc(-1_*_(200px_+_32px)) pb-64 px-32 bg-$gray-color">
		{/* <div className="-mt-32 pb-64 px-32 bg-$gray-color"> */}
			<div className="-mx-32 sticky t-0 z-10 flex [&_>_:nth-child(3)]:grow-1">
				{/* LHS */}
				<div className="h-64 w-32 bg-$trim-color"></div>
				<div className="relative">
					<div className="h-64 w-32 bg-$trim-color"></div>
					<div className="absolute br-0 h-32 w-32 rounded-tl-1e3 bg-$base-color"></div>
				</div>
				{/* RHS */}
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

	//// return <>
	//// 	<div className="h-320 bg-purple"></div>
	//// 	<div className="-mt-16 p-16 pt-0 bg-lightgray">
	//// 		<div className="sticky t-0">
	//// 			<div className="-mx-16 h-calc(64px_+_16px) bg-red ~[opacity]-0.5"></div>
	//// 			<div className="absolute t-16 x-0 flex
	//// 					[&_>_:nth-child(1)]:grow-1 [&_>_:nth-child(2)]:shrink-0">
	//// 				{/* LHS */}
	//// 				<div className="flex align-center gap-16 px-calc(72px_/_4) h-72 rounded-tl-$rounding bg-$base-color shadow-0_$hairline-thickness_0_0_$hairline-color">
	//// 					<NavigationIcon />
	//// 					<div className="grow-1"></div>
	//// 					<NavigationIcon />
	//// 					<NavigationIcon />
	//// 				</div>
	//// 				{/* RHS */}
	//// 				<div className="w-400 rounded-tr-$rounding bg-$gray-color shadow-$negative-hairline-thickness_0_0_0_$hairline-color">
	//// 					{iota(40).map(index =>
	//// 						<div key={index}>Hello, world!</div>
	//// 					)}
	//// 				</div>
	//// 			</div>
	//// 		</div>
	//// 		<div className="-mt-64 rounded-b-$rounding bg-$base-color shadow-$shadow">
	//// 			<div className="h-64"></div>
	//// 			{iota(400).map(index =>
	//// 				<div key={index}>Hello, world!</div>
	//// 			)}
	//// 		</div>
	//// 	</div>
	//// </>

	//// return <>
	//// 	{/* <div className="h-32 bg-BLUE"></div> */}
	//// 	<div className="h-96 bg-ORANGE">
	//// 		<div className="sticky inset-t-0 -mt-16">
	//// 			<div className="h-32 bg-BLUE"></div>
	//// 			<div className="flex -mt-16 px-16 [&_>_:nth-child(1)]:grow-1 [&_>_:nth-child(2)]:shrink-0">
	//// 				<div className="rounded-tl-32 bg-RED">
	//// 					<div className="px-16">
	//// 						{iota(400).map(index =>
	//// 							<div key={index}>Hello, world!</div>
	//// 						)}
	//// 					</div>
	//// 				</div>
	//// 				<div className="w-400 rounded-tr-32 bg-YELLOW">
	//// 					<div>Hello</div>
	//// 				</div>
	//// 			</div>
	//// 		</div>
	//// 	</div>
	//// </>

	//// return <>
	//// 	<div className="xl:p-32">
	//// 		<div
	//// 			className="
	//// 				flex min-h-100vh xl:min-h-calc(100vh_-_32px_*_2) xl:rounded-$rounding bg-#fff shadow-$shadow
	//// 				[&_>_:nth-child(1)]:grow-1 [&_>_:nth-child(2)]:shrink-0
	//// 			"
	//// 		>
	//// 			<div>
	//// 				<NavigationBarContainer>
	//// 					<NavigationIcon />
	//// 					<div></div>
	//// 					<NavigationIcon />
	//// 					<NavigationIcon />
	//// 				</NavigationBarContainer>
	//// 				{iota(400).map(index =>
	//// 					<div key={index}>Hello, world!</div>
	//// 				)}
	//// 			</div>
	//// 			<div
	//// 				className={`
	//// 					fixed xl:[position]-revert inset-r-0
	//// 					w-400 xl:rounded-r-$rounding
	//// 					bg-$gray-color shadow-$negative-hairline-thickness_0_0_0_$hairline-color
	//// 					[transform]-translateX(100%) md:[transform]-revert
	//// 					[transition]-transform_300ms_ease md:[transition]-revert
	//// 				`}
	//// 			>
	//// 				<div>Hello</div>
	//// 				<div>Hello</div>
	//// 				<div>Hello</div>
	//// 				<div>Hello</div>
	//// 			</div>
	//// 		</div>
	//// 	</div>
	//// </>
}
