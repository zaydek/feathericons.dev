
//// function NavigationIcon() {
//// 	return <>
//// 		<div className="flex justify-center align-center h-32 w-32 rounded-1e3 bg-orange">
//// 			<div className="h-24 w-24 rounded-1e3 bg-white"></div>
//// 		</div>
//// 	</>
//// }

import { Fragment } from "react"
import { iota } from "../lib/iota"

function Sidebar1Contents() {
	return <>
		<div className="py-$sidebar-py [&:nth-child(1)]:py-$main-py px-$sidebar-px flex flex-col gap-10">
			<div className="h-6 w-80% rounded-1e3 bg-$placeholder-color"></div>
			<div className="h-6 w-90% rounded-1e3 bg-$placeholder-color"></div>
			<div className="h-6 w-70% rounded-1e3 bg-$placeholder-color"></div>
			<div className="h-6 w-60% rounded-1e3 bg-$placeholder-color"></div>
		</div>
		{iota(2).map(index =>
			<div key={index} className="py-$sidebar-py px-$sidebar-px flex flex-col gap-10">
				<div className="-ml-8 flex align-center gap-10 h-6">
					<div className="h-16 w-16 rounded-1e3 bg-$dark-placeholder-color"></div>
					<div className="h-6 w-40% rounded-1e3 bg-$dark-placeholder-color"></div>
				</div>
				<div></div>
				{iota(index + 1).map(index =>
					<Fragment key={index}>
						<div className="h-6 w-80% rounded-1e3 bg-$placeholder-color"></div>
						<div className="h-6 w-90% rounded-1e3 bg-$placeholder-color"></div>
						<div className="h-6 w-70% rounded-1e3 bg-$placeholder-color"></div>
						<div className="h-6 w-60% rounded-1e3 bg-$placeholder-color"></div>
					</Fragment>
				)}
			</div>
		)}
	</>
}

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
		<div className="py-$main-py px-$main-px">
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
	return <>
		<div className="h-$hero-height bg-$trim-color"></div>
		<div className="mx-calc(-1_*_$ribbon-height_/_2) sticky t-$rounding">
			<div className="h-$ribbon-height rounded-b-50% bg-$trim-color"></div>
		</div>
		{/* <div className="sticky t-$rounding">
			<div className="h-$ribbon-height bg-$trim-color"></div>
		</div> */}
		<div className="mt-calc(-1_*_($ribbon-height_+_$rounding)) pb-calc($ribbon-py_*_2) px-$ribbon-px">
			<div className="mx-calc(-1_*_$ribbon-px) sticky t-0 z-10 flex [&_>_:nth-child(3)]:grow-1">
				<div className="h-calc($ribbon-py_+_$rounding) w-$ribbon-px bg-$trim-color"></div>
				<div className="relative">
					<div className="h-calc($ribbon-py_+_$rounding) w-$rounding bg-$trim-color"></div>
					<div className="absolute br-0 h-$rounding w-$rounding rounded-tl-1e3 bg-$base-color"></div>
				</div>
				<div className="h-$ribbon-py bg-$trim-color"></div>
				<div className="relative">
					<div className="h-calc($ribbon-py_+_$rounding) w-$rounding bg-$trim-color"></div>
					<div className="absolute bl-0 h-$rounding w-$rounding rounded-tr-1e3 bg-$base-color"></div>
				</div>
				<div className="h-calc($ribbon-py_+_$rounding) w-$ribbon-px bg-$trim-color"></div>
			</div>
			{/* Use relative here because of the obscuring caps. Don't use z-index
			here; defer z-index to sidebars. */}
			<div className="mt-calc(-1_*_$rounding) relative flex rounded-b-$rounding bg-$base-color shadow-$realistic-shadow-6 [&_>_:nth-child(2)]:grow-1">
				<aside className="w-$sidebar-1-width shadow-$inset-hairline-shadow-r">
					{/* Use flex flex-col for sidebars */}
					<div className="sticky t-$ribbon-py z-10 flex flex-col">
						<Sidebar1Contents />
					</div>
				</aside>
				<main>
					{/* TODO */}
					{/* <nav className="sticky t-$ribbon-py h-$search-bar-height bg-$base-color"></nav> */}
					{/* <div className="px-$main-px py-$main-py sticky t-$ribbon-py [background-image]-linear-gradient(orange_calc($main-py_+_$search-bar-height),_blue_calc($main-py_+_$search-bar-height_+_calc($main-py_/_2)))"> */}
					<div className="px-$main-px py-$main-py sticky t-$ribbon-py [background-image]-linear-gradient($base-color_calc($main-py_+_$search-bar-height),_transparent)">
						<div className="h-$search-bar-height rounded-1e3 bg-hsl($base-h,_$base-s,_95%) [&:hover]:(bg-$base-color shadow-$shadow-2)">
							{/* <div>Hello</div> */}
						</div>
					</div>
					<MainContents />
				</main>
				<aside className="w-$sidebar-2-width shadow-$inset-hairline-shadow-l">
					{/* Use flex flex-col for sidebars */}
					<div className="sticky t-$ribbon-py z-10 flex flex-col">
						<Sidebar2Contents />
					</div>
				</aside>
			</div>
		</div>
	</>
}
