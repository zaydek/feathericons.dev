// TODO: Does this interfere with <Suspense>?
import * as feather from "@icons/feather/tsx"

import * as wolfKitBrandsOriginalCircle from "@icons/wolfkit/brands/original-circle/tsx"
import * as wolfKitBrandsOriginalSquare from "@icons/wolfkit/brands/original-square/tsx"
import * as wolfKitBrandsOriginal from "@icons/wolfkit/brands/original/tsx"
import * as wolfKitPaymentsOriginalFilled from "@icons/wolfkit/payments/original-filled/tsx"
import * as wolfKitPaymentsOriginal from "@icons/wolfkit/payments/original/tsx"

import { Checkbox, CheckboxButton, Checkboxes, DebugCssEffect, Footer, Header, Interweb, Interwebs, Main, MemoGrid, Range, ScrollContainer, SearchBar, Section, Sidebar1, Sidebar2, SliderUndoSection, UndoSection } from "@/components"
import { useVisibleDocumentTitle } from "@/hooks/document-title"
import { ProgressBarContext, RangeContext, SearchContext, SIZE_MAX, SIZE_MIN, SIZE_STEP, STROKE_MAX, STROKE_MIN, STROKE_STEP } from "@/state"
import { useCallback, useContext, useEffect, useMemo, useTransition } from "react"

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

	// prettier-ignore
	const {
		showFeather,
		setShowFeather,
		showBrandsOriginal,
		setShowBrandsOriginal,
		showBrandsOriginalCircle,
		setShowBrandsOriginalCircle,
		showBrandsOriginalSquare,
		setShowBrandsOriginalSquare,
		showBrandsMono,
		setShowBrandsMono,
		showBrandsMonoCircle,
		setShowBrandsMonoCircle,
		showBrandsMonoSquare,
		setShowBrandsMonoSquare,
		showPaymentsOriginal,
		setShowPaymentsOriginal,
		showPaymentsOriginalFilled,
		setShowPaymentsOriginalFilled,
		showPaymentsMono,
		setShowPaymentsMono,
		showPaymentsMonoFilled,
		setShowPaymentsMonoFilled,
		resetAll,
		toggleAllBrandsOriginal,
		toggleAllBrandsMono,
		toggleAllPaymentsOriginal,
		toggleAllPaymentsMono,
	} = useContext(SearchContext)!

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
							<CheckboxButton name="Brands" icon={p => <feather.Folder style={{ transform: "scale(0.8)", opacity: 0.375 }} fill="currentColor" strokeWidth={4} {...p} />} onClick={transition(toggleAllBrandsOriginal)} />
							<Checkboxes>
								<Checkbox name="Original" icon={wolfKitBrandsOriginal.Twitter} checked={showBrandsOriginal} setChecked={transition(setShowBrandsOriginal)} />
								<Checkbox name="Circle" icon={wolfKitBrandsOriginalCircle.TwitterCircle} checked={showBrandsOriginalCircle} setChecked={transition(setShowBrandsOriginalCircle)} />
								<Checkbox name="Square" icon={wolfKitBrandsOriginalSquare.TwitterSquare} checked={showBrandsOriginalSquare} setChecked={transition(setShowBrandsOriginalSquare)} />
							</Checkboxes>
						</Checkboxes>
						<Checkboxes>
							<CheckboxButton name="Payment services" icon={p => <feather.Folder style={{ transform: "scale(0.8)", opacity: 0.375 }} fill="currentColor" strokeWidth={4} {...p} />} onClick={voidTransition(toggleAllPaymentsOriginal)} />
							<Checkboxes>
								<Checkbox name="Original" icon={wolfKitPaymentsOriginal.Stripe} checked={showPaymentsOriginal} setChecked={transition(setShowPaymentsOriginal)} />
								<Checkbox name="Filled" icon={wolfKitPaymentsOriginalFilled.Stripe} checked={showPaymentsOriginalFilled} setChecked={transition(setShowPaymentsOriginalFilled)} />
							</Checkboxes>
						</Checkboxes>
					</div>
				</UndoSection>
				<hr />
			</ScrollContainer>
			<Footer>
				<Section name="Explore" icon={feather.Globe}>
					<Interwebs>
						<Interweb name="Icons" icon={wolfKitBrandsOriginal.Github} />
						<Interweb name="Website" icon={wolfKitBrandsOriginal.Github} />
						<Interweb name="Figma Plugin" icon={wolfKitBrandsOriginal.Figma} />
						<Interweb name="Share on Twitter" icon={wolfKitBrandsOriginal.Twitter} />
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

function AppMain() {
	const { results } = useContext(SearchContext)!

	const count = useMemo(() => {
		return results.reduce((sum, [names]) => sum + names.length, 0)
	}, [results])

	// prettier-ignore
	useVisibleDocumentTitle({
		active:   `Feather · ${count} icons`,
		inactive: "Feather", // Truncate SEO <title>
	})

	return (
		<Main>
			<MemoGrid results={results} />
		</Main>
	)
}
