import * as feather from "@icons/feather/tsx"
import * as wolfKitBrandsMonoCircle from "@icons/wolfkit/brands/mono-circle/tsx"
import * as wolfKitBrandsMonoSquare from "@icons/wolfkit/brands/mono-square/tsx"
import * as wolfKitBrandsMono from "@icons/wolfkit/brands/mono/tsx"
import * as wolfKitBrandsOriginalCircle from "@icons/wolfkit/brands/original-circle/tsx"
import * as wolfKitBrandsOriginalSquare from "@icons/wolfkit/brands/original-square/tsx"
import * as wolfKitBrandsOriginal from "@icons/wolfkit/brands/original/tsx"
import * as wolfKitPaymentsMonoFilled from "@icons/wolfkit/payments/mono-filled/tsx"
import * as wolfKitPaymentsMono from "@icons/wolfkit/payments/mono/tsx"
import * as wolfKitPaymentsOriginalFilled from "@icons/wolfkit/payments/original-filled/tsx"
import * as wolfKitPaymentsOriginal from "@icons/wolfkit/payments/original/tsx"

import {
	Checkbox,
	Checkboxes,
	DebugCssEffect,
	Main,
	MemoGrid,
	MonochromeCheckboxFolder,
	NoNameSection,
	Range,
	Resource,
	Resources,
	SearchBar,
	Section,
	SelectSection,
	Sidebar1,
	Sidebar2,
	SidebarContents,
	SidebarFooter,
	SidebarHeader,
	SliderUndoSection,
	SyntaxHighlighting,
	UndoSection,
} from "@/components"
import { useVisibleDocumentTitle } from "@/hooks/document-title"
import {
	ProgressBarContext,
	RangeContext,
	SearchContext,
	SIZE_MAX,
	SIZE_MIN,
	SIZE_STEP,
	STROKE_MAX,
	STROKE_MIN,
	STROKE_STEP,
} from "@/state"
import { useCallback, useContext, useEffect, useMemo, useTransition } from "react"
import { detab } from "./lib"

export function App() {
	const { setStarted } = useContext(ProgressBarContext)!

	useEffect(() => {
		setStarted(true)
		const d = window.setTimeout(() => setStarted(false), 100)
		return () => window.clearTimeout(d)
	}, [setStarted])

	return (
		<DebugCssEffect>
			<AppSidebar1 />
			<AppSidebar2 />
			<AppMain />
		</DebugCssEffect>
	)
}

function AppSidebar1() {
	const { setStarted } = useContext(ProgressBarContext)!

	const {
		showFeather,
		setShowFeather,
		brandsMonochrome,
		setBrandsMonochrome,
		showBrandsOriginal,
		setShowBrandsOriginal,
		showBrandsOriginalCircle,
		setShowBrandsOriginalCircle,
		showBrandsOriginalSquare,
		setShowBrandsOriginalSquare,
		paymentsMonochrome,
		setPaymentsMonochrome,
		showPaymentsOriginal,
		setShowPaymentsOriginal,
		showPaymentsOriginalFilled,
		setShowPaymentsOriginalFilled,
		resetFeather,
		resetWolfKit,
	} = useContext(SearchContext)!

	const [pending, startTransition] = useTransition()

	const createVoidTransition = useCallback(function (fn: () => void) {
		return () => startTransition(fn)
	}, [])

	const createTransition = useCallback(function <T>(fn: (_: T) => void) {
		return (arg: T) => startTransition(() => fn(arg))
	}, [])

	useEffect(() => {
		setStarted(true)
		const d = window.setTimeout(() => setStarted(false), 100)
		return () => window.clearTimeout(d)
	}, [pending, setStarted])

	return (
		<Sidebar1>
			<SidebarHeader>
				<NoNameSection>
					<SearchBar />
				</NoNameSection>
			</SidebarHeader>
			<SidebarContents>
				<UndoSection
					name="Icons"
					icon={feather.Package}
					handleUndo={createVoidTransition(() => {
						resetFeather()
						resetWolfKit()
					})}
				>
					{/* <div> */}
					<Checkboxes>
						<Checkbox
							name="Feather"
							icon={feather.Feather}
							checked={showFeather}
							setChecked={createTransition(setShowFeather)}
						/>
					</Checkboxes>
					<Checkboxes>
						<MonochromeCheckboxFolder
							name={brandsMonochrome ? "Brands (mono)" : "Brands"}
							icon={p => (
								<feather.Shield
									//// style={{ transform: "scale(0.8)", opacity: 0.375 }}
									//// fill="currentColor"
									//// strokeWidth={6}
									{...p}
								/>
							)}
							checked={brandsMonochrome}
							setChecked={createVoidTransition(() => {
								setBrandsMonochrome(curr => !curr)
								setPaymentsMonochrome(curr => !curr)
							})}
						/>
						<Checkboxes>
							<Checkbox
								name="Original"
								icon={brandsMonochrome ? wolfKitBrandsMono.Twitter : wolfKitBrandsOriginal.Twitter}
								checked={showBrandsOriginal}
								setChecked={createTransition(setShowBrandsOriginal)}
							/>
							<Checkbox
								name="Circle"
								icon={brandsMonochrome ? wolfKitBrandsMonoCircle.Twitter : wolfKitBrandsOriginalCircle.Twitter}
								checked={showBrandsOriginalCircle}
								setChecked={createTransition(setShowBrandsOriginalCircle)}
							/>
							<Checkbox
								name="Square"
								icon={brandsMonochrome ? wolfKitBrandsMonoSquare.Twitter : wolfKitBrandsOriginalSquare.Twitter}
								checked={showBrandsOriginalSquare}
								setChecked={createTransition(setShowBrandsOriginalSquare)}
							/>
						</Checkboxes>
					</Checkboxes>
					<Checkboxes>
						<MonochromeCheckboxFolder
							name={paymentsMonochrome ? "Payments (mono)" : "Payments"}
							icon={p => (
								<feather.CreditCard
									//// style={{ transform: "scale(0.8)", opacity: 0.375 }}
									//// fill="currentColor"
									//// strokeWidth={6}
									{...p}
								/>
							)}
							checked={paymentsMonochrome}
							setChecked={createVoidTransition(() => {
								setPaymentsMonochrome(curr => !curr)
								setBrandsMonochrome(curr => !curr)
							})}
						/>
						<Checkboxes>
							<Checkbox
								name="Original"
								icon={paymentsMonochrome ? wolfKitPaymentsMono.Stripe : wolfKitPaymentsOriginal.Stripe}
								checked={showPaymentsOriginal}
								setChecked={createTransition(setShowPaymentsOriginal)}
							/>
							<Checkbox
								name="Filled"
								icon={paymentsMonochrome ? wolfKitPaymentsMonoFilled.Stripe : wolfKitPaymentsOriginalFilled.Stripe}
								checked={showPaymentsOriginalFilled}
								setChecked={createTransition(setShowPaymentsOriginalFilled)}
							/>
						</Checkboxes>
					</Checkboxes>
					{/* </div> */}
				</UndoSection>
				<hr />
			</SidebarContents>
			<SidebarFooter>
				<Section name="Resources" icon={feather.Globe}>
					<Resources>
						<Resource name="Icons" icon={wolfKitBrandsOriginal.Github} />
						<Resource name="Website" icon={wolfKitBrandsOriginal.Github} />
						<Resource name="Figma Plugin" icon={wolfKitBrandsOriginal.Figma} />
						<Resource name="Share on Twitter" icon={wolfKitBrandsOriginal.Twitter} />
					</Resources>
				</Section>
			</SidebarFooter>
		</Sidebar1>
	)
}

