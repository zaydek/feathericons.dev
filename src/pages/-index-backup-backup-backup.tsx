//// import * as feather from "@/feather"

import { PropsWithChildren, useEffect, useState } from "react"

import { Component, Dynamic } from "@/components/dynamic-icon"
import { CreativeCommons } from "@/components/license"

import * as feather from "@/feather"
import * as wkVendor from "@/wolf-kit/payment"
import * as wkSocial from "@/wolf-kit/social-media"

//// const featherEntries = Object.entries(feather)
//// const wolfKitSocialMediaEntries: [string, Icon][] = Object.entries(wolfKitSocialMedia)
//// const wolfKitPaymentEntries: [string, Icon][] = Object.entries(wolfKitPayment)

function StickyHeader({ didScroll }: { didScroll: boolean }) {
	return (
		<header className="sticky-header" data-state-did-scroll={didScroll}>
			<Heading name="Search" />
			<nav className="search-bar">
				<feather.Search className="search-bar-icon" strokeWidth={4} />
				<input className="search-bar-text-field" type="text" placeholder="⌘P to focus" />
			</nav>
		</header>
	)
}

function Heading({ name, canRevert = true }: { name: string; canRevert?: boolean }) {
	return (
		<div className="heading-container">
			<h2 className="heading">{name}</h2>
			{canRevert === true && <feather.RotateCcw className="heading-revert-icon" strokeWidth={4} />}
		</div>
	)
}

function Checkbox({ checked: initialValue = false }: { checked?: boolean }) {
	const [checked, setChecked] = useState(initialValue)

	return (
		//// <div className="checkbox" aria-checked={checked} onClick={e => setChecked(curr => !curr)}>
		//// 	<feather.Check className="checkbox-icon" strokeWidth={8} />
		//// </div>
		<div className="icons-list-item-checkbox" aria-checked={checked} onClick={e => setChecked(curr => !curr)}>
			<feather.Check className="icons-list-item-checkbox-icon" strokeWidth={8} />
		</div>
	)
}

function Slider() {
	return (
		<div className="slider">
			<div className="slider-track">
				<div className="slider-thumb"></div>
			</div>
		</div>
	)
}

function LicenseList({ children }: PropsWithChildren) {
	return <ul className="license-list">{children}</ul>
}

