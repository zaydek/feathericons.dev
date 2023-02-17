import { detab, toKebabCase } from "@/lib"
import { createContext, CSSProperties, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react"

import { DynamicIcon, Icon } from "@/components/dynamic-icon"
import { CreativeCommons, Scale } from "@/components/license"
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

function nameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

// prettier-ignore
const GroupContext =
	createContext<{
		checkboxes:    Map<string, boolean>
		setCheckboxes: Dispatch<SetStateAction<Map<string, boolean>>>
	} | null>(null)

function Group({ name, icon, children }: PropsWithChildren<{ name: string; icon: Icon }>) {
	const [dropdown, setDropdown] = useState(false)
	const [checkboxes, setCheckboxes] = useState<Map<string, boolean>>(() => new Map())

	useEffect(() => {
		if (children !== undefined) { return } // prettier-ignore
		setCheckboxes(curr => {
			const next = new Map(curr)
			next.set(name, true)
			return next
		})
	}, [children, name])

	const [some, every] = useMemo(() => {
		const arr = [...checkboxes.values()]
		return [arr.some(checked => checked), arr.every(checked => checked)] as const
	}, [checkboxes])

	const setChecked = useCallback(
		(checked: SetStateAction<boolean>) => {
			setCheckboxes(curr => {
				const next = new Map(curr)
				for (const key of next.keys()) {
					next.set(key, typeof checked === "function" ? checked(every) : checked)
				}
				return next
			})
		},
		[every],
	)

	return (
		<GroupContext.Provider value={{ checkboxes, setCheckboxes }}>
			<div
				className="rounded-[calc(var(--container-h)_/_2)] hover:bg-slate-100"
				style={{ "--container-h": "36px", "--icon-h": "calc(var(--container-h) / 2)", "--small-icon-h": "12px" } as CSSProperties}
			>
				<div
					className="flex h-[var(--container-h)] cursor-pointer select-none items-center justify-between rounded-1e3
						hover:bg-slate-200 hover:active:bg-slate-300"
					onClick={e => {
						if (children === undefined) {
							setChecked(curr => !curr)
						} else {
							setDropdown(curr => !curr)
						}
					}}
					tabIndex={0}
				>
					{/* LHS */}
					<div className="flex items-center">
						<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
							<DynamicIcon icon={icon} className="h-[var(--icon-h)] w-[var(--icon-h)] text-slate-700" strokeWidth={2.5} />
						</div>
						{name}
					</div>
					{/* RHS */}
					<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
						{/* {!some && !every && <feather.Minus className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-300" strokeWidth={5} />} */}
						{some && <feather.Check className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-700" strokeWidth={5} />}
					</div>
				</div>
				{dropdown && <div className="pl-12">{children}</div>}
				{/* {dropdown && children} */}
			</div>
		</GroupContext.Provider>
	)
}

function GroupItem({ name, icon }: { name: string; icon: Icon }) {
	const { checkboxes, setCheckboxes } = useContext(GroupContext)!

	useEffect(() => {
		if (checkboxes.has(name)) { return } // prettier-ignore
		setCheckboxes(curr => {
			const next = new Map(curr)
			next.set(name, true)
			return next
		})
	}, [checkboxes, name, setCheckboxes])

	const checked = useMemo(() => {
		return checkboxes.get(name)
	}, [checkboxes, name])

	const setChecked = useCallback(
		(checked: SetStateAction<boolean>) => {
			setCheckboxes(curr => {
				const next = new Map(curr)
				// prettier-ignore
				next.set(name, typeof checked === "function"
					? checked(curr.get(name)!)
					: checked)
				return next
			})
		},
		[name, setCheckboxes],
	)

	return (
		<div
			className="flex h-[var(--container-h)] cursor-pointer select-none items-center justify-between rounded-1e3
				hover:bg-slate-200 hover:active:bg-slate-300"
			onClick={e => {
				e.stopPropagation()
				setChecked(curr => !curr)
			}}
			tabIndex={0}
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
					<feather.Check className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-700" strokeWidth={5} />
				</div>
			)}
		</div>
	)
}

