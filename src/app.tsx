import * as feather from "@icons/feather"
import * as wkPayment from "@icons/wolf-kit/payment"
import * as wkSocial from "@icons/wolf-kit/social-media"

import { toKebabCase } from "@/lib"
import { Icon } from "@/lib/icon"
import { CheckboxItem, CheckboxList } from "./checkbox"
import { DebugCssEffect } from "./debug-css"
import { Main, Sidebar1, Sidebar2 } from "./layout"
import { Resource } from "./resource"
import { Section } from "./section"

function toNameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

const featherEntries: [string, Icon][] = Object.entries(feather).map(([k, v]) => [toNameCase(k), v])
const wkSocialMediaEntries: [string, Icon][] = Object.entries(wkSocial).map(([k, v]) => [toNameCase(k), v])
const wkPaymentProcessorsEntries: [string, Icon][] = Object.entries(wkPayment).map(([k, v]) => [toNameCase(k), v])

const entries = [...featherEntries, ...wkSocialMediaEntries, ...wkPaymentProcessorsEntries]

//// const ref = useRef<HTMLInputElement | null>(null)
//// const [value, setValue] = useState("")
////
//// useEffect(() => {
//// 	function handleKeyDown(e: KeyboardEvent) {
//// 		if ((isMac() ? e.metaKey : e.ctrlKey) && e.key === "p") {
//// 			e.preventDefault() // Sorry printers
//// 			ref.current!.focus()
//// 		}
//// 	}
//// 	window.addEventListener("keydown", handleKeyDown, false)
//// 	return () => window.removeEventListener("keydown", handleKeyDown, false)
//// }, [])

export function App() {
	return (
		<>
			<DebugCssEffect />
			<Sidebar1>
				<div className="u-overflow-y-scroll">
					<Section name="Icons">
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
					<hr className="section-hairline" />
					<Section name="Size">
						<div className="slider">
							<div className="interactive-slider u-flex-1">
								<div className="track">
									<div className="thumb"></div>
								</div>
							</div>
							<input type="text" value="32 PX" />
						</div>
					</Section>
					<hr className="section-hairline" />
					<Section name="Stroke width">
						<div className="slider">
							<div className="interactive-slider u-flex-1">
								<div className="track">
									<div className="thumb"></div>
								</div>
							</div>
							<input type="text" value="2.00" />
						</div>
					</Section>
					<hr className="section-hairline" />
				</div>
				<Section tag="footer" name="Resources">
					<Resource name="GitHub" icon={wkSocial.Github} />
					<Resource name="GitHub" icon={wkSocial.Github} />
					<Resource name="GitHub" icon={wkSocial.Github} />
					<Resource name="GitHub" icon={wkSocial.Github} />
				</Section>
			</Sidebar1>
			<Sidebar2>
				<div className="u-overflow-y-scroll">
					<Section name="TODO">{/* TODO */}</Section>
				</div>
				<Section tag="footer" name="TODO">
					{/* TODO */}
				</Section>
			</Sidebar2>
			<Main>
				<div>
					Aliquip voluptate irure esse nisi sunt consectetur ut eu sit ipsum sunt amet laboris deserunt. Et nulla pariatur laborum qui do sint ea deserunt
					veniam consectetur sunt ullamco dolore cupidatat. Labore sit do nostrud excepteur proident. Commodo labore cupidatat consequat aliquip cillum eiusmod
					occaecat enim sunt est ad. Non veniam qui nisi velit consequat et dolor ullamco esse nisi pariatur cillum. Proident nulla voluptate eiusmod non
					proident labore et anim labore deserunt deserunt pariatur magna.
				</div>
			</Main>
		</>
	)
}
