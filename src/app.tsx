import * as feather from "@icons/feather"
import * as wkPayment from "@icons/wolf-kit/payment"
import * as wkSocial from "@icons/wolf-kit/social-media"

import { Checkbox, CheckboxButton, Checkboxes, DebugCssEffect, Footer, Grid, GridItem, Header, Interweb, Interwebs, Main, Range, ScrollContainer, SearchBar, Section, Sidebar1, Sidebar2, SliderUndoSection, UndoSection } from "@/components"
import { Icon, toKebabCase } from "@/lib"
import { ProgressBarContext, RangeContext, SearchContext, SIZE_MAX, SIZE_MIN, SIZE_STEP, STROKE_MAX, STROKE_MIN, STROKE_STEP } from "@/state"
import { useContext, useEffect } from "react"

// TODO: Move to search.tsx
function toNameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

const featherEntries: [string, Icon][] = Object.entries(feather).map(([k, v]) => [toNameCase(k), v])
const wkSocialMediaEntries: [string, Icon][] = Object.entries(wkSocial).map(([k, v]) => [toNameCase(k), v])
const wkPaymentProcessorsEntries: [string, Icon][] = Object.entries(wkPayment).map(([k, v]) => [toNameCase(k), v])

const entries = [...featherEntries, ...wkSocialMediaEntries, ...wkPaymentProcessorsEntries]

export function App() {
	const { setStarted } = useContext(ProgressBarContext)!

	useEffect(() => {
		setStarted(true)
	}, [setStarted])

	return (
		<DebugCssEffect>
			<LayoutSidebar1 />
			<LayoutSidebar2 />
			<LayoutMain />
		</DebugCssEffect>
	)
}

function LayoutSidebar1() {
	const { showFeather, setShowFeather, showBrandsOriginal, setShowBrandsOriginal, showBrandsCircle, setShowBrandsCircle, showBrandsSquare, setShowBrandsSquare, showPaymentsOriginal, setShowPaymentsOriginal, showPaymentsFilled, setShowPaymentsFilled, resetAll, toggleAllBrands, toggleAllPayments } = useContext(SearchContext)!

	return (
		<Sidebar1>
			<Header>
				<Section>
					<SearchBar />
				</Section>
			</Header>
			<ScrollContainer>
				<UndoSection name="Icon packs" icon={feather.Package} handleUndo={resetAll}>
					<div>
						<Checkboxes>
							<Checkbox name="Feather icons" icon={feather.Feather} checked={showFeather} setChecked={setShowFeather} />
						</Checkboxes>
						<Checkboxes>
							<CheckboxButton name="Brands" icon={p => <feather.Folder style={{ transform: "scale(0.8)", opacity: 0.375 }} fill="currentColor" strokeWidth={4} {...p} />} onClick={toggleAllBrands} />
							<Checkboxes>
								<Checkbox name="Original" icon={wkSocial.Twitter} checked={showBrandsOriginal} setChecked={setShowBrandsOriginal} />
								<Checkbox name="Circle" icon={wkSocial.TwitterCircle} checked={showBrandsCircle} setChecked={setShowBrandsCircle} />
								<Checkbox name="Square" icon={wkSocial.TwitterSquare} checked={showBrandsSquare} setChecked={setShowBrandsSquare} />
							</Checkboxes>
						</Checkboxes>
						<Checkboxes>
							<CheckboxButton name="Payment services" icon={p => <feather.Folder style={{ transform: "scale(0.8)", opacity: 0.375 }} fill="currentColor" strokeWidth={4} {...p} />} onClick={toggleAllPayments} />
							<Checkboxes>
								<Checkbox name="Original" icon={wkPayment.Stripe} checked={showPaymentsOriginal} setChecked={setShowPaymentsOriginal} />
								<Checkbox name="Filled" icon={wkPayment.Stripe1} checked={showPaymentsFilled} setChecked={setShowPaymentsFilled} />
							</Checkboxes>
						</Checkboxes>
					</div>
				</UndoSection>
				<hr />
			</ScrollContainer>
			<Footer>
				<Section name="Interwebs" icon={feather.Globe}>
					<Interwebs>
						<Interweb name="Icons" icon={wkSocial.Github} />
						<Interweb name="Website" icon={wkSocial.Github} />
						<Interweb name="Figma Plugin" icon={wkSocial.Figma} />
						<Interweb name="Share on Twitter" icon={wkSocial.Twitter} />
					</Interwebs>
				</Section>
			</Footer>
		</Sidebar1>
	)
}

function LayoutSidebar2() {
	const { size, setSize, strokeWidth, setStrokeWidth, resetSize, resetStrokeWidth } = useContext(RangeContext)!

	return (
		<Sidebar2>
			<Header>
				<SliderUndoSection name="Size" icon={feather.PenTool} value={size} formatValue={value => `${value.toFixed(0)} PX`} handleUndo={resetSize}>
					<Range value={size} setValue={setSize} min={SIZE_MIN} max={SIZE_MAX} step={SIZE_STEP} />
				</SliderUndoSection>
			</Header>
			<ScrollContainer>
				<hr />
				<SliderUndoSection name="Stroke width" icon={feather.PenTool} value={strokeWidth} formatValue={value => value.toFixed(2)} handleUndo={resetStrokeWidth}>
					<Range value={strokeWidth} setValue={setStrokeWidth} min={STROKE_MIN} max={STROKE_MAX} step={STROKE_STEP} />
				</SliderUndoSection>
				<hr />
			</ScrollContainer>
		</Sidebar2>
	)
}

function LayoutMain() {
	// TODO

	return (
		<Main>
			<Grid>
				{entries.map(([name, Icon], index) => (
					<GridItem key={index} name={name} icon={Icon} bookmark={Math.random() < 0.1} selected={index === 0} />
				))}
			</Grid>
		</Main>
	)
}
