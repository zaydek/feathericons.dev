import * as feather from "@icons/feather"
import * as wkPayment from "@icons/wolf-kit/payment"
import * as wkSocial from "@icons/wolf-kit/social-media"

import { CheckboxItem, CheckboxList } from "@/components/checkboxes"
import { DebugCssEffect } from "@/components/debug-css"
import { Grid, GridItem } from "@/components/grid"
import { Hairline } from "@/components/hairline"
import { Main, Sidebar1, Sidebar2 } from "@/components/layout"
import { Resource } from "@/components/resource"
import { SearchBar } from "@/components/search-bar"
import { Section } from "@/components/section"
import { Slider } from "@/components/slider"
import { toKebabCase } from "@/lib"
import { Icon } from "@/lib/icon"

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
				<div style={{ overflowY: "scroll" }}>
					<Section>
						<SearchBar />
					</Section>
					<Section>
						<CheckboxList>
							<CheckboxItem name="Feather" icon={feather.Feather} />
						</CheckboxList>
						<CheckboxList>
							<CheckboxItem
								name="Social"
								icon={p => <feather.ChevronDown style={{ transform: "scale(0.75)", opacity: 0.375 }} strokeWidth={6} {...p} />}
								showCheckbox={false}
							/>
							<CheckboxList>
								<CheckboxItem name="Original" icon={wkSocial.Twitter} />
								<CheckboxList>
									<CheckboxItem name="Circle" icon={wkSocial.TwitterCircle} />
								</CheckboxList>
								<CheckboxList>
									<CheckboxItem name="Square" icon={wkSocial.TwitterSquare} />
								</CheckboxList>
							</CheckboxList>
							<CheckboxList>
								<CheckboxItem name="Mono" icon={wkSocial.TwitterMono} />
								<CheckboxList>
									<CheckboxItem name="Circle" icon={wkSocial.TwitterCircleMono} />
								</CheckboxList>
								<CheckboxList>
									<CheckboxItem name="Square" icon={wkSocial.TwitterSquareMono} />
								</CheckboxList>
							</CheckboxList>
						</CheckboxList>
						<CheckboxList>
							<CheckboxItem
								name="Payment"
								icon={p => <feather.ChevronDown style={{ transform: "scale(0.75)", opacity: 0.375 }} strokeWidth={6} {...p} />}
								showCheckbox={false}
							/>
							<CheckboxList>
								<CheckboxItem name="Original" icon={wkPayment.Stripe} />
								<CheckboxList>
									<CheckboxItem name="Filled" icon={wkPayment.Stripe1} />
								</CheckboxList>
							</CheckboxList>
							<CheckboxList>
								<CheckboxItem name="Mono" icon={wkPayment.Stripe2} />
								<CheckboxList>
									<CheckboxItem name="Filled" icon={wkPayment.Stripe3} />
								</CheckboxList>
							</CheckboxList>
						</CheckboxList>
					</Section>
					<Hairline />
					<Section name="Size">
						<Slider />
					</Section>
					<Hairline />
					<Section name="Stroke">
						<Slider />
					</Section>
					<Hairline />
				</div>
				<Section tag="footer" name="Resources" canUndo={false}>
					<Resource name="Icons" icon={wkSocial.Github} />
					<Resource name="Website" icon={wkSocial.Github} />
					<Resource name="Figma Plugin" icon={wkSocial.Figma} />
					<Resource name="Share on Twitter" icon={wkSocial.Twitter} />
				</Section>
			</Sidebar1>
			<Sidebar2>{/* TODO */}</Sidebar2>
			<Main>
				{/* <div className="search-bar">
					<feather.Search className="search-bar-icon" strokeWidth={4} />
					<input className="u-flex-1" type="text" />
				</div> */}
				<Grid>
					{entries.map(([name, Icon]) => (
						<GridItem
							key={name}
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
