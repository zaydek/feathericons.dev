import { cx, detab, toKebabCase } from "@/lib"
import { CSSProperties, PropsWithChildren, useEffect, useState } from "react"

import { DynamicIcon, Icon } from "@/components/dynamic-icon"
import * as feather from "@/feather"
import * as wolfKitPayment from "@/wolf-kit/payment"
import * as wolfKitSocialMedia from "@/wolf-kit/social-media"

const featherEntries = Object.entries(feather)
const wolfKitSocialMediaEntries: [string, Icon][] = Object.entries(wolfKitSocialMedia) //// .filter(
//// 	([name]) => !["Circle", "Mono", "Square"].some(f => name.includes(f)),
//// )
const wolfKitPaymentEntries: [string, Icon][] = Object.entries(wolfKitPayment) //// .filter(([name]) => !["1", "2", "3", "4"].some(f => name.includes(f)))

//// // prettier-ignore
//// const aggregate: [string, Icon][] = [
//// 	...featherEntries,
//// 	...wolfKitSocialEntries,
//// 	...wolfKitPaymentEntries,
//// ]

//// const aggregate: [string, Icon][] = [
//// 	...WolfKitSocialMediaIconsEntries,
//// 	...WolfKitPaymentIconsEntries,
//// ]

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

function Inset({ className, children }: PropsWithChildren<{ className?: string }>) {
	return <div className={cx(`px-[var(--padding)]`, className)}>{children}</div>
}

function nameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

function UnorderedList({ name, icon, children }: PropsWithChildren<{ name: string; icon: Icon }>) {
	return (
		<ul>
			<div className="group flex h-32 items-center px-[var(--padding)]">
				<div className="-mx-16 -ml-8 flex h-32 items-center rounded-12 px-16 pl-8 group-hover:bg-gray-100">
					<DynamicIcon icon={icon} className="mr-[calc((36px_-_16px)_/_2)] h-16 w-16 text-gray-600" />
					{name}
				</div>
			</div>
			{children}
		</ul>
	)
}

function ListItem({ name, icon }: { name: string; icon: Icon }) {
	//// return (
	//// 	<li className="flex h-32 items-center bg-white px-[var(--padding)] pl-[calc(var(--padding)_+_16px_+_10px)]">
	//// 		<DynamicIcon icon={icon} className="mr-[calc((36px_-_16px)_/_2)] h-16 w-16 text-gray-600" />
	//// 		{name}
	//// 	</li>
	//// )
	return (
		<div className="group flex h-32 items-center px-[var(--padding)] pl-[calc(var(--padding)_+_16px_+_10px)]">
			<div className="-mx-16 -ml-8 flex h-32 items-center rounded-12 px-16 pl-8 group-hover:bg-gray-100">
				<DynamicIcon icon={icon} className="mr-[calc((36px_-_16px)_/_2)] h-16 w-16 text-gray-600" />
				{name}
			</div>
		</div>
	)
}

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
			<div className="flex" style={{ "--grid-column-size": "112px", "--grid-row-size": "128px" } as CSSProperties}>
				<AsideContainer>
					<Inset className="flex flex-col gap-16">
						<div className="flex">
							<Chip>Search</Chip>
						</div>
						<div className="flex h-36 rounded-1e3 bg-white shadow-[0_0_0_1px_theme('colors.gray.300')]">
							<feather.Search className="m-[calc((36px_-_16px)_/_2)] h-16 w-16 text-blue-500" />
							<div className="relative grow">
								{/* CSS reset: 100% w-100% bg-transparent */}
								<input className="h-100% w-100% bg-transparent focus:outline-none" type="text" />
								<div className="absolute inset-0 flex items-center">
									<span className="opacity-50">⌘+P to Focus</span>
								</div>
							</div>
						</div>
					</Inset>
					<div className="flex flex-col gap-8">
						<UnorderedList name="Feather" icon={feather.Feather} />
						<UnorderedList name="Social media" icon={feather.ChevronDown}>
							{/* <ListItem name="Original" icon={wolfKitSocialMedia.Amazon} />
							<ListItem name="Circle" icon={wolfKitSocialMedia.AmazonCircle} />
							<ListItem name="Square" icon={wolfKitSocialMedia.AmazonSquare} />
							<ListItem name="Circle monochrome" icon={wolfKitSocialMedia.AmazonCircleMono} />
							<ListItem name="Square monochrome" icon={wolfKitSocialMedia.AmazonSquareMono} /> */}
						</UnorderedList>
						<UnorderedList name="Payment services" icon={feather.ChevronDown}>
							{/* <ListItem name="Original" icon={wolfKitPayment.Stripe} />
							<ListItem name="Inverted" icon={wolfKitPayment.Stripe1} />
							<ListItem name="Monochrome" icon={wolfKitPayment.Stripe2} />
							<ListItem name="Inverted monochrome" icon={wolfKitPayment.Stripe3} /> */}
						</UnorderedList>
					</div>
				</AsideContainer>
				<MainContainer>
					{/* Search grid */}
					{[["Feather", featherEntries] as const, ["Wolf Kit", wolfKitSocialMediaEntries] as const, ["Wolf Kit", wolfKitPaymentEntries] as const].map(
						([name, entries]) => (
							<div key={name} className="flex flex-col gap-16">
								<div className="grid auto-rows-[var(--grid-row-size)] grid-cols-[repeat(auto-fill,_minmax(var(--grid-column-size),_1fr))]">
									{entries.map(([name, Icon]) => (
										<div key={name} className="flex flex-col gap-16 p-16">
											<div className="flex grow items-center justify-center">
												<Icon className="min-h-36 min-w-36 text-gray-800" strokeWidth={2.5} />
											</div>
											{/* Don't truncate names... */}
											<div className="flex h-16 justify-center self-center text-center">{nameCase(name)}</div>
										</div>
									))}
								</div>
							</div>
						),
					)}
				</MainContainer>
			</div>
		</>
	)
}

function Chip({ children }: PropsWithChildren) {
	// Use mx-10 to optically align to search bar
	return <div className="mx-10 flex h-24 items-center rounded-1e3 bg-gray-200 px-12">{children}</div>
}

function MainContainer({ children }: PropsWithChildren) {
	return <div className="flex grow flex-col justify-center gap-32 p-64">{children}</div>
}

function AsideContainer({ children }: PropsWithChildren) {
	return (
		<div
			className="min-h-[100dvh] w-320 bg-white shadow-[0_0_0_1px_theme('colors.gray.300')]"
			style={{ "--padding": "32px", "--spacing": "24px" } as CSSProperties}
		>
			<div className="sticky top-0 flex flex-col gap-[var(--spacing)] py-[var(--padding)]">{children}</div>
		</div>
	)
}
