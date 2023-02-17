import { detab, toKebabCase } from "@/lib"
import { createContext, CSSProperties, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react"

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
////
//// function DoubleInset({ className, children }: PropsWithChildren<{ className?: string }>) {
//// 	return <div className={cx(`px-[calc(var(--padding)_*_1.5)]`, className)}>{children}</div>
//// }

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
	const [open, setOpen] = useState(true)
	const [checkboxes, setCheckboxes] = useState<Map<string, boolean>>(() => new Map())

	const [some, every] = useMemo(() => {
		const arr = [...checkboxes.values()]
		return [arr.some(checked => checked), arr.every(checked => checked)] as const
	}, [checkboxes])

	return (
		<GroupContext.Provider value={{ checkboxes, setCheckboxes }}>
			<div
				className="rounded-[calc(var(--container-h)_/_2)] hover:bg-slate-100"
				style={{ "--container-h": "36px", "--icon-h": "16px", "--small-icon-h": "10px" } as CSSProperties}
				onClick={e => {
					//// setChecked(curr => !curr)
					setOpen(curr => !curr)
				}}
			>
				{/* Button */}
				<div
					className="flex h-[var(--container-h)] cursor-pointer select-none items-center justify-between rounded-1e3
						hover:bg-slate-200 hover:active:bg-slate-300"
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
					{/* Use !every to guard zero values */}
					{!every && some && (
						<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
							<feather.Minus className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-700" strokeWidth={5} />
						</div>
					)}
					{every && (
						<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
							<feather.Check className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-700" strokeWidth={5} />
						</div>
					)}
				</div>
				{open && <div className="pl-12">{children}</div>}
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
			next.set(name, false)
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
		// Button
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
			<feather.Search className="m-[calc((36px_-_16px)_/_2)] h-16 w-16 text-slate-400" />
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
					<div className="flex flex-col gap-16 px-[var(--padding)]">
						<div className="flex items-center justify-between">
							<Chip>Search</Chip>
							{/* <Chip>Search&nbsp;&nbsp;&middot;&nbsp;&nbsp;⌘P to Focus</Chip> */}
							{/* <SecondaryChip>⌘P to Focus</SecondaryChip> */}
						</div>
						{/* <div className="px-10"> */}
						<SearchBar />
						{/* </div> */}
					</div>
					<div className="flex flex-col gap-16 px-[var(--padding)]">
						<div className="flex">
							<Chip>Icons</Chip>
						</div>
						<div className="flex flex-col gap-[calc(var(--spacing)_/_4)]">
							<Group name="Feather icons" icon={feather.Feather} />
							<Group
								name="Platform icons"
								icon={() => (
									<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
										<feather.ChevronDown className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-700" strokeWidth={7 / 2} />
									</div>
								)}
							>
								{socialItems.map(props => (
									<GroupItem key={props.name} {...props} />
								))}
							</Group>
							<Group
								name="Payment platform icons"
								icon={() => (
									<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
										<feather.ChevronDown className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-700" strokeWidth={7 / 2} />
									</div>
								)}
							>
								{paymentItems.map(props => (
									<GroupItem key={props.name} {...props} />
								))}
							</Group>
						</div>
					</div>
				</AsideContainer>
				<MainContainer>
					{/* Search grid */}
					{[["Feather", featherEntries] as const, ["Wolf Kit", wolfKitSocialMediaEntries] as const, ["Wolf Kit", wolfKitPaymentEntries] as const].map(
						([name, entries], index) => (
							<div key={index} className="flex flex-col gap-16">
								<div className="grid auto-rows-[var(--grid-row-size)] grid-cols-[repeat(auto-fill,_minmax(var(--grid-column-size),_1fr))]">
									{entries.map(([name, Icon]) => (
										<div key={name} className="flex flex-col gap-16 p-16">
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
//// 	return <div className="mx-10 flex h-24 items-center rounded-1e3 bg-slate-200 px-12">{children}</div>
//// }

function Chip({ children }: PropsWithChildren) {
	return <div className="mx-10 text-[10px] font-[500] uppercase tracking-[0.1em] text-slate-800">{children}</div>
}

function SecondaryChip({ children }: PropsWithChildren) {
	return <div className="mx-10 text-[10px] font-[500] uppercase tracking-[0.1em] text-slate-600">{children}</div>
}

function MainContainer({ children }: PropsWithChildren) {
	return <div className="flex grow flex-col justify-center gap-32 p-64">{children}</div>
}

function AsideContainer({ children }: PropsWithChildren) {
	return (
		<div
			className="min-h-[100dvh] w-320 bg-white shadow-[0_0_0_1px_theme('colors.slate.300')]"
			style={{ "--padding": "16px", "--spacing": "32px" } as CSSProperties}
		>
			<div className="sticky top-0 flex flex-col gap-[var(--spacing)] py-[calc(var(--padding)_*_2)]">{children}</div>
		</div>
	)
}
