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

function DoubleInset({ className, children }: PropsWithChildren<{ className?: string }>) {
	return <div className={cx(`px-[calc(var(--padding)_*_1.5)]`, className)}>{children}</div>
}

function nameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

function Ul({ name, icon, children }: PropsWithChildren<{ name: string; icon: Icon }>) {
	const [checked, setChecked] = useState(false)

	return (
		<div className="px-[var(--padding)]" style={{ "--container-h": "36px", "--icon-h": "16px", "--small-icon-h": "10px" } as CSSProperties}>
			<div className="rounded-16 hover:bg-slate-100" onClick={e => setChecked(curr => !curr)}>
				{/* Button */}
				<div className="flex h-[var(--container-h)] cursor-pointer items-center justify-between rounded-1e3 hover:bg-slate-200 hover:active:bg-slate-300">
					{/* LHS */}
					<div className="flex items-center">
						<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
							<DynamicIcon icon={icon} className="h-[var(--icon-h)] w-[var(--icon-h)] text-slate-700" />
						</div>
						{name}
					</div>
					{/* RHS */}
					{checked && (
						<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
							<feather.Check className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-700" strokeWidth={6} />
						</div>
					)}
				</div>
				{/* <div className="pl-24">{children}</div> */}
				<div className="pl-12">{children}</div>
			</div>
		</div>
	)
}

function Li({ name, icon }: { name: string; icon: Icon }) {
	const [checked, setChecked] = useState(false)

	return (
		// Button
		<div
			className="flex h-[var(--container-h)] cursor-pointer items-center justify-between rounded-1e3 hover:bg-slate-200 hover:active:bg-slate-300"
			onClick={e => {
				e.stopPropagation()
				setChecked(curr => !curr)
			}}
		>
			{/* LHS */}
			<div className="flex items-center">
				<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
					<DynamicIcon icon={icon} className="h-[var(--icon-h)] w-[var(--icon-h)] text-slate-700" />
				</div>
				{name}
			</div>
			{/* RHS */}
			{checked && (
				<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
					<feather.Check className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-700" strokeWidth={6} />
				</div>
			)}
		</div>
	)
}

//// <div className="m-[calc((var(--container-h)_-_var(--icon-h))_/_2)] flex h-[var(--icon-h)] w-[var(--icon-h)] items-center justify-center">
//// 	{/* prettier-ignore */}
//// 	<feather.Check
//// 		className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-blue-500"
//// 		//// strokeLinecap="square"
//// 		strokeWidth={4}
//// 	/>
//// </div>

// prettier-ignore
const socialItems = [
	{ name: "Original",    icon: wolfKitSocialMedia.Twitter           },
	{ name: "Circle",      icon: wolfKitSocialMedia.TwitterCircle     },
	{ name: "Square",      icon: wolfKitSocialMedia.TwitterSquare     },
	{ name: "Circle mono", icon: wolfKitSocialMedia.TwitterCircleMono },
	{ name: "Square mono", icon: wolfKitSocialMedia.TwitterSquareMono },
]

// prettier-ignore
const paymentItems = [
  { name: "Original",      icon: wolfKitPayment.Stripe  },
  { name: "Inverted",      icon: wolfKitPayment.Stripe1 },
  { name: "Mono",          icon: wolfKitPayment.Stripe2 },
  { name: "Inverted mono", icon: wolfKitPayment.Stripe3 },
];

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
					<DoubleInset className="flex flex-col gap-16">
						<div className="flex">
							<Chip>Search</Chip>
						</div>
						<div className="flex h-36 rounded-1e3 bg-white shadow-[0_0_0_1px_theme('colors.slate.300')]">
							<feather.Search className="m-[calc((36px_-_16px)_/_2)] h-16 w-16 text-blue-500" />
							<div className="relative grow">
								{/* CSS reset: 100% w-100% bg-transparent */}
								<input className="h-100% w-100% bg-transparent focus:outline-none" type="text" />
								<div className="pointer-events-none absolute inset-0 flex items-center">
									<span className="opacity-50">⌘+P to Focus</span>
								</div>
							</div>
						</div>
					</DoubleInset>
					<div className="flex flex-col gap-[calc(var(--spacing)_/_2)]">
						<Ul name="Feather icons" icon={feather.Feather} />
						<Ul
							name="Platform icons"
							icon={() => (
								<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
									<feather.ChevronDown className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-700" strokeWidth={7 / 2} />
								</div>
							)}
						>
							{socialItems.map(props => (
								<Li key={props.name} {...props} />
							))}
						</Ul>
						<Ul
							name="Payment platform icons"
							icon={() => (
								<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
									<feather.ChevronDown className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-700" strokeWidth={7 / 2} />
								</div>
							)}
						>
							{paymentItems.map(props => (
								<Li key={props.name} {...props} />
							))}
						</Ul>
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
												{/* Use -800 instead of -700 here */}
												<Icon className="min-h-28 min-w-28 text-slate-800" strokeWidth={2.5} />
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
				{/* <AsideContainer></AsideContainer> */}
			</div>
		</>
	)
}

function Chip({ children }: PropsWithChildren) {
	// Use mx-10 to optically align to search bar
	return <div className="mx-10 flex h-24 items-center rounded-1e3 bg-slate-200 px-12">{children}</div>
}

function MainContainer({ children }: PropsWithChildren) {
	return <div className="flex grow flex-col justify-center gap-32 p-64">{children}</div>
}

function AsideContainer({ children }: PropsWithChildren) {
	return (
		<div
			className="min-h-[100dvh] w-320 bg-white shadow-[0_0_0_1px_theme('colors.slate.300')]"
			style={{ "--padding": "16px", "--spacing": "24px" } as CSSProperties}
		>
			<div className="sticky top-0 flex flex-col gap-[var(--spacing)] py-[calc(var(--padding)_*_2)]">{children}</div>
		</div>
	)
}