function LicenseListItem({ icon, children }: PropsWithChildren<{ icon: Component }>) {
	return (
		<li className="license-list-item">
			<Dynamic component={icon} className="license-icon" />
			<p className="license-legalese">{children}</p>
		</li>
	)
}

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

	const [didScroll, setDidScroll] = useState(false)

	return (
		<>
			<style>{showOutline && "* { outline: 1px solid hsl(0, 100%, 50%, 0.25); }"}</style>
			<aside className="aside">
				<StickyHeader didScroll={didScroll} />
				<div
					className="scrolling-container"
					onScroll={e => {
						setDidScroll(e.currentTarget.scrollTop > 0)
					}}
				>
					<section className="section">
						<Heading name="Icons" />
						<div className="icons-list-container">
							<ul className="icons-list">
								<li className="icons-list-item">
									<feather.Feather className="icons-list-item-icon" />
									<div className="icons-list-item-name">Social</div>
									<Checkbox />
								</li>
							</ul>
							<ul className="icons-list">
								<li className="icons-list-item">
									<feather.ChevronDown className="icons-list-item-icon" strokeWidth={4} />
									<div className="icons-list-item-name">Social</div>
									<Checkbox />
								</li>
								<ul className="icons-list">
									<li className="icons-list-item">
										<wkSocial.Twitter className="icons-list-item-icon" />
										<div className="icons-list-item-name">Original</div>
										<Checkbox />
									</li>
									<ul className="icons-list">
										<li className="icons-list-item">
											<wkSocial.TwitterCircle className="icons-list-item-icon" />
											<div className="icons-list-item-name">Circle</div>
											<Checkbox />
										</li>
										<li className="icons-list-item">
											<wkSocial.TwitterSquare className="icons-list-item-icon" />
											<div className="icons-list-item-name">Square</div>
											<Checkbox />
										</li>
									</ul>
								</ul>
								<ul className="icons-list">
									<li className="icons-list-item">
										<wkSocial.TwitterMono className="icons-list-item-icon" />
										<div className="icons-list-item-name">Monochrome</div>
										<Checkbox />
									</li>
									<ul className="icons-list">
										<li className="icons-list-item">
											<wkSocial.TwitterCircleMono className="icons-list-item-icon" />
											<div className="icons-list-item-name">Circle</div>
											<Checkbox />
										</li>
										<li className="icons-list-item">
											<wkSocial.TwitterSquareMono className="icons-list-item-icon" />
											<div className="icons-list-item-name">Square</div>
											<Checkbox />
										</li>
									</ul>
								</ul>
							</ul>
							<ul className="icons-list">
								<li className="icons-list-item">
									<feather.ChevronDown className="icons-list-item-icon" strokeWidth={4} />
									<div className="icons-list-item-name">Vendors</div>
									<Checkbox />
								</li>
								<ul className="icons-list">
									<li className="icons-list-item">
										<wkVendor.Stripe className="icons-list-item-icon" />
										<div className="icons-list-item-name">Original</div>
										<Checkbox />
									</li>
									<ul className="icons-list">
										<li className="icons-list-item">
											<wkVendor.Stripe1 className="icons-list-item-icon" />
											<div className="icons-list-item-name">Filled</div>
											<Checkbox />
										</li>
									</ul>
									<li className="icons-list-item">
										<wkVendor.Stripe2 className="icons-list-item-icon" />
										<div className="icons-list-item-name">Monochrome</div>
										<Checkbox />
									</li>
									<ul className="icons-list">
										<li className="icons-list-item">
											<wkVendor.Stripe3 className="icons-list-item-icon" />
											<div className="icons-list-item-name">Filled</div>
											<Checkbox />
										</li>
									</ul>
								</ul>
							</ul>
						</div>
					</section>
					<hr />
					<section className="section">
						<Heading name="Size" />
						<Slider />
					</section>
					<hr />
					<section className="section">
						<Heading name="Stroke width" />
						<Slider />
					</section>
					<hr />
					<section className="section">
						<Heading name="Licenses" />
						<LicenseList>
							<LicenseListItem icon={feather.Feather}>
								<a className="anchor" href="TODO">
									Feather icons
								</a>{" "}
								designed by{" "}
								<a className="anchor" href="TODO">
									@colebemis
								</a>
								<br />
								Licensed as{" "}
								<a className="anchor" href="TODO">
									MIT
								</a>
								<br />
								Personal & commercial use allowed <em>without</em> attribution
							</LicenseListItem>
							<LicenseListItem icon={CreativeCommons}>
								<a className="anchor" href="TODO">
									App icons
								</a>{" "}
								designed by{" "}
								<a className="anchor" href="TODO">
									The Wolf Kit
								</a>
								<br />
								Licensed as{" "}
								<a className="anchor" href="TODO">
									CC BY 4.0
								</a>
								<br />
								Personal & commercial use allowed <em>with</em> attribution
							</LicenseListItem>
							<LicenseListItem icon={CreativeCommons}>
								<a className="anchor" href="TODO">
									Vendor icons
								</a>{" "}
								designed by{" "}
								<a className="anchor" href="TODO">
									The Wolf Kit
								</a>
								<br />
								Licensed as{" "}
								<a className="anchor" href="TODO">
									CC BY 4.0
								</a>
								<br />
								Personal & commercial use allowed <em>with</em> attribution
							</LicenseListItem>
						</LicenseList>
					</section>
				</div>
			</aside>
			<main className="main">
				<div>Hello</div>
			</main>
		</>
	)
}
