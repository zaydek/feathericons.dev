import { SearchBar, SearchResultsContents, SidebarContents } from "../search-app"

export function Home() {
	return <>
		<div className="h-$hero-height background-color--$trim-color">
			{/* TODO: Hero contents */}
		</div>
		{/* Use -mt-$ribbon-inset-y here to preserve h-$hero-height */}
		<div className="-mt-$ribbon-inset-y sticky t-0 overflow-x-hidden">
			<div className="-mx-$ribbon-height h-($ribbon-height_+_$rounding) rounded-b-50% background-color--$trim-color"></div>
		</div>
		<div className="-mt-($ribbon-height_+_$rounding) pb-$ribbon-inset-y flex justify-center">
			<div className="flex-basis--$main-width">
				{/* Forward relative here because of sticky */}
				{/* Use z-(>10) */}
				<div className="-mx-$rounding sticky [&_+_*]:relative t-0 z-100 flex [&_>_:nth-child(2)]:grow">
					<div className="relative">
						<div className="h-($ribbon-inset-y_+_$rounding) w-($rounding_*_2) background-color--$trim-color"></div>
						<div className="absolute br-0 h-$rounding w-$rounding rounded-tl-1e3 background-color--$base-color"></div>
					</div>
					<div className="h-$ribbon-inset-y background-color--$trim-color"></div>
					<div className="relative">
						<div className="h-($ribbon-inset-y_+_$rounding) w-($rounding_*_2) background-color--$trim-color"></div>
						<div className="absolute bl-0 h-$rounding w-$rounding rounded-tr-1e3 background-color--$base-color"></div>
					</div>
				</div>
				<div className="-mt-$rounding flex rounded-b-$rounding background-color--$base-color box-shadow--$shadow-4 [&_>_:nth-child(1)]:grow">
					{/* MAIN */}
					<main>
						<div className="py-$main-inset-y px-$main-inset-x sticky t-$ribbon-inset-y z-10 background-image--linear-gradient($base-color_calc($main-inset-y_+_$search-bar-height),_transparent)">
							<SearchBar />
						</div>
						<div className="py-$main-inset-y px-$main-inset-x">
							<SearchResultsContents />
						</div>
					</main>
					{/* ASIDE */}
					<aside className="w-$sidebar-width box-shadow--$inset-hairline-shadow-l">
						<div className="py-$sidebar-inset-y px-$sidebar-inset-x sticky t-$ribbon-inset-y z-100 flex flex-col gap-20">
							<SidebarContents />
						</div>
					</aside>
				</div>
			</div>
		</div>
	</>
}
