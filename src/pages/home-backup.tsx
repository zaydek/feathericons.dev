
//// function NavigationIcon() {
//// 	return <>
//// 		<div className="flex flex-center h-32 w-32 rounded-1e3 bg-orange">
//// 			<div className="h-24 w-24 rounded-1e3 bg-white"></div>
//// 		</div>
//// 	</>
//// }

import { HTMLAttributes } from "react"
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
					<div key={index} className="flex flex-center">
						<div className="h-40 w-40 rounded-1e3 bg-$placeholder-color"></div>
					</div>
				)}
			</div>
		</div>
	</>
}

function Section({ tag, children, ...props }: { tag?: keyof JSX.IntrinsicElements } & HTMLAttributes<HTMLElement>) {
	return <>
		<section className="py-$sidebar-inset-y px-$sidebar-inset-x flex flex-col gap-$sidebar-label-height" {...props}>
			{children}
		</section>
	</>
}

function IconPlaceholder() {
	return <div className="h-24 w-24 rounded-1e3 bg-$placeholder-color"></div>
}
function TextPlaceholder() {
	return <div className="h-6 w-72 rounded-1e3 bg-$dark-placeholder-color"></div>
}
function Hairline() {
	return <hr className="h-$hairline-height bg-$hairline-color" />
}

function Label({ resetButton }: { resetButton?: boolean }) {
	resetButton ??= false

	return <>
		<div className="flex justify-space-between align-center h-$sidebar-label-height">
			<div className="flex align-center gap-10">
				<IconPlaceholder />
				<TextPlaceholder />
			</div>
			{resetButton &&
				<div className="px-4">
					<div className="flex flex-center h-24 w-24 rounded-1e3 bg-$light-placeholder-color">
						<div className="h-50% aspect-1 rounded-1e3 bg-$dark-placeholder-color"></div>
					</div>
				</div>
			}
		</div>
	</>
}

function Checkbox() {
	return <>
		<div className="flex justify-space-between align-center h-$sidebar-label-height">
			<TextPlaceholder />
			<div className="flex flex-col justify-center h-$sidebar-label-height">
				<div className="flex justify-end align-center h-12 w-48 rounded-1e3 bg-$alt-trim-color">
					<div className="flex flex-center h-$sidebar-input-height w-$sidebar-input-height rounded-1e3 bg-$base-color shadow-$shadow-6">
						<div className="h-50% aspect-1 rounded-1e3 bg-$placeholder-color"></div>
					</div>
				</div>
			</div>
		</div>
	</>
}

function Slider() {
	return <>
		<div className="px-4">
			<div className="flex flex-col justify-center h-$sidebar-label-height">
				<div className="flex flex-center h-6 rounded-1e3 bg-$alt-trim-color">
					<div className="flex flex-center h-calc($sidebar-input-height_+_4px) w-calc($sidebar-input-height_+_4px) rounded-1e3 bg-$base-color shadow-$shadow-6">
						<div className="h-50% aspect-1 rounded-1e3 bg-$placeholder-color"></div>
					</div>
				</div>
			</div>
		</div>
	</>
}

function SidebarContents() {
	return <>
		<div className="relative">
			<div className="flex flex-center aspect-1.5">
				<div className="mb-calc(-1_*_($main-inset-y_+_$sidebar-label-height)_/_2) h-64 w-64 rounded-1e3 bg-$placeholder-color"></div>
			</div>
			<div className="absolute inset-0 [pointer-events]-none [&_>_*]:[pointer-events]-auto">
				<div className="py-$main-inset-y px-$sidebar-inset-x">
					<Label />
				</div>
			</div>
		</div>
		<Hairline />
		<Section>
			<Label resetButton />
			<Checkbox />
			<Checkbox />
			<Checkbox />
		</Section>
		<Hairline />
		<Section>
			<Label resetButton />
			<Slider />
		</Section>
		<Hairline />
		<Section>
			<Label resetButton />
			<Slider />
		</Section>
		<Hairline />
	</>
}

export function Home() {
	return <>
		<div className="h-$hero-height bg-$alt-trim-color">
			{/* TODO: Hero contents */}
		</div>
		{/* Use mt-calc(-1_*_$ribbon-inset-y) here to preserve h-$hero-height */}
		<div className="mt-calc(-1_*_$ribbon-inset-y) sticky t-0 overflow-x-hidden">
			<div className="mx-calc(-1_*_$ribbon-height) h-calc($ribbon-height_+_$rounding) rounded-b-50% bg-$alt-trim-color"></div>
		</div>
		{/* <div className="mt-calc(-1_*_$ribbon-inset-y) sticky t-0">
			<div className="h-calc($ribbon-height_+_$rounding) bg-$alt-trim-color"></div>
		</div> */}
		<div className="mt-calc(-1_*_($ribbon-height_+_$rounding)) pb-calc($ribbon-inset-y_*_2) flex justify-center">
			<div className="basis-$main-width">
				{/* Forward relative here because of sticky */}
				{/* Use z-(>10) */}
				<div className="mx-calc(-1_*_$rounding) sticky [&_+_*]:relative t-0 z-100 flex [&_>_:nth-child(2)]:grow-1">
					<div className="relative">
						<div className="h-calc($ribbon-inset-y_+_$rounding) w-calc($rounding_*_2) bg-$alt-trim-color"></div>
						<div className="absolute br-0 h-$rounding w-$rounding rounded-tl-1e3 bg-$base-color"></div>
					</div>
					<div className="h-$ribbon-inset-y bg-$alt-trim-color"></div>
					<div className="relative">
						<div className="h-calc($ribbon-inset-y_+_$rounding) w-calc($rounding_*_2) bg-$alt-trim-color"></div>
						<div className="absolute bl-0 h-$rounding w-$rounding rounded-tr-1e3 bg-$base-color"></div>
					</div>
				</div>
				<div className="mt-calc(-1_*_$rounding) flex rounded-b-$rounding bg-$base-color shadow-$shadow-3 [&_>_:nth-child(1)]:grow-1">
					<main>
						<div className="py-$main-inset-y px-$main-inset-x sticky t-$ribbon-inset-y [background-image]-linear-gradient($base-color_calc($main-inset-y_+_$search-bar-height),_transparent)">
							<div className="h-$search-bar-height rounded-1e3 bg-hsl($base-h,_$base-s,_95%) [&:hover]:(bg-$base-color shadow-$shadow-2)">
								{/* <div>Hello</div> */}
							</div>
						</div>
						<MainContents />
					</main>
					<aside className="w-$sidebar-width shadow-$inset-hairline-shadow-l">
						<div className="sticky t-$ribbon-inset-y z-10 flex flex-col">
							<SidebarContents />
						</div>
					</aside>
				</div>
			</div>
		</div>
	</>
}
