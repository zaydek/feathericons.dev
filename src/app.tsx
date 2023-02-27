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
import { useState } from "react"

function toNameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

const featherEntries: [string, Icon][] = Object.entries(feather).map(([k, v]) => [toNameCase(k), v])
const wkSocialMediaEntries: [string, Icon][] = Object.entries(wkSocial).map(([k, v]) => [toNameCase(k), v])
const wkPaymentProcessorsEntries: [string, Icon][] = Object.entries(wkPayment).map(([k, v]) => [toNameCase(k), v])

const entries = [...featherEntries, ...wkSocialMediaEntries, ...wkPaymentProcessorsEntries]

function RangeInstance() {
	const [value, setValue] = useState(50)
	return <Range value={value} setValue={setValue} min={0} max={100} step={1} />
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
					<Section name="Iconsets">
						<div>
							<Checkboxes>
								<Checkbox name="Feather" icon={feather.Feather} />
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
									<Checkbox name="Original" icon={wkSocial.Twitter} />
									<Checkboxes>
										<Checkbox name="Circle" icon={wkSocial.TwitterCircle} />
									</Checkboxes>
									<Checkboxes>
										<Checkbox name="Square" icon={wkSocial.TwitterSquare} />
									</Checkboxes>
								</Checkboxes>
								<Checkboxes>
									<Checkbox name="Mono" icon={wkSocial.TwitterMono} />
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
										<Checkbox name="Filled" icon={wkPayment.Stripe1} />
									</Checkboxes>
								</Checkboxes>
								<Checkboxes>
									<Checkbox name="Mono" icon={wkPayment.Stripe2} />
									<Checkboxes>
										<Checkbox name="Filled" icon={wkPayment.Stripe3} />
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
						<RangeInstance />
					</Section>
				</Header>
				<OverflowYContainer>
					<hr />
					<Section name="Stroke width">
						<RangeInstance />
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
