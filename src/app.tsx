import * as feather from "@icons/feather"
import * as wkVendor from "@icons/wolf-kit/payment"
import * as wkSocial from "@icons/wolf-kit/social-media"

import { IconComponent } from "@/components/dynamic-icon"
import { CreativeCommons } from "@/components/license"
import { CSSProperties, PropsWithChildren, useEffect, useRef, useState } from "react"

function SectionName({ name, canUndo = true }: { name: string; canUndo?: boolean }) {
	return (
		<div className="section-name">
			<h2 className="section-name-type">{name}</h2>
			{canUndo && <feather.RotateCcw className="section-name-undo-button" strokeWidth={4} />}
		</div>
	)
}

function CheckboxItem({ name, icon: Icon }: { name: string; icon: IconComponent }) {
	const [checked, setChecked] = useState(false)

	return (
		// TODO
		<label className="checkbox-item">
			<Icon className="checkbox-icon" />
			<div className="checkbox-type">{name}</div>
			<input type="checkbox" checked={checked} onChange={e => setChecked(e.currentTarget.checked)} />
		</label>
	)
}

function Slider() {
	const [value, setValue] = useState(50)

	return (
		// prettier-ignore
		<input
			style={{ "--progress": `${value}%` } as CSSProperties}
			type="range"
			value={value}
			onChange={e => setValue(e.currentTarget.valueAsNumber)}
		/>
	)
}

function LicenseItem({ icon: Icon, children }: PropsWithChildren<{ icon: IconComponent }>) {
	return (
		<li className="license-item">
			<Icon className="license-icon" />
			<p className="license-type">{children}</p>
		</li>
	)
}

function SearchBar() {
	const ref = useRef<HTMLInputElement | null>(null)
	const [value, setValue] = useState("")

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.metaKey && e.key === "p") {
				e.preventDefault() // Sorry printers
				ref.current!.focus()
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [])

	return (
		<nav className="search-bar">
			<feather.Search className="search-bar-icon" strokeWidth={4} />
			<input ref={ref} type="text" placeholder="Press ⌘P to focus" value={value} onChange={e => setValue(e.currentTarget.value)} />
		</nav>
	)
}

export function App() {
	const [showOutline, setShowOutline] = useState(false)

	const [didScroll, setDidScroll] = useState(false)

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "`") {
				setShowOutline(curr => !curr)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [])

	return (
		<>
			{showOutline && <style>{`*:not(svg *) { outline: 1px solid hsl(0, 100%, 50%, 0.125); }`}</style>}
			<aside className="sidebar">
				<header className="sticky-search-bar-container" data-state-did-scroll={didScroll}>
					<SearchBar />
				</header>
				<div
					className="scrolling-container"
					onScroll={e => {
						setDidScroll(e.currentTarget.scrollTop > 0)
					}}
				>
					<section>
						{/* <SectionName name="Icons" /> */}
						<ul className="checkbox-list">
							<CheckboxItem name="Feather" icon={feather.Feather} />
						</ul>
						<ul className="checkbox-list">
							<CheckboxItem name="Feather" icon={feather.ChevronDown} />
							<ul className="checkbox-list">
								<CheckboxItem name="Feather" icon={wkSocial.Twitter} />
								<ul className="checkbox-list">
									<CheckboxItem name="Feather" icon={wkSocial.TwitterCircle} />
									<CheckboxItem name="Feather" icon={wkSocial.TwitterSquare} />
								</ul>
							</ul>
						</ul>
						<ul className="checkbox-list">
							<CheckboxItem name="Feather" icon={feather.ChevronDown} />
							<ul className="checkbox-list">
								<CheckboxItem name="Feather" icon={wkVendor.Stripe} />
								<ul className="checkbox-list">
									<CheckboxItem name="Feather" icon={wkVendor.Stripe1} />
									<CheckboxItem name="Feather" icon={wkVendor.Stripe2} />
								</ul>
							</ul>
						</ul>
					</section>
					<hr />
					<section>
						<SectionName name="Preview size" />
						<Slider />
					</section>
					<hr />
					<section>
						<SectionName name="Preview stroke" />
						<Slider />
					</section>
					<hr />
					<section>
						<SectionName name="Licenses" canUndo={false} />
						<ul className="license-list">
							{/* prettier-ignore */}
							<LicenseItem icon={feather.Feather}>
								<a href="TODO">Feather icons</a> designed by <a href="TODO">@colebemis</a><br />
								Licensed as MIT<br />
								Personal & commercial use OK <em>without</em> attribution<br />
							</LicenseItem>
							{/* prettier-ignore */}
							<LicenseItem icon={CreativeCommons}>
								<a href="TODO">Social icons</a> sourced by <a href="TODO">The Wolf Kit</a><br />
								Licensed as CC BY 4.0<br />
								Personal & commercial use OK <em>with</em> attribution<br />
							</LicenseItem>
							{/* prettier-ignore */}
							<LicenseItem icon={CreativeCommons}>
								<a href="TODO">Vendor icons</a> sourced by <a href="TODO">The Wolf Kit</a><br />
								Licensed as CC BY 4.0<br />
								Personal & commercial use OK <em>with</em> attribution<br />
							</LicenseItem>
						</ul>
					</section>
				</div>
			</aside>
			<main className="body">{/* ... */}</main>
		</>
	)
}
