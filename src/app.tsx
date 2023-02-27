import * as feather from "@icons/feather"
import * as wkPayment from "@icons/wolf-kit/payment"
import * as wkSocial from "@icons/wolf-kit/social-media"

import {
	Checkbox,
	Checkboxes,
	CheckboxStack,
	DebugCssEffect,
	Footer,
	Grid,
	GridItem,
	Header,
	Main,
	OverflowYContainer,
	Resource,
	Resources,
	SearchBar,
	Section,
	Sidebar1,
	Sidebar2,
} from "@/components"
import { Icon, toKebabCase } from "@/lib"

function toNameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

const featherEntries: [string, Icon][] = Object.entries(feather).map(([k, v]) => [toNameCase(k), v])
const wkSocialMediaEntries: [string, Icon][] = Object.entries(wkSocial).map(([k, v]) => [toNameCase(k), v])
const wkPaymentProcessorsEntries: [string, Icon][] = Object.entries(wkPayment).map(([k, v]) => [toNameCase(k), v])

const entries = [...featherEntries, ...wkSocialMediaEntries, ...wkPaymentProcessorsEntries]

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
						<CheckboxStack>
							<Checkboxes>
								<Checkbox name="Feather" icon={feather.Feather} />
							</Checkboxes>
							<Checkboxes>
								<Checkbox
									name="Social"
									icon={p => (
										<feather.ChevronDown style={{ transform: "scale(0.8)", opacity: 0.375 }} strokeWidth={4} {...p} />
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
									icon={p => (
										<feather.ChevronDown style={{ transform: "scale(0.8)", opacity: 0.375 }} strokeWidth={4} {...p} />
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
						</CheckboxStack>
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
						<input type="range" />
					</Section>
				</Header>
				<OverflowYContainer>
					<hr />
					<Section name="Size">
						<input type="range" />
					</Section>
					<hr />
					<Section name="Stroke">
						<input type="range" />
					</Section>
					<hr />
					<Section name="Size">
						<input type="range" />
					</Section>
					<hr />
					<Section name="Size">
						<input type="range" />
					</Section>
					<hr />
				</OverflowYContainer>
				<Footer>
					<Section name="Stroke">
						<input type="range" />
					</Section>
				</Footer>
			</Sidebar2>
			<Main>
				<Grid>
					{entries.map(([name, Icon], index) => (
						<GridItem
							key={index}
							name={name}
							icon={Icon}
							bookmark={Math.random() < 0.1 ? true : undefined}
							//// selected={Math.random() < 0.1 ? true : undefined}
						/>
					))}
				</Grid>
			</Main>
		</>
	)
}