function SearchBar() {
	const [search, setSearch] = useState("")

	return (
		<div className="flex h-36 rounded-1e3 bg-white shadow-[0_0_0_1px_theme('colors.slate.300')]">
			<feather.Search className="m-[calc((36px_-_16px)_/_2)] h-16 w-16 text-slate-400" strokeWidth={2.5} />
			<div className="relative grow">
				{/* CSS reset: 100% w-100% bg-transparent */}
				<input className="h-100% w-100% bg-transparent focus:outline-none" type="text" value={search} onChange={e => setSearch(e.currentTarget.value)} />
				{search === "" && (
					<div className="pointer-events-none absolute inset-0 flex items-center">
						<span className="opacity-50">Search icons</span>
					</div>
				)}
			</div>
		</div>
	)
}

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
			<div className="flex" style={{ "--grid-column-size": "128px", "--grid-row-size": "128px" } as CSSProperties}>
				<AsideContainer>
					{/* <div className="flex flex-col gap-[var(--spacing)] p-[var(--padding)]">
						<div className="flex h-24 items-center justify-between">
							<Chip>Search</Chip>
							<div className="flex h-36 w-36 items-center justify-center">
								<feather.RotateCcw className="h-12 w-12 text-slate-700" strokeWidth={4} />
							</div>
						</div>
						<SearchBar />
					</div> */}
					{/* <hr className="relative first-of-type:top-1 last-of-type:bottom-1" /> */}
					<div className="flex flex-col gap-[var(--spacing)] overflow-y-auto p-[var(--padding)] pb-0">
						<div className="flex h-24 items-center justify-between">
							<Chip>Search</Chip>
							<div className="flex h-36 w-36 items-center justify-center">
								<feather.RotateCcw className="h-12 w-12 text-slate-700" strokeWidth={4} />
							</div>
						</div>
						<SearchBar />
						<hr className="-mx-[var(--padding)]" />
						{/* <div className="flex flex-col gap-[var(--spacing)]"> */}
						<div className="flex h-24 items-center justify-between">
							<Chip>Icons</Chip>
							<div className="flex h-36 w-36 items-center justify-center">
								<feather.RotateCcw className="h-12 w-12 text-slate-700" strokeWidth={4} />
							</div>
						</div>
						<div className="flex flex-col gap-8">
							<Group name="Feather" icon={feather.Smile} />
							<Group
								name="Platforms"
								icon={() => (
									<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
										<feather.ChevronDown className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-400" strokeWidth={5} />
									</div>
								)}
							>
								{socialItems.map(props => (
									<Group key={props.name} {...props}>
										<GroupItem {...props} />
									</Group>
								))}
							</Group>
							<Group
								name="Payment platforms"
								icon={() => (
									<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
										<feather.ChevronDown className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-400" strokeWidth={5} />
									</div>
								)}
							>
								{paymentItems.map(props => (
									<Group key={props.name} {...props}>
										<GroupItem {...props} />
									</Group>
								))}
							</Group>
						</div>
						{/* </div> */}
						{/* Slider */}
						<hr className="-mx-[var(--padding)]" />
						<div className="flex flex-col gap-[var(--spacing)]">
							<div className="flex h-24 items-center justify-between">
								<Chip>Color</Chip>
								<div className="flex h-36 w-36 items-center justify-center">
									<feather.RotateCcw className="h-12 w-12 text-slate-700" strokeWidth={4} />
								</div>
							</div>
							<div
								className="mx-10 flex h-[calc(var(--slider-height))] flex-col justify-center"
								style={{ "--slider-height": "32px", "--slider-track-height": "6px" } as CSSProperties}
							>
								<div className="flex h-[var(--slider-track-height)] flex-row items-center justify-center rounded-1e3 bg-slate-300">
									<div className="h-[var(--slider-height)] w-[var(--slider-height)] rounded-1e3 bg-white shadow-[0_0_0_1px_theme('colors.slate.300')]"></div>
								</div>
							</div>
						</div>
						<hr className="-mx-[var(--padding)]" />
						<div className="flex flex-col gap-[var(--spacing)]">
							<div className="flex h-24 items-center justify-between">
								<Chip>Size</Chip>
								<div className="flex h-36 w-36 items-center justify-center">
									<feather.RotateCcw className="h-12 w-12 text-slate-700" strokeWidth={4} />
								</div>
							</div>
							<div
								className="mx-10 flex h-[calc(var(--slider-height))] flex-col justify-center"
								style={{ "--slider-height": "32px", "--slider-track-height": "6px" } as CSSProperties}
							>
								<div className="flex h-[var(--slider-track-height)] flex-row items-center justify-center rounded-1e3 bg-slate-300">
									<div className="h-[var(--slider-height)] w-[var(--slider-height)] rounded-1e3 bg-white shadow-[0_0_0_1px_theme('colors.slate.300')]"></div>
								</div>
							</div>
						</div>
						{/* Slider */}
						<hr className="-mx-[var(--padding)]" />
						<div className="flex flex-col gap-[var(--spacing)]">
							<div className="flex h-24 items-center justify-between">
								<Chip>Stroke width</Chip>
								<div className="flex h-36 w-36 items-center justify-center">
									<feather.RotateCcw className="h-12 w-12 text-slate-700" strokeWidth={4} />
								</div>
							</div>
							<div
								className="mx-10 flex h-[calc(var(--slider-height))] flex-col justify-center"
								style={{ "--slider-height": "32px", "--slider-track-height": "6px" } as CSSProperties}
							>
								<div className="flex h-[var(--slider-track-height)] flex-row items-center justify-center rounded-1e3 bg-slate-300">
									<div className="h-[var(--slider-height)] w-[var(--slider-height)] rounded-1e3 bg-white shadow-[0_0_0_1px_theme('colors.slate.300')]"></div>
								</div>
							</div>
						</div>
						<hr className="-mx-[var(--padding)]" />
					</div>
					<div className="grow"></div>
					<hr className="relative bottom-1" />
					<div className="flex flex-col gap-[var(--spacing)] p-[var(--padding)] py-[var(--padding)]">
						<div className="flex h-24 items-center justify-between">
							<Chip>License</Chip>
							{/* <div className="flex h-36 w-36 items-center justify-center">
								<feather.RotateCcw className="h-12 w-12 text-slate-700" strokeWidth={4} />
							</div> */}
						</div>
						<div className="flex flex-col gap-8">
							<div className="mx-10 flex gap-8">
								<div className="flex h-24 w-24 items-center justify-center">
									<Scale className="h-18 w-18 rounded-1e3 text-gray-700" strokeWidth={2} />
								</div>
								<div className="min-w-0 flex-1 text-[12px] leading-[1.375] text-slate-600">
									<span className="underline decoration-slate-400 underline-offset-2">Feather icons</span> designed by{" "}
									<span className="underline decoration-slate-400 underline-offset-2">@colebemis</span>.<br />
									Licensed as <span className="underline decoration-slate-400 underline-offset-2">MIT</span>. Personal and commercial use allowed{" "}
									<em>without</em> attribution.
								</div>
							</div>
							<div className="mx-10 flex gap-8">
								<div className="flex h-24 w-24 items-center justify-center">
									<CreativeCommons className="h-18 w-18 rounded-1e3 text-gray-700" />
								</div>
								<div className="min-w-0 flex-1 text-[12px] leading-[1.375] text-slate-600">
									<span className="underline decoration-slate-400 underline-offset-2">Platform icons</span> from{" "}
									<span className="underline decoration-slate-400 underline-offset-2">The Wolf Kit</span>.<br />
									Licensed as <span className="underline decoration-slate-400 underline-offset-2">CC BY 4.0</span>. Personal and commercial use allowed{" "}
									<em>with</em> attribution.
								</div>
							</div>
							{/* </div> */}
							<div className="mx-10 flex gap-8">
								<div className="flex h-24 w-24 items-center justify-center">
									<CreativeCommons className="h-18 w-18 rounded-1e3 text-gray-700" />
								</div>
								<div className="min-w-0 flex-1 text-[12px] leading-[1.375] text-slate-600">
									<span className="underline decoration-slate-400 underline-offset-2">Payment icons</span> from{" "}
									<span className="underline decoration-slate-400 underline-offset-2">The Wolf Kit</span>.<br />
									Licensed as <span className="underline decoration-slate-400 underline-offset-2">CC BY 4.0</span>. Personal and commercial use allowed{" "}
									<em>with</em> attribution.
								</div>
							</div>
						</div>
					</div>
				</AsideContainer>
				<MainContainer>
					{/* Search grid */}
					{[["Feather", featherEntries] as const, ["Wolf Kit", wolfKitSocialMediaEntries] as const, ["Wolf Kit", wolfKitPaymentEntries] as const].map(
						([name, entries], index) => (
							<div key={index} className="flex flex-col gap-[var(--spacing)]">
								<div className="grid auto-rows-[var(--grid-row-size)] grid-cols-[repeat(auto-fill,_minmax(var(--grid-column-size),_1fr))]">
									{entries.map(([name, Icon]) => (
										<div key={name} className="flex flex-col gap-[var(--spacing)] p-16">
											<div className="flex grow items-center justify-center">
												{/* Use -800 instead of -700 here */}
												<Icon className="min-h-28 min-w-28 text-slate-800" strokeWidth={2.5} />
											</div>
											{/* Don't truncate names... */}
											<div className="flex h-16 justify-center self-center text-center text-[13px]">{nameCase(name)}</div>
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

//// function Chip({ children }: PropsWithChildren) {
//// 	// Use mx-10 to optically align to search bar
//// 	return <div className="mx-10 flex h-24 items-center rounded-1e3 bg-slate-200 px-10 text-[13px] tracking-[0.0125em]">{children}</div>
//// }

//// function Chip({ children }: PropsWithChildren) {
//// 	return (
//// 		<div className="mx-10 flex h-24 items-center rounded-1e3 bg-slate-200 px-10 text-[10px] font-[500] uppercase tracking-[0.1em] text-slate-800">
//// 			{children}
//// 		</div>
//// 	)
//// }

//// function SecondaryChip({ children }: PropsWithChildren) {
//// 	return <div className="mx-10 flex h-24 items-center text-[10px] font-[500] uppercase tracking-[0.1em] text-slate-800">{children}</div>
//// }

function Chip({ children }: PropsWithChildren) {
	return <div className="mx-10 text-[10px] font-[500] uppercase tracking-[0.1em] text-slate-800">{children}</div>
}

//// function SecondaryChip({ children }: PropsWithChildren) {
//// 	return <div className="mx-10 text-[10px] font-[500] uppercase tracking-[0.1em] text-slate-600">{children}</div>
//// }

function MainContainer({ children }: PropsWithChildren) {
	return <div className="flex grow flex-col justify-center gap-32 p-64">{children}</div>
}

function AsideContainer({ children }: PropsWithChildren) {
	return (
		<div
			className="min-h-[100dvh] w-384 bg-white shadow-[0_0_0_1px_theme('colors.slate.300')]"
			style={{ "--padding": "24px", "--spacing": "16px" } as CSSProperties}
		>
			{/* Use h-[100dvh] because of grow */}
			<div className="sticky top-0 flex h-[100dvh] flex-col">{children}</div>
		</div>
	)
}
