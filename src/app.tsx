import * as feather from "@icons/feather"
import * as wkPayment from "@icons/wolf-kit/payment"
import * as wkSocial from "@icons/wolf-kit/social-media"

import {
	Checkbox,
	Checkboxes,
	DebugCssEffect,
	Footer,
	Grid,
	GridItem,
	Header,
	Main,
	OverflowYContainer,
	Range,
	Resource,
	Resources,
	SearchBar,
	Section,
	Sidebar1,
	Sidebar2,
} from "@/components"
import { Icon, toKebabCase } from "@/lib"
import { useEffect, useState } from "react"

function toNameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

const featherEntries: [string, Icon][] = Object.entries(feather).map(([k, v]) => [toNameCase(k), v])
const wkSocialMediaEntries: [string, Icon][] = Object.entries(wkSocial).map(([k, v]) => [toNameCase(k), v])
const wkPaymentProcessorsEntries: [string, Icon][] = Object.entries(wkPayment).map(([k, v]) => [toNameCase(k), v])

const entries = [...featherEntries, ...wkSocialMediaEntries, ...wkPaymentProcessorsEntries]

function SizeRange() {
	const [size, setSize] = useState(24)

	useEffect(() => {
		document.body.style.setProperty("--icon-size", "" + size)
	}, [size])

	return <Range value={size} setValue={setSize} min={16} max={48} step={1} />
}

function StrokeWidthRange() {
	const [strokeWidth, setStrokeWidth] = useState(2)

	useEffect(() => {
		document.body.style.setProperty("--icon-stroke-width", "" + strokeWidth)
	}, [strokeWidth])

	return <Range value={strokeWidth} setValue={setStrokeWidth} min={0.5} max={3.5} step={0.125} />
}

export function App() {
	return (
		<>
			<DebugCssEffect />
			<Sidebar1>
				<Header>
					<Section>
						<SearchBar />
					</Section>
				</Header>
				<OverflowYContainer>
					<Section name="Icons">
						<div>
							<Checkboxes>
								<Checkbox name="Feather" icon={feather.Feather} checked />
							</Checkboxes>
							<Checkboxes>
								<Checkbox
									name="Social"
									icon={$props => (
										<feather.ChevronDown
											style={{ transform: "scale(0.8)", opacity: 0.375 }}
											strokeWidth={6}
											{...$props}
										/>
									)}
									showCheckbox={false}
								/>
								<Checkboxes>
									<Checkbox name="Original" icon={wkSocial.Twitter} checked />
									<Checkboxes>
										<Checkbox name="Circle" icon={wkSocial.TwitterCircle} />
									</Checkboxes>
									<Checkboxes>
										<Checkbox name="Square" icon={wkSocial.TwitterSquare} />
									</Checkboxes>
								</Checkboxes>
								<Checkboxes>
									<Checkbox name="Mono" icon={wkSocial.TwitterMono} checked />
									<Checkboxes>
										<Checkbox name="Circle" icon={wkSocial.TwitterCircleMono} />
									</Checkboxes>
									<Checkboxes>
										<Checkbox name="Square" icon={wkSocial.TwitterSquareMono} />
									</Checkboxes>
								</Checkboxes>
							</Checkboxes>
							<Checkboxes>
								<Checkbox
									name="Payment"
									icon={$props => (
										<feather.ChevronDown
											style={{ transform: "scale(0.8)", opacity: 0.375 }}
											strokeWidth={6}
											{...$props}
										/>
									)}
									showCheckbox={false}
								/>
								<Checkboxes>
									<Checkbox name="Original" icon={wkPayment.Stripe} />
									<Checkboxes>
										<Checkbox name="Filled" icon={wkPayment.Stripe1} checked />
									</Checkboxes>
								</Checkboxes>
								<Checkboxes>
									<Checkbox name="Mono" icon={wkPayment.Stripe2} />
									<Checkboxes>
										<Checkbox name="Filled" icon={wkPayment.Stripe3} checked />
									</Checkboxes>
								</Checkboxes>
							</Checkboxes>
						</div>
					</Section>
					<hr />
				</OverflowYContainer>
				<Footer>
					<Section name="Resources">
						<Resources>
							<Resource name="Icons" icon={wkSocial.Github} />
							<Resource name="Website" icon={wkSocial.Github} />
							<Resource name="Figma Plugin" icon={wkSocial.Figma} />
							<Resource name="Share on Twitter" icon={wkSocial.Twitter} />
						</Resources>
					</Section>
				</Footer>
			</Sidebar1>
			<Sidebar2>
				<Header>
					<Section name="Size">
						<SizeRange />
					</Section>
				</Header>
				<OverflowYContainer>
					<hr />
					<Section name="Stroke width">
						<StrokeWidthRange />
					</Section>
					<hr />
					{/* <Section name="Size">
						<input type="range" />
					</Section> */}
				</OverflowYContainer>
				{/* <Footer></Footer> */}
			</Sidebar2>
			<Main>
				<Grid>
					{entries.map(([name, Icon], index) => (
						<GridItem key={index} name={name} icon={Icon} bookmark={Math.random() < 0.1} selected={index === 0} />
					))}
				</Grid>
			</Main>
		</>
	)
}
