
//// function NavigationIcon() {
//// 	return <>
//// 		<div className="flex justify-center align-center h-32 w-32 rounded-1e3 bg-orange">
//// 			<div className="h-24 w-24 rounded-1e3 bg-white"></div>
//// 		</div>
//// 	</>
//// }

import { iota } from "../lib/iota"

//// function Sidebar1Contents() {
//// 	return <>
//// 		<div className="py-$sidebar-inset-y [&:nth-child(1)]:py-$main-inset-y px-$sidebar-inset-x flex flex-col gap-10">
//// 			<div className="h-6 w-80% rounded-1e3 bg-$placeholder-color"></div>
//// 			<div className="h-6 w-90% rounded-1e3 bg-$placeholder-color"></div>
//// 			<div className="h-6 w-70% rounded-1e3 bg-$placeholder-color"></div>
//// 			<div className="h-6 w-60% rounded-1e3 bg-$placeholder-color"></div>
//// 		</div>
//// 		{iota(2).map(index =>
//// 			<div key={index} className="py-$sidebar-inset-y px-$sidebar-inset-x flex flex-col gap-10">
//// 				<div className="-ml-8 flex align-center gap-10 h-6">
//// 					<div className="h-16 w-16 rounded-1e3 bg-$dark-placeholder-color"></div>
//// 					<div className="h-6 w-40% rounded-1e3 bg-$dark-placeholder-color"></div>
//// 				</div>
//// 				<div></div>
//// 				{iota(index + 1).map(index =>
//// 					<Fragment key={index}>
//// 						<div className="h-6 w-80% rounded-1e3 bg-$placeholder-color"></div>
//// 						<div className="h-6 w-90% rounded-1e3 bg-$placeholder-color"></div>
//// 						<div className="h-6 w-70% rounded-1e3 bg-$placeholder-color"></div>
//// 						<div className="h-6 w-60% rounded-1e3 bg-$placeholder-color"></div>
//// 					</Fragment>
//// 				)}
//// 			</div>
//// 		)}
//// 	</>
//// }

function Sidebar2Contents() {
	return <>
		{/* {iota(10).map(index =>
			<div key={index}>
				Hello, world! ({index})
			</div>
		)} */}
	</>
}

function SearchBarContents() {
	return <>
		<div>
			{/* ... */}
		</div>
	</>
}

function MainContents() {
	return <>
		<div className="py-$main-inset-y px-$main-inset-x">
			<div className="grid grid-cols-repeat(auto-fill,_minmax(96px,_1fr)) grid-auto-rows-96">
				{iota(400).map(index =>
					<div key={index} className="flex justify-center align-center">
						<div className="h-40 w-40 rounded-1e3 bg-$placeholder-color"></div>
					</div>
				)}
			</div>
		</div>
	</>
}

export function Home() {
	//// return <>
	//// 	<div className="h-320 bg-$trim-color"></div>
	//// 	<div className="sticky t-0">
	//// 		<div className="-mx-160 h-128 rounded-b-50% bg-$trim-color"></div>
	//// 	</div>
	//// 	<div className="-mt-160 pb-128 relative flex justify-center">
	//// 		<div className="basis-1500 bg-$base-color rounded-$rounding shadow-$shadow-6">
	//// 			{iota(1e3).map(index =>
	//// 				<div key={index}>
	//// 					Hello, world! ({index})
	//// 				</div>
	//// 			)}
	//// 		</div>
	//// 	</div>
	//// </>

	return <>
		<div className="h-$hero-height bg-$trim-color">
			{/* TODO: Hero contents */}
		</div>
		{/* Use mt-calc(-1_*_$ribbon-inset-y) here to preserve h-$hero-height */}
		{/* <div className="mt-calc(-1_*_$ribbon-inset-y) sticky t-0 overflow-x-hidden">
			<div className="mx-calc(-1_*_$ribbon-height_/_2) h-calc($ribbon-height_+_$rounding) rounded-b-25% bg-$trim-color"></div>
		</div> */}
		<div className="mt-calc(-1_*_$ribbon-inset-y) sticky t-0">
			<div className="h-calc($ribbon-height_+_$rounding) bg-$trim-color"></div>
		</div>
		<div className="mt-calc(-1_*_($ribbon-height_+_$rounding)) pb-calc($ribbon-inset-y_*_2) flex justify-center">
			<div className="basis-$main-width">
				{/* Forward relative here because of sticky */}
				<div className="mx-calc(-1_*_$rounding) sticky [&_+_*]:relative t-0 z-10 flex [&_>_:nth-child(2)]:grow-1">
					<div className="relative">
						<div className="h-calc($ribbon-inset-y_+_$rounding) w-calc($rounding_*_2) bg-$trim-color"></div>
						<div className="absolute br-0 h-$rounding w-$rounding rounded-tl-1e3 bg-$base-color"></div>
					</div>
					<div className="h-$ribbon-inset-y bg-$trim-color"></div>
					<div className="relative">
						<div className="h-calc($ribbon-inset-y_+_$rounding) w-calc($rounding_*_2) bg-$trim-color"></div>
						<div className="absolute bl-0 h-$rounding w-$rounding rounded-tr-1e3 bg-$base-color"></div>
					</div>
				</div>
				<div className="mt-calc(-1_*_$rounding) flex rounded-b-$rounding bg-$base-color shadow-$realistic-shadow-6 [&_>_:nth-child(1)]:grow-1">
					<main>
						<div className="px-$main-inset-x py-$main-inset-y sticky t-$ribbon-inset-y [background-image]-linear-gradient($base-color_calc($main-inset-y_+_$search-bar-height),_transparent)">
							<div className="h-$search-bar-height rounded-1e3 bg-hsl($base-h,_$base-s,_95%) [&:hover]:(bg-$base-color shadow-$shadow-2)">
								{/* <div>Hello</div> */}
							</div>
						</div>
						<MainContents />
					</main>
					<aside className="w-$sidebar-2-width shadow-$inset-hairline-shadow-l">
						<div className="sticky t-$ribbon-inset-y z-10 flex flex-col">
							<Sidebar2Contents />
						</div>
					</aside>
				</div>
			</div>
		</div>
	</>
}
