
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
		<div className="py-$sidebar-inset-y [&:nth-child(1)]:py-$inset-y px-$sidebar-inset-x flex flex-col gap-10">
			<div className="h-6 w-80% rounded-1e3 bg-$placeholder-color"></div>
			<div className="h-6 w-90% rounded-1e3 bg-$placeholder-color"></div>
			<div className="h-6 w-70% rounded-1e3 bg-$placeholder-color"></div>
			<div className="h-6 w-60% rounded-1e3 bg-$placeholder-color"></div>
		</div>
		{iota(2).map(index =>
			<div key={index} className="py-$sidebar-inset-y px-$sidebar-inset-x flex flex-col gap-10">
				<div className="-ml-8 flex align-center gap-10 h-6">
					<div className="h-16 w-16 rounded-1e3 bg-$dark-placeholder-color"></div>
					<div className="h-6 w-40% rounded-1e3 bg-$dark-placeholder-color"></div>
				</div>
				<div></div>
				{iota((index + 1) * 2).map(index =>
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
		{iota(10).map(index =>
			<div key={index}>
				Hello, world! ({index})
			</div>
		)}
	</>
}

function MainContents() {
	return <>
		{iota(400).map(index =>
			<div key={index}>
				Hello, world! ({index})
			</div>
		)}
	</>
}

export function Home() {
	return <>
		<div className="h-$hero-height bg-$trim-color"></div>
		<div className="-mx-128 sticky t-$rounding">
			<div className="h-$ribbon-height rounded-b-50% bg-$trim-color"></div>
		</div>
		<div className="mt-calc(-1_*_($ribbon-height_+_$rounding)) pb-calc($inset-y_*_4) px-$inset-x">
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
					<div className="absolute bl-0 h-$rounding w-$rounding rounded-tr-1e3 bg-$base-color"></div>
				</div>
				<div className="h-calc($inset-y_+_$rounding) w-$inset-x bg-$trim-color"></div>
			</div>
			{/* Use relative here because of the obscuring caps. Don't use z-index
			here; defer z-index to sidebars. */}
			<div className="mt-calc(-1_*_$rounding) relative flex rounded-b-$rounding bg-$base-color shadow-$realistic-shadow [&_>_:nth-child(2)]:grow-1">
				<aside className="w-$sidebar-1-width shadow-$inset-hairline-shadow-r">
					{/* Use flex flex-col for sidebars */}
					<div className="sticky t-$inset-y z-10 flex flex-col">
						<Sidebar1Contents />
					</div>
				</aside>
				<main>
					{/* TODO */}
					<nav className="sticky t-$inset-y h-$navigation-height bg-$base-color"></nav>
					<MainContents />
				</main>
				<aside className="w-$sidebar-2-width shadow-$inset-hairline-shadow-l">
					{/* Use flex flex-col for sidebars */}
					<div className="sticky t-$inset-y z-10 flex flex-col">
						<Sidebar2Contents />
					</div>
				</aside>
			</div>
		</div>
	</>
}
