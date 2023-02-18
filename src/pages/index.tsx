import { cx, detab, toKebabCase } from "@/lib"
import { createContext, CSSProperties, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react"

import { DynamicIcon, Icon } from "@/components/dynamic-icon"
import { CreativeCommons } from "@/components/license"
import * as feather from "@/feather"
import * as wolfKitPayment from "@/wolf-kit/payment"
import * as wolfKitSocialMedia from "@/wolf-kit/social-media"

const featherEntries = Object.entries(feather)
const wolfKitSocialMediaEntries: [string, Icon][] = Object.entries(wolfKitSocialMedia)
const wolfKitPaymentEntries: [string, Icon][] = Object.entries(wolfKitPayment)

function nameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

function Hairline() {
	return <hr className="-mx-[var(--padding-x)] border-slate-300 first:hidden" />
}

function Section({ className, children, ...props }: JSX.IntrinsicElements["section"]) {
	return (
		<>
			<Hairline />
			<section className="flex flex-col gap-16" {...props}>
				{children}
			</section>
		</>
	)
}

// prettier-ignore
const GroupContext =
	createContext<{
		checkboxes:    Map<string, boolean>
		setCheckboxes: Dispatch<SetStateAction<Map<string, boolean>>>
	} | null>(null)

function Group({ name, icon, children }: PropsWithChildren<{ name: string; icon: Icon }>) {
	const [dropdown, setDropdown] = useState(true)
	const [checkboxes, setCheckboxes] = useState<Map<string, boolean>>(() => new Map())

	useEffect(() => {
		if (children !== undefined) { return } // prettier-ignore
		setCheckboxes(curr => {
			const next = new Map(curr)
			next.set(name, true)
			return next
		})
	}, [children, name])

	const [checked, everyChecked] = useMemo(() => {
		const arr = [...checkboxes.values()]
		return [arr.some(checked => checked), arr.every(checked => checked)] as const
	}, [checkboxes])

	const setChecked = useCallback(
		(checked: SetStateAction<boolean>) => {
			setCheckboxes(curr => {
				const next = new Map(curr)
				for (const key of next.keys()) {
					next.set(key, typeof checked === "function" ? checked(everyChecked) : checked)
				}
				return next
			})
		},
		[everyChecked],
	)

	return (
		<GroupContext.Provider value={{ checkboxes, setCheckboxes }}>
			<div>
				<div
					className="flex h-[var(--container-h)] cursor-pointer select-none items-center justify-between"
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
							<DynamicIcon icon={icon} className="h-[var(--icon-h)] w-[var(--icon-h)] text-slate-700" />
						</div>
						{name}
					</div>
					{/* RHS */}
					{checked ? (
						<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
							<div className="flex h-[var(--checkbox-h)] w-[var(--checkbox-h)] items-center justify-center rounded-[43.75%] bg-sky-400">
								<feather.Check className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-white" strokeWidth={8} />
							</div>
						</div>
					) : (
						<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
							<div className="flex h-24 w-24 items-center justify-center rounded-[43.75%] bg-white shadow-[inset_0_0_0_1px_theme('colors.slate.300')]">
								{/* ... */}
							</div>
						</div>
					)}
				</div>
				{dropdown && <div className="pl-[calc(36px_/_2)]">{children}</div>}
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
			className="flex h-[var(--container-h)] cursor-pointer select-none items-center justify-between"
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
			{checked ? (
				<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
					<div className="flex h-[var(--checkbox-h)] w-[var(--checkbox-h)] items-center justify-center rounded-[43.75%] bg-sky-400">
						<feather.Check className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-white" strokeWidth={8} />
					</div>
				</div>
			) : (
				<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
					<div className="flex h-24 w-24 items-center justify-center rounded-[43.75%] bg-white shadow-[inset_0_0_0_1px_theme('colors.slate.300')]">
						{/* ... */}
					</div>
				</div>
			)}
		</div>
	)
}

function SearchBar() {
	const [search, setSearch] = useState("")

	return (
		<div className="ml-[var(--keyline)] flex h-40 rounded-1e3 bg-slate-100 focus-within:bg-white focus-within:shadow-[inset_0_0_0_1px_theme('colors.slate.300')] hover:bg-white">
			<div className="flex h-40 w-40 items-center justify-center rounded-1e3">
				{/* <feather.Search className="h-[var(--icon-h)] w-[var(--icon-h)] text-slate-400" strokeWidth={4} /> */}
				<feather.Search className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-400" strokeWidth={4} />
			</div>
			<div className="relative grow">
				{/* CSS reset: 100% w-100% bg-transparent */}
				<input className="h-100% w-100% bg-transparent focus:outline-none" type="text" value={search} onChange={e => setSearch(e.currentTarget.value)} />
				{/* {search === "" && (
					<div className="pointer-events-none absolute inset-0 flex items-center">
						<span className="opacity-50">Search icons</span>
					</div>
				)} */}
			</div>
		</div>
	)
}

function Slider({ name }: { name: string }) {
	return (
		<>
			{/* <div className="flex flex-col gap-16"> */}
			<Heading name={name} />
			<div className="ml-[var(--keyline)] flex h-[calc(var(--slider-thumb-h))] flex-col justify-center">
				<div className="flex h-[var(--slider-track-h)] flex-row items-center justify-center rounded-1e3 bg-[linear-gradient(to_right,_theme('colors.sky.400')_50%,_theme('colors.slate.200')_50%)]">
					<div className="h-[var(--slider-thumb-h)] w-[var(--slider-thumb-h)] rounded-1e3 bg-white shadow-[inset_0_0_0_1px_theme('colors.slate.300')]"></div>
				</div>
			</div>
			{/* </div> */}
		</>
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
				<Aside>
					<Section>
						<Heading name="Icons" />
						<div className="flex flex-col gap-8">
							<Group name="Feather" icon={feather.Smile} />
							<Group
								name="Apps"
								icon={() => (
									<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
										<feather.ChevronDown className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-400" strokeWidth={4} />
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
								name="Vendors"
								icon={() => (
									<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
										<feather.ChevronDown className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-400" strokeWidth={4} />
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
					</Section>
					<Section>
						<Slider name="Size" />
					</Section>
					<Section>
						<Slider name="Stroke width" />
					</Section>
					<Section>
						<StandaloneHeading name="Icon licenses" />
						<div className="flex flex-col gap-4">
							<div className="ml-[var(--keyline)] flex gap-8">
								<div className="flex h-[var(--icon-h)] w-[var(--icon-h)] items-center justify-center">
									<feather.Feather className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-700" />
								</div>
								<div className="min-w-0 flex-1 text-[12px] leading-[1.5] text-slate-600">
									<span className="underline decoration-slate-400 underline-offset-2">Feather icons</span> designed by{" "}
									<span className="underline decoration-slate-400 underline-offset-2">@colebemis</span>
									<br />
									Licensed as <span className="underline decoration-slate-400 underline-offset-2">MIT</span>
									<br />
									Personal & commercial use allowed <em>without</em> attribution
								</div>
							</div>
							<div className="grow"></div>
							<div className="ml-[var(--keyline)] flex gap-8">
								<div className="flex h-[var(--icon-h)] w-[var(--icon-h)] items-center justify-center">
									<CreativeCommons className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-700" />
								</div>
								<div className="min-w-0 flex-1 text-[12px] leading-[1.5] text-slate-600">
									<span className="underline decoration-slate-400 underline-offset-2">App icons</span> designed by{" "}
									<span className="underline decoration-slate-400 underline-offset-2">The Wolf Kit</span>
									<br />
									Licensed as <span className="underline decoration-slate-400 underline-offset-2">CC BY 4.0</span>
									<br />
									Personal & commercial use allowed <em>with</em> attribution
								</div>
							</div>
							<div className="ml-[var(--keyline)] flex gap-8">
								<div className="flex h-[var(--icon-h)] w-[var(--icon-h)] items-center justify-center">
									<CreativeCommons className="h-[var(--small-icon-h)] w-[var(--small-icon-h)] text-slate-700" />
								</div>
								<div className="min-w-0 flex-1 text-[12px] leading-[1.5] text-slate-600">
									<span className="underline decoration-slate-400 underline-offset-2">Vendor icons</span> designed by{" "}
									<span className="underline decoration-slate-400 underline-offset-2">The Wolf Kit</span>
									<br />
									Licensed as <span className="underline decoration-slate-400 underline-offset-2">CC BY 4.0</span>
									<br />
									Personal & commercial use allowed <em>with</em> attribution
								</div>
							</div>
						</div>
					</Section>
				</Aside>
				<Main>
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
				</Main>
			</div>
		</>
	)
}

function HeadingChip({ children }: PropsWithChildren) {
	return (
		<h2 className="flex h-24 items-center rounded-1e3 bg-white px-12 text-[9px] font-[500] uppercase tracking-[0.1em] text-slate-700 shadow-[inset_0_0_0_1px_theme('colors.gray.300')]">
			{children}
		</h2>
	)
}

//// function HeadingChip({ children }: PropsWithChildren) {
//// 	return (
//// 		<h2 className="flex h-24 items-center rounded-1e3 bg-white px-12 text-[13px] text-slate-700 shadow-[inset_0_0_0_1px_theme('colors.gray.300')]">
//// 			{children}
//// 		</h2>
//// 	)
//// }

//// function HeadingChip({ children }: PropsWithChildren) {
//// 	return <h2 className="flex h-24 items-center rounded-1e3 bg-slate-200 px-12 text-[9.5px] font-[500] uppercase tracking-[0.1em] text-slate-700">{children}</h2>
//// }

function Heading({ name }: { name: string }) {
	return (
		<div className="ml-[var(--keyline)] flex h-24 items-center justify-between">
			<HeadingChip>{name}</HeadingChip>
			<div className="flex h-[var(--container-h)] w-[var(--container-h)] items-center justify-center">
				<feather.RotateCcw className="h-12 w-12 text-slate-300" strokeWidth={4} />
			</div>
		</div>
	)
}

function StandaloneHeading({ name }: { name: string }) {
	return (
		<div className="ml-[var(--keyline)] flex items-center justify-between">
			<HeadingChip>{name}</HeadingChip>
		</div>
	)
}

function Main({ children }: PropsWithChildren) {
	return <main className="flex grow flex-col justify-center gap-32 p-64">{children}</main>
}

// prettier-ignore
const cssVars = {
	"--padding-y":      "32px",
	"--padding-x":      "16px",
	"--padding":        "var(--padding-y) var(--padding-x)",
	"--spacing":        "32px",

	"--keyline":        "calc((var(--container-h) - var(--icon-h)) / 2)",
	"--container-h":    "36px",
	"--icon-h":         "18px",
	"--small-icon-h":   "12px",

	"--checkbox-h":     "24px",
	"--slider-track-h": "6px",
	"--slider-thumb-h": "36px",
} as CSSProperties

function Aside({ children }: PropsWithChildren) {
	const [didScroll, setDidScroll] = useState(false)

	return (
		<aside className="w-384 bg-white shadow-[1px_0_0_0_theme('colors.slate.300')]" style={cssVars}>
			<div className="sticky top-0 flex h-[100dvh] flex-col">
				<header
					className={cx(
						"sticky top-0 flex flex-col gap-16 bg-white p-[var(--padding)] pb-[var(--spacing)]",
						didScroll && "shadow-[0_1px_0_0_theme('colors.slate.300')]",
					)}
					//// className="sticky top-0 flex flex-col gap-16 bg-white p-[var(--padding)] pb-[var(--spacing)] shadow-[0_1px_0_0_theme('colors.slate.300')]"
				>
					<Heading name="Search" />
					<SearchBar />
				</header>
				<div
					className="flex flex-col gap-[var(--spacing)] overflow-y-auto p-[var(--padding)] pt-0"
					onScroll={e => {
						setDidScroll(e.currentTarget.scrollTop > 0)
					}}
				>
					{children}
				</div>
			</div>
		</aside>
	)
}