function AppSidebar2() {
	const { size, setSize, strokeWidth, setStrokeWidth, resetSize, resetStrokeWidth } = useContext(RangeContext)!

	return (
		<Sidebar2>
			<SidebarHeader>
				{/* TODO: Add grammar here (s) */}
				{/* <SelectSection name="Selected&ensp;&middot;&ensp;3 icons" icon={feather.MousePointer}> */}
				<SelectSection name="Selection" icon={feather.MousePointer}>
					<SyntaxHighlighting
						lang="html"
						// prettier-ignore
						code={detab(`
							<!-- https://feathericons.dev/feather -->
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="feather feather-feather" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
								<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
								<line x1="16" x2="2" y1="8" y2="22" />
								<line x1="17.5" x2="9" y1="15" y2="15" />
							</svg>

							<!-- https://feathericons.dev/feather -->
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="feather feather-feather" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
								<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
								<line x1="16" x2="2" y1="8" y2="22" />
								<line x1="17.5" x2="9" y1="15" y2="15" />
							</svg>

							<!-- https://feathericons.dev/feather -->
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="feather feather-feather" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
								<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
								<line x1="16" x2="2" y1="8" y2="22" />
								<line x1="17.5" x2="9" y1="15" y2="15" />
							</svg>
					`, { spaces: true })}
					/>
				</SelectSection>
			</SidebarHeader>
			<SidebarContents>
				{/* <hr />
				<SliderUndoSection
					name="Color"
					icon={feather.Image}
					value={size}
					formatValue={value => `${value.toFixed(0)} PX`}
					handleUndo={resetSize}
				>
					<Range value={size} setValue={setSize} min={SIZE_MIN} max={SIZE_MAX} step={SIZE_STEP} />
				</SliderUndoSection> */}
				<hr />
				<SliderUndoSection
					name="Preview size"
					icon={feather.PenTool}
					value={size}
					formatValue={value => `${value.toFixed(0)} PX`}
					handleUndo={resetSize}
				>
					<Range value={size} setValue={setSize} min={SIZE_MIN} max={SIZE_MAX} step={SIZE_STEP} />
				</SliderUndoSection>
				<hr />
				<SliderUndoSection
					name="Preview stroke width"
					icon={feather.PenTool}
					value={strokeWidth}
					formatValue={value => value.toFixed(2)}
					handleUndo={resetStrokeWidth}
				>
					<Range value={strokeWidth} setValue={setStrokeWidth} min={STROKE_MIN} max={STROKE_MAX} step={STROKE_STEP} />
				</SliderUndoSection>
				<hr />
			</SidebarContents>
		</Sidebar2>
	)
}

function AppMain() {
	const { results } = useContext(SearchContext)!

	const count = useMemo(() => {
		return results.reduce((sum, [names]) => sum + names.length, 0)
	}, [results])

	// prettier-ignore
	useVisibleDocumentTitle({
		active:   `Feather\u2002·\u2002${count} icons`,
		inactive: "Feather",
	})

	return (
		<Main>
			<MemoGrid results={results} />
		</Main>
	)
}
