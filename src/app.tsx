// TODO: Does this interfere with <Suspense>?
import * as feather from "@icons/feather"
import * as wolfKitBrands from "@icons/wolf-kit/brands"
import * as wolfKitPayments from "@icons/wolf-kit/payments"

import { Checkbox, CheckboxButton, Checkboxes, DebugCssEffect, Footer, Header, Interweb, Interwebs, Main, MemoGrid, Range, ScrollContainer, SearchBar, Section, Sidebar1, Sidebar2, SliderUndoSection, UndoSection } from "@/components"
import { ProgressBarContext, RangeContext, SearchContext, SIZE_MAX, SIZE_MIN, SIZE_STEP, STROKE_MAX, STROKE_MIN, STROKE_STEP } from "@/state"
import { memo, useCallback, useContext, useEffect, useTransition } from "react"

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
	const { showFeather, setShowFeather, showBrandsOriginal, setShowBrandsOriginal, showBrandsCircle, setShowBrandsCircle, showBrandsSquare, setShowBrandsSquare, showPaymentsOriginal, setShowPaymentsOriginal, showPaymentsFilled, setShowPaymentsFilled, resetAll, toggleAllBrands, toggleAllPayments } = useContext(SearchContext)!

	const [pending, startTransition] = useTransition()

	const voidTransition = useCallback(function (fn: () => void) {
		return () => startTransition(fn)
	}, [])

	const transition = useCallback(function <T>(fn: (_: T) => void) {
		return (arg: T) => startTransition(() => fn(arg))
	}, [])

	useEffect(() => {
		setStarted(true)
		const d = window.setTimeout(() => setStarted(false), 100)
		return () => window.clearTimeout(d)
	}, [pending, setStarted])

	return (
		<Sidebar1>
			<Header>
				<Section>
					<SearchBar />
				</Section>
			</Header>
			<ScrollContainer>
				<UndoSection name="Icons" icon={feather.Package} handleUndo={voidTransition(resetAll)}>
					<div>
						<Checkboxes>
							<Checkbox name="Feather icons" icon={feather.Feather} checked={showFeather} setChecked={transition(setShowFeather)} />
						</Checkboxes>
						<Checkboxes>
							<CheckboxButton name="Brands" icon={p => <feather.Folder style={{ transform: "scale(0.8)", opacity: 0.375 }} fill="currentColor" strokeWidth={4} {...p} />} onClick={transition(toggleAllBrands)} />
							<Checkboxes>
								<Checkbox name="Original" icon={wolfKitBrands.Twitter} checked={showBrandsOriginal} setChecked={transition(setShowBrandsOriginal)} />
								<Checkbox name="Circle" icon={wolfKitBrands.TwitterCircle} checked={showBrandsCircle} setChecked={transition(setShowBrandsCircle)} />
								<Checkbox name="Square" icon={wolfKitBrands.TwitterSquare} checked={showBrandsSquare} setChecked={transition(setShowBrandsSquare)} />
							</Checkboxes>
						</Checkboxes>
						<Checkboxes>
							<CheckboxButton name="Payment services" icon={p => <feather.Folder style={{ transform: "scale(0.8)", opacity: 0.375 }} fill="currentColor" strokeWidth={4} {...p} />} onClick={voidTransition(toggleAllPayments)} />
							<Checkboxes>
								<Checkbox name="Original" icon={wolfKitPayments.Stripe} checked={showPaymentsOriginal} setChecked={transition(setShowPaymentsOriginal)} />
								<Checkbox name="Filled" icon={wolfKitPayments.Stripe1} checked={showPaymentsFilled} setChecked={transition(setShowPaymentsFilled)} />
							</Checkboxes>
						</Checkboxes>
					</div>
				</UndoSection>
				<hr />
			</ScrollContainer>
			<Footer>
				<Section name="Explore" icon={feather.Globe}>
					<Interwebs>
						<Interweb name="Icons" icon={wolfKitBrands.Github} />
						<Interweb name="Website" icon={wolfKitBrands.Github} />
						<Interweb name="Figma Plugin" icon={wolfKitBrands.Figma} />
						<Interweb name="Share on Twitter" icon={wolfKitBrands.Twitter} />
					</Interwebs>
				</Section>
			</Footer>
		</Sidebar1>
	)
}

function AppSidebar2() {
	const { size, setSize, strokeWidth, setStrokeWidth, resetSize, resetStrokeWidth } = useContext(RangeContext)!

	return (
		<Sidebar2>
			<Header>
				<SliderUndoSection name="Icon size" icon={feather.PenTool} value={size} formatValue={value => `${value.toFixed(0)} PX`} handleUndo={resetSize}>
					<Range value={size} setValue={setSize} min={SIZE_MIN} max={SIZE_MAX} step={SIZE_STEP} />
				</SliderUndoSection>
			</Header>
			<ScrollContainer>
				<hr />
				<SliderUndoSection name="Icon stroke width" icon={feather.PenTool} value={strokeWidth} formatValue={value => value.toFixed(2)} handleUndo={resetStrokeWidth}>
					<Range value={strokeWidth} setValue={setStrokeWidth} min={STROKE_MIN} max={STROKE_MAX} step={STROKE_STEP} />
				</SliderUndoSection>
				<hr />
			</ScrollContainer>
		</Sidebar2>
	)
}

const AppMain = memo(function LayoutMain() {
	const { results } = useContext(SearchContext)!

	return (
		<Main>
			<MemoGrid results={results} />
		</Main>
	)
})
