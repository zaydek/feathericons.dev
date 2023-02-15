import { detab } from "@/lib"
import { useEffect, useState } from "react"

import * as WolfKitSocialMedia from "@/wolf-kit/social-media"
//// import * as WolfKitPayment from "@/wolf-kit/payment"

const WolfKitSocialMediaEntries = Object.entries(WolfKitSocialMedia) //// .slice(-14, -13)

//// import { DynamicIcon } from "@/components/dynamic-icon"
////
//// const WolfKitSocialMediaNames = Object.keys(WolfKitSocialMedia)
//// //// const staticWolfKitPaymentKeys = Object.keys(WolfKitPayment)
////
//// function WolfKitSocialMediaIcon({ name }: { name: string }) {
//// 	return <DynamicIcon icon={WolfKitSocialMedia} />
//// }

//// function SearchBar() {
//// 	return (
//// 		<div className="h-48 rounded-1e3 bg-white px-[calc(48px_/_4)]">
//// 			<div>Hello</div>
//// 		</div>
//// 	)
//// }
////
//// function SearchGridItem() {
//// 	return (
//// 		<div className="flex h-128 flex-col p-16 pt-0">
//// 			<div className="flex grow items-center justify-center">
//// 				<div className="h-32 w-32 rounded-1e3 bg-gray-700"></div>
//// 			</div>
//// 			<div className="truncate text-center">Hello hello hello hello hello hello</div>
//// 		</div>
//// 	)
//// }
////
//// function SearchGrid() {
//// 	return (
//// 		<div className="grid grid-cols-[repeat(auto-fill,_minmax(128px,_1fr))]">
//// 			{iota(60).map(index => (
//// 				<SearchGridItem key={index} />
//// 			))}
//// 		</div>
//// 	)
//// }

export default function Page() {
	const [showOutline, setShowOutline] = useState(false)

	useEffect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === "`") {
				setShowOutline(curr => !curr)
			}
		}
		window.addEventListener("keydown", handleKeydown, false)
		return () => window.removeEventListener("keydown", handleKeydown, false)
	}, [])

	return (
		<>
			{/* DEBUG */}
			<style>
				{showOutline &&
					detab(`
						* { outline: 1px solid hsl(0, 100%, 50%, 0.1); }
					`)}
			</style>
			<div className="flex justify-center py-96 px-16">
				<div className="flex w-100% max-w-lg flex-col gap-64">
					{/* Search bar */}
					<div className="flex h-48 items-center rounded-1e3 bg-white px-[calc(48px_/_2)] shadow-[var(--inset-shadow)]">
						<div>Hello</div>
					</div>
					{/* Search grid */}
					<div className="grid grid-cols-[repeat(auto-fill,_minmax(128px,_1fr))]">
						{WolfKitSocialMediaEntries.map(([name, Icon]) => (
							<div key={name} className="flex h-128 flex-col pb-16">
								<div className="flex grow items-center justify-center">
									{/* <div className="h-32 w-32 rounded-1e3 bg-gray-700"></div> */}
									{/* NOTE: aspect-square doesn't work here */}
									<Icon className="h-48 w-48" />
								</div>
								<div className="truncate text-center">{name}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}
